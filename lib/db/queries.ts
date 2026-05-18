import { AlertType, InterventionStatus, RiskLevel } from "@prisma/client";
import { mockDashboardTasks, mockRiskAlerts, mockStudents } from "@/data/mock/students";
import { prisma } from "@/lib/db/prisma";
import { DashboardTask, RiskAlert, Student } from "@/types/domain";

function mapRiskLevel(level: RiskLevel): Student["riskLevel"] {
  return level;
}

export async function getDashboardData() {
  try {
    const [students, alerts, meetings] = await Promise.all([
      prisma.student.count({ where: { status: "ACTIVE" } }),
      prisma.riskAlert.count({ where: { status: { in: ["OPEN", "IN_REVIEW", "ESCALATED"] } } }),
      prisma.meeting.count({ where: { startAt: { gte: new Date() }, status: "SCHEDULED" } }),
    ]);

    const taskCount = await prisma.task.count({ where: { status: { in: ["TODO", "IN_PROGRESS"] } } });

    const highRisk = await prisma.student.count({
      where: {
        status: "ACTIVE",
        riskLevel: { in: ["HIGH", "CRITICAL"] },
      },
    });

    const alertsList = await getRiskAlerts();
    const tasks = await getDashboardTasks();

    return {
      cards: {
        students,
        openAlerts: alerts,
        upcomingMeetings: meetings,
        tasksDue: taskCount,
        highRisk,
      },
      alerts: alertsList,
      tasks,
      usingMockData: false,
    };
  } catch {
    return {
      cards: {
        students: mockStudents.length,
        openAlerts: mockRiskAlerts.length,
        upcomingMeetings: 2,
        tasksDue: mockDashboardTasks.length,
        highRisk: mockStudents.filter((s) => s.riskLevel === "HIGH" || s.riskLevel === "CRITICAL").length,
      },
      alerts: mockRiskAlerts,
      tasks: mockDashboardTasks,
      usingMockData: true,
    };
  }
}

export async function getStudents(): Promise<{ students: Student[]; usingMockData: boolean }> {
  try {
    const rows = await prisma.student.findMany({
      orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
      include: {
        primaryCounselor: true,
        guardians: {
          include: {
            guardian: true,
          },
        },
        interventions: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    const students: Student[] = rows.map((row) => ({
      id: row.id,
      firstName: row.firstName,
      lastName: row.lastName,
      gradeLevel: row.gradeLevel,
      gpa: row.gpa ?? 0,
      attendanceRate: row.attendanceRate ?? 0,
      behaviorIncidentCount: row.behaviorIncidentCount ?? 0,
      riskLevel: mapRiskLevel(row.riskLevel),
      counselorName: row.primaryCounselor?.fullName ?? "Unassigned",
      guardians: row.guardians.map((sg) => ({
        name: `${sg.guardian.firstName} ${sg.guardian.lastName}`,
        relationship: sg.guardian.relationshipToStudent ?? "Guardian",
        email: sg.guardian.email ?? undefined,
        phone: sg.guardian.phone ?? undefined,
      })),
      aiSummary:
        "AI summary will be generated after records are synced and reviewed by counselor.",
      interventions: row.interventions.slice(0, 5).map((i) => ({
        id: i.id,
        title: i.title,
        status: i.status as InterventionStatus,
        tier: i.tier,
        dueDate: i.dueDate?.toISOString().slice(0, 10),
        summary: i.description ?? "No summary provided.",
      })),
    }));

    return { students, usingMockData: false };
  } catch {
    return { students: mockStudents, usingMockData: true };
  }
}

export async function getStudentById(studentId: string): Promise<{ student: Student | null; usingMockData: boolean }> {
  const studentsResult = await getStudents();
  const found = studentsResult.students.find((s) => s.id === studentId) ?? null;
  return { student: found, usingMockData: studentsResult.usingMockData };
}

export async function getRiskAlerts(): Promise<RiskAlert[]> {
  try {
    const alerts = await prisma.riskAlert.findMany({
      where: {
        status: { in: ["OPEN", "IN_REVIEW", "ESCALATED"] },
      },
      include: {
        student: true,
      },
      orderBy: [{ level: "desc" }, { createdAt: "desc" }],
      take: 20,
    });

    return alerts.map((alert) => ({
      id: alert.id,
      studentId: alert.studentId,
      studentName: `${alert.student.firstName} ${alert.student.lastName}`,
      type: alert.type,
      level: alert.level,
      explanation: alert.explanation,
      recommendation: alert.recommendation ?? "Counselor review required.",
      createdAt: alert.createdAt.toISOString(),
    }));
  } catch {
    return mockRiskAlerts;
  }
}

export async function getDashboardTasks(): Promise<DashboardTask[]> {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        status: { in: ["TODO", "IN_PROGRESS"] },
      },
      include: {
        student: true,
      },
      orderBy: [{ priority: "desc" }, { dueDate: "asc" }],
      take: 20,
    });

    return tasks.map((task) => ({
      id: task.id,
      title: task.title,
      studentName: task.student ? `${task.student.firstName} ${task.student.lastName}` : "General task",
      dueDate: task.dueDate?.toISOString().slice(0, 10) ?? "No due date",
      priority: task.priority,
    }));
  } catch {
    return mockDashboardTasks;
  }
}

export async function upsertRiskAlertForStudent(input: {
  studentId: string;
  level: RiskLevel;
  score: number;
  reasons: string[];
}) {
  const type = alertTypeFromReasons(input.reasons);

  const existing = await prisma.riskAlert.findFirst({
    where: {
      studentId: input.studentId,
      type,
      status: { in: ["OPEN", "IN_REVIEW", "ESCALATED"] },
    },
  });

  if (existing) {
    return prisma.riskAlert.update({
      where: { id: existing.id },
      data: {
        level: input.level,
        score: input.score,
        explanation: input.reasons.join("; "),
        recommendation: "Counselor review required to approve intervention action.",
        evidence: { reasons: input.reasons },
      },
    });
  }

  return prisma.riskAlert.create({
    data: {
      studentId: input.studentId,
      type,
      category: "OTHER",
      level: input.level,
      score: input.score,
      title: `Risk alert: ${type}`,
      explanation: input.reasons.join("; "),
      recommendation: "Counselor review required to approve intervention action.",
      evidence: { reasons: input.reasons },
      requiresHumanReview: true,
    },
  });
}

function alertTypeFromReasons(reasons: string[]): AlertType {
  const text = reasons.join(" ").toLowerCase();

  if (text.includes("attendance")) {
    return "CHRONIC_ABSENTEEISM";
  }
  if (text.includes("gpa")) {
    return "GRADE_DROP";
  }
  if (text.includes("behavior")) {
    return "BEHAVIOR_INCIDENT";
  }
  if (text.includes("intervention")) {
    return "MISSED_INTERVENTION";
  }

  return "OTHER";
}
