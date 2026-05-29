import Link from "next/link"
import { CheckCircle, Sparkles, Leaf, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BroImage } from "@/components/bro/BroImage"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Pricing — BroCook" }

const FREE_FEATURES = [
  "3 recipe suggestions per day",
  "Chat with Bro on homepage — no account needed",
  "Access to public recipe library",
]

const FREE_MISSING = [
  "Save recipes",
  "Habit tracking & streaks",
  "Personalized goals",
  "Unlimited suggestions",
]

const PRO_FEATURES = [
  "Unlimited recipe suggestions",
  "Save & organise your recipes",
  "Daily habit tracking & streaks",
  "Personalized nutrition goals",
  "Smart ingredient substitutions",
  "All Bro moods & reactions",
  "Priority support",
  "Cancel anytime",
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <BroImage src="/images/bro-default.png" alt="BroCook" className="h-8 w-8 object-contain" />
            <span className="text-lg font-bold text-primary">BroCook</span>
          </Link>
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <BroImage
            src="/images/bro-excited.png"
            alt="Bro excited"
            className="h-20 w-20 object-contain mx-auto drop-shadow"
          />
          <h1 className="text-4xl font-extrabold">Simple, honest pricing 🌿</h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Start free with no credit card. Upgrade when you’re ready to unlock everything.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Free */}
          <Card>
            <CardHeader className="pb-4 pt-6 px-6">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Free</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">$0</span>
                <span className="text-muted-foreground text-sm">forever</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Try Bro with no commitment. No account needed.
              </p>
            </CardHeader>
            <CardContent className="px-6 pb-6 space-y-5">
              <Button asChild variant="outline" className="w-full gap-2" size="lg">
                <Link href="/">
                  Start chatting <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <div className="space-y-2">
                {FREE_FEATURES.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
                {FREE_MISSING.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="h-4 w-4 shrink-0 mt-0.5 flex items-center justify-center">
                      <div className="h-0.5 w-3 rounded bg-muted-foreground/40" />
                    </div>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pro */}
          <Card className="border-primary shadow-lg relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Badge className="gap-1">
                <Sparkles className="h-3 w-3" />
                Most popular
              </Badge>
            </div>
            <CardHeader className="pb-4 pt-6 px-6">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Pro</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">$9</span>
                <span className="text-muted-foreground text-sm">/month</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Everything you need to transform your eating habits.
              </p>
            </CardHeader>
            <CardContent className="px-6 pb-6 space-y-5">
              <Button asChild className="w-full gap-2" size="lg">
                <Link href="/login">
                  <Sparkles className="h-4 w-4" />
                  Start 14-day free trial
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground text-center">No credit card required</p>
              <div className="space-y-2">
                {PRO_FEATURES.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Common questions 🤔</h2>
          <div className="space-y-5">
            {[
              {
                q: "Do I need an account to use BroCook?",
                a: "Nope! You can chat with Bro and get up to 3 recipe suggestions per day without any account. Sign up free to unlock unlimited suggestions and save your recipes.",
              },
              {
                q: "What’s included in the free trial?",
                a: "The 14-day trial gives you full Pro access — unlimited suggestions, habit tracking, goals, and all features. No credit card required to start.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Yes, absolutely. Cancel with one click from your account settings — no questions asked. You keep access until the end of your billing period.",
              },
              {
                q: "Is BroCook really plant-based only?",
                a: "Bro specialises in plant-based cooking, but many recipes can easily be adapted. He’ll always suggest the best plant-based version for you!",
              },
            ].map(({ q, a }) => (
              <div key={q} className="border border-border rounded-xl p-5 space-y-2">
                <h3 className="font-semibold text-sm">{q}</h3>
                <p className="text-sm text-muted-foreground">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center space-y-4">
          <p className="text-muted-foreground">Still unsure? Try for free, no credit card needed.</p>
          <Button asChild size="lg" className="gap-2">
            <Link href="/login">
              <Sparkles className="h-4 w-4" />
              Get started for free
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
