import type { Metadata } from "next"
import { DashboardChat } from "@/components/chat/DashboardChat"

export const metadata: Metadata = { title: "Cook with Bro" }

export default function CookPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Cook with Bro 🍳</h1>
        <p className="text-muted-foreground mt-1">
          Tell Bro what you have or what you&apos;re craving — he&apos;ll find the perfect recipe.
        </p>
      </div>
      <DashboardChat />
    </div>
  )
}
