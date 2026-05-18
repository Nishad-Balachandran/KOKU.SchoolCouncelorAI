import { NextResponse } from "next/server";
import { getRiskAlerts } from "@/lib/db/queries";

export async function GET() {
  const alerts = await getRiskAlerts();
  return NextResponse.json({ alerts });
}
