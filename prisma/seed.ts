import { PrismaClient, RiskLevel } from "@prisma/client";
import { calculateRiskScore } from "../lib/risk/scoring";

const prisma = new PrismaClient();

async function main() {
  await prisma.aIAuditLog.deleteMany();
  await prisma.communication.deleteMany();
  await prisma.riskAlert.deleteMany();
  await prisma.intervention.deleteMany();
  await prisma.counselorNote.deleteMany();
  await prisma.studentGuardian.deleteMany();
  await prisma.guardian.deleteMany();
  await prisma.task.deleteMany();
  await prisma.meeting.deleteMany();
  await prisma.studentMetric.deleteMany();
  await prisma.careerPlan.deleteMany();
  await prisma.collegeApplication.deleteMany();
  await prisma.student.deleteMany();
  await prisma.user.deleteMany();
  await prisma.school.deleteMany();

  const school = await prisma.school.create({
    data: {
      name: "North Valley High School",
      districtName: "KOKU Unified",
      stateCode: "CA",
    },
  });

  const counselor = await prisma.user.create({
    data: {
      schoolId: school.id,
      email: "ava.thompson@koku.school",
      fullName: "Ava Thompson",
      role: "COUNSELOR",
    },
  });

  const students = await prisma.student.createManyAndReturn({
    data: [
      {
        schoolId: school.id,
        primaryCounselorId: counselor.id,
        studentExternalId: "NVHS-1001",
        firstName: "Maya",
        lastName: "Rodriguez",
        gradeLevel: 11,
        gpa: 2.1,
        creditsEarned: 145,
        creditsRequired: 220,
        attendanceRate: 84,
        attendanceDaysAbsent: 18,
        behaviorIncidentCount: 2,
      },
      {
        schoolId: school.id,
        primaryCounselorId: counselor.id,
        studentExternalId: "NVHS-1002",
        firstName: "Jordan",
        lastName: "Lee",
        gradeLevel: 12,
        gpa: 3.4,
        creditsEarned: 212,
        creditsRequired: 220,
        attendanceRate: 93,
        attendanceDaysAbsent: 7,
        behaviorIncidentCount: 0,
      },
      {
        schoolId: school.id,
        primaryCounselorId: counselor.id,
        studentExternalId: "NVHS-1003",
        firstName: "Noah",
        lastName: "Patel",
        gradeLevel: 9,
        gpa: 2.8,
        creditsEarned: 56,
        creditsRequired: 220,
        attendanceRate: 96,
        attendanceDaysAbsent: 3,
        behaviorIncidentCount: 1,
      },
    ],
  });

  const [maya, jordan, noah] = students;

  const guardians = await prisma.guardian.createManyAndReturn({
    data: [
      {
        schoolId: school.id,
        firstName: "Elena",
        lastName: "Rodriguez",
        email: "elena.r@example.com",
        relationshipToStudent: "Mother",
      },
      {
        schoolId: school.id,
        firstName: "Sam",
        lastName: "Lee",
        email: "slee@example.com",
        relationshipToStudent: "Guardian",
      },
      {
        schoolId: school.id,
        firstName: "Priya",
        lastName: "Patel",
        phone: "555-944-3201",
        relationshipToStudent: "Mother",
      },
    ],
  });

  await prisma.studentGuardian.createMany({
    data: [
      { studentId: maya.id, guardianId: guardians[0].id, isPrimaryContact: true, legalAuthority: true },
      { studentId: jordan.id, guardianId: guardians[1].id, isPrimaryContact: true, legalAuthority: true },
      { studentId: noah.id, guardianId: guardians[2].id, isPrimaryContact: true, legalAuthority: true },
    ],
  });

  await prisma.intervention.createMany({
    data: [
      {
        studentId: maya.id,
        createdById: counselor.id,
        assignedToId: counselor.id,
        title: "Attendance support plan",
        description: "Daily first-period check-in and weekly counselor follow-up.",
        tier: "TIER_2",
        status: "ACTIVE",
        dueDate: new Date("2026-05-21"),
      },
      {
        studentId: jordan.id,
        createdById: counselor.id,
        assignedToId: counselor.id,
        title: "FAFSA completion support",
        description: "Walk through FAFSA submission checklist.",
        tier: "TIER_1",
        status: "ACTIVE",
        dueDate: new Date("2026-05-20"),
      },
      {
        studentId: noah.id,
        createdById: counselor.id,
        assignedToId: counselor.id,
        title: "Grade 9 transition check-ins",
        description: "Monthly adjustment check-in for SEL and organization.",
        tier: "TIER_1",
        status: "ACTIVE",
        dueDate: new Date("2026-05-29"),
      },
    ],
  });

  for (const student of students) {
    const result = calculateRiskScore({
      gpa: student.gpa,
      attendanceRate: student.attendanceRate,
      behaviorIncidentCount: student.behaviorIncidentCount,
      missingInterventionCount: 0,
    });

    await prisma.student.update({
      where: { id: student.id },
      data: {
        riskScore: result.score,
        riskLevel: result.level,
        riskLastCalculatedAt: new Date(),
      },
    });

    if (result.level === RiskLevel.HIGH || result.level === RiskLevel.CRITICAL) {
      await prisma.riskAlert.create({
        data: {
          studentId: student.id,
          type: "CHRONIC_ABSENTEEISM",
          category: "ATTENDANCE",
          level: result.level,
          score: result.score,
          title: "Attendance risk detected",
          explanation: result.reasons.join("; "),
          recommendation: "Counselor review required before parent outreach.",
          requiresHumanReview: true,
        },
      });
    }

    await prisma.studentMetric.create({
      data: {
        studentId: student.id,
        metricDate: new Date(),
        gpa: student.gpa,
        attendanceRate: student.attendanceRate,
        daysAbsent: student.attendanceDaysAbsent,
        behaviorIncidentCount: student.behaviorIncidentCount,
        riskScore: result.score,
        riskLevel: result.level,
      },
    });
  }

  await prisma.task.createMany({
    data: [
      {
        schoolId: school.id,
        studentId: maya.id,
        createdById: counselor.id,
        assignedToId: counselor.id,
        title: "Family conference follow-up",
        status: "TODO",
        priority: "URGENT",
        dueDate: new Date("2026-05-19"),
      },
      {
        schoolId: school.id,
        studentId: jordan.id,
        createdById: counselor.id,
        assignedToId: counselor.id,
        title: "Finalize FAFSA checklist",
        status: "IN_PROGRESS",
        priority: "HIGH",
        dueDate: new Date("2026-05-20"),
      },
      {
        schoolId: school.id,
        studentId: noah.id,
        createdById: counselor.id,
        assignedToId: counselor.id,
        title: "Monthly SEL check-in",
        status: "TODO",
        priority: "MEDIUM",
        dueDate: new Date("2026-05-29"),
      },
    ],
  });

  console.log("Seed completed.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
