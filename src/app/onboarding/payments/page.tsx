"use client";

import { useRouter } from "next/navigation";
import { CircleDollarSign, ShieldCheck } from "lucide-react";
import { useOnboarding } from "@/components/onboarding/wizard-context";
import {
  WizardShell,
  StepHeading,
  StepActions,
} from "@/components/onboarding/wizard-shell";
import { ChoiceCard } from "@/components/onboarding/choice-card";

export default function PaymentsStep() {
  const router = useRouter();
  const { data, set } = useOnboarding();

  return (
    <WizardShell step={5} totalSteps={6} businessName={data.businessName || undefined}>
      <StepHeading
        title="Accept deposits or payments?"
        description="Optional, and only for the moments that need it — a small hold for a booking, a paid consultation."
      />

      <div className="mt-10 space-y-3">
        <ChoiceCard
          title="Connect Stripe"
          description="The standard for UK businesses. We never see your card details — Stripe handles it all."
          icon={<CircleDollarSign size={20} strokeWidth={1.75} />}
          selected={data.payments === "stripe"}
          onSelect={() => set("payments", "stripe")}
          badge="Most setups"
        />
        <ChoiceCard
          title="Skip for now"
          description="Stick with phone or bank transfer. You can add payments later from settings."
          icon={<ShieldCheck size={20} strokeWidth={1.75} />}
          selected={data.payments === "skip"}
          onSelect={() => set("payments", "skip")}
        />
      </div>

      <div className="mt-6 p-4 bg-cream-100 rounded-md border border-cream-200">
        <p className="text-small text-ink-secondary leading-relaxed">
          GreekList Concierge never holds your customers' money. Payouts go straight to
          your Stripe account, usually the next working day.
        </p>
      </div>

      <div className="mt-10">
        <StepActions
          primaryLabel="Continue"
          primaryDisabled={!data.payments}
          onPrimary={() => router.push("/onboarding/branding")}
          showBack
          onBack={() => router.push("/onboarding/calendar")}
          secondaryLabel={null}
        />
      </div>
    </WizardShell>
  );
}
