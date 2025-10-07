import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <AlertCircle className="w-16 h-16 text-red-500" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Job Not Found</h1>
        <p className="text-gray-600 mb-8">
          The job you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/"
          className="inline-block bg-green-600 text-white hover:bg-green-700 font-medium px-6 py-3 text-sm rounded-md transition"
        >
          Back to Jobs List
        </Link>
      </div>
    </div>
  );
}
