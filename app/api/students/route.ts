import { NextResponse } from "next/server";
import { getStudents } from "@/lib/db/queries";

export async function GET() {
  const data = await getStudents();
  return NextResponse.json(data);
}
