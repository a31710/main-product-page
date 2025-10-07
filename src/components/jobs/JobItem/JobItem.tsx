"use client";

import { Job } from "@/types/job";

interface JobItemProps {
  job: Job;
}

export default function JobItem({ job }: JobItemProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "Full-time":
        return "bg-green-50 text-green-600 border-green-200";
      case "Part-time":
        return "bg-yellow-50 text-yellow-600 border-yellow-200";
      case "Remote":
        return "bg-blue-50 text-blue-600 border-blue-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="p-5 hover:bg-gray-50 transition cursor-pointer hover:shadow-md">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getTypeColor(job.type)}`}
            >
              {job.type}
            </span>
            {/* {job.category && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                {job.category}
              </span>
            )} */}
          </div>
          <h3 className="text-base font-semibold text-gray-900 mb-1.5">{job.title}</h3>
          <p className="text-sm text-gray-700 font-medium mb-2">{job.company}</p>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {job.description.length > 120 ? job.description.slice(0, 120) + "..." : job.description}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" strokeWidth="2" />
                <circle cx="12" cy="10" r="3" strokeWidth="2" />
              </svg>
              <span>{job.location}</span>
            </div>
            <span className="text-gray-300">•</span>
            <span>Posted {job.created_at}</span>
          </div>
        </div>

        <button className="border border-green-600 text-green-600 hover:bg-green-50 font-medium px-5 py-2 text-sm rounded-md transition whitespace-nowrap">
          Apply Now
        </button>
      </div>
    </div>
  );
}
