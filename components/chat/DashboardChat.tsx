"use client"

import { useState, useRef, useEffect } from "react"
import { Send, RefreshCw } from "lucide-react"
import { ChatMessage } from "./ChatMessage"
import { TypingIndicator } from "./TypingIndicator"
import { Button } from "@/components/ui/button"

interface Message {
  role: "user" | "bro"
  content: string
}

const GREETINGS = [
  "Hey chef! 👨‍🍳 What are we cooking today? Tell me what you have in the fridge and I'll find the perfect recipe!",
  "Welcome back! 🌿 What's in your kitchen today? Give me your ingredients and let's make something amazing.",
  "Ready to cook? 💪 Tell me what ingredients you have, what you're craving, or just ask me anything food-related!",
]

const DEFAULT_GREETING = GREETINGS[0]

export function DashboardChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bro", content: DEFAULT_GREETING },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)]
    if (greeting !== DEFAULT_GREETING) {
      setMessages([{ role: "bro", content: greeting }])
    }
  }, [])

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
    } catch {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        { role: "bro", content: "Hmm, something went wrong. Try again! 🌿" },
      ])
    }
  }

  function clearChat() {
    const greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)]
    setMessages([{ role: "bro", content: greeting }])
    setInput("")
  }

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-background shadow-sm overflow-hidden h-[calc(100vh-200px)] min-h-[480px]">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3 bg-primary text-primary-foreground shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/bro-chef.png"
          alt="Bro chef"
          className="h-9 w-9 object-contain drop-shadow"
          onError={(e) => {
            ;(e.target as HTMLImageElement).src = "/images/bro-default.svg"
          }}
        />
        <div className="flex-1">
          <p className="font-bold text-sm">Bro — Kitchen Mode</p>
          <p className="text-xs opacity-80">Tell me what you have and I&apos;ll find the perfect recipe 🍳</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
          onClick={clearChat}
          title="New chat"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((msg, i) => (
          <ChatMessage key={i} role={msg.role} content={msg.content} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Quick prompts */}
      {messages.length <= 1 && (
        <div className="px-5 pb-3 flex flex-wrap gap-2 shrink-0">
          {[
            "I have tofu, broccoli and soy sauce",
            "Quick high-protein meal",
            "Something light and fresh",
            "Comfort food, 20 min",
          ].map((prompt) => (
            <button
              key={prompt}
              onClick={() => setInput(prompt)}
              className="text-xs px-3 py-1.5 rounded-full border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="border-t border-border p-4 shrink-0">
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
            placeholder="Type ingredients or what you're craving..."
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
      </div>
    </div>
  )
}
