import { RiskLevel } from "@prisma/client";

type RiskInput = {
  gpa?: number | null;
  attendanceRate?: number | null;
  behaviorIncidentCount?: number | null;
  missingInterventionCount?: number;
};

export type RiskScoreResult = {
  score: number;
  level: RiskLevel;
  reasons: string[];
};

export function calculateRiskScore(input: RiskInput): RiskScoreResult {
  let score = 0;
  const reasons: string[] = [];

  if (typeof input.gpa === "number") {
    if (input.gpa < 2.0) {
      score += 35;
      reasons.push("GPA below 2.0");
    } else if (input.gpa < 2.5) {
      score += 20;
      reasons.push("GPA below 2.5");
    }
  }

  if (typeof input.attendanceRate === "number") {
    if (input.attendanceRate < 85) {
      score += 35;
      reasons.push("Attendance below 85%");
    } else if (input.attendanceRate < 92) {
      score += 15;
      reasons.push("Attendance below 92%");
    }
  }

  if ((input.behaviorIncidentCount ?? 0) >= 3) {
    score += 20;
    reasons.push("Multiple behavior incidents");
  } else if ((input.behaviorIncidentCount ?? 0) > 0) {
    score += 8;
    reasons.push("Recent behavior incident");
  }

  if ((input.missingInterventionCount ?? 0) > 0) {
    score += 12;
    reasons.push("Missed intervention follow-up");
  }

  const clampedScore = Math.max(0, Math.min(100, score));

  let level: RiskLevel = RiskLevel.LOW;
  if (clampedScore >= 75) {
    level = RiskLevel.CRITICAL;
  } else if (clampedScore >= 55) {
    level = RiskLevel.HIGH;
  } else if (clampedScore >= 30) {
    level = RiskLevel.MEDIUM;
  }

  return { score: clampedScore, level, reasons };
}
