"use client";

import { ArrowLeft } from "lucide-react";
import "./Skeleton.css";

export default function DetailSkeleton() {
  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 text-purple-600 mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Jobs</span>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-80">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 h-64 md:h-auto">
              <div className="skeleton-detail mt-8 mx-4 p-8 w-full h-full" />
            </div>
            <div className="md:w-2/3 p-8">
              <div className="mb-4">
                <div className="skeleton-detail h-8 w-4/4 mb-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
