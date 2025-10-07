import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { handleApiError } from "@/utils/errorHandler";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get("keyword") || "";
    const location = searchParams.get("location") || "";
    const type = searchParams.get("type") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");

    const where: Record<string, unknown> = {};

    if (keyword) {
      where.title = { contains: keyword, mode: "insensitive" };
    }

    if (location) {
      where.location = { contains: location, mode: "insensitive" };
    }

    if (type) {
      where.type = type;
    }

    const [jobs, totalCount] = await Promise.all([
      prisma.job.findMany({
        where,
        orderBy: { created_at: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.job.count({ where }),
    ]);

    return NextResponse.json({ success: true, data: jobs, totalCount });
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
