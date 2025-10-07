import ApplyForm from "@/components/jobs/ApplyForm/ApplyForm";
import JobDetail from "@/components/jobs/JobDetail/JobDetail";

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <main className="p-6">
      <JobDetail id={id} />
      <ApplyForm />
    </main>
  );
}
