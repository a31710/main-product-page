"use client";
import { SelectHTMLAttributes } from "react";
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
    <select
      {...props}
      className={clsx(
        "w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition bg-white",
        className
      )}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
