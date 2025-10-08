import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { handleApiError } from "@/utils/errorHandler";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { jobId, applicant_name, applicant_email, cover_letter, resume_path } = body;

    if (!jobId || !applicant_name || !applicant_email || !resume_path) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(applicant_email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email format",
        },
        { status: 400 }
      );
    }

    const application = await prisma.application.create({
      data: {
        job_id: jobId,
        applicant_name,
        applicant_email,
        cover_letter: cover_letter || null,
        resume_path,
      },
    });

    return NextResponse.json({
      success: true,
      data: application,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
