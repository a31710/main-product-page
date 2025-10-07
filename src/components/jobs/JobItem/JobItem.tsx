"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { Job } from "@/types/job";

export default function JobItem({ job }: { job: Job }) {
  const getTypeDot = (type: string) => {
    switch (type) {
      case "full_time":
        return "bg-green-500";
      case "part_time":
        return "bg-yellow-500";
      case "remote":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const getTypeString = (type: string) => {
    switch (type) {
      case "full-time":
        return "Full time";
      case "part-time":
        return "Part time";
      case "remote":
        return "Remote";
      default:
        return "Job Type";
    }
  };

  return (
    <Link href={`/jobs/${job.id}`} className="block">
      <div className="p-5 hover:bg-gray-50 transition cursor-pointer hover:shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-base font-semibold text-gray-900 mb-1.5">{job.title}</h3>
            <p className="text-sm text-gray-700 font-medium mb-2">{job.company}</p>
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {job.description.length > 120
                ? job.description.slice(0, 120) + "..."
                : job.description}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{job.location}</span>
              </div>
              <span className="text-gray-300">•</span>
              <span>
                Posted{" "}
                {formatDistanceToNow(new Date(job.created_at), {
                  addSuffix: true,
                })}
              </span>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${getTypeDot(job.type)}`}></div>
                <span>{getTypeString(job.type)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="border border-purple-600 text-purple-600 hover:bg-purple-50 font-medium px-5 py-2 text-sm rounded-md transition whitespace-nowrap"
          >
            Apply Now
          </button>
        </div>
      </div>
    </Link>
  );
}
