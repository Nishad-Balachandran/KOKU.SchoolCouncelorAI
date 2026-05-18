import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { upsertRiskAlertForStudent } from "@/lib/db/queries";
import { calculateRiskScore } from "@/lib/risk/scoring";

export async function POST() {
  try {
    const students = await prisma.student.findMany({
      include: {
        interventions: {
          where: {
            status: {
              in: ["PLANNED", "ACTIVE"],
            },
            dueDate: {
              lt: new Date(),
            },
          },
        },
      },
    });

    for (const student of students) {
      const result = calculateRiskScore({
        gpa: student.gpa,
        attendanceRate: student.attendanceRate,
        behaviorIncidentCount: student.behaviorIncidentCount,
        missingInterventionCount: student.interventions.length,
      });

      await prisma.student.update({
        where: { id: student.id },
        data: {
          riskScore: result.score,
          riskLevel: result.level,
          riskLastCalculatedAt: new Date(),
        },
      });

      if (result.level === "HIGH" || result.level === "CRITICAL") {
        await upsertRiskAlertForStudent({
          studentId: student.id,
          level: result.level,
          score: result.score,
          reasons: result.reasons,
        });
      }
    }

    return NextResponse.json({
      message: "Risk recalculation completed.",
      processed: students.length,
    });
  } catch {
    return NextResponse.json({ message: "Failed to recalculate risk." }, { status: 500 });
  }
}
