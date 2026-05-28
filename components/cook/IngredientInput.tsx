"use client"

import { useState, useRef } from "react"
import { X, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface IngredientInputProps {
  value: string[]
  onChange: (ingredients: string[]) => void
  className?: string
  maxItems?: number
}

const QUICK_SUGGESTIONS = [
  "tomato", "onion", "garlic", "potato", "carrot", "spinach",
  "chickpeas", "lentils", "rice", "pasta", "tofu", "mushroom",
]

export function IngredientInput({ value, onChange, className, maxItems = 15 }: IngredientInputProps) {
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  function addIngredient(ingredient: string) {
    const normalized = ingredient.trim().toLowerCase()
    if (!normalized || value.includes(normalized) || value.length >= maxItems) return
    onChange([...value, normalized])
    setInputValue("")
    inputRef.current?.focus()
  }

  function removeIngredient(ingredient: string) {
    onChange(value.filter((i) => i !== ingredient))
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addIngredient(inputValue)
    }
    if (e.key === "Backspace" && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1))
    }
  }

  const unusedSuggestions = QUICK_SUGGESTIONS.filter((s) => !value.includes(s)).slice(0, 6)

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex min-h-12 flex-wrap items-center gap-2 rounded-xl border border-input bg-background px-3 py-2 focus-within:ring-2 focus-within:ring-ring">
        {value.map((ingredient) => (
          <span
            key={ingredient}
            className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-sm text-primary font-medium"
          >
            {ingredient}
            <button
              type="button"
              onClick={() => removeIngredient(ingredient)}
              className="ml-0.5 rounded-full hover:bg-primary/20 p-0.5 transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? "Type an ingredient and press Enter..." : "Add more..."}
          className="flex-1 min-w-32 border-none outline-none bg-transparent text-sm placeholder:text-muted-foreground"
        />
      </div>

      {inputValue && (
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => addIngredient(inputValue)}
          className="gap-1"
        >
          <Plus className="h-3.5 w-3.5" />
          Add "{inputValue}"
        </Button>
      )}

      {unusedSuggestions.length > 0 && value.length < 3 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Quick add:</span>
          {unusedSuggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => addIngredient(s)}
              className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              + {s}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
