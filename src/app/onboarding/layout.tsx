import { OnboardingProvider } from "@/components/onboarding/wizard-context";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return <OnboardingProvider>{children}</OnboardingProvider>;
}
