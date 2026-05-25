"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/badge";

interface WizardShellProps {
  step: number;
  totalSteps: number;
  businessName?: string;
  children: React.ReactNode;
}

export function WizardShell({
  step,
  totalSteps,
  businessName,
  children,
}: WizardShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-cream-50">
      <header className="h-16 px-6 md:px-8 flex items-center justify-between border-b border-cream-200">
        <div className="flex items-center gap-2">
          <span className="font-display text-h3 text-navy-900 tracking-tight">
            GreekList
          </span>
          <span className="font-sans text-h3 text-ink-secondary font-normal">
            Concierge
          </span>
        </div>
        <div className="flex items-center gap-3">
          {businessName && (
            <span className="text-small text-ink-secondary hidden sm:inline">
              {businessName}
            </span>
          )}
          <Badge variant="pro">Pro</Badge>
        </div>
      </header>

      <main className="flex-1 px-5 py-12 md:py-16">
        <div className="mx-auto w-full max-w-[560px]">
          <ProgressDots current={step} total={totalSteps} />
          <div className="mt-10">{children}</div>
        </div>
      </main>

      <footer className="border-t border-cream-200 py-6 text-center">
        <p className="text-small text-ink-tertiary">
          A warm corner of the GreekList community.
        </p>
      </footer>
    </div>
  );
}

function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <ol className="flex items-center justify-center gap-3" aria-label="Onboarding progress">
      {Array.from({ length: total }).map((_, i) => {
        const filled = i + 1 <= current;
        return (
          <li
            key={i}
            aria-current={i + 1 === current ? "step" : undefined}
            className={cn(
              "h-2.5 w-2.5 rounded-full transition-colors",
              filled ? "bg-navy-700" : "bg-cream-200",
            )}
          />
        );
      })}
    </ol>
  );
}

export function StepHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <header className="text-center space-y-3">
      {eyebrow && (
        <p className="text-micro uppercase text-ink-tertiary">{eyebrow}</p>
      )}
      <h1 className="font-display text-h1 md:text-display text-navy-900 leading-tight">
        {title}
      </h1>
      {description && (
        <p className="text-body-lg text-ink-secondary max-w-md mx-auto">
          {description}
        </p>
      )}
    </header>
  );
}

export function StepActions({
  primaryLabel,
  onPrimary,
  primaryDisabled,
  secondaryLabel = "Skip for now",
  onSecondary,
  showBack,
  onBack,
}: {
  primaryLabel: string;
  onPrimary: () => void;
  primaryDisabled?: boolean;
  secondaryLabel?: string | null;
  onSecondary?: () => void;
  showBack?: boolean;
  onBack?: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3 pt-2">
      <div className="w-full flex items-center gap-3">
        {showBack && (
          <button
            type="button"
            onClick={onBack}
            className="h-12 px-5 rounded-md text-navy-700 hover:bg-navy-100 text-body font-medium focus-ring"
          >
            Back
          </button>
        )}
        <button
          type="button"
          onClick={onPrimary}
          disabled={primaryDisabled}
          className={cn(
            "flex-1 h-12 rounded-md bg-navy-700 text-cream-50 font-medium text-body-lg",
            "transition-colors hover:bg-navy-500 active:bg-navy-900",
            "disabled:opacity-50 disabled:pointer-events-none focus-ring",
          )}
        >
          {primaryLabel}
        </button>
      </div>
      {secondaryLabel && onSecondary && (
        <button
          type="button"
          onClick={onSecondary}
          className="text-small text-ink-tertiary hover:text-navy-700 transition-colors focus-ring rounded-sm px-2 py-1"
        >
          {secondaryLabel}
        </button>
      )}
    </div>
  );
}
