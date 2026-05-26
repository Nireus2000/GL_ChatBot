"use client";

import * as React from "react";
import { Calendar, Check, Clock, User } from "lucide-react";
import { cn } from "@/lib/cn";

interface BookingCardProps {
  service: string;
  time: string;
  practitioner?: string;
}

export function BookingCard({ service, time, practitioner }: BookingCardProps) {
  const [state, setState] = React.useState<"idle" | "confirmed">("idle");

  return (
    <div className="flex items-end gap-2">
      <div className="h-7 w-7 shrink-0" />
      <div
        className={cn(
          "max-w-[85%] w-full rounded-xl rounded-bl-sm",
          "bg-cream-50 border border-cream-200 overflow-hidden",
          "transition-colors",
          state === "confirmed" && "border-olive-600/40",
        )}
      >
        <div className="p-4">
          <p className="text-micro uppercase text-ink-tertiary mb-2">
            {state === "confirmed" ? "Booking confirmed" : "Available slot"}
          </p>
          <h4 className="font-sans text-body-lg font-semibold text-navy-900 leading-tight">
            {service}
          </h4>
          <div className="mt-3 space-y-1.5 text-small text-ink-secondary">
            <div className="flex items-center gap-2">
              <Calendar size={14} strokeWidth={1.75} className="text-navy-700" />
              {time}
            </div>
            {practitioner && (
              <div className="flex items-center gap-2">
                <User size={14} strokeWidth={1.75} className="text-navy-700" />
                {practitioner}
              </div>
            )}
          </div>
        </div>
        <div className="px-4 pb-4 flex gap-2">
          {state === "idle" ? (
            <>
              <button
                type="button"
                onClick={() => setState("confirmed")}
                className="flex-1 h-9 rounded-sm bg-navy-700 text-cream-50 text-small font-medium hover:bg-navy-500 focus-ring transition-colors"
              >
                Confirm
              </button>
              <button
                type="button"
                className="h-9 px-4 rounded-sm border border-cream-200 text-navy-700 text-small font-medium hover:bg-navy-100 focus-ring transition-colors"
              >
                Reschedule
              </button>
            </>
          ) : (
            <div className="flex-1 h-9 rounded-sm bg-olive-100 text-olive-600 text-small font-medium flex items-center justify-center gap-1.5">
              <Check size={14} strokeWidth={2.25} />
              You're booked in
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
