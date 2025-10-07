"use client";
import { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> & {
  options: SelectOption[];
};

export default function Select({ className, options, ...props }: SelectProps) {
  return (
    <div className="relative">
      <style jsx>{`
        select option {
          padding: 8px 12px;
          border: 1px solid #e5e7eb;
          background: white;
        }
        select option:hover {
          background-color: #f3f4f6;
        }
        select option:checked {
          background-color: #a855f7;
          color: white;
        }
      `}</style>
      <select
        {...props}
        className={clsx(
          "w-full px-3 py-1.5 pr-8 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition bg-white appearance-none hover:border-purple-400",
          className
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
}
