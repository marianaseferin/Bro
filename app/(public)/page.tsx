import Link from "next/link"
import {
  Sparkles,
  Leaf,
  ChefHat,
  Target,
  Heart,
  RefreshCw,
  ArrowRight,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HeroChat } from "@/components/chat/HeroChat"
import { BroImage } from "@/components/bro/BroImage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "BroCook — Your Plant-Based Cooking Companion",
}

const FEATURES = [
  {
    icon: ChefHat,
    mood: "chef",
    title: "Ingredient-to-Meal Magic",
    description:
      "Tell Bro what’s in your fridge. Get instant recipes based on what you actually have — no waste, no stress.",
  },
  {
    icon: RefreshCw,
    mood: "excited",
    title: "Smart Substitutions",
    description:
      "Missing something? Bro suggests the best plant-based swaps without losing a gram of flavour.",
  },
  {
    icon: Leaf,
    mood: "meditation",
    title: "Daily Habit Support",
    description:
      "Gentle streaks, positive vibes, no guilt. Bro cheers you on without the lecture.",
  },
  {
    icon: Target,
    mood: "muscle",
    title: "Personalized Goals",
    description:
      "Track macros, set plant-based milestones. Bro adapts every suggestion to your pace and goals.",
  },
  {
    icon: Heart,
    mood: "doctor",
    title: "Emotional Intelligence",
    description:
      "Tired? 15-min meal incoming. Creative? Time to experiment. Bro always reads the room.",
  },
  {
    icon: Sparkles,
    mood: "excited",
    title: "Unlimited Recipes",
    description:
      "A growing library of plant-based recipes from every corner of the world. Always something new.",
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <BroImage src="/images/bro-default.png" alt="BroCook" className="h-8 w-8 object-contain" />
            <span className="text-lg font-bold text-primary">BroCook</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/pricing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
            >
              Pricing
            </Link>
            <Button asChild variant="ghost" size="sm">
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild size="sm" className="gap-1.5">
              <Link href="/login">
                <Sparkles className="h-3.5 w-3.5" />
                Try free
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-16 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="space-y-6">
            <Badge variant="secondary" className="gap-1.5 text-sm">
              <Leaf className="h-3.5 w-3.5" />
              Plant-based made fun &amp; easy
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-foreground">
              Meet <span className="text-primary">Bro.</span>
              <br />
              Your personal
              <br />
              <span className="text-accent">cooking buddy. 🥦</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
              Chat with Bro like a friend — tell him what you have, what you feel like, and get
              a delicious plant-based recipe instantly. No login needed to start.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="gap-2">
                <Link href="/login">
                  <Sparkles className="h-4 w-4" />
                  Start free — no card needed
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link href="/pricing">
                  See plans <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {["3 free daily suggestions", "No credit card", "Cancel anytime"].map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CheckCircle className="h-3.5 w-3.5 text-primary" />
                  {item}
                </div>
              ))}
            </div>
            <div className="flex gap-4 pt-2">
              {["bro-excited", "bro-chef", "bro-meditation", "bro-muscle"].map((mood) => (
                <div
                  key={mood}
                  className="h-16 w-16 transition-transform hover:scale-110 duration-200 cursor-default"
                >
                  <BroImage
                    src={`/images/${mood}.png`}
                    alt={mood.replace("bro-", "")}
                    className="h-full w-full object-contain drop-shadow-md"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: chat */}
          <div className="w-full">
            <HeroChat />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-secondary/30 py-20 border-y border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">How Bro works 🌱</h2>
            <p className="text-muted-foreground">Three steps to your next great meal</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Chat with Bro",
                desc: "Tell him what’s in your fridge or what you’re craving. No account needed.",
                icon: "💬",
              },
              {
                step: "2",
                title: "Get your recipe",
                desc: "Bro instantly suggests the perfect plant-based meal.",
                icon: "🍽️",
              },
              {
                step: "3",
                title: "Save & track",
                desc: "Sign up free to save favourites, track habits, and unlock unlimited suggestions.",
                icon: "📚",
              },
            ].map(({ step, title, desc, icon }) => (
              <div key={step} className="text-center space-y-3">
                <div className="text-4xl">{icon}</div>
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center mx-auto">
                  {step}
                </div>
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Everything you need to eat better ✨</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Built around your real life — not a perfect version of it.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, mood, title, description }) => (
              <Card
                key={title}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <BroImage
                      src={`/images/bro-${mood}.png`}
                      alt=""
                      aria-hidden
                      className="h-12 w-12 object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow"
                    />
                  </div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary/5 border-y border-primary/10 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center space-y-6">
          <BroImage
            src="/images/bro-excited.png"
            alt="Bro excited"
            className="h-24 w-24 object-contain mx-auto drop-shadow-lg"
          />
          <h2 className="text-3xl font-bold">Ready to start your plant-based journey?</h2>
          <p className="text-muted-foreground text-lg">
            Start chatting with Bro right now — free, no login needed. When you’re ready to
            save recipes and unlock all features, create your free account.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="gap-2">
              <Link href="/login">
                <Sparkles className="h-4 w-4" />
                Create free account
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/pricing">View pricing</Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">14-day full access trial. No credit card required.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BroImage src="/images/bro-default.png" alt="BroCook" className="h-6 w-6 object-contain" />
            <span className="font-bold text-sm text-primary">BroCook</span>
          </div>
          <p className="text-xs text-muted-foreground">Made with plants and love. 🌱</p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link href="/pricing" className="hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="/login" className="hover:text-foreground transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
