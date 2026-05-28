import Link from "next/link"
import Image from "next/image"
import { CheckCircle, Zap, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Pricing" }

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    badge: null,
    description: "Get started with the basics.",
    features: [
      "3 ingredient suggestions per day",
      "5 saved recipes",
      "1 active goal",
      "Access to recipe library",
    ],
    cta: "Get started",
    href: "/login",
    variant: "outline" as const,
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
    badge: "Most popular",
    description: "Everything you need for lasting change.",
    features: [
      "Unlimited ingredient suggestions",
      "Full habit tracking & streaks",
      "Unlimited saved recipes",
      "Unlimited goals",
      "Smart substitution engine",
      "Priority support",
      "14-day free trial included",
    ],
    cta: "Start free trial",
    href: "/login",
    variant: "default" as const,
  },
]

const FAQ = [
  {
    q: "Do I need a credit card for the trial?",
    a: "No. Your 14-day trial starts the moment you create an account — no payment info needed.",
  },
  {
    q: "What happens after my trial ends?",
    a: "Your account moves to the Free plan. You keep your data and goals, but daily suggestions and habit tracking become limited.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel from the billing page and you keep Pro access until the end of your billing period.",
  },
  {
    q: "Is BroCook only for vegans?",
    a: "Not at all! Bro meets you where you are. Whether you want to eat one less burger a week or go fully plant-based, it's your journey.",
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative h-8 w-8">
              <Image src="/images/bro-default.png" alt="BroCook" fill className="object-contain" />
            </div>
            <span className="text-lg font-bold text-primary">BroCook</span>
          </Link>
          <Button asChild variant="outline" size="sm">
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 space-y-16">
        <div className="text-center space-y-3">
          <Badge variant="secondary" className="gap-1.5">
            <Leaf className="h-3 w-3" />
            Simple pricing
          </Badge>
          <h1 className="text-4xl font-bold">No tricks, just plants</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Start free, upgrade when you're ready. Cancel anytime. Bro doesn't pressure you — that's the whole point.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {PLANS.map((plan) => (
            <Card
              key={plan.name}
              className={plan.badge ? "border-primary shadow-lg relative overflow-hidden" : ""}
            >
              {plan.badge && (
                <div className="absolute top-0 right-0">
                  <div className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-bl-xl">
                    {plan.badge}
                  </div>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="flex items-end gap-1 mt-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-sm text-muted-foreground mb-1">/{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <ul className="space-y-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild variant={plan.variant} className="w-full gap-2" size="lg">
                  <Link href={plan.href}>
                    {plan.badge && <Zap className="h-4 w-4" />}
                    {plan.cta}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-2xl mx-auto space-y-5">
          <h2 className="text-2xl font-bold text-center">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="rounded-xl border bg-card p-5 space-y-1.5">
                <h3 className="font-semibold text-sm">{q}</h3>
                <p className="text-sm text-muted-foreground">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
