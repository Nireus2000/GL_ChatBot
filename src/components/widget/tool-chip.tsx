"use client";

import * as React from "react";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

interface ToolChipProps {
  label: string;
  resolved?: string;
  durationMs?: number;
}

export function ToolChip({ label, resolved, durationMs = 1200 }: ToolChipProps) {
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    if (!resolved) return;
    const t = setTimeout(() => setDone(true), durationMs);
    return () => clearTimeout(t);
  }, [resolved, durationMs]);

  return (
    <div className="flex items-end gap-2">
      <div className="h-7 w-7 shrink-0" />
      <div
        className={cn(
          "inline-flex items-center gap-2 px-3 py-1.5 rounded-full",
          "bg-cream-100 border border-cream-200",
          "text-small text-ink-secondary",
          "transition-colors duration-300",
          done && "bg-olive-100 border-olive-100 text-olive-600",
        )}
      >
        {done ? (
          <Check size={14} strokeWidth={2.25} />
        ) : (
          <Loader2 size={14} className="animate-spin" />
        )}
        <span>{done && resolved ? resolved : label + "…"}</span>
      </div>
    </div>
  );
}
