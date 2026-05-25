import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-xl text-center space-y-6">
        <p className="text-micro uppercase text-ink-tertiary">
          GreekList · Concierge
        </p>
        <h1 className="font-display text-display text-navy-900 leading-tight">
          Φιλοξενία, <span className="text-coral-500">digitised.</span>
        </h1>
        <p className="text-body-lg text-ink-secondary max-w-md mx-auto">
          A calm, warm AI concierge for your business. Set it up in three minutes —
          your visitors will think it&apos;s you on the other end.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Button asChild variant="primary" size="lg">
            <Link href="/onboarding">
              Start setup
              <ArrowRight size={18} strokeWidth={1.75} />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <Link href="/dashboard">View dashboard</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
