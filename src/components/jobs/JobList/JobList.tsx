"use client";
import clsx from "clsx";

import JobItem from "../JobItem/JobItem";

import Skeleton from "@/components/ui/Skeleton/Skeleton";
import { useJobs } from "@/hooks/useJobs";
import { useFilterStore } from "@/store/useFilterStore";

export default function JobList() {
  const {
    keyword,
    location,
    type,
    page,
    pageSize,
    setKeyword,
    setLocation,
    setType,
    setPage,
    reset,
  } = useFilterStore();
  const { data, isLoading, isError, error } = useJobs();

  const jobs = data?.data || [];
  const totalCount = data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (page <= 3) {
      pages.push(1, 2, 3, "...", totalPages - 1, totalPages);
    } else if (page >= totalPages - 2) {
      pages.push(1, 2, "...", totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="relative">
              <svg
                className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" strokeWidth="2" />
                <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Search job title..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition bg-white"
              />
            </div>

            <div className="relative">
              <svg
                className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" strokeWidth="2" />
                <circle cx="12" cy="10" r="3" strokeWidth="2" />
              </svg>
              <input
                type="text"
                placeholder="Location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition bg-white"
              />
            </div>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition bg-white"
            >
              <option value="">All Types</option>
              <option value="full_time">Full-time</option>
              <option value="part_time">Part-time</option>
              <option value="remote">Remote</option>
            </select>

            <button
              onClick={reset}
              className="border border-green-600 text-green-600 hover:bg-green-50 font-medium px-4 py-1.5 text-sm rounded-md transition flex items-center justify-center gap-1.5"
            >
              Clear All
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {isLoading ? (
            <div className="p-5 space-y-4">
              {Array.from({ length: pageSize }).map((_, i) => (
                <Skeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <div className="p-12 text-center text-red-500">
              Error loading jobs: {error instanceof Error ? error.message : "Unknown error"}
            </div>
          ) : jobs.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {jobs.map((job) => (
                <JobItem key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-gray-500">No jobs found.</div>
          )}
        </div>

        {!isLoading && totalCount > 0 && (
          <div className="mt-5 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {jobs.length} of {totalCount} jobs
            </div>
            {totalPages > 1 && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-1"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="m15 18-6-6 6-6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Previous
                </button>

                <div className="flex items-center gap-1">
                  {renderPageNumbers().map((p, index) => (
                    <button
                      key={index}
                      onClick={() => typeof p === "number" && setPage(p)}
                      disabled={p === "..."}
                      className={clsx(
                        "w-8 h-8 rounded-md text-xs font-medium transition",
                        p === page
                          ? "bg-green-600 text-white shadow-sm"
                          : p === "..."
                            ? "text-gray-400 cursor-default"
                            : "text-gray-700 hover:bg-gray-100 border border-gray-300"
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-1"
                >
                  Next
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="m9 18 6-6-6-6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
