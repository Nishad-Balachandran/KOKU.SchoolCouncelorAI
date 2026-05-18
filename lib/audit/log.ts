import { AuditAction, Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";

type AuditInput = {
  schoolId: string;
  userId: string;
  studentId?: string;
  action: AuditAction;
  feature: string;
  modelProvider?: string;
  modelName?: string;
  inputSummary?: string;
  outputSummary?: string;
  approvedByHuman?: boolean;
  reviewerId?: string;
  reviewNotes?: string;
  blockedByPolicy?: boolean;
  metadata?: Prisma.InputJsonValue;
};

export async function logAIAction(input: AuditInput) {
  return prisma.aiAuditLog.create({
    data: {
      schoolId: input.schoolId,
      userId: input.userId,
      studentId: input.studentId,
      action: input.action,
      feature: input.feature,
      modelProvider: input.modelProvider,
      modelName: input.modelName,
      inputSummary: input.inputSummary,
      outputSummary: input.outputSummary,
      approvedByHuman: input.approvedByHuman ?? false,
      reviewerId: input.reviewerId,
      reviewNotes: input.reviewNotes,
      blockedByPolicy: input.blockedByPolicy ?? false,
      metadata: input.metadata,
    },
  });
}
