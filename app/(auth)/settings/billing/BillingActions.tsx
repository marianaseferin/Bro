"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Zap, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface BillingActionsProps {
  plan: string
  trialActive: boolean
  subscribed: boolean
  hasCustomer: boolean
}

export function BillingActions({ plan, trialActive, subscribed, hasCustomer }: BillingActionsProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleCheckout() {
    setLoading(true)
    try {
      const res = await fetch("/api/users/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "checkout" }),
      })
      const { url } = await res.json()
      if (url) router.push(url)
    } catch {
      toast.error("Failed to start checkout. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  async function handlePortal() {
    setLoading(true)
    try {
      const res = await fetch("/api/users/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "portal" }),
      })
      const { url } = await res.json()
      if (url) router.push(url)
    } catch {
      toast.error("Failed to open billing portal.")
    } finally {
      setLoading(false)
    }
  }

  if (subscribed && hasCustomer) {
    return (
      <Button variant="outline" onClick={handlePortal} disabled={loading} className="gap-2">
        <ExternalLink className="h-4 w-4" />
        {loading ? "Opening..." : "Manage subscription"}
      </Button>
    )
  }

  if (trialActive || plan === "FREE") {
    return (
      <Button onClick={handleCheckout} disabled={loading} className="gap-2" variant="accent">
        <Zap className="h-4 w-4" />
        {loading ? "Loading..." : "Upgrade to Pro"}
      </Button>
    )
  }

  return null
}
