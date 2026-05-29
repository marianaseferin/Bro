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

const SYSTEM_PROMPT = `You are Bro, a friendly, fun, and energetic plant-based cooking companion.
When someone tells you their ingredients or what they're craving, suggest ONE specific plant-based/vegan recipe.

Format your response EXACTLY like this:
🌿 [Recipe Name]
[One-line description]

⏱ [X] min  •  🍽 [Y] servings  •  [tag1 • tag2 • tag3]

📋 How to make it:
1. [Step 1]
2. [Step 2]
3. [Step 3]

[One short encouraging line + offer to suggest another recipe]

Rules:
- Always 100% plant-based and vegan
- Be warm, playful, and encouraging
- Keep the whole response under 200 words
- If no ingredients were listed, ask what they have before suggesting
- You can answer follow-up questions about substitutions, tips, etc.`

// ---------------------------------------------------------------------------
// Google Gemini (FREE tier — 1 500 req/day, no credit card needed)
// ---------------------------------------------------------------------------
async function askGemini(
  message: string,
  history: ChatMessage[]
): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) return null

  const contents = [
    ...history.slice(-8).map((m) => ({
      role: m.role === "bro" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
    { role: "user", parts: [{ text: message }] },
  ]

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: { maxOutputTokens: 600, temperature: 0.8 },
        }),
      }
    )
    if (!res.ok) return null
    const data = (await res.json()) as {
      candidates?: Array<{ content: { parts: Array<{ text: string }> } }>
    }
    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? null
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Anthropic Claude (paid, better quality — optional upgrade)
// ---------------------------------------------------------------------------
async function askClaude(
  message: string,
  history: ChatMessage[]
): Promise<string | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return null

  const messages = [
    ...history.slice(-8).map((m) => ({
      role: m.role === "bro" ? "assistant" : "user",
      content: m.content,
    })),
    { role: "user", content: message },
  ]

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 600,
        system: SYSTEM_PROMPT,
        messages,
      }),
    })
    if (!res.ok) return null
    const data = (await res.json()) as {
      content?: Array<{ type: string; text: string }>
    }
    return data.content?.find((b) => b.type === "text")?.text ?? null
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// In-memory recipe library — always available (no API key / empty DB)
// ---------------------------------------------------------------------------
const LIBRARY = [
  {
    title: "Crispy Tofu Stir-Fry",
    keys: ["tofu", "broccoli", "soy", "sauce", "stir", "fry", "asian", "garlic", "pepper"],
    time: 20, servings: 2, tags: "quick • high-protein • vegan",
    desc: "Golden crispy tofu with broccoli in savory soy sauce.",
    how: "1. Press & cube tofu, pan-fry until golden.\n2. Remove. Stir-fry broccoli + garlic.\n3. Return tofu, add soy sauce, toss. Serve over rice.",
  },
  {
    title: "Spiced Chickpea & Spinach Curry",
    keys: ["chickpea", "chickpeas", "spinach", "tomato", "curry", "turmeric", "cumin", "indian"],
    time: 25, servings: 4, tags: "comfort • high-protein • vegan",
    desc: "Warming, protein-packed curry ready in 25 minutes.",
    how: "1. Sauté onion + garlic.\n2. Add cumin, turmeric, paprika — stir 1 min.\n3. Add chickpeas + canned tomatoes, simmer 10 min.\n4. Stir in spinach. Serve with rice.",
  },
  {
    title: "Roasted Veggie Buddha Bowl",
    keys: ["roast", "vegetable", "veggie", "quinoa", "bowl", "sweet potato", "broccoli", "avocado"],
    time: 35, servings: 2, tags: "whole-foods • vegan • meal-prep",
    desc: "Colorful bowl with roasted veggies, quinoa, and tahini dressing.",
    how: "1. Roast sweet potato, broccoli & bell pepper at 200°C / 25 min.\n2. Cook quinoa.\n3. Assemble: quinoa, roasted veggies, avocado.\n4. Drizzle tahini + lemon.",
  },
  {
    title: "Black Bean Tacos",
    keys: ["black bean", "beans", "bean", "taco", "avocado", "cilantro", "mexican", "tortilla"],
    time: 15, servings: 2, tags: "quick • comfort • vegan",
    desc: "Quick and satisfying tacos with spiced black beans and avocado.",
    how: "1. Heat black beans with cumin, paprika & garlic for 5 min.\n2. Warm tortillas.\n3. Fill with beans, avocado, tomato & cilantro. Squeeze lemon.",
  },
  {
    title: "Mushroom & Lentil Bolognese",
    keys: ["mushroom", "lentil", "lentils", "pasta", "bolognese", "tomato", "italian"],
    time: 40, servings: 4, tags: "comfort • high-protein • vegan",
    desc: "Hearty plant-based pasta sauce. Nobody misses the meat.",
    how: "1. Brown mushrooms in olive oil 8 min.\n2. Add onion, garlic, carrot.\n3. Add lentils + tomatoes + 500ml water. Simmer 20 min.\n4. Serve over pasta.",
  },
  {
    title: "Garlic Pasta with Spinach",
    keys: ["pasta", "garlic", "spinach", "olive oil", "simple", "quick", "spaghetti"],
    time: 15, servings: 2, tags: "quick • simple • vegan",
    desc: "Simple, garlicky pasta with wilted spinach. 15-minute magic.",
    how: "1. Cook pasta; reserve 1 cup pasta water.\n2. Sauté lots of garlic in olive oil.\n3. Add spinach, wilt.\n4. Toss pasta + pasta water. Season well.",
  },
  {
    title: "Quick Fried Rice",
    keys: ["rice", "fried", "soy", "carrot", "peas", "asian", "quick", "leftover", "garlic"],
    time: 15, servings: 2, tags: "quick • asian • vegan",
    desc: "The best use of leftover rice — ready in 15 minutes.",
    how: "1. Heat oil on high; add garlic + any veg (carrot, peas, pepper).\n2. Add cold rice, fry 3 min.\n3. Add soy sauce, toss everything.",
  },
  {
    title: "Lentil & Vegetable Soup",
    keys: ["lentil", "lentils", "soup", "carrot", "potato", "vegetable", "warm", "winter"],
    time: 30, servings: 4, tags: "comfort • high-protein • vegan",
    desc: "Warming, filling soup that gets better the next day.",
    how: "1. Sauté onion, carrot, celery with garlic.\n2. Add lentils + potato + tomatoes + 1L stock.\n3. Simmer 20 min. Season with cumin + lemon.",
  },
  {
    title: "Avocado & Chickpea Toast",
    keys: ["avocado", "bread", "toast", "chickpea", "chickpeas", "breakfast", "quick"],
    time: 10, servings: 1, tags: "quick • breakfast • vegan",
    desc: "Upgraded avocado toast with crispy chickpeas for protein.",
    how: "1. Toast bread.\n2. Mash avocado with lemon, salt & pepper.\n3. Pan-fry chickpeas with paprika until crispy.\n4. Pile avocado on toast, top with chickpeas.",
  },
  {
    title: "Banana Oat Smoothie Bowl",
    keys: ["banana", "oat", "oats", "smoothie", "breakfast", "fruit", "coconut"],
    time: 5, servings: 1, tags: "breakfast • quick • vegan",
    desc: "Thick, creamy smoothie bowl — 5-minute breakfast upgrade.",
    how: "1. Blend 2 frozen bananas + ½ cup oats + coconut milk until thick.\n2. Pour into bowl.\n3. Top with fresh fruit, walnuts, and peanut butter drizzle.",
  },
]

const STOP_WORDS = new Set([
  "i","have","the","a","an","and","or","with","some","want","to","eat","make",
  "cook","what","can","do","me","my","is","are","use","using","in","of","for",
  "that","it","at","on","be","this","but","not","from","by","they","we","he",
  "she","you","how","any","just","also","get","got","need","something","anything",
  "please","would","like","help","suggest","recipe","recipes","idea","ideas",
])

function tokenize(text: string): string[] {
  return text.toLowerCase().replace(/[^a-z\s]/g, " ").split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w))
}

function bestLibraryMatch(keywords: string[]) {
  if (keywords.length === 0) return LIBRARY[Math.floor(Math.random() * LIBRARY.length)]
  const scored = LIBRARY.map((r) => {
    let score = 0
    for (const kw of keywords)
      for (const rk of r.keys) {
        if (rk === kw) score += 4
        else if (rk.includes(kw) || kw.includes(rk)) score += 2
        else if (rk.startsWith(kw.slice(0, 4)) && kw.length >= 4) score += 1
      }
    return { r, score }
  }).sort((a, b) => b.score - a.score)
  return scored[0].score > 0 ? scored[0].r : LIBRARY[Math.floor(Math.random() * LIBRARY.length)]
}

function libraryReply(r: (typeof LIBRARY)[number]): string {
  return `🌿 ${r.title}\n${r.desc}\n\n⏱ ${r.time} min  •  🍽 ${r.servings} servings  •  ${r.tags}\n\n📋 How to make it:\n${r.how}\n\nLooks good? 😋 Tell me more ingredients and I can find something else!`
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------
export async function POST(req: Request) {
  let body: RequestBody
  try {
    body = (await req.json()) as RequestBody
  } catch {
    return NextResponse.json({ reply: "What would you like to cook today? Tell me your ingredients! 🥦" })
  }

  const message = body.message?.trim()
  const history = body.history ?? []

  if (!message) {
    return NextResponse.json({ reply: "Tell me what you have in the fridge and I'll find something delicious! 🥦" })
  }

  // 1. Try Gemini (free)
  const geminiReply = await askGemini(message, history)
  if (geminiReply) {
    const res = NextResponse.json({ reply: geminiReply })
    res.cookies.set("bro_used_free", "1", { path: "/", maxAge: 60 * 60 * 24 * 7, httpOnly: false })
    return res
  }

  // 2. Try Claude (paid, optional)
  const claudeReply = await askClaude(message, history)
  if (claudeReply) {
    const res = NextResponse.json({ reply: claudeReply })
    res.cookies.set("bro_used_free", "1", { path: "/", maxAge: 60 * 60 * 24 * 7, httpOnly: false })
    return res
  }

  // 3. Try database
  try {
    const keywords = tokenize(message)
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
      })
      if (matches.length > 0) {
        const r = matches[Math.floor(Math.random() * matches.length)]
        const steps = r.steps.map((s, i) => `${i + 1}. ${s}`).join("\n")
        const reply = `🌿 ${r.title}\n${r.description ?? ""}\n\n⏱ ${r.timeMinutes} min  •  🍽 ${r.servings} servings  •  ${r.tags.slice(0, 3).join(" • ")}\n\n📋 How to make it:\n${steps}\n\nLooks tasty? 😋 Ask me for another!`
        const res = NextResponse.json({ reply })
        res.cookies.set("bro_used_free", "1", { path: "/", maxAge: 60 * 60 * 24 * 7, httpOnly: false })
        return res
      }
    }
  } catch {
    // DB unavailable — fall through
  }

  // 4. In-memory fallback
  const keywords = tokenize(message)
  const match = bestLibraryMatch(keywords)
  const res = NextResponse.json({ reply: libraryReply(match) })
  res.cookies.set("bro_used_free", "1", { path: "/", maxAge: 60 * 60 * 24 * 7, httpOnly: false })
  return res
}
