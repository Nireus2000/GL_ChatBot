"use client";

import * as React from "react";
import { Check, Lock } from "lucide-react";
import { cn } from "@/lib/cn";

interface PaymentCardProps {
  label: string;
  amount: string;
}

export function PaymentCard({ label, amount }: PaymentCardProps) {
  const [state, setState] = React.useState<"idle" | "paid">("idle");

  return (
    <div className="flex items-end gap-2">
      <div className="h-7 w-7 shrink-0" />
      <div
        className={cn(
          "max-w-[85%] w-full rounded-xl rounded-bl-sm",
          "bg-cream-50 border border-cream-200 overflow-hidden p-4",
        )}
      >
        <p className="text-micro uppercase text-ink-tertiary mb-1">Payment</p>
        <h4 className="font-sans text-body-lg font-semibold text-navy-900 leading-tight">
          {label}
        </h4>
        <p className="text-h2 font-display text-navy-900 tabular mt-2 mb-3">
          {amount}
        </p>
        {state === "idle" ? (
          <button
            type="button"
            onClick={() => setState("paid")}
            className="w-full h-10 rounded-sm bg-coral-500 text-navy-900 text-body font-semibold hover:bg-coral-400 focus-ring transition-colors inline-flex items-center justify-center gap-2"
          >
            <Lock size={14} strokeWidth={2} />
            Pay {amount} securely
          </button>
        ) : (
          <div className="w-full h-10 rounded-sm bg-olive-100 text-olive-600 text-small font-medium flex items-center justify-center gap-1.5">
            <Check size={14} strokeWidth={2.25} />
            Payment received
          </div>
        )}
        <p className="text-micro text-ink-tertiary mt-2 text-center">
          Stripe handles your card — we never see the details.
        </p>
      </div>
    </div>
  );
}
