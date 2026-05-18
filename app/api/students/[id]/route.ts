import { NextRequest, NextResponse } from "next/server";
import { getStudentById } from "@/lib/db/queries";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const data = await getStudentById(id);

  if (!data.student) {
    return NextResponse.json({ message: "Student not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}
