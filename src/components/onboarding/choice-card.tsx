"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

interface ChoiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  selected: boolean;
  onSelect: () => void;
  badge?: string;
}

export function ChoiceCard({
  title,
  description,
  icon,
  selected,
  onSelect,
  badge,
}: ChoiceCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "group relative w-full text-left p-5 rounded-lg border transition-all duration-150",
        "focus-ring bg-cream-50",
        selected
          ? "border-navy-700 border-[1.5px] shadow-md"
          : "border-cream-200 hover:border-navy-500/40 hover:bg-cream-100",
      )}
    >
      {badge && (
        <span className="absolute top-3 right-3 text-micro uppercase bg-coral-100 text-coral-500 px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
      <div className="flex items-start gap-4">
        {icon && (
          <span
            className={cn(
              "h-11 w-11 shrink-0 rounded-full flex items-center justify-center transition-colors",
              selected ? "bg-coral-100 text-coral-500" : "bg-cream-100 text-navy-700",
            )}
          >
            {icon}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-sans text-h3 text-navy-900">{title}</h3>
            {selected && (
              <span className="h-5 w-5 rounded-full bg-navy-700 text-cream-50 flex items-center justify-center">
                <Check size={12} strokeWidth={2.5} />
              </span>
            )}
          </div>
          <p className="text-small text-ink-secondary mt-1 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
}
