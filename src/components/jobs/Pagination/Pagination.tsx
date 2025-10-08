"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import clsx from "clsx";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  totalCount: number;
};

type PageSizeSelectProps = {
  pageSize: number;
  onPageSizeChange: (size: number) => void;
};

function PageSizeSelect({ pageSize, onPageSizeChange }: PageSizeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const options = [5, 10, 20, 50];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: number) => {
    onPageSizeChange(value);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
      <span>Show</span>
      <div ref={containerRef} className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="px-2 py-1 pr-6 border-2 border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none cursor-pointer hover:border-purple-400 bg-white transition min-w-[50px] text-left"
        >
          {pageSize}
          <ChevronDown
            className={clsx(
              "absolute right-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border-2 border-gray-300 rounded-md shadow-lg overflow-hidden">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleSelect(option)}
                className={clsx(
                  "w-full px-2 py-1.5 text-sm text-left transition-colors",
                  pageSize === option
                    ? "bg-purple-600 text-white"
                    : "text-gray-900 hover:bg-purple-50 hover:text-purple-600"
                )}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
      <span>per page</span>
    </div>
  );
}

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
    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 w-full md:w-auto">
      <PageSizeSelect pageSize={pageSize} onPageSizeChange={onPageSizeChange} />

      <div className="flex items-center gap-1.5 md:gap-2 w-full md:w-auto justify-between md:justify-start">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 md:px-3 py-2 md:py-1.5 border border-gray-300 rounded-md text-xs font-semibold text-gray-700 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 disabled:hover:text-gray-700 transition flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4 md:w-3.5 md:h-3.5" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="flex items-center gap-1 md:gap-1 flex-1 justify-center md:flex-initial md:justify-start">
          {renderPageNumbers().map((p, index) => (
            <button
              key={index}
              onClick={() => typeof p === "number" && onPageChange(p)}
              disabled={p === "..."}
              className={clsx(
                "w-9 h-9 md:w-8 md:h-8 rounded-md text-xs md:text-xs font-semibold transition",
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
          className="px-3 md:px-3 py-2 md:py-1.5 border border-gray-300 rounded-md text-xs font-semibold text-gray-700 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 disabled:hover:text-gray-700 transition flex items-center gap-1"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4 md:w-3.5 md:h-3.5" />
        </button>
      </div>
    </div>
  );
}
