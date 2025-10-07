"use client";

import { Search, MapPin } from "lucide-react";
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
              icon={<Search className="w-4 h-4" />}
            />

            <Input
              type="text"
              placeholder="Location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              icon={<MapPin className="w-4 h-4" />}
            />

            <Select
              value={type}
              onChange={(e) => setType(e.target.value)}
              options={[
                { value: "", label: "All Types" },
                { value: "full_time", label: "Full-time" },
                { value: "part_time", label: "Part-time" },
                { value: "remote", label: "Remote" },
              ]}
            />

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
