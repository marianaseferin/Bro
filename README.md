# BroCook

> A daily companion that helps you transition to a more conscious, plant-based lifestyle.

## Prerequisites

- Node.js 22+
- npm 10+
- PostgreSQL database (Neon free tier recommended)
- Stripe account (test mode)
- Google OAuth app (Google Cloud Console)
- Resend account (for magic links and emails)

## Setup

### 1. Clone and install

```bash
git clone https://github.com/your-username/brocook
cd brocook
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Fill in all values in `.env.local`:

| Variable | Where to get it |
|---|---|
| `DATABASE_URL` | [neon.tech](https://neon.tech) → new project → connection string |
| `AUTH_SECRET` | Run `openssl rand -base64 32` |
| `AUTH_GOOGLE_ID` | Google Cloud Console → OAuth 2.0 Credentials |
| `AUTH_GOOGLE_SECRET` | Google Cloud Console → OAuth 2.0 Credentials |
| `AUTH_RESEND_KEY` | [resend.com](https://resend.com) → API Keys |
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API Keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard → Webhooks |
| `STRIPE_PRICE_ID_PRO` | Stripe Dashboard → Products → create a recurring price |
| `RESEND_API_KEY` | Same as AUTH_RESEND_KEY |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` for local dev |

### 3. Set up database

```bash
npm run db:push      # Push Prisma schema to database
npm run db:seed      # Add sample ingredients and recipes
```

### 4. Add mascot images

Place the Bro mascot PNG images in `public/images/`:
- `bro-default.png`, `bro-excited.png`, `bro-chef.png`
- `bro-meditation.png`, `bro-muscle.png`, `bro-sad.png`
- `bro-doctor.png`, `bro-tired.png`

### 5. Run development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 6. Set up Stripe webhook (local)

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`.

## Design System

All colors and tokens live in `design-system/tokens.ts`.

```bash
npm run tokens        # Regenerate globals.css from tokens
npm run tokens:check  # Verify tokens are in sync (runs in CI)
```

**Rule:** Never use hex values in components — always use Tailwind semantic classes.

## Deploy to Vercel

1. Push to GitHub
2. Import repo in [vercel.com](https://vercel.com)
3. Add all environment variables in Vercel dashboard
4. Set `NEXT_PUBLIC_APP_URL` to your `https://your-app.vercel.app` URL
5. Add Stripe webhook endpoint: `https://your-app.vercel.app/api/stripe/webhook`

## Storybook

```bash
npm run storybook
```

Visit [http://localhost:6006](http://localhost:6006) to view the design system and component docs.
