"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  totalCount: number;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
}: PaginationProps) {
  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        end = 5;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 4;
      }

      if (start > 2) {
        pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
        <span>Show</span>
        <style jsx global>{`
          select.pagination-select option {
            padding: 10px 12px;
            background: white;
            color: #000;
            border: 1px solid #e5e7eb;
            border-radius: 4px;
            margin: 2px;
          }
          select.pagination-select option:hover {
            background-color: #9810fa !important;
            color: #7c3aed !important;
            border-color: #9810fa !important;
          }
          select.pagination-select option:checked {
            background: #9810fa !important;
            color: white !important;
            border-color: #9810fa !important;
          }
        `}</style>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="pagination-select px-2 py-1 border-2 border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none cursor-pointer hover:border-purple-400"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <span>per page</span>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1.5 border border-gray-300 rounded-md text-xs font-semibold text-gray-700 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 disabled:hover:text-gray-700 transition flex items-center gap-1"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Previous
        </button>

        <div className="flex items-center gap-1">
          {renderPageNumbers().map((p, index) => (
            <button
              key={index}
              onClick={() => typeof p === "number" && onPageChange(p)}
              disabled={p === "..."}
              className={clsx(
                "w-8 h-8 rounded-md text-xs font-semibold transition",
                p === currentPage
                  ? "bg-purple-600 text-white shadow-sm cursor-pointer"
                  : p === "..."
                    ? "text-gray-400 cursor-default"
                    : "text-gray-700 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-600 border border-gray-300 cursor-pointer"
              )}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5 border border-gray-300 rounded-md text-xs font-semibold text-gray-700 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 disabled:hover:text-gray-700 transition flex items-center gap-1"
        >
          Next
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
