// components/job/JobCard.tsx
"use client";
import Link from "next/link";
import { format } from "date-fns";

import { Job } from "@/types/job";
import { useModalStore } from "@/store/useModalStore";

export default function JobCard({ job }: { job: Job }) {
  const open = useModalStore((s) => s.open);

  return (
    <div className="border rounded p-4 shadow-sm flex flex-col">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">
            <Link href={`/jobs/${job.id}`}>{job.title}</Link>
          </h3>
          <p className="text-sm text-gray-600">{job.company ?? "Company"}</p>
          <p className="text-sm text-gray-500 mt-1">{job.location}</p>
        </div>
        <div className="text-right">
          <span className="px-2 py-1 rounded bg-gray-100 text-xs">{job.type}</span>
        </div>
      </div>

      <p className="mt-3 text-sm text-gray-700 line-clamp-3">{job.description}</p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-gray-400">{format(new Date(job.created_at), "PP")}</span>
        <div className="flex gap-2">
          <button
            onClick={() => open(job.id)}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
          >
            Apply
          </button>
          <Link href={`/jobs/${job.id}`} className="px-3 py-1 border rounded text-sm">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
