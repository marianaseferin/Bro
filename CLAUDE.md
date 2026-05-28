# BroCook — AI Agent Context

## Project Summary
BroCook is a Next.js 15 SaaS app helping users transition to plant-based eating. The "Bro" mascot (broccoli character) serves as a friendly AI companion.

## Stack
- **Framework**: Next.js 15 (App Router), React 19, TypeScript strict
- **Styling**: Tailwind CSS v4, design tokens at `design-system/tokens.ts`
- **Database**: PostgreSQL via Neon, Prisma v6 ORM
- **Auth**: Auth.js v5 (Google + Resend magic link)
- **Payments**: Stripe (subscriptions, customer portal)
- **UI**: shadcn/ui components in `components/ui/`
- **State**: TanStack Query v5 for client data fetching
- **Emails**: Resend

## Design System Rule
**Never use hex values in components.** Always use semantic Tailwind classes (`bg-primary`, `text-foreground`). 
- To update theme: edit `design-system/tokens.ts` then run `npm run tokens`
- To verify sync: `npm run tokens:check`

## Route Architecture
- `app/(public)/` — landing page, pricing (no auth)
- `app/(auth)/` — all routes requiring auth (dashboard, settings, login)
  - Layout passes through without sidebar when user is not authenticated
  - Middleware at `middleware.ts` protects `/dashboard` and `/settings`
- `app/api/` — API routes

## Subscription Logic (`lib/subscription.ts`)
- `hasAccess(user)` — true if TRIAL (active) or PRO
- `isTrialActive(user)` — plan=TRIAL and trialEndsAt > now
- `isSubscribed(user)` — plan=PRO and stripeCurrentPeriodEnd > now
- `PLAN_LIMITS` — per-plan feature limits

## Key Decisions
- Middleware does NOT import Auth.js (exceeds Vercel 1MB edge limit) — checks cookie directly
- Stripe lazy init via Proxy to avoid build crash when env vars missing
- Trial = 14 days, auto-assigned on first login via Auth.js `createUser` event
- Upgrade during trial is immediate (no trial_period_days in checkout session)

## Mascot Images
Place Bro mascot PNG images in `public/images/`:
- `bro-default.png` — standing, hands on hips
- `bro-excited.png` — jumping with excitement
- `bro-chef.png` — chef hat with whisk
- `bro-meditation.png` — sitting cross-legged
- `bro-muscle.png` — flexing
- `bro-sad.png` — sad/guilty expression
- `bro-doctor.png` — doctor pose with clipboard
- `bro-tired.png` — tired with coffee

## Commands
```bash
npm run dev          # Start dev server
npm run db:push      # Push schema to database
npm run db:seed      # Seed with sample ingredients and recipes
npm run tokens       # Regenerate CSS from design tokens
npm run tokens:check # Verify tokens are in sync (for CI)
npm run storybook    # Start Storybook
```
