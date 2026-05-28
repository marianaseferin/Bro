import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { CreditCard, CheckCircle, Clock, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BillingActions } from "./BillingActions"
import { isTrialActive, isSubscribed, daysLeftInTrial } from "@/lib/subscription"
import { formatDate } from "@/lib/utils"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Billing" }

export default async function BillingPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      plan: true,
      trialEndsAt: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
    },
  })
  if (!user) redirect("/login")

  const trialActive = isTrialActive(user)
  const subscribed = isSubscribed(user)
  const daysLeft = trialActive ? daysLeftInTrial(user) : 0

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Billing</h1>
        <p className="text-muted-foreground mt-1">Manage your subscription and plan.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Current plan
            </CardTitle>
            <Badge
              variant={subscribed ? "default" : trialActive ? "accent" : "secondary"}
              className="capitalize"
            >
              {subscribed ? "Pro" : trialActive ? "Trial" : user.plan.toLowerCase()}
            </Badge>
          </div>
          <CardDescription>
            {subscribed && user.stripeCurrentPeriodEnd && (
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                Renews on {formatDate(user.stripeCurrentPeriodEnd)}
              </span>
            )}
            {trialActive && (
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-accent" />
                Trial ends in {daysLeft} day{daysLeft !== 1 ? "s" : ""}
              </span>
            )}
            {!subscribed && !trialActive && (
              <span>You are on the free plan with limited features.</span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BillingActions
            plan={user.plan}
            trialActive={trialActive}
            subscribed={subscribed}
            hasCustomer={!!user.stripeCustomerId}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Zap className="h-4 w-4 text-accent" />
            Pro plan features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {[
              "Unlimited daily suggestions",
              "Full habit tracking & streaks",
              "Unlimited saved recipes",
              "Unlimited goals",
              "Smart ingredient substitutions",
              "Priority support",
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
