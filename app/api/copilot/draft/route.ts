import { AuditAction } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { generateDraft } from "@/lib/ai/client";
import { logAIAction } from "@/lib/audit/log";

const bodySchema = z.object({
  task: z.enum(["parent_email", "intervention_plan", "meeting_agenda", "note_structuring"]),
  context: z.string().min(10),
  schoolId: z.string().min(1),
  userId: z.string().min(1),
  studentId: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = bodySchema.parse(await request.json());

    const draft = await generateDraft({
      task: body.task,
      context: body.context,
    });

    try {
      await logAIAction({
        schoolId: body.schoolId,
        userId: body.userId,
        studentId: body.studentId,
        action: AuditAction.AI_GENERATE,
        feature: `copilot_${body.task}`,
        modelProvider: draft.provider,
        modelName: draft.model,
        inputSummary: body.context.slice(0, 500),
        outputSummary: draft.text.slice(0, 500),
        approvedByHuman: false,
        metadata: {
          requiresHumanApproval: true,
        },
      });
    } catch {
      // Keep draft generation available even if audit persistence is temporarily unavailable.
    }

    return NextResponse.json({
      draft: draft.text,
      requiresHumanApproval: true,
      disclaimer:
        "AI-generated content is a draft only. Counselor review and approval is required before save or send.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid request", issues: error.issues }, { status: 400 });
    }

    return NextResponse.json(
      {
        message: "Unable to generate draft right now.",
      },
      { status: 500 },
    );
  }
}
