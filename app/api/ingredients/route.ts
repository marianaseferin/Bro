import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get("q") ?? ""

  const ingredients = await db.ingredient.findMany({
    where: q ? { name: { contains: q.toLowerCase() } } : undefined,
    orderBy: { name: "asc" },
    take: 30,
  })

  return NextResponse.json(ingredients)
}
