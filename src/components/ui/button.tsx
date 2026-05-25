"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const button = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-sans text-body font-medium",
    "rounded-md transition-all duration-150 ease-out",
    "focus-ring disabled:opacity-50 disabled:pointer-events-none",
    "select-none",
  ],
  {
    variants: {
      variant: {
        primary: "bg-navy-700 text-cream-50 hover:bg-navy-500 active:bg-navy-900",
        coral: "bg-coral-500 text-navy-900 hover:bg-coral-400 active:bg-coral-500",
        secondary:
          "bg-transparent border-[1.5px] border-navy-700 text-navy-700 hover:bg-navy-100",
        ghost: "bg-transparent text-navy-700 hover:bg-navy-100",
        destructive: "bg-gred-500 text-white hover:opacity-90",
      },
      size: {
        md: "h-10 px-5",
        lg: "h-12 px-6 text-body-lg",
        sm: "h-9 px-4 text-small",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp ref={ref} className={cn(button({ variant, size }), className)} {...props} />
    );
  },
);
Button.displayName = "Button";
