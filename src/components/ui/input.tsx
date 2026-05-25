"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "block w-full h-11 px-4 rounded-sm bg-cream-50",
          "border border-cream-200 text-body text-ink-primary",
          "placeholder:text-ink-tertiary",
          "transition-shadow duration-150",
          "focus:outline-none focus:border-navy-500 focus:border-[1.5px]",
          "focus:shadow-focus",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export interface FieldProps {
  label: string;
  htmlFor?: string;
  helper?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export function Field({ label, htmlFor, helper, error, children, className }: FieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={htmlFor} className="block text-small text-ink-secondary">
        {label}
      </label>
      {children}
      {(helper || error) && (
        <p className={cn("text-small", error ? "text-gred-500" : "text-ink-tertiary")}>
          {error ?? helper}
        </p>
      )}
    </div>
  );
}
