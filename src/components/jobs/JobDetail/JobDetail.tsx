"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Calendar, Briefcase } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { useJobDetail } from "@/hooks/useJobDetail";
import { useModalStore } from "@/store/useModalStore";

export default function JobDetail({ id }: { id: string }) {
  const router = useRouter();
  const { data, isLoading, error } = useJobDetail(id);
  const open = useModalStore((s) => s.open);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Full-time":
        return "bg-purple-50 text-purple-600 border-purple-200";
      case "Part-time":
        return "bg-purple-100 text-purple-700 border-purple-300";
      case "Remote":
        return "bg-purple-50 text-purple-600 border-purple-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading job details...</div>
      </div>
    );
  }

  if (error || !data?.data) {
    return null;
  }

  const job = data.data;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Jobs</span>
        </button>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="w-full h-48 bg-gradient-to-r from-purple-100 to-purple-50 flex items-center justify-center">
            <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Job illustration"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(job.type)}`}
                  >
                    {job.type}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                <p className="text-xl text-gray-700 font-semibold mb-4">{job.company}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Posted {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>{job.type}</span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h2>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">{job.description}</div>
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
    </div>
  );
}
