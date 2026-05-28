"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type BroMood = "default" | "excited" | "meditation" | "chef" | "muscle" | "sad" | "doctor" | "tired"

const BRO_MESSAGES: Record<BroMood, string[]> = {
  default: [
    "Hey! What do you feel like eating today? 🌿",
    "Ready to cook something amazing? Let's go!",
    "Small steps, big changes. What's cooking?",
  ],
  excited: [
    "Yes! Let's crush this meal! 💪",
    "You're on a roll — keep it up!",
    "This recipe is going to be incredible!",
  ],
  meditation: [
    "Take it easy. Even a simple meal counts.",
    "No pressure — let's find something relaxing.",
    "Breathe. Food is joy, not stress.",
  ],
  chef: [
    "Chef mode activated! Let's get creative!",
    "Time to experiment with those ingredients.",
    "I've got the perfect recipe for you!",
  ],
  muscle: [
    "High-protein today? I got you!",
    "Fuel your body right — you've got this!",
    "Strong body, strong mind — let's cook!",
  ],
  sad: [
    "No worries — we all have off days. Let's keep it simple.",
    "A warm meal will make things better.",
    "I'm here. Let's find something comforting.",
  ],
  doctor: [
    "Your nutrition goals are looking great!",
    "Every plant-based meal is a win!",
    "Your body thanks you for this choice.",
  ],
  tired: [
    "Tired? Let's find something quick and easy.",
    "5-minute meal coming right up!",
    "Low energy day — no problem. Simple it is.",
  ],
}

interface BroCompanionProps {
  mood?: BroMood
  message?: string
  size?: "sm" | "md" | "lg"
  className?: string
  showMessage?: boolean
}

export function BroCompanion({
  mood = "default",
  message,
  size = "md",
  className,
  showMessage = true,
}: BroCompanionProps) {
  const [msgIdx] = useState(() => Math.floor(Math.random() * BRO_MESSAGES[mood].length))
  const displayMessage = message ?? BRO_MESSAGES[mood][msgIdx]

  const sizeMap = { sm: 48, md: 80, lg: 120 }
  const imgSize = sizeMap[size]

  return (
    <div className={cn("flex items-end gap-3", className)}>
      <div
        className="relative shrink-0 flex items-center justify-center"
        style={{ width: imgSize, height: imgSize }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/images/bro-${mood}.png`}
          alt={`Bro — ${mood}`}
          width={imgSize}
          height={imgSize}
          className="object-contain drop-shadow-md"
          onError={(e) => {
            const img = e.target as HTMLImageElement
            if (!img.src.endsWith(".svg")) {
              img.src = "/images/bro-default.svg"
            }
          }}
          style={{ width: imgSize, height: imgSize }}
        />
      </div>
      {showMessage && (
        <div className="relative mb-2 max-w-xs rounded-2xl rounded-bl-none bg-primary/10 px-4 py-3 text-sm text-foreground shadow-sm">
          {displayMessage}
          <span className="absolute -bottom-1.5 left-0 h-3 w-3 rounded-br-full bg-primary/10" />
        </div>
      )}
    </div>
  )
}
