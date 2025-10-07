"use client";
import { useJobDetail } from "@/hooks/useJobDetail";
import { useModalStore } from "@/store/useModalStore";

export default function JobDetail({ id }: { id: string }) {
  const { data, isLoading, error } = useJobDetail(id);
  const open = useModalStore((s) => s.open);

  if (isLoading) return <div>Loading detail...</div>;
  if (error) return <div className="text-red-500">Error loading job</div>;

  const job = data?.data;

  if (!job) return <div>Job not found</div>;

  return (
    <div className="prose">
      <h1>{job.title}</h1>
      <p className="text-sm text-gray-600">
        {job.company} • {job.location}
      </p>
      <div dangerouslySetInnerHTML={{ __html: job.description }} />
      <div className="mt-4">
        <button onClick={() => open(job.id)} className="bg-blue-600 text-white px-4 py-2 rounded">
          Apply for this job
        </button>
      </div>
    </div>
  );
}
