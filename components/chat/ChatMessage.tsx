"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
  role: "user" | "bro"
  content: string
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div
      className={cn(
        "flex gap-2.5 items-end transition-all duration-300",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        role === "user" ? "flex-row-reverse" : "flex-row"
      )}
    >
      {role === "bro" && (
        <div className="shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/bro-default.png"
            alt="Bro"
            className="h-8 w-8 object-contain"
            onError={(e) => {
              ;(e.target as HTMLImageElement).src = "/images/bro-default.svg"
            }}
          />
        </div>
      )}
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
          role === "user"
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-muted text-foreground rounded-bl-sm"
        )}
      >
        {content}
      </div>
    </div>
  )
}
