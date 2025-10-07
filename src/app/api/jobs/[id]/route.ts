import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { handleApiError } from "@/utils/errorHandler";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const job = await prisma.job.findUnique({ where: { id } });
    if (!job)
      return NextResponse.json({ success: false, message: "Job not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: job });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updated = await prisma.job.update({
      where: { id },
      data: body,
    });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await prisma.job.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Job deleted" });
  } catch (error) {
    return handleApiError(error);
  }
}
