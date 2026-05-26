import { Clock, MapPin, Phone, Star } from "lucide-react";
import { Widget } from "@/components/widget/widget";

const SERVICES = [
  { name: "Private check-up", desc: "Full exam + personalised plan", price: "£65" },
  { name: "Clean & polish", desc: "Scale, polish, and gum check", price: "£75" },
  { name: "Composite filling", desc: "White, tooth-matched", price: "from £120" },
  { name: "Emergency appointment", desc: "Same-day pain relief", price: "£90" },
  { name: "Children's check-up", desc: "Unhurried, age 3+", price: "£40" },
  { name: "Invisalign consult", desc: "30-min plan & quote", price: "free" },
];

export default function AthenianDentalDemo() {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* GreekList-flavoured site chrome */}
      <header className="border-b border-cream-200 bg-cream-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-display text-h3 text-navy-900">GreekList</span>
            <span className="text-micro uppercase text-ink-tertiary border-l border-cream-200 pl-2 ml-1">
              UK
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-small text-ink-secondary">
            <span>Find</span>
            <span>Community</span>
            <span>Add your business</span>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Hero */}
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-8 mb-12">
          {/* Photo placeholder — warm gradient evoking Mediterranean light */}
          <div className="aspect-[5/3] rounded-xl overflow-hidden relative bg-cream-100 border border-cream-200">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 30%, #F0AB97 0%, transparent 55%), radial-gradient(ellipse at 70% 70%, #1B3A5C 0%, transparent 60%), linear-gradient(135deg, #F4EFE6 0%, #E8DFCE 100%)",
              }}
            />
            <div className="absolute inset-0 flex items-end p-6">
              <div className="text-cream-50">
                <span className="text-micro uppercase bg-navy-900/40 backdrop-blur px-2 py-1 rounded-full">
                  Featured · Manchester
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-micro uppercase text-ink-tertiary mb-2">
              Dentist
            </span>
            <h1 className="font-display text-h1 text-navy-900 leading-tight mb-2">
              Athenian Dental Care
            </h1>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1 text-small">
                <Star
                  size={16}
                  strokeWidth={1.75}
                  className="text-coral-500 fill-coral-500"
                />
                <span className="text-navy-900 font-semibold tabular">4.9</span>
                <span className="text-ink-tertiary">· 142 reviews</span>
              </span>
            </div>
            <p className="text-body-lg text-ink-secondary leading-relaxed mb-5">
              Family dentistry in central Manchester, run by{" "}
              <span className="text-navy-900 font-medium">Dr. Eleni Papadakis</span>
              . Greek and English spoken. NHS and private patients welcome.
            </p>

            <ul className="space-y-2 mb-6">
              <Detail icon={<MapPin size={16} strokeWidth={1.75} />}>
                12 Aegean Street, Manchester M1 2AB
              </Detail>
              <Detail icon={<Clock size={16} strokeWidth={1.75} />}>
                Mon–Fri 9:00–17:30 · Sat by appointment
              </Detail>
              <Detail icon={<Phone size={16} strokeWidth={1.75} />}>
                0161 123 4567
              </Detail>
            </ul>

            <div className="flex gap-2">
              <button className="h-11 px-5 rounded-md bg-navy-700 text-cream-50 text-body font-medium hover:bg-navy-500 focus-ring transition-colors">
                Book a visit
              </button>
              <button className="h-11 px-5 rounded-md border border-cream-200 text-navy-700 text-body font-medium hover:bg-navy-100 focus-ring transition-colors">
                Call
              </button>
            </div>
          </div>
        </div>

        {/* Services */}
        <section className="mb-12">
          <h2 className="font-display text-h2 text-navy-900 mb-5">Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SERVICES.map((s) => (
              <div
                key={s.name}
                className="bg-cream-100 border border-cream-200 rounded-md p-4"
              >
                <div className="flex items-baseline justify-between gap-3 mb-1">
                  <h3 className="text-body-lg font-semibold text-navy-900">
                    {s.name}
                  </h3>
                  <span className="text-small text-coral-500 font-semibold tabular shrink-0">
                    {s.price}
                  </span>
                </div>
                <p className="text-small text-ink-secondary">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews snippet */}
        <section className="mb-16">
          <h2 className="font-display text-h2 text-navy-900 mb-5">
            What patients say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Review
              name="Maria T."
              quote="Δρ Παπαδάκης took the time to explain everything in Greek. My mum felt completely at ease — that's rare."
            />
            <Review
              name="James K."
              quote="Booked an emergency appointment on a Tuesday morning, was seen by 11. Calm, kind, and the filling has held up six months later."
            />
          </div>
        </section>

        {/* Chat nudge */}
        <div className="bg-coral-100 rounded-lg p-5 text-center max-w-xl mx-auto mb-10">
          <p className="font-display text-h3 text-navy-900 mb-1">
            Quick question?
          </p>
          <p className="text-small text-ink-secondary">
            Tap the chat button in the corner — Eleni's assistant can book you in,
            quote prices, or answer about insurance.
          </p>
        </div>
      </main>

      <footer className="border-t border-cream-200 py-6 text-center text-small text-ink-tertiary">
        Part of the GreekList community · greeklist.co.uk
      </footer>

      <Widget
        listerName="Athenian Dental"
        listerInitial="A"
        greeting="Καλωσήρθες! I'm Eleni's assistant. Ask me anything — bookings, prices, or how to find us."
        suggestions={[
          "Book an appointment",
          "What are your prices?",
          "Do you speak Greek?",
          "Where are you?",
        ]}
      />
    </div>
  );
}

function Detail({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2.5 text-body text-ink-secondary">
      <span className="text-navy-700">{icon}</span>
      {children}
    </li>
  );
}

function Review({ name, quote }: { name: string; quote: string }) {
  return (
    <blockquote className="bg-cream-100 border border-cream-200 rounded-lg p-5">
      <p className="text-body text-ink-primary italic leading-relaxed mb-3">
        “{quote}”
      </p>
      <footer className="text-small text-ink-tertiary">— {name}</footer>
    </blockquote>
  );
}
