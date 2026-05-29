import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export const runtime = "nodejs"

interface ChatMessage {
  role: "user" | "bro"
  content: string
}

interface RequestBody {
  message: string
  history?: ChatMessage[]
}

const STOP_WORDS = new Set([
  "i", "have", "the", "a", "an", "and", "or", "with", "some", "want", "to",
  "eat", "make", "cook", "what", "can", "do", "me", "my", "is", "are", "use",
  "using", "in", "of", "for", "that", "it", "at", "on", "be", "this", "but",
  "not", "from", "by", "they", "we", "he", "she", "you", "how", "any", "just",
  "also", "get", "got", "need", "something", "anything", "please",
])

function extractKeywords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w))
}

function buildReply(
  title: string,
  description: string | null,
  timeMinutes: number,
  servings: number,
  tags: string[]
): string {
  const parts: string[] = []
  parts.push(`🌿 ${title}`)
  if (description) parts.push(`\n${description}`)
  const meta = [`⏱ ${timeMinutes} min`, `🍽 ${servings} servings`]
  if (tags.length > 0) meta.push(tags.slice(0, 3).join(" • "))
  parts.push(`\n${meta.join("  •  ")}`)
  parts.push("\n\nLooks tasty? 😋 Ask me for another recipe, or tell me more about what you're looking for!")
  return parts.join("")
}

const FALLBACK_REPLY =
  "Try this quick idea: stir-fry tofu with broccoli, garlic, and soy sauce over rice — ⏱ 20 min, packed with protein! 🥢\n\nWant me to suggest something else? Tell me what ingredients you have!"

export async function POST(req: Request) {
  let body: RequestBody
  try {
    body = (await req.json()) as RequestBody
  } catch {
    return NextResponse.json({ reply: FALLBACK_REPLY })
  }

  const message = body.message?.trim()
  if (!message) {
    return NextResponse.json({
      reply: "What would you like to cook today? Tell me your ingredients or what you're craving! 🥦",
    })
  }

  const keywords = extractKeywords(message)

  try {
    let recipe = null

    if (keywords.length > 0) {
      const matches = await db.recipe.findMany({
        where: {
          isPublic: true,
          OR: [
            ...keywords.map((kw) => ({
              title: { contains: kw, mode: "insensitive" as const },
            })),
            ...keywords.map((kw) => ({
              description: { contains: kw, mode: "insensitive" as const },
            })),
            ...keywords.map((kw) => ({ tags: { has: kw } })),
          ],
        },
        take: 8,
        orderBy: { createdAt: "desc" },
      })
      if (matches.length > 0) {
        recipe = matches[Math.floor(Math.random() * matches.length)]
      }
    }

    if (!recipe) {
      const all = await db.recipe.findMany({
        where: { isPublic: true },
        take: 12,
        orderBy: { createdAt: "desc" },
      })
      if (all.length > 0) {
        recipe = all[Math.floor(Math.random() * all.length)]
      }
    }

    if (!recipe) {
      return NextResponse.json({ reply: FALLBACK_REPLY })
    }

    const reply = buildReply(
      recipe.title,
      recipe.description,
      recipe.timeMinutes,
      recipe.servings,
      recipe.tags
    )

    const response = NextResponse.json({ reply })
    response.cookies.set("bro_used_free", "1", {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: false,
    })
    return response
  } catch {
    return NextResponse.json({ reply: FALLBACK_REPLY })
  }
}
