import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badge = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-micro uppercase",
  {
    variants: {
      variant: {
        live: "bg-olive-100 text-olive-600",
        paused: "bg-cream-200 text-ink-secondary",
        pro: "bg-coral-100 text-coral-500",
        business: "bg-navy-100 text-navy-700",
        warning: "bg-amber-100 text-amber-500",
        error: "bg-gred-100 text-gred-500",
      },
    },
    defaultVariants: { variant: "live" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badge> {
  withDot?: boolean;
}

export function Badge({ className, variant, withDot, children, ...p }: BadgeProps) {
  return (
    <span className={cn(badge({ variant }), className)} {...p}>
      {withDot && (
        <span
          aria-hidden
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            variant === "live" && "bg-olive-600",
            variant === "warning" && "bg-amber-500",
            variant === "error" && "bg-gred-500",
            variant === "pro" && "bg-coral-500",
            variant === "business" && "bg-navy-700",
            variant === "paused" && "bg-ink-tertiary",
          )}
        />
      )}
      {children}
    </span>
  );
}
