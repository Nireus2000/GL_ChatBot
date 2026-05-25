# GreekList Concierge

Multi-tenant AI chatbot for Greek-owned UK businesses — a calm, warm
extension of GreekList. This repo currently contains the design system and
the lister onboarding wizard; the rest of the surfaces (dashboard, chat
widget, admin) are next.

## Run it locally

```bash
git fetch origin claude/cool-hopper-GW1j4
git checkout claude/cool-hopper-GW1j4
pnpm install
pnpm dev
```

Then open <http://localhost:3000>.

Node 20+ and pnpm 9+ are recommended (the repo was built with Node 22
and pnpm 10).

## What's in here

| Route | What it is |
|---|---|
| `/` | Landing — `Φιλοξενία, digitised.` hero |
| `/onboarding/business` | Step 1 — business name, vertical, address, hours |
| `/onboarding/website` | Step 2 — paste a URL, watch the scrape animate |
| `/onboarding/faqs` | Step 3 — approve / edit / skip the proposed FAQs |
| `/onboarding/calendar` | Step 4 — Google Calendar, Calendly, or skip |
| `/onboarding/payments` | Step 5 — Stripe Connect, or skip |
| `/onboarding/branding` | Step 6 — colour, logo, welcome message |
| `/onboarding/done` | The celebratory finale + embed snippet |
| `/dashboard` | Placeholder — the real overview is next |

## Other commands

```bash
pnpm typecheck         # tsc --noEmit
pnpm build             # production build
pnpm start             # serve the production build
node scripts/verify-onboarding.mjs  # Playwright walkthrough (needs chromium)
```

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript
- Tailwind 3 with tokens from `DESIGN.md` (navy / cream / coral / olive)
- Fraunces + Inter via `next/font/google`, Greek glyphs via a Google Fonts
  `<link>` fallback (next/font's Fraunces doesn't ship a Greek subset)
- `tailwind-merge` extended to know our custom `text-*` font-size names
  so they don't clash with `text-{color}` utilities

## Design tokens

All tokens live in two places that stay in lockstep:

- `tailwind.config.ts` — utility classes (`bg-cream-50`, `text-h1`, etc.)
- `src/app/globals.css` — CSS variables (`--gl-navy-700`) for runtime use

If you change a value, change it in both.
