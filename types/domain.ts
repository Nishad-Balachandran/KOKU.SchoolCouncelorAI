export type UserRole = "COUNSELOR" | "SCHOOL_ADMIN" | "DISTRICT_ADMIN";

export type AppUser = {
  id: string;
  schoolId: string;
  name: string;
  email: string;
  role: UserRole;
  schoolName: string;
};

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type RiskAlert = {
  id: string;
  studentId: string;
  studentName: string;
  type: string;
  level: RiskLevel;
  explanation: string;
  recommendation: string;
  createdAt: string;
};

export type Intervention = {
  id: string;
  title: string;
  status: "PLANNED" | "ACTIVE" | "COMPLETED";
  tier: "TIER_1" | "TIER_2" | "TIER_3";
  dueDate?: string;
  summary: string;
};

export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  gradeLevel: number;
  gpa: number;
  attendanceRate: number;
  behaviorIncidentCount: number;
  riskLevel: RiskLevel;
  counselorName: string;
  guardians: Array<{ name: string; relationship: string; email?: string; phone?: string }>;
  aiSummary: string;
  interventions: Intervention[];
};

export type DashboardTask = {
  id: string;
  title: string;
  studentName: string;
  dueDate: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
};
