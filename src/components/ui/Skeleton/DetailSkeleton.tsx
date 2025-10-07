"use client";

import { ArrowLeft } from "lucide-react";
import "./Skeleton.css";

export default function DetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 text-purple-600 mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Jobs</span>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 h-64 md:h-auto">
              <div className="skeleton w-full h-full" />
            </div>
            <div className="md:w-2/3 p-8">
              <div className="mb-4">
                <div className="skeleton h-8 w-3/4 mb-2" />
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="skeleton h-4 w-4 rounded-full" />
                  <div className="skeleton h-4 w-32" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="skeleton h-4 w-4 rounded-full" />
                  <div className="skeleton h-4 w-40" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="skeleton h-2 w-2 rounded-full" />
                  <div className="skeleton h-4 w-20" />
                </div>
              </div>

              <div className="mb-6">
                <div className="skeleton h-5 w-32 mb-3" />
                <div className="space-y-2">
                  <div className="skeleton h-4 w-full" />
                  <div className="skeleton h-4 w-full" />
                  <div className="skeleton h-4 w-5/6" />
                  <div className="skeleton h-4 w-full" />
                  <div className="skeleton h-4 w-4/5" />
                </div>
              </div>

              <div className="flex gap-3">
                <div className="skeleton h-9 w-20 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
