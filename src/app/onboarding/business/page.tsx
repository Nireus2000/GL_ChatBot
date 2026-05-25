"use client";

import { useRouter } from "next/navigation";
import {
  Briefcase,
  Gavel,
  Hospital,
  MapPin,
  Scissors,
  Sparkles,
  Stethoscope,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { useOnboarding, type Vertical } from "@/components/onboarding/wizard-context";
import { Input, Field } from "@/components/ui/input";
import {
  WizardShell,
  StepHeading,
  StepActions,
} from "@/components/onboarding/wizard-shell";
import { cn } from "@/lib/cn";

const VERTICALS: { id: Vertical; label: string; icon: LucideIcon }[] = [
  { id: "dentist", label: "Dentist", icon: Stethoscope },
  { id: "lawyer", label: "Lawyer", icon: Gavel },
  { id: "restaurant", label: "Restaurant", icon: UtensilsCrossed },
  { id: "doctor", label: "Doctor", icon: Hospital },
  { id: "accountant", label: "Accountant", icon: Briefcase },
  { id: "salon", label: "Salon", icon: Scissors },
];

export default function BusinessStep() {
  const router = useRouter();
  const { data, set } = useOnboarding();

  const canContinue =
    data.businessName.trim().length > 1 && data.vertical !== null;

  return (
    <WizardShell step={1} totalSteps={6} businessName={data.businessName || undefined}>
      <StepHeading
        title="Let's get to know your business"
        description="Καλώς ορίσατε. Tell us a little about what you do so we can shape your assistant around it."
      />

      <form className="space-y-6 mt-10">
        <Field label="Business name" htmlFor="business-name">
          <Input
            id="business-name"
            value={data.businessName}
            onChange={(e) => set("businessName", e.target.value)}
            placeholder="e.g., Athenian Dental Care"
            autoFocus
          />
        </Field>

        <Field label="Business vertical">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {VERTICALS.map((v) => {
              const Icon = v.icon;
              const active = data.vertical === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => set("vertical", v.id)}
                  className={cn(
                    "group rounded-md p-4 flex flex-col items-center justify-center gap-3",
                    "transition-all duration-150 focus-ring",
                    "bg-cream-50 border",
                    active
                      ? "border-navy-700 border-[1.5px] shadow-sm"
                      : "border-cream-200 hover:border-navy-500/40 hover:bg-cream-100",
                  )}
                  aria-pressed={active}
                >
                  <span
                    className={cn(
                      "h-11 w-11 rounded-full flex items-center justify-center transition-colors",
                      active
                        ? "bg-coral-100 text-coral-500"
                        : "bg-cream-100 text-navy-700",
                    )}
                  >
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <span
                    className={cn(
                      "text-small",
                      active ? "text-navy-900 font-semibold" : "text-ink-secondary",
                    )}
                  >
                    {v.label}
                  </span>
                </button>
              );
            })}
          </div>
        </Field>

        <Field label="Address" htmlFor="address">
          <div className="relative">
            <MapPin
              size={18}
              strokeWidth={1.75}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-tertiary pointer-events-none"
            />
            <Input
              id="address"
              value={data.address}
              onChange={(e) => set("address", e.target.value)}
              placeholder="123 Mediterranean Way, London"
              className="pl-11"
            />
          </div>
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Opens at" htmlFor="hours-open">
            <Input
              id="hours-open"
              type="time"
              value={data.hoursOpen}
              onChange={(e) => set("hoursOpen", e.target.value)}
            />
          </Field>
          <Field label="Closes at" htmlFor="hours-close">
            <Input
              id="hours-close"
              type="time"
              value={data.hoursClose}
              onChange={(e) => set("hoursClose", e.target.value)}
            />
          </Field>
        </div>

        <div className="pt-2">
          <StepActions
            primaryLabel="Continue"
            primaryDisabled={!canContinue}
            onPrimary={() => router.push("/onboarding/website")}
            onSecondary={() => router.push("/onboarding/website")}
            secondaryLabel="Skip for now"
          />
        </div>
      </form>

      <ReassuranceFooter />
    </WizardShell>
  );
}

function ReassuranceFooter() {
  return (
    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-cream-100 border border-cream-200 rounded-lg p-5">
        <div className="h-9 w-9 rounded-full bg-olive-100 text-olive-600 flex items-center justify-center mb-3">
          <Sparkles size={18} strokeWidth={1.75} />
        </div>
        <h4 className="text-h3 font-sans text-navy-900 mb-1">
          Three-minute setup
        </h4>
        <p className="text-small text-ink-secondary">
          Most owners are live and answering visitors before their coffee gets cold.
        </p>
      </div>
      <div className="bg-cream-100 border border-cream-200 rounded-lg p-5">
        <div className="h-9 w-9 rounded-full bg-navy-100 text-navy-700 flex items-center justify-center mb-3">
          <Stethoscope size={18} strokeWidth={1.75} />
        </div>
        <h4 className="text-h3 font-sans text-navy-900 mb-1">
          Built for your trade
        </h4>
        <p className="text-small text-ink-secondary">
          We tune the assistant to your vertical, in English and Greek.
        </p>
      </div>
    </div>
  );
}
