import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { handleApiError } from "@/utils/errorHandler";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const job = await prisma.job.findUnique({ where: { id: params.id } });
    if (!job)
      return NextResponse.json({ success: false, message: "Job not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: job });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const updated = await prisma.job.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.job.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true, message: "Job deleted" });
  } catch (error) {
    return handleApiError(error);
  }
}
