import * as React from "react";
import { cn } from "@/lib/cn";

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-cream-100 border border-cream-200 rounded-lg p-6 shadow-sm",
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";

export function CardHeader({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4", className)} {...p} />;
}

export function CardTitle({ className, ...p }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("font-sans text-h3 text-navy-900", className)}
      {...p}
    />
  );
}

export function CardDescription({
  className,
  ...p
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-small text-ink-secondary mt-1", className)} {...p} />;
}
