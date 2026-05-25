"use client";

import { useRouter } from "next/navigation";
import { Calendar, CalendarClock } from "lucide-react";
import { useOnboarding } from "@/components/onboarding/wizard-context";
import {
  WizardShell,
  StepHeading,
  StepActions,
} from "@/components/onboarding/wizard-shell";
import { ChoiceCard } from "@/components/onboarding/choice-card";

export default function CalendarStep() {
  const router = useRouter();
  const { data, set } = useOnboarding();

  return (
    <WizardShell step={4} totalSteps={6} businessName={data.businessName || undefined}>
      <StepHeading
        title="Where should appointments go?"
        description="Connect the calendar you already use. We'll only ever read free/busy times and write new bookings."
      />

      <div className="mt-10 space-y-3">
        <ChoiceCard
          title="Google Calendar"
          description="The most common choice. We sync availability across all your work calendars."
          icon={<Calendar size={20} strokeWidth={1.75} />}
          selected={data.calendarChoice === "google"}
          onSelect={() => set("calendarChoice", "google")}
          badge="Recommended"
        />
        <ChoiceCard
          title="Calendly"
          description="Already using Calendly? We'll route bookings through your existing event types."
          icon={<CalendarClock size={20} strokeWidth={1.75} />}
          selected={data.calendarChoice === "calendly"}
          onSelect={() => set("calendarChoice", "calendly")}
        />
        <ChoiceCard
          title="Skip for now"
          description="The assistant will collect details and email you to confirm by hand."
          icon={<span className="text-h3 leading-none">·</span>}
          selected={data.calendarChoice === "skip"}
          onSelect={() => set("calendarChoice", "skip")}
        />
      </div>

      <div className="mt-10">
        <StepActions
          primaryLabel="Continue"
          primaryDisabled={!data.calendarChoice}
          onPrimary={() => router.push("/onboarding/payments")}
          showBack
          onBack={() => router.push("/onboarding/faqs")}
          secondaryLabel={null}
        />
      </div>
    </WizardShell>
  );
}
