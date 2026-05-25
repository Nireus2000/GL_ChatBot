"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronDown, Pencil, X } from "lucide-react";
import { useOnboarding } from "@/components/onboarding/wizard-context";
import {
  WizardShell,
  StepHeading,
  StepActions,
} from "@/components/onboarding/wizard-shell";
import { cn } from "@/lib/cn";

interface FaqDraft {
  id: number;
  question: string;
  answer: string;
}

const SAMPLE_FAQS: FaqDraft[] = [
  {
    id: 1,
    question: "Do you accept new patients?",
    answer:
      "Yes — we're currently welcoming new NHS and private patients. Just call or use the booking form.",
  },
  {
    id: 2,
    question: "What are your opening hours?",
    answer:
      "We're open Monday to Friday, 9am to 5pm, and Saturday mornings by appointment.",
  },
  {
    id: 3,
    question: "How much is a private check-up?",
    answer:
      "Our private check-up is £65, including a full examination and personalised plan.",
  },
  {
    id: 4,
    question: "Do you speak Greek?",
    answer:
      "Ναι. Most of our reception and clinical team speak Greek fluently, alongside English.",
  },
  {
    id: 5,
    question: "Where is the practice located?",
    answer:
      "We're in central Manchester, a five-minute walk from Piccadilly station. There's parking on Tariff Street.",
  },
  {
    id: 6,
    question: "Do you offer payment plans?",
    answer:
      "Yes — for treatments over £500 we offer interest-free monthly plans, subject to a quick affordability check.",
  },
  {
    id: 7,
    question: "Are you able to see emergencies same-day?",
    answer:
      "We hold two emergency slots each day. Call us first thing and we'll do our best to fit you in.",
  },
  {
    id: 8,
    question: "What COVID precautions are in place?",
    answer:
      "Enhanced ventilation, single-use PPE for every appointment, and the option of masks on request.",
  },
  {
    id: 9,
    question: "Do you treat children?",
    answer:
      "Yes, from age 3. Our children's appointments are unhurried and include a tour of the chair.",
  },
  {
    id: 10,
    question: "Can I claim through my insurance?",
    answer:
      "We're recognised by Bupa, Denplan, AXA, and Cigna. Bring your policy number on the day.",
  },
];

type FaqState = "pending" | "approved" | "skipped";

export default function FaqsStep() {
  const router = useRouter();
  const { data, set } = useOnboarding();
  const [states, setStates] = React.useState<Record<number, FaqState>>(
    Object.fromEntries(SAMPLE_FAQS.map((f) => [f.id, "pending"])),
  );
  const [expandedId, setExpandedId] = React.useState<number | null>(SAMPLE_FAQS[0].id);

  const approved = Object.values(states).filter((s) => s === "approved").length;
  const reviewed = Object.values(states).filter((s) => s !== "pending").length;

  const setOne = (id: number, value: FaqState) =>
    setStates((prev) => ({ ...prev, [id]: value }));

  const approveAll = () =>
    setStates(Object.fromEntries(SAMPLE_FAQS.map((f) => [f.id, "approved"])));

  const goNext = () => {
    const ids = Object.entries(states)
      .filter(([, v]) => v === "approved")
      .map(([k]) => Number(k));
    set("approvedFaqs", ids);
    router.push("/onboarding/calendar");
  };

  return (
    <WizardShell step={3} totalSteps={6} businessName={data.businessName || undefined}>
      <StepHeading
        title="Here's what visitors will likely ask"
        description="We drafted these from your site. Keep the good ones, edit any that need a softer touch, skip the rest."
      />

      <div className="mt-10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-small text-ink-secondary tabular">
            <span className="text-navy-900 font-semibold">{approved}</span> approved ·{" "}
            <span className="text-navy-900 font-semibold">{reviewed}</span> of{" "}
            {SAMPLE_FAQS.length} reviewed
          </div>
          <button
            type="button"
            onClick={approveAll}
            className="text-small text-navy-700 hover:bg-navy-100 px-3 py-1.5 rounded-sm font-medium focus-ring"
          >
            Approve all
          </button>
        </div>

        <ul className="space-y-2">
          {SAMPLE_FAQS.map((faq) => {
            const state = states[faq.id];
            const expanded = expandedId === faq.id;
            return (
              <li
                key={faq.id}
                className={cn(
                  "border rounded-md bg-cream-100 transition-colors",
                  state === "approved" && "border-olive-600/40 bg-olive-100/40",
                  state === "skipped" && "border-cream-200 opacity-60",
                  state === "pending" && "border-cream-200",
                )}
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(expanded ? null : faq.id)}
                  className="w-full flex items-center gap-3 p-4 text-left focus-ring rounded-md"
                >
                  <span
                    className={cn(
                      "h-7 w-7 shrink-0 rounded-full flex items-center justify-center",
                      state === "approved"
                        ? "bg-olive-600 text-cream-50"
                        : state === "skipped"
                          ? "bg-cream-200 text-ink-tertiary"
                          : "bg-cream-50 border border-cream-200 text-ink-tertiary",
                    )}
                  >
                    {state === "approved" && <Check size={16} strokeWidth={2.25} />}
                    {state === "skipped" && <X size={16} strokeWidth={2.25} />}
                  </span>
                  <span className="flex-1 text-body text-navy-900 font-medium">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={cn(
                      "text-ink-tertiary transition-transform",
                      expanded && "rotate-180",
                    )}
                  />
                </button>
                {expanded && (
                  <div className="px-4 pb-4 pt-1">
                    <p className="text-body text-ink-secondary mb-3 leading-relaxed">
                      {faq.answer}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <ActionPill
                        onClick={() => setOne(faq.id, "approved")}
                        active={state === "approved"}
                        icon={<Check size={14} />}
                        label="Approve"
                      />
                      <ActionPill
                        onClick={() => {}}
                        icon={<Pencil size={14} />}
                        label="Edit"
                      />
                      <ActionPill
                        onClick={() => setOne(faq.id, "skipped")}
                        active={state === "skipped"}
                        icon={<X size={14} />}
                        label="Skip"
                      />
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <StepActions
          primaryLabel={approved > 0 ? `Save ${approved} and continue` : "Continue"}
          onPrimary={goNext}
          showBack
          onBack={() => router.push("/onboarding/website")}
          secondaryLabel="Skip for now"
          onSecondary={() => router.push("/onboarding/calendar")}
        />
      </div>
    </WizardShell>
  );
}

function ActionPill({
  onClick,
  active,
  icon,
  label,
}: {
  onClick: () => void;
  active?: boolean;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-small font-medium",
        "transition-colors focus-ring",
        active
          ? "bg-navy-700 text-cream-50"
          : "bg-cream-50 text-navy-700 border border-cream-200 hover:bg-navy-100",
      )}
    >
      {icon}
      {label}
    </button>
  );
}
