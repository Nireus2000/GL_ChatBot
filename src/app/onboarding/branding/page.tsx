"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ImagePlus } from "lucide-react";
import { useOnboarding } from "@/components/onboarding/wizard-context";
import { Input, Field } from "@/components/ui/input";
import {
  WizardShell,
  StepHeading,
  StepActions,
} from "@/components/onboarding/wizard-shell";
import { cn } from "@/lib/cn";

const COLOR_SWATCHES = [
  { id: "navy", value: "#1B3A5C", label: "Hellenic Navy" },
  { id: "coral", value: "#E8927C", label: "Mediterranean Coral" },
  { id: "olive", value: "#6B7A4F", label: "Olive Grove" },
  { id: "amber", value: "#D4A24C", label: "Saffron" },
  { id: "deep", value: "#0E1B33", label: "Aegean Deep" },
];

export default function BrandingStep() {
  const router = useRouter();
  const { data, set } = useOnboarding();

  return (
    <WizardShell step={6} totalSteps={6} businessName={data.businessName || undefined}>
      <StepHeading
        title="Make it yours"
        description="A pinch of personality — a colour, a greeting, your logo if you have one to hand."
      />

      <div className="mt-10 space-y-8">
        <Field label="Brand colour">
          <div className="flex flex-wrap gap-3">
            {COLOR_SWATCHES.map((s) => {
              const active = data.brandColor === s.value;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => set("brandColor", s.value)}
                  aria-label={s.label}
                  aria-pressed={active}
                  className={cn(
                    "h-11 w-11 rounded-full focus-ring transition-all",
                    active
                      ? "ring-[3px] ring-offset-2 ring-navy-500 ring-offset-cream-50"
                      : "hover:scale-105",
                  )}
                  style={{ backgroundColor: s.value }}
                />
              );
            })}
          </div>
          <p className="text-small text-ink-tertiary mt-3">
            We default to GreekList navy. Listers usually leave it as-is.
          </p>
        </Field>

        <Field label="Logo" helper="Optional. PNG or SVG, square works best.">
          <label
            htmlFor="logo"
            className="cursor-pointer flex items-center gap-4 p-4 bg-cream-100 border border-dashed border-cream-200 rounded-md hover:bg-cream-50 transition-colors focus-ring"
          >
            <span className="h-12 w-12 rounded-full bg-cream-50 border border-cream-200 flex items-center justify-center text-navy-700">
              <ImagePlus size={20} strokeWidth={1.75} />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-body text-navy-900 font-medium">
                {data.logoFilename ?? "Upload your logo"}
              </span>
              <span className="block text-small text-ink-tertiary">
                Max 2 MB. We'll resize for the chat widget automatically.
              </span>
            </span>
            <input
              id="logo"
              type="file"
              accept="image/png,image/svg+xml,image/jpeg"
              className="sr-only"
              onChange={(e) =>
                set("logoFilename", e.target.files?.[0]?.name ?? null)
              }
            />
          </label>
        </Field>

        <Field
          label="Welcome message"
          htmlFor="welcome"
          helper="The first thing visitors will see. A mix of Greek and English works beautifully."
        >
          <textarea
            id="welcome"
            value={data.welcomeMessage}
            onChange={(e) => set("welcomeMessage", e.target.value)}
            rows={3}
            className="block w-full px-4 py-3 rounded-sm bg-cream-50 border border-cream-200 text-body text-ink-primary placeholder:text-ink-tertiary focus:outline-none focus:border-navy-500 focus:border-[1.5px] focus:shadow-focus resize-none"
          />
        </Field>

        <StepActions
          primaryLabel="Finish setup"
          onPrimary={() => router.push("/onboarding/done")}
          showBack
          onBack={() => router.push("/onboarding/payments")}
          secondaryLabel={null}
        />
      </div>
    </WizardShell>
  );
}
