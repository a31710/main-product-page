import { notFound } from "next/navigation";

import JobDetail from "@/components/jobs/JobDetail/JobDetail";
import { prisma } from "@/lib/db";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function JobDetailPage(props: PageProps) {
  const params = await props.params;
  const { id } = params;

  const job = await prisma.job.findUnique({
    where: { id },
  });

  if (!job) {
    notFound();
  }

  return <JobDetail id={id} />;
}
