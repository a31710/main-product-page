"use client";

import JobItem from "../JobItem/JobItem";
import Pagination from "../Pagination/Pagination";

import Skeleton from "@/components/ui/Skeleton/Skeleton";
import Input from "@/components/ui/Input/Input";
import Select from "@/components/ui/Select/Select";
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Input
              type="text"
              placeholder="Search job title..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" strokeWidth="2" />
                  <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
                </svg>
              }
            />

            <Input
              type="text"
              placeholder="Location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" strokeWidth="2" />
                  <circle cx="12" cy="10" r="3" strokeWidth="2" />
                </svg>
              }
            />

            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">All Types</option>
              <option value="full_time">Full-time</option>
              <option value="part_time">Part-time</option>
              <option value="remote">Remote</option>
            </Select>

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
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
