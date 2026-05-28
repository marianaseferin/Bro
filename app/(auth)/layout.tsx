import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { Sidebar } from "@/components/layout/Sidebar"
import { TrialBanner } from "@/components/layout/TrialBanner"
import { daysLeftInTrial, isTrialActive } from "@/lib/subscription"

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  // Login/verify pages in this group pass through without sidebar.
  // Middleware handles route protection for /dashboard and /settings.
  if (!session?.user?.id) {
    return <>{children}</>
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      email: true,
      image: true,
      plan: true,
      trialEndsAt: true,
      stripeCurrentPeriodEnd: true,
    },
  })

  if (!user) return <>{children}</>

  const trialDays = isTrialActive(user) ? daysLeftInTrial(user) : 0

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar user={user} />
      <div className="flex flex-1 flex-col overflow-hidden">
        {trialDays > 0 && <TrialBanner daysLeft={trialDays} />}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
