"use client";

import * as React from "react";
import { Check, Copy, MessageCircle, Sparkles } from "lucide-react";
import { useOnboarding } from "@/components/onboarding/wizard-context";
import {
  WizardShell,
  StepHeading,
} from "@/components/onboarding/wizard-shell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export default function DoneStep() {
  const { data } = useOnboarding();
  const [copied, setCopied] = React.useState(false);
  const slug = (data.businessName || "your-business")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const snippet = `<script async src="https://concierge.greeklist.co.uk/embed.js" data-lister="${slug}"></script>`;

  const copy = async () => {
    await navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <WizardShell step={6} totalSteps={6} businessName={data.businessName || undefined}>
      <div className="text-center mb-6">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-coral-100 text-coral-500 mb-6 animate-pulse-soft">
          <Sparkles size={28} strokeWidth={1.75} />
        </span>
        <StepHeading
          title={
            <>
              You're live.
              <br />
              <span className="text-coral-500">Καλή αρχή.</span>
            </>
          }
          description="Your assistant is awake and ready. Drop this snippet into your site and you'll be answering visitors in minutes."
        />
      </div>

      <div className="mt-10 space-y-4">
        <div className="bg-navy-900 rounded-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-micro uppercase text-navy-100/70">
              Embed snippet
            </span>
            <button
              type="button"
              onClick={copy}
              className={cn(
                "inline-flex items-center gap-1.5 h-8 px-3 rounded-sm text-small font-medium",
                "transition-colors focus-ring",
                copied
                  ? "bg-olive-600 text-cream-50"
                  : "bg-cream-50 text-navy-900 hover:bg-cream-100",
              )}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="text-small text-cream-50/90 font-mono overflow-x-auto leading-relaxed">
            <code>{snippet}</code>
          </pre>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button asChild variant="coral" className="h-12">
            <a href="/dashboard">
              <MessageCircle size={18} strokeWidth={1.75} />
              Test your bot
            </a>
          </Button>
          <Button asChild variant="secondary" className="h-12">
            <a href="/dashboard">Go to dashboard</a>
          </Button>
        </div>

        <ul className="bg-cream-100 border border-cream-200 rounded-lg p-5 space-y-3">
          <ChecklistRow label="Business details saved" />
          {data.websiteUrl && <ChecklistRow label="Website read and understood" />}
          <ChecklistRow
            label={`${data.approvedFaqs.length} FAQs approved`}
            faded={data.approvedFaqs.length === 0}
          />
          <ChecklistRow
            label={
              data.calendarChoice === "skip"
                ? "Calendar — skipped"
                : `Calendar — ${data.calendarChoice ?? "not chosen"}`
            }
            faded={data.calendarChoice === "skip"}
          />
          <ChecklistRow
            label={
              data.payments === "skip"
                ? "Payments — skipped"
                : `Payments — ${data.payments ?? "not chosen"}`
            }
            faded={data.payments === "skip"}
          />
          <ChecklistRow label="Brand and welcome message set" />
        </ul>
      </div>
    </WizardShell>
  );
}

function ChecklistRow({ label, faded }: { label: string; faded?: boolean }) {
  return (
    <li className="flex items-center gap-3">
      <span
        className={cn(
          "h-6 w-6 rounded-full flex items-center justify-center shrink-0",
          faded ? "bg-cream-200 text-ink-tertiary" : "bg-olive-100 text-olive-600",
        )}
      >
        <Check size={14} strokeWidth={2.25} />
      </span>
      <span className={cn("text-body", faded ? "text-ink-tertiary" : "text-navy-900")}>
        {label}
      </span>
    </li>
  );
}
