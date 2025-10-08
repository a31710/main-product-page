"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { useJobDetail } from "@/hooks/useJobDetail";
import { useModalStore } from "@/store/useModalStore";
import DetailSkeleton from "@/components/ui/Skeleton/DetailSkeleton";

export default function JobDetail({ id }: { id: string }) {
  const router = useRouter();
  const { data, isLoading, error } = useJobDetail(id);
  const open = useModalStore((s) => s.open);

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
      case "full_time":
        return "Full time";
      case "part_time":
        return "Part time";
      case "remote":
        return "Remote";
      default:
        return "Job Type";
    }
  };

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (error || !data?.data) {
    return null;
  }

  const job = data.data;

  return (
    <>
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6 transition cursor-pointer mt-5"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Jobs</span>
      </button>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 h-64 md:h-auto">
            <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Job illustration"
              className="w-full h-74 object-cover"
            />
          </div>
          <div className="md:w-2/3 p-8">
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h1>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  Posted{" "}
                  {formatDistanceToNow(new Date(job.created_at), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${getTypeDot(job.type)}`}></div>
                <span>{getTypeString(job.type)}</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-base font-semibold text-gray-900 mb-3">Job Description</h2>
              <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                {job.description}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => open(job.id)}
                className="bg-purple-500 text-white hover:bg-purple-600 font-medium px-5 py-2 text-sm rounded-md transition"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
