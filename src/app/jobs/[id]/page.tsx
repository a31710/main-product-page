import { notFound } from "next/navigation";

import JobDetail from "@/components/jobs/JobDetail/JobDetail";
import { prisma } from "@/lib/db";

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const job = await prisma.job.findUnique({
    where: { id },
  });

  if (!job) {
    notFound();
  }

  return <JobDetail id={id} />;
}
