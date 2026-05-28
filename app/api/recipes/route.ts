import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { RecipeFilterSchema } from "@/lib/validations"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const parsed = RecipeFilterSchema.safeParse({
    search: searchParams.get("search") ?? undefined,
    maxTime: searchParams.get("maxTime") ? Number(searchParams.get("maxTime")) : undefined,
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 12,
    tags: searchParams.getAll("tags"),
  })

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { search, maxTime, page, limit, tags } = parsed.data
  const skip = (page - 1) * limit

  const where = {
    isPublic: true,
    ...(search ? { title: { contains: search, mode: "insensitive" as const } } : {}),
    ...(maxTime ? { timeMinutes: { lte: maxTime } } : {}),
    ...(tags && tags.length > 0 ? { tags: { hasSome: tags } } : {}),
  }

  const [recipes, total] = await Promise.all([
    db.recipe.findMany({
      where,
      include: { ingredients: { include: { ingredient: true } } },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    db.recipe.count({ where }),
  ])

  return NextResponse.json({ recipes, total, page, limit })
}
