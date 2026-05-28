"use client"

import { useRouter } from "next/navigation"
import { Lock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BroCompanion } from "@/components/bro/BroCompanion"

interface PaywallGateProps {
  title?: string
  description?: string
  children: React.ReactNode
  locked: boolean
  feature?: string
}

export function PaywallGate({
  title = "Unlock this feature",
  description = "Upgrade to Pro to access all features and unlimited suggestions.",
  children,
  locked,
  feature,
}: PaywallGateProps) {
  const router = useRouter()

  if (!locked) return <>{children}</>

  return (
    <div className="relative">
      <div className="pointer-events-none select-none blur-sm opacity-40">{children}</div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Card className="mx-4 w-full max-w-sm border-primary/20 bg-card shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <BroCompanion mood="excited" size="sm" message="Going Pro is the best decision you'll make today!" />
            <Button
              className="w-full gap-2"
              variant="accent"
              onClick={() => router.push("/pricing")}
            >
              <Zap className="h-4 w-4" />
              Upgrade to Pro
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => router.push("/pricing")}
            >
              See all features
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
