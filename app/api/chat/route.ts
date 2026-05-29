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

// ---------------------------------------------------------------------------
// In-memory recipe library — works even when the DB is empty
// ---------------------------------------------------------------------------
const LIBRARY = [
  {
    title: "Crispy Tofu Stir-Fry",
    keys: ["tofu", "broccoli", "soy", "sauce", "stir", "fry", "asian", "garlic", "pepper"],
    time: 20, servings: 2, tags: "quick • high-protein • vegan",
    desc: "Golden crispy tofu with broccoli in savory soy sauce.",
    how: "Press & cube tofu → pan-fry until golden on all sides. Remove. Stir-fry broccoli + garlic. Return tofu, add soy sauce, toss. Serve over rice.",
  },
  {
    title: "Spiced Chickpea & Spinach Curry",
    keys: ["chickpea", "chickpeas", "spinach", "tomato", "curry", "turmeric", "cumin", "spice", "indian"],
    time: 25, servings: 4, tags: "comfort • high-protein • vegan",
    desc: "A warming, protein-packed curry ready in 25 minutes.",
    how: "Sauté onion + garlic. Add cumin, turmeric, paprika — stir 1 min. Add chickpeas + canned tomatoes, simmer 10 min. Stir in spinach until wilted. Serve with rice.",
  },
  {
    title: "Roasted Veggie Buddha Bowl",
    keys: ["roast", "vegetable", "veggie", "quinoa", "bowl", "sweet potato", "potato", "broccoli", "avocado", "tahini"],
    time: 35, servings: 2, tags: "whole-foods • vegan • meal-prep",
    desc: "Colorful bowl with roasted veggies, quinoa, and tahini dressing.",
    how: "Roast sweet potato, broccoli & bell pepper at 200°C for 25 min. Cook quinoa. Assemble: quinoa base, roasted veggies, avocado slices. Drizzle tahini + lemon.",
  },
  {
    title: "Black Bean Tacos",
    keys: ["black bean", "beans", "bean", "taco", "avocado", "lime", "cilantro", "mexican", "tortilla"],
    time: 15, servings: 2, tags: "quick • comfort • vegan",
    desc: "Quick and satisfying tacos with spiced black beans and avocado.",
    how: "Heat black beans with cumin, paprika & garlic for 5 min. Mash slightly. Warm tortillas. Fill with beans, avocado, tomato & cilantro. Squeeze lemon over top.",
  },
  {
    title: "Mushroom & Lentil Bolognese",
    keys: ["mushroom", "lentil", "lentils", "pasta", "bolognese", "tomato", "italian", "sauce"],
    time: 40, servings: 4, tags: "comfort • high-protein • vegan",
    desc: "Hearty plant-based pasta sauce. Nobody misses the meat.",
    how: "Brown mushrooms in olive oil 8 min. Add onion, garlic, carrot — 5 min. Add lentils + canned tomatoes + 500ml water. Simmer 20 min. Serve over pasta.",
  },
  {
    title: "Garlic Pasta with Spinach",
    keys: ["pasta", "garlic", "spinach", "olive oil", "simple", "quick", "italian", "spaghetti", "noodle"],
    time: 15, servings: 2, tags: "quick • simple • vegan",
    desc: "Simple, garlicky pasta with wilted spinach. 15-minute magic.",
    how: "Cook pasta al dente, reserve a cup of pasta water. Sauté lots of garlic in olive oil. Add spinach and wilt. Toss with pasta + pasta water. Season generously.",
  },
  {
    title: "Avocado & Chickpea Toast",
    keys: ["avocado", "bread", "toast", "chickpea", "chickpeas", "breakfast", "quick", "egg-free"],
    time: 10, servings: 1, tags: "quick • breakfast • vegan",
    desc: "Upgraded avocado toast with crispy chickpeas for protein.",
    how: "Toast bread. Mash avocado with lemon, salt & pepper. Pan-fry chickpeas with paprika until crispy. Pile avocado on toast then top with crispy chickpeas.",
  },
  {
    title: "Banana Oat Smoothie Bowl",
    keys: ["banana", "oat", "oats", "smoothie", "breakfast", "fruit", "bowl", "coconut", "milk"],
    time: 5, servings: 1, tags: "breakfast • quick • vegan",
    desc: "Thick, creamy smoothie bowl — 5-minute breakfast upgrade.",
    how: "Blend 2 frozen bananas + 1/2 cup oats + coconut milk until thick. Pour into bowl. Top with fresh fruit, walnuts, and a drizzle of peanut butter.",
  },
  {
    title: "Lentil & Vegetable Soup",
    keys: ["lentil", "lentils", "soup", "carrot", "potato", "celery", "vegetable", "warm", "comfort", "winter"],
    time: 30, servings: 4, tags: "comfort • high-protein • vegan",
    desc: "Warming, filling soup that gets better the next day.",
    how: "Sauté onion, carrot, celery with garlic. Add lentils + diced potato + tomatoes + 1L stock. Simmer 20 min until lentils are soft. Season with cumin and lemon.",
  },
  {
    title: "Quick Fried Rice",
    keys: ["rice", "fried", "soy", "sauce", "carrot", "peas", "asian", "quick", "leftover", "garlic"],
    time: 15, servings: 2, tags: "quick • asian • vegan",
    desc: "The best use of leftover rice — ready in 15 minutes.",
    how: "Heat sesame or olive oil on high. Add garlic + any veg you have (carrot, peas, bell pepper). Push to side, add rice, fry 3 min. Add soy sauce, toss everything together.",
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const STOP_WORDS = new Set([
  "i", "have", "the", "a", "an", "and", "or", "with", "some", "want", "to",
  "eat", "make", "cook", "what", "can", "do", "me", "my", "is", "are", "use",
  "using", "in", "of", "for", "that", "it", "at", "on", "be", "this", "but",
  "not", "from", "by", "they", "we", "he", "she", "you", "how", "any", "just",
  "also", "get", "got", "need", "something", "anything", "please", "would", "like",
  "help", "suggest", "suggestion", "recipe", "recipes", "idea", "ideas",
])

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w))
}

function scoreLibraryRecipe(
  recipe: (typeof LIBRARY)[number],
  keywords: string[]
): number {
  let score = 0
  for (const kw of keywords) {
    for (const rk of recipe.keys) {
      if (rk === kw) score += 4
      else if (rk.includes(kw) || kw.includes(rk)) score += 2
      else if (rk.startsWith(kw.slice(0, 4)) && kw.length >= 4) score += 1
    }
  }
  return score
}

function buildLibraryReply(r: (typeof LIBRARY)[number]): string {
  return [
    `🌿 ${r.title}`,
    `\n${r.desc}`,
    `\n\n⏱ ${r.time} min  •  🍽 ${r.servings} servings  •  ${r.tags}`,
    `\n\n📋 How to make it:\n${r.how}`,
    `\n\nLooks good? 😋 Ask me for another recipe or tell me more about what you have!`,
  ].join("")
}

function buildDbReply(
  title: string,
  desc: string | null,
  time: number,
  servings: number,
  tags: string[],
  steps: string[]
): string {
  const parts: string[] = []
  parts.push(`🌿 ${title}`)
  if (desc) parts.push(`\n${desc}`)
  parts.push(`\n\n⏱ ${time} min  •  🍽 ${servings} servings  •  ${tags.slice(0, 3).join(" • ")}`)
  if (steps.length > 0) {
    parts.push(`\n\n📋 How to make it:`)
    steps.forEach((s, i) => parts.push(`\n${i + 1}. ${s}`))
  }
  parts.push(`\n\nLooks tasty? 😋 Ask me for another or tell me more about what you have!`)
  return parts.join("")
}

export async function POST(req: Request) {
  let body: RequestBody
  try {
    body = (await req.json()) as RequestBody
  } catch {
    return NextResponse.json({
      reply: "What would you like to cook today? Tell me your ingredients! 🥦",
    })
  }

  const message = body.message?.trim()
  if (!message) {
    return NextResponse.json({
      reply: "Tell me what you have in the fridge and I'll find something delicious! 🥦",
    })
  }

  const keywords = tokenize(message)

  // ── 1. Try the real DB first ──────────────────────────────────────────────
  try {
    let dbRecipe = null

    if (keywords.length > 0) {
      const matches = await db.recipe.findMany({
        where: {
          isPublic: true,
          OR: [
            ...keywords.map((kw) => ({ title: { contains: kw, mode: "insensitive" as const } })),
            ...keywords.map((kw) => ({ description: { contains: kw, mode: "insensitive" as const } })),
            ...keywords.map((kw) => ({ tags: { has: kw } })),
          ],
        },
        take: 8,
        orderBy: { createdAt: "desc" },
      })
      if (matches.length > 0) {
        dbRecipe = matches[Math.floor(Math.random() * matches.length)]
      }
    }

    // Fall back to any public recipe if keyword search returned nothing
    if (!dbRecipe) {
      const all = await db.recipe.findMany({
        where: { isPublic: true },
        take: 1,
      })
      if (all.length > 0) {
        // DB has recipes but no keyword match — use in-memory matching below
        // (don't return a random unrelated DB recipe)
      }
    }

    if (dbRecipe) {
      const response = NextResponse.json({
        reply: buildDbReply(
          dbRecipe.title,
          dbRecipe.description,
          dbRecipe.timeMinutes,
          dbRecipe.servings,
          dbRecipe.tags,
          dbRecipe.steps
        ),
      })
      response.cookies.set("bro_used_free", "1", { path: "/", maxAge: 60 * 60 * 24 * 7, httpOnly: false })
      return response
    }
  } catch {
    // DB unavailable — fall through to in-memory library
  }

  // ── 2. Score in-memory library by ingredient overlap ─────────────────────
  const scored = LIBRARY.map((r) => ({ r, score: scoreLibraryRecipe(r, keywords) }))
    .sort((a, b) => b.score - a.score)

  // Pick the best match; if all scores are 0, pick a random recipe
  const best = scored[0].score > 0 ? scored[0].r : LIBRARY[Math.floor(Math.random() * LIBRARY.length)]

  const response = NextResponse.json({ reply: buildLibraryReply(best) })
  response.cookies.set("bro_used_free", "1", { path: "/", maxAge: 60 * 60 * 24 * 7, httpOnly: false })
  return response
}
