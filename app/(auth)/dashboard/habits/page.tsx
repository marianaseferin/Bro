import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { Leaf, TrendingUp, Flame } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BroCompanion } from "@/components/bro/BroCompanion"
import { PaywallGate } from "@/components/paywall/PaywallGate"
import { hasAccess } from "@/lib/subscription"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Habits" }

export default async function HabitsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { plan: true, trialEndsAt: true, stripeCurrentPeriodEnd: true },
  })
  if (!user) redirect("/login")

  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const interactions = await db.interaction.findMany({
    where: {
      userId: session.user.id,
      action: "COOK",
      timestamp: { gte: thirtyDaysAgo },
    },
    orderBy: { timestamp: "asc" },
  })

  const cookDates = new Set(interactions.map((i) => i.timestamp.toDateString()))
  const streak = calculateStreak(interactions.map((i) => i.timestamp))
  const weeklyCount = interactions.filter(
    (i) => i.timestamp >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length

  const locked = !hasAccess(user)

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-start gap-4">
        <BroCompanion
          mood={streak >= 3 ? "excited" : streak >= 1 ? "muscle" : "meditation"}
          message={
            streak >= 7
              ? `${streak}-day streak! You're unstoppable!`
              : streak >= 3
              ? `${streak} days in a row — keep it going!`
              : "Every meal counts. Let's build your streak!"
          }
        />
      </div>

      <PaywallGate
        locked={locked}
        title="Track your habits"
        description="Habit tracking is available on trial and Pro plans."
      >
        <div className="grid grid-cols-3 gap-4">
          <Card className="text-center">
            <CardContent className="pt-5 pb-4">
              <div className="text-3xl font-bold text-primary">{streak}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1">
                <Flame className="h-3.5 w-3.5 text-accent" />
                Day streak
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-5 pb-4">
              <div className="text-3xl font-bold text-primary">{weeklyCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Meals this week</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-5 pb-4">
              <div className="text-3xl font-bold text-primary">{cookDates.size}</div>
              <p className="text-xs text-muted-foreground mt-1">Days active (30d)</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4 text-primary" />
              Monthly progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Goal: cook 20 plant-based meals</span>
              <span className="font-semibold">{cookDates.size}/20</span>
            </div>
            <Progress value={Math.min((cookDates.size / 20) * 100, 100)} />
            {cookDates.size >= 20 && (
              <Badge variant="success" className="w-full justify-center">
                Monthly goal reached!
              </Badge>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Leaf className="h-4 w-4 text-primary" />
              Last 7 days
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              {Array.from({ length: 7 }).map((_, i) => {
                const d = new Date()
                d.setDate(d.getDate() - (6 - i))
                const cooked = cookDates.has(d.toDateString())
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                    <div
                      className={`h-8 w-full rounded-md transition-colors ${
                        cooked ? "bg-primary" : "bg-muted"
                      }`}
                    />
                    <span className="text-xs text-muted-foreground">
                      {d.toLocaleDateString("en", { weekday: "short" })[0]}
                    </span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </PaywallGate>
    </div>
  )
}

function calculateStreak(dates: Date[]): number {
  if (!dates.length) return 0
  const daySet = new Set(dates.map((d) => d.toDateString()))
  let streak = 0
  const today = new Date()
  for (let i = 0; i < 365; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    if (daySet.has(d.toDateString())) {
      streak++
    } else if (i > 0) {
      break
    }
  }
  return streak
}
