"use client";

import * as React from "react";

export type Vertical =
  | "dentist"
  | "lawyer"
  | "restaurant"
  | "doctor"
  | "accountant"
  | "salon"
  | "other";

export interface OnboardingData {
  businessName: string;
  vertical: Vertical | null;
  address: string;
  hoursOpen: string;
  hoursClose: string;
  websiteUrl: string;
  approvedFaqs: number[];
  calendarChoice: "google" | "calendly" | "skip" | null;
  payments: "stripe" | "skip" | null;
  brandColor: string;
  welcomeMessage: string;
  logoFilename: string | null;
}

const DEFAULTS: OnboardingData = {
  businessName: "",
  vertical: null,
  address: "",
  hoursOpen: "",
  hoursClose: "",
  websiteUrl: "",
  approvedFaqs: [],
  calendarChoice: null,
  payments: null,
  brandColor: "#1B3A5C",
  welcomeMessage:
    "Καλωσήρθες! Ask me anything about our services, prices, or how to book.",
  logoFilename: null,
};

interface Ctx {
  data: OnboardingData;
  set: <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => void;
  reset: () => void;
}

const OnboardingCtx = React.createContext<Ctx | null>(null);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = React.useState<OnboardingData>(DEFAULTS);

  const value = React.useMemo<Ctx>(
    () => ({
      data,
      set: (key, value) => setData((prev) => ({ ...prev, [key]: value })),
      reset: () => setData(DEFAULTS),
    }),
    [data],
  );

  return <OnboardingCtx.Provider value={value}>{children}</OnboardingCtx.Provider>;
}

export function useOnboarding() {
  const ctx = React.useContext(OnboardingCtx);
  if (!ctx) throw new Error("useOnboarding must be used inside OnboardingProvider");
  return ctx;
}
