import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { SuggestionRequestSchema } from "@/lib/validations"
import { hasAccess, getPlanLimit } from "@/lib/subscription"
import type { User } from "@prisma/client"

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await db.user.findUnique({ where: { id: session.user.id } })
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

  if (!hasAccess(user)) {
    return NextResponse.json({ error: "UPGRADE_REQUIRED" }, { status: 403 })
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayCount = await db.suggestion.count({
    where: { userId: user.id, createdAt: { gte: today } },
  })

  const limit = getPlanLimit(user.plan as User["plan"], "suggestionsPerDay")
  if (todayCount >= limit) {
    return NextResponse.json({ error: "DAILY_LIMIT_REACHED" }, { status: 429 })
  }

  const body = await req.json()
  const parsed = SuggestionRequestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { ingredients, preference } = parsed.data

  const matchedIngredients = await db.ingredient.findMany({
    where: { name: { in: ingredients.map((i) => i.toLowerCase()) } },
  })

  const matchedIds = matchedIngredients.map((i) => i.id)

  const recipes = await db.recipe.findMany({
    where: {
      ingredients: {
        some: { ingredientId: { in: matchedIds } },
      },
    },
    include: {
      ingredients: { include: { ingredient: true } },
    },
    take: 5,
  })

  const suggestion = await db.suggestion.create({
    data: {
      userId: user.id,
      preference,
      mainRecipeId: recipes[0]?.id ?? null,
      alternativeText:
        recipes.length === 0
          ? "No exact match found — try swapping an ingredient or explore our recipe collection!"
          : null,
      ingredients: {
        create: matchedIds.map((ingredientId) => ({ ingredientId })),
      },
    },
    include: { mainRecipe: { include: { ingredients: { include: { ingredient: true } } } } },
  })

  return NextResponse.json({
    suggestion,
    recipes: recipes.slice(0, 3),
    missingIngredients: ingredients.filter(
      (ing) => !matchedIngredients.some((mi) => mi.name === ing.toLowerCase())
    ),
  })
}

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const suggestions = await db.suggestion.findMany({
    where: { userId: session.user.id },
    include: {
      mainRecipe: true,
      ingredients: { include: { ingredient: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  })

  return NextResponse.json(suggestions)
}
