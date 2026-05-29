"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { useState } from "react"
import { Home, ChefHat, BookOpen, Target, Settings, LogOut, Leaf } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { BroCompanion } from "@/components/bro/BroCompanion"

type BroMood = "default" | "excited" | "meditation" | "chef" | "muscle" | "sad" | "doctor" | "tired"

const DAILY_MOODS: BroMood[] = ["default", "excited", "chef", "meditation", "muscle"]

const NAV_ITEMS = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/dashboard/cook", label: "Cook with Bro", icon: ChefHat },
  { href: "/dashboard/recipes", label: "Recipes", icon: BookOpen },
  { href: "/dashboard/habits", label: "Habits", icon: Leaf },
  { href: "/dashboard/goals", label: "Goals", icon: Target },
]

interface SidebarProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname()
  const [mood] = useState<BroMood>(() => {
    const day = new Date().getDay()
    return DAILY_MOODS[day % DAILY_MOODS.length]
  })

  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <aside className="flex h-full w-64 flex-col bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 px-5 border-b border-sidebar-border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/bro-default.png"
          alt="BroCook"
          className="h-8 w-8 object-contain"
          onError={(e) => {
            ;(e.target as HTMLImageElement).src = "/images/bro-default.svg"
          }}
        />
        <span className="text-lg font-bold text-sidebar-primary">BroCook</span>
      </div>

      {/* Bro daily message */}
      <div className="px-4 py-3 border-b border-sidebar-border/50">
        <BroCompanion mood={mood} size="sm" />
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/dashboard" ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-sidebar-border p-4 space-y-2">
        <Link
          href="/settings/billing"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
            pathname.startsWith("/settings")
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          )}
        >
          <Settings className="h-4 w-4 shrink-0" />
          Settings
        </Link>

        <div className="flex items-center gap-3 px-3 py-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image ?? undefined} />
            <AvatarFallback className="text-xs">{initials ?? "U"}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {user.name ?? "User"}
            </p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => signOut({ callbackUrl: "/" })}
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </aside>
  )
}
