"use client"

import Link from "next/link"
import { Clock, X, Zap } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface TrialBannerProps {
  daysLeft: number
  className?: string
}

export function TrialBanner({ daysLeft, className }: TrialBannerProps) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed || daysLeft <= 0) return null

  const isUrgent = daysLeft <= 3

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 px-4 py-2.5 text-sm",
        isUrgent
          ? "bg-accent/20 text-accent-foreground border-b border-accent/30"
          : "bg-primary/10 text-foreground border-b border-primary/20",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 shrink-0 text-primary" />
        <span>
          Your free trial ends in{" "}
          <strong>
            {daysLeft} day{daysLeft !== 1 ? "s" : ""}
          </strong>
          .{" "}
          <Link
            href="/pricing"
            className="font-semibold underline underline-offset-2 hover:text-primary transition-colors"
          >
            <Zap className="inline h-3.5 w-3.5 mr-0.5" />
            Upgrade now
          </Link>
        </span>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="rounded p-0.5 hover:bg-foreground/10 transition-colors"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
