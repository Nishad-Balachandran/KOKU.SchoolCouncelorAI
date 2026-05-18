import { AuditAction } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { logAIAction } from "@/lib/audit/log";

const reviewSchema = z.object({
  schoolId: z.string().min(1),
  userId: z.string().min(1),
  studentId: z.string().optional(),
  task: z.enum(["parent_email", "intervention_plan", "meeting_agenda", "note_structuring"]),
  decision: z.enum(["approve", "reject"]),
  draft: z.string().min(1),
  reviewNotes: z.string().max(1000).optional(),
});

export async function POST(request: Request) {
  try {
    const body = reviewSchema.parse(await request.json());

    const action = body.decision === "approve" ? AuditAction.AI_APPROVE : AuditAction.AI_REJECT;

    await logAIAction({
      schoolId: body.schoolId,
      userId: body.userId,
      studentId: body.studentId,
      action,
      feature: `copilot_${body.task}`,
      inputSummary: "Human review of generated draft",
      outputSummary: body.draft.slice(0, 500),
      approvedByHuman: body.decision === "approve",
      reviewerId: body.userId,
      reviewNotes: body.reviewNotes,
      blockedByPolicy: body.decision === "reject",
      metadata: {
        reviewSource: "copilot_panel",
        requiresHumanApproval: true,
      },
    });

    return NextResponse.json({
      success: true,
      decision: body.decision,
      message:
        body.decision === "approve"
          ? "Draft approval recorded."
          : "Draft rejection recorded.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid request", issues: error.issues }, { status: 400 });
    }

    return NextResponse.json(
      {
        message: "Unable to persist review decision. Ensure database connection is available.",
      },
      { status: 503 },
    );
  }
}
