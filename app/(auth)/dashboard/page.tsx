import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ChefHat, Target, Leaf, ArrowRight, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BroCompanion } from "@/components/bro/BroCompanion"
import { hasAccess } from "@/lib/subscription"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Dashboard" }

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const [user, recentSuggestions, goals] = await Promise.all([
    db.user.findUnique({
      where: { id: session.user.id },
      select: { name: true, plan: true, trialEndsAt: true, stripeCurrentPeriodEnd: true },
    }),
    db.suggestion.findMany({
      where: { userId: session.user.id },
      include: { mainRecipe: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
    db.goal.findMany({
      where: { userId: session.user.id, status: "ACTIVE" },
      take: 3,
    }),
  ])

  if (!user) redirect("/login")

  const firstName = session.user.name?.split(" ")[0] ?? "there"
  const hasFullAccess = hasAccess(user)

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Hey {firstName}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">What are we cooking today?</p>
        </div>
        <BroCompanion
          mood={hasFullAccess ? "default" : "sad"}
          size="md"
          message={
            hasFullAccess
              ? undefined
              : "Start your trial to unlock everything!"
          }
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/dashboard/cook">
          <Card className="border-primary/30 bg-primary/5 hover:shadow-md hover:border-primary/50 transition-all cursor-pointer group">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center">
                  <ChefHat className="h-5 w-5 text-primary" />
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <CardTitle className="text-base mt-3">Cook with Bro</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Tell me what's in your fridge and I'll find the perfect recipe.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/habits">
          <Card className="hover:shadow-md transition-all cursor-pointer group">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center">
                  <Leaf className="h-5 w-5 text-primary" />
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <CardTitle className="text-base mt-3">Habits</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Track your plant-based progress, one meal at a time.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/goals">
          <Card className="hover:shadow-md transition-all cursor-pointer group">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-xl bg-accent/15 flex items-center justify-center">
                  <Target className="h-5 w-5 text-accent" />
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <CardTitle className="text-base mt-3">My Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {goals.length > 0
                  ? `${goals.length} active goal${goals.length !== 1 ? "s" : ""}`
                  : "Set your first goal today."}
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {recentSuggestions.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Recent suggestions
            </h2>
            <Link href="/dashboard/cook" className="text-sm text-primary hover:underline">
              New suggestion
            </Link>
          </div>
          <div className="space-y-2">
            {recentSuggestions.map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-xl border bg-card px-4 py-3">
                <div>
                  <p className="text-sm font-medium">{s.mainRecipe?.title ?? "Custom suggestion"}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(s.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {s.mainRecipe ? "Recipe found" : "Alternative"}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {!hasFullAccess && (
        <Card className="border-accent/40 bg-accent/5">
          <CardContent className="flex items-center justify-between gap-4 p-5">
            <div>
              <p className="font-semibold">Unlock the full BroCook experience</p>
              <p className="text-sm text-muted-foreground mt-0.5">
                Get unlimited suggestions, habit tracking, and all features.
              </p>
            </div>
            <Button variant="accent" asChild>
              <Link href="/pricing">See plans</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
