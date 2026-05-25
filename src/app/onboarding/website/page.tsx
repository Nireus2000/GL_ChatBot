"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Check, Globe, Loader2 } from "lucide-react";
import { useOnboarding } from "@/components/onboarding/wizard-context";
import { Input, Field } from "@/components/ui/input";
import {
  WizardShell,
  StepHeading,
  StepActions,
} from "@/components/onboarding/wizard-shell";
import { cn } from "@/lib/cn";

const SCRAPE_STEPS = [
  { id: "fetch", label: "Fetching your site" },
  { id: "read", label: "Reading the pages" },
  { id: "understand", label: "Understanding what you offer" },
  { id: "faqs", label: "Drafting visitor FAQs" },
] as const;

export default function WebsiteStep() {
  const router = useRouter();
  const { data, set } = useOnboarding();
  const [progress, setProgress] = React.useState<number>(-1);

  React.useEffect(() => {
    if (progress < 0) return;
    if (progress >= SCRAPE_STEPS.length) {
      const t = setTimeout(() => router.push("/onboarding/faqs"), 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setProgress((n) => n + 1), 1100);
    return () => clearTimeout(t);
  }, [progress, router]);

  const isScraping = progress >= 0;
  const canStart =
    data.websiteUrl.trim().length > 4 && /\./.test(data.websiteUrl);

  return (
    <WizardShell step={2} totalSteps={6} businessName={data.businessName || undefined}>
      <StepHeading
        title="Where can we learn about you?"
        description="Paste your website and we'll read it like a careful new employee — taking notes, asking no follow-up questions."
      />

      <div className="mt-10 space-y-6">
        <Field
          label="Website URL"
          htmlFor="website"
          helper="No site yet? Skip this step — you can paste content later."
        >
          <div className="relative">
            <Globe
              size={18}
              strokeWidth={1.75}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-tertiary pointer-events-none"
            />
            <Input
              id="website"
              value={data.websiteUrl}
              onChange={(e) => set("websiteUrl", e.target.value)}
              placeholder="athenian-dental.co.uk"
              className="pl-11"
              disabled={isScraping}
              autoFocus
            />
          </div>
        </Field>

        {isScraping && (
          <ol className="bg-cream-100 border border-cream-200 rounded-lg p-5 space-y-3">
            {SCRAPE_STEPS.map((step, i) => {
              const state =
                i < progress ? "done" : i === progress ? "active" : "pending";
              return (
                <li key={step.id} className="flex items-center gap-3">
                  <span
                    className={cn(
                      "h-7 w-7 rounded-full flex items-center justify-center transition-colors",
                      state === "done" && "bg-olive-100 text-olive-600",
                      state === "active" && "bg-navy-100 text-navy-700",
                      state === "pending" && "bg-cream-50 text-ink-tertiary",
                    )}
                  >
                    {state === "done" ? (
                      <Check size={16} strokeWidth={2} />
                    ) : state === "active" ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <span className="text-micro">{i + 1}</span>
                    )}
                  </span>
                  <span
                    className={cn(
                      "text-body",
                      state === "done" && "text-ink-secondary",
                      state === "active" && "text-navy-900 font-medium",
                      state === "pending" && "text-ink-tertiary",
                    )}
                  >
                    {step.label}
                  </span>
                </li>
              );
            })}
          </ol>
        )}

        <StepActions
          primaryLabel={isScraping ? "Working…" : "Start reading"}
          primaryDisabled={isScraping || !canStart}
          onPrimary={() => setProgress(0)}
          showBack
          onBack={() => router.push("/onboarding/business")}
          secondaryLabel={isScraping ? null : "Skip this step"}
          onSecondary={() => router.push("/onboarding/faqs")}
        />
      </div>
    </WizardShell>
  );
}
