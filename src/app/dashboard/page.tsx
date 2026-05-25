import Link from "next/link";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DashboardPlaceholder() {
  return (
    <main className="min-h-screen px-6 py-16">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Badge variant="live" withDot>
            Live
          </Badge>
          <span className="text-small text-ink-secondary">Dashboard coming next</span>
        </div>
        <h1 className="font-display text-h1 text-navy-900">
          Καλωσήρθες back.
        </h1>
        <p className="text-body-lg text-ink-secondary">
          The lister dashboard (overview, conversations, knowledge, analytics) is on
          the way. For now, take the onboarding wizard for a spin.
        </p>
        <Card>
          <CardTitle>Next up</CardTitle>
          <CardDescription>
            Conversations, Knowledge, Unanswered, Services, Calendar, Payments,
            Branding, Persona, Analytics, Embed, Billing.
          </CardDescription>
        </Card>
        <Button asChild variant="primary">
          <Link href="/onboarding">Re-run onboarding</Link>
        </Button>
      </div>
    </main>
  );
}
