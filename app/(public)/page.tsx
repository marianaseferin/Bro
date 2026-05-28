import Link from "next/link"
import Image from "next/image"
import {
  ChefHat,
  Sparkles,
  Leaf,
  Target,
  ArrowRight,
  CheckCircle,
  Heart,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "BroCook — Eating better can be easier than you think",
}

const FEATURES = [
  {
    icon: ChefHat,
    title: "Ingredient-to-Meal Magic",
    description:
      "Tell Bro what's in your fridge. Get instant, practical recipe suggestions based on what you actually have.",
  },
  {
    icon: Sparkles,
    title: "Guided Decision Flow",
    description:
      "No more decision fatigue. Bro walks you step-by-step toward a meal you'll actually enjoy making.",
  },
  {
    icon: RefreshCw,
    title: "Smart Substitutions",
    description:
      "Missing an ingredient? Bro suggests the best swaps while keeping flavor and nutrition intact.",
  },
  {
    icon: Leaf,
    title: "Daily Habit Support",
    description:
      "Gentle reminders, streak tracking, and positive reinforcement — without judgment or moralizing.",
  },
  {
    icon: Target,
    title: "Personalized Preferences",
    description:
      "Set goals, track restrictions, and get recommendations that match your lifestyle and energy levels.",
  },
  {
    icon: Heart,
    title: "Emotional Intelligence",
    description:
      "Bro reads the room. Tired day? Quick 15-min meal. Feeling creative? Let's experiment.",
  },
]

const BRO_POSES = [
  { src: "/images/bro-excited.png", label: "Excited to cook" },
  { src: "/images/bro-chef.png", label: "Chef mode" },
  { src: "/images/bro-meditation.png", label: "Mindful eating" },
  { src: "/images/bro-muscle.png", label: "High protein" },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="relative h-8 w-8">
              <Image src="/images/bro-default.png" alt="BroCook" fill className="object-contain" />
            </div>
            <span className="text-lg font-bold text-primary">BroCook</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
              Pricing
            </Link>
            <Button asChild variant="outline" size="sm">
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/login">Start free trial</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-20 pb-16 text-center">
        <Badge variant="secondary" className="mb-5 gap-1.5">
          <Leaf className="h-3 w-3" />
          Plant-based made simple
        </Badge>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-5">
          Eating better can be{" "}
          <span className="text-primary">easier than you think.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          A daily companion that helps you transition to a more conscious, plant-based lifestyle.
          No guilt, no pressure — just Bro and you.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild size="xl" className="gap-2">
            <Link href="/login">
              <Sparkles className="h-5 w-5" />
              Start free — 14 days
            </Link>
          </Button>
          <Button asChild variant="ghost" size="lg" className="gap-2">
            <Link href="/pricing">
              See plans
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">No credit card required.</p>

        <div className="mt-16 flex justify-center gap-6">
          {BRO_POSES.map(({ src, label }) => (
            <div key={src} className="flex flex-col items-center gap-2">
              <div className="relative h-24 w-24 sm:h-32 sm:w-32">
                <Image src={src} alt={label} fill className="object-contain drop-shadow-lg" />
              </div>
              <span className="text-xs text-muted-foreground hidden sm:block">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-secondary/30 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Everything you need to eat better</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Built around your real life — not a perfect version of it.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Placeholder */}
      <section className="py-20 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">See Bro in action</h2>
          <p className="text-muted-foreground">Simple, calm, and friendly — just like eating should be.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["Cook with ingredients", "Track your habits", "Set your goals"].map((label, i) => (
            <div
              key={label}
              className="aspect-video rounded-2xl bg-secondary/50 border border-border flex items-center justify-center"
            >
              <div className="text-center space-y-2">
                <div className="relative h-16 w-16 mx-auto">
                  <Image
                    src={["/images/bro-chef.png", "/images/bro-meditation.png", "/images/bro-doctor.png"][i]}
                    alt={label}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="bg-primary/5 border-y border-primary/10 py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold mb-3">Start for free, upgrade when ready</h2>
          <p className="text-muted-foreground mb-8">
            14 days of full access, no card needed. Then $9/month — cancel anytime.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="gap-2">
              <Link href="/login">
                <Sparkles className="h-4 w-4" />
                Try free for 14 days
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/pricing">Compare plans</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="relative h-6 w-6">
              <Image src="/images/bro-default.png" alt="BroCook" fill className="object-contain" />
            </div>
            <span className="font-semibold text-sm text-primary">BroCook</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Made with plants and love.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
            <Link href="/login" className="hover:text-foreground transition-colors">Sign in</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
