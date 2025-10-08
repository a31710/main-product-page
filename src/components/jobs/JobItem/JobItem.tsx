"use client";

import Link from "next/link";
import { Calendar, ChevronRight, MapPin } from "lucide-react";
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
      <div className="p-3 md:p-5 hover:bg-gray-50 transition cursor-pointer hover:shadow-md">
        <div className="flex items-start md:items-center justify-between gap-2 md:gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-1 md:mb-1.5 truncate md:whitespace-normal">
              {job.title}
            </h3>
            <p className="text-xs md:text-sm text-gray-700 font-medium mb-1.5 md:mb-2 truncate">
              {job.company}
            </p>
            <p className="text-gray-600 text-xs md:text-sm mb-2 line-clamp-2 hidden md:block">
              {job.description.length > 120
                ? job.description.slice(0, 120) + "..."
                : job.description}
            </p>
            <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5" />
                <span className="truncate max-w-[100px] md:max-w-none">{job.location}</span>
              </div>

              <div className="flex items-center gap-1 hidden sm:flex">
                <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5" />
                <span>
                  Posted{" "}
                  {formatDistanceToNow(new Date(job.created_at), {
                    addSuffix: true,
                  })}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${getTypeDot(job.type)}`}></div>
                <span>{getTypeString(job.type)}</span>
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-purple-600 flex-shrink-0" />
        </div>
      </div>
    </Link>
  );
}
