import ApplyForm from "@/components/jobs/ApplyForm/ApplyForm";
import JobDetail from "@/components/jobs/JobDetail/JobDetail";

export default function JobDetailPage({ params }: { params: { id: string } }) {
  return (
    <main className="p-6">
      <JobDetail id={params.id} />
      <ApplyForm />
    </main>
  );
}
