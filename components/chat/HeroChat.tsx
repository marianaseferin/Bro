"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Send, ArrowRight } from "lucide-react"
import { ChatMessage } from "./ChatMessage"
import { TypingIndicator } from "./TypingIndicator"
import { Button } from "@/components/ui/button"

interface Message {
  role: "user" | "bro"
  content: string
}

const INITIAL_MESSAGE: Message = {
  role: "bro",
  content:
    "Hey! 👋 I'm Bro, your plant-based cooking companion.\n\nTell me what's in your fridge, or what you're craving — I'll find you the perfect recipe! 🌿",
}

export function HeroChat() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showCta, setShowCta] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  async function sendMessage() {
    const text = input.trim()
    if (!text || isTyping) return

    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: text }])
    setIsTyping(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: messages }),
      })
      const data = (await res.json()) as { reply: string }
      setIsTyping(false)
      setMessages((prev) => [...prev, { role: "bro", content: data.reply }])
      // Show soft CTA after first recipe (no hard limit)
      if (!showCta) setShowCta(true)
    } catch {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        { role: "bro", content: "Oops, something went wrong. Try again! 🌿" },
      ])
    }
  }

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto rounded-2xl border border-border bg-background shadow-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3 bg-primary text-primary-foreground">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/bro-excited.png"
          alt="Bro"
          className="h-9 w-9 object-contain drop-shadow"
          onError={(e) => {
            ;(e.target as HTMLImageElement).src = "/images/bro-default.svg"
          }}
        />
        <div>
          <p className="font-bold text-sm">Bro</p>
          <p className="text-xs opacity-80">Your plant-based cooking companion 🌿</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-green-300 animate-pulse" />
          <span className="text-xs opacity-80">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 min-h-[300px] max-h-[360px]">
        {messages.map((msg, i) => (
          <ChatMessage key={i} role={msg.role} content={msg.content} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Soft CTA — appears after first recipe, never blocks */}
      {showCta && (
        <div className="mx-4 mb-3 rounded-xl bg-primary/5 border border-primary/20 p-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">Save this recipe! 🔖</p>
            <p className="text-xs text-muted-foreground">
              Create a free account to save recipes &amp; track your habits.
            </p>
          </div>
          <Button asChild size="sm" className="shrink-0 gap-1">
            <Link href="/login">
              Sign up free <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      )}

      {/* Input — always enabled */}
      <div className="border-t border-border p-4">
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            sendMessage()
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tell me what you have in your fridge..."
            disabled={isTyping}
            className="flex-1 h-10 rounded-xl border border-input bg-background px-4 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isTyping}
            className="h-10 w-10 rounded-xl shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Free to use —{" "}
          <Link href="/login" className="text-primary hover:underline">
            sign up
          </Link>{" "}
          to save recipes &amp; unlock all features.
        </p>
      </div>
    </div>
  )
}
