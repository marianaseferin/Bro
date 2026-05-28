"use client"

import { Clock, Users, Flame, Bookmark } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface RecipeIngredient {
  ingredient: { name: string; emoji?: string | null }
  amount: string
  optional: boolean
}

interface RecipeCardProps {
  recipe: {
    id: string
    title: string
    description?: string | null
    timeMinutes: number
    servings: number
    calories?: number | null
    tags: string[]
    difficulty: string
    ingredients: RecipeIngredient[]
  }
  highlight?: string[]
  onCook?: () => void
  onSave?: () => void
  className?: string
}

const DIFFICULTY_COLORS = {
  easy: "success",
  medium: "secondary",
  hard: "destructive",
} as const

export function RecipeCard({ recipe, highlight = [], onCook, onSave, className }: RecipeCardProps) {
  const matchCount = recipe.ingredients.filter((ri) =>
    highlight.includes(ri.ingredient.name)
  ).length
  const matchPct = recipe.ingredients.length
    ? Math.round((matchCount / recipe.ingredients.length) * 100)
    : 0

  return (
    <Card className={cn("overflow-hidden hover:shadow-md transition-shadow", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base leading-snug">{recipe.title}</CardTitle>
          <Badge
            variant={(DIFFICULTY_COLORS[recipe.difficulty as keyof typeof DIFFICULTY_COLORS] ?? "secondary") as "success" | "secondary" | "destructive"}
            className="shrink-0 text-xs"
          >
            {recipe.difficulty}
          </Badge>
        </div>
        {recipe.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{recipe.description}</p>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {recipe.timeMinutes}m
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            {recipe.servings}
          </span>
          {recipe.calories && (
            <span className="flex items-center gap-1.5">
              <Flame className="h-3.5 w-3.5" />
              {recipe.calories} kcal
            </span>
          )}
        </div>

        {highlight.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-muted-foreground">
              {matchPct}% match with your ingredients
            </p>
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-700"
                style={{ width: `${matchPct}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5">
          {recipe.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2 pt-1">
          <Button className="flex-1" size="sm" onClick={onCook}>
            Cook this
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={onSave} title="Save recipe">
            <Bookmark className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
