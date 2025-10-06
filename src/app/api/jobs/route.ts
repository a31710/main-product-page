import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { handleApiError } from "@/utils/errorHandler";

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { created_at: "desc" },
    });
    return NextResponse.json({ success: true, data: jobs });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const job = await prisma.job.create({ data: body });
    return NextResponse.json({ success: true, data: job });
  } catch (error) {
    return handleApiError(error);
  }
}
