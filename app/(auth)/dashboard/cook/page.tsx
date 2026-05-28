"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { ChefHat, Sparkles, RefreshCw, AlertCircle } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { IngredientInput } from "@/components/cook/IngredientInput"
import { RecipeCard } from "@/components/cook/RecipeCard"
import { BroCompanion } from "@/components/bro/BroCompanion"

type Step = "ingredients" | "preferences" | "results"

interface SuggestionResult {
  suggestion: { id: string }
  recipes: Array<{
    id: string
    title: string
    description: string | null
    timeMinutes: number
    servings: number
    calories: number | null
    tags: string[]
    difficulty: string
    ingredients: Array<{ ingredient: { name: string; emoji?: string | null }; amount: string; optional: boolean }>
  }>
  missingIngredients: string[]
}

export default function CookPage() {
  const [step, setStep] = useState<Step>("ingredients")
  const [ingredients, setIngredients] = useState<string[]>([])
  const [preference, setPreference] = useState<string>("")
  const [result, setResult] = useState<SuggestionResult | null>(null)

  const { mutate: getSuggestions, isPending } = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients, preference }),
      })
      if (!res.ok) {
        const err = await res.json()
        if (err.error === "UPGRADE_REQUIRED") throw new Error("UPGRADE_REQUIRED")
        if (err.error === "DAILY_LIMIT_REACHED") throw new Error("DAILY_LIMIT_REACHED")
        throw new Error("Failed to get suggestions")
      }
      return res.json() as Promise<SuggestionResult>
    },
    onSuccess: (data) => {
      setResult(data)
      setStep("results")
    },
    onError: (err) => {
      if (err.message === "UPGRADE_REQUIRED") {
        toast.error("Upgrade required", { description: "Your trial has expired. Upgrade to continue." })
      } else if (err.message === "DAILY_LIMIT_REACHED") {
        toast.error("Daily limit reached", { description: "Upgrade for unlimited suggestions." })
      } else {
        toast.error("Something went wrong. Please try again.")
      }
    },
  })

  function logInteraction(action: string, suggestionId: string) {
    fetch("/api/interactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ suggestionId, action }),
    }).catch(() => {})
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-start gap-4">
        <BroCompanion
          mood={step === "results" ? "chef" : "default"}
          size="md"
          message={
            step === "ingredients"
              ? "What's in your kitchen today? Add your ingredients and let's find something delicious!"
              : step === "preferences"
              ? "Any preferences? Quick meal, high-protein, vegan? I'll adapt!"
              : `Found ${result?.recipes.length ?? 0} recipe${result?.recipes.length !== 1 ? "s" : ""} for you!`
          }
        />
      </div>

      {step === "ingredients" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-primary" />
              What's in your kitchen?
            </CardTitle>
            <CardDescription>Add the ingredients you have on hand — we'll handle the rest.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <IngredientInput value={ingredients} onChange={setIngredients} />
            <Button
              className="w-full sm:w-auto gap-2"
              disabled={ingredients.length === 0}
              onClick={() => setStep("preferences")}
            >
              <Sparkles className="h-4 w-4" />
              Find recipes ({ingredients.length} ingredient{ingredients.length !== 1 ? "s" : ""})
            </Button>
          </CardContent>
        </Card>
      )}

      {step === "preferences" && (
        <Card>
          <CardHeader>
            <CardTitle>Any preferences?</CardTitle>
            <CardDescription>Totally optional — skip to get all suggestions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label>Meal preference</Label>
              <Select value={preference} onValueChange={setPreference}>
                <SelectTrigger>
                  <SelectValue placeholder="No preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quick">Quick (under 20 min)</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                  <SelectItem value="high-protein">High protein</SelectItem>
                  <SelectItem value="comfort">Comfort food</SelectItem>
                  <SelectItem value="light">Light & fresh</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep("ingredients")}>
                Back
              </Button>
              <Button className="flex-1 gap-2" onClick={() => getSuggestions()} disabled={isPending}>
                {isPending ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Finding recipes...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Get suggestions
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "results" && result && (
        <div className="space-y-5">
          {result.missingIngredients.length > 0 && (
            <div className="flex items-start gap-2 rounded-xl bg-accent/10 border border-accent/20 px-4 py-3 text-sm">
              <AlertCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
              <span>
                Some ingredients weren't recognized: <strong>{result.missingIngredients.join(", ")}</strong>
              </span>
            </div>
          )}

          {result.recipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {result.recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  highlight={ingredients}
                  onCook={() => {
                    logInteraction("COOK", result.suggestion.id)
                    toast.success(`Cooking ${recipe.title}!`, { description: "Have fun in the kitchen!" })
                  }}
                  onSave={() => {
                    logInteraction("SAVE", result.suggestion.id)
                    toast.success("Saved to your recipes!")
                  }}
                />
              ))}
            </div>
          ) : (
            <Card className="text-center py-10">
              <CardContent>
                <BroCompanion mood="sad" size="md" message="No exact matches found, but don't worry!" showMessage />
                <p className="mt-4 text-muted-foreground text-sm">{result.suggestion && "Try adding more ingredients or explore our full recipe collection."}</p>
              </CardContent>
            </Card>
          )}

          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => {
              setStep("ingredients")
              setResult(null)
              logInteraction("SKIP", result.suggestion.id)
            }}
          >
            <RefreshCw className="h-4 w-4" />
            Try different ingredients
          </Button>
        </div>
      )}
    </div>
  )
}
