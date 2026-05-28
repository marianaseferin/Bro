import type { User } from "@prisma/client"

export type PlanUser = Pick<
  User,
  "plan" | "trialEndsAt" | "stripeCurrentPeriodEnd"
>

export function isTrialActive(user: PlanUser): boolean {
  return (
    user.plan === "TRIAL" &&
    user.trialEndsAt !== null &&
    user.trialEndsAt > new Date()
  )
}

export function isSubscribed(user: PlanUser): boolean {
  return (
    user.plan === "PRO" &&
    user.stripeCurrentPeriodEnd !== null &&
    user.stripeCurrentPeriodEnd > new Date()
  )
}

export function hasAccess(user: PlanUser): boolean {
  return isTrialActive(user) || isSubscribed(user)
}

export function daysLeftInTrial(user: PlanUser): number {
  if (!user.trialEndsAt || user.plan !== "TRIAL") return 0
  const diff = user.trialEndsAt.getTime() - Date.now()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export const PLAN_LIMITS = {
  FREE: {
    suggestionsPerDay: 3,
    savedRecipes: 5,
    goals: 1,
    habitTracking: false,
  },
  TRIAL: {
    suggestionsPerDay: 20,
    savedRecipes: 50,
    goals: 5,
    habitTracking: true,
  },
  PRO: {
    suggestionsPerDay: Infinity,
    savedRecipes: Infinity,
    goals: Infinity,
    habitTracking: true,
  },
} as const

export type PlanLimit = keyof (typeof PLAN_LIMITS)["FREE"]

export function getPlanLimit(plan: User["plan"], resource: PlanLimit) {
  return PLAN_LIMITS[plan][resource]
}
