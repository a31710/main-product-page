"use client";
import { InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode;
};

export default function Input({ icon, className, ...props }: InputProps) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      <input
        {...props}
        className={clsx(
          "w-full py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition bg-white",
          icon ? "pl-8 pr-3" : "px-3",
          className
        )}
      />
    </div>
  );
}
