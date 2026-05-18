import { DashboardTask, RiskAlert, Student } from "@/types/domain";

export const mockStudents: Student[] = [
  {
    id: "stu_001",
    firstName: "Maya",
    lastName: "Rodriguez",
    gradeLevel: 11,
    gpa: 2.1,
    attendanceRate: 84,
    behaviorIncidentCount: 2,
    riskLevel: "HIGH",
    counselorName: "Ava Thompson",
    guardians: [
      { name: "Elena Rodriguez", relationship: "Mother", email: "elena.r@example.com" },
      { name: "Carlos Rodriguez", relationship: "Father", phone: "555-201-8777" },
    ],
    aiSummary:
      "Maya shows recent attendance decline and GPA drop. Recommend immediate Tier 2 attendance intervention, weekly check-in, and family conference within 7 days.",
    interventions: [
      {
        id: "int_101",
        title: "Attendance support plan",
        status: "ACTIVE",
        tier: "TIER_2",
        dueDate: "2026-05-21",
        summary: "Daily check-in with first period teacher and counselor follow-up twice weekly.",
      },
      {
        id: "int_102",
        title: "Credit recovery referral",
        status: "PLANNED",
        tier: "TIER_2",
        dueDate: "2026-05-25",
        summary: "Enroll in online credit recovery for Algebra II.",
      },
    ],
  },
  {
    id: "stu_002",
    firstName: "Jordan",
    lastName: "Lee",
    gradeLevel: 12,
    gpa: 3.4,
    attendanceRate: 93,
    behaviorIncidentCount: 0,
    riskLevel: "MEDIUM",
    counselorName: "Ava Thompson",
    guardians: [{ name: "S. Lee", relationship: "Guardian", email: "slee@example.com" }],
    aiSummary:
      "Jordan is academically stable but has incomplete FAFSA milestones. Recommend FAFSA completion reminder and one college application checkpoint this week.",
    interventions: [
      {
        id: "int_201",
        title: "FAFSA completion support",
        status: "ACTIVE",
        tier: "TIER_1",
        dueDate: "2026-05-20",
        summary: "Schedule FAFSA walkthrough session and verify document completion.",
      },
    ],
  },
  {
    id: "stu_003",
    firstName: "Noah",
    lastName: "Patel",
    gradeLevel: 9,
    gpa: 2.8,
    attendanceRate: 96,
    behaviorIncidentCount: 1,
    riskLevel: "LOW",
    counselorName: "Ava Thompson",
    guardians: [{ name: "Priya Patel", relationship: "Mother", phone: "555-944-3201" }],
    aiSummary:
      "Noah is mostly on track. Continue monthly SEL check-ins and monitor transition-to-high-school stress indicators.",
    interventions: [
      {
        id: "int_301",
        title: "Grade 9 transition check-ins",
        status: "ACTIVE",
        tier: "TIER_1",
        dueDate: "2026-05-29",
        summary: "Monthly counselor check-in to reinforce organization and social adjustment.",
      },
    ],
  },
];

export const mockRiskAlerts: RiskAlert[] = [
  {
    id: "alert_1",
    studentId: "stu_001",
    studentName: "Maya Rodriguez",
    type: "CHRONIC_ABSENTEEISM",
    level: "HIGH",
    explanation: "Attendance dropped below 85% over the last 30 days.",
    recommendation: "Start Tier 2 attendance intervention and schedule family outreach.",
    createdAt: "2026-05-17T08:30:00Z",
  },
  {
    id: "alert_2",
    studentId: "stu_001",
    studentName: "Maya Rodriguez",
    type: "GRADE_DROP",
    level: "HIGH",
    explanation: "GPA declined from 2.7 to 2.1 this grading period.",
    recommendation: "Initiate academic recovery meeting and monitor weekly progress.",
    createdAt: "2026-05-17T09:10:00Z",
  },
  {
    id: "alert_3",
    studentId: "stu_002",
    studentName: "Jordan Lee",
    type: "MISSED_INTERVENTION",
    level: "MEDIUM",
    explanation: "FAFSA milestone task overdue by 5 days.",
    recommendation: "Send reminder and book completion support session.",
    createdAt: "2026-05-17T10:45:00Z",
  },
];

export const mockDashboardTasks: DashboardTask[] = [
  {
    id: "task_1",
    title: "Family conference follow-up",
    studentName: "Maya Rodriguez",
    dueDate: "2026-05-19",
    priority: "URGENT",
  },
  {
    id: "task_2",
    title: "Finalize FAFSA checklist",
    studentName: "Jordan Lee",
    dueDate: "2026-05-20",
    priority: "HIGH",
  },
  {
    id: "task_3",
    title: "Monthly SEL check-in",
    studentName: "Noah Patel",
    dueDate: "2026-05-29",
    priority: "MEDIUM",
  },
];
