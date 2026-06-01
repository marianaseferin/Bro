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

// More explicit: Gemini must use the ingredients the user listed
const SYSTEM_PROMPT = `You are Bro, a fun and friendly plant-based cooking companion.

Your #1 rule: when the user lists ingredients, suggest a recipe that USES those specific ingredients as the main components. Never suggest a recipe that ignores the ingredients they mentioned.

You may assume common pantry staples are available (salt, pepper, olive oil, water, garlic, onion, basic spices) even if not mentioned.

Format your response EXACTLY like this:
🌿 [Recipe Name]
[One-line description]

⏱ [X] min  •  🍽 [Y] servings  •  [tag1 • tag2]

📋 How to make it:
1. [Step 1]
2. [Step 2]
3. [Step 3]

[One short encouraging line + offer to suggest another]

Other rules:
- Always 100% plant-based and vegan
- Be warm, playful, and encouraging
- Under 200 words total
- Respond in the same language the user writes in (Portuguese, English, etc.)
- If the user hasn’t listed any ingredients yet, ask what they have before suggesting`

function buildGeminiContents(history: ChatMessage[], message: string) {
  const contents: { role: string; parts: { text: string }[] }[] = []
  let i = 0
  while (i < history.length) {
    if (history[i].role === "user") {
      contents.push({ role: "user", parts: [{ text: history[i].content }] })
      if (i + 1 < history.length && history[i + 1].role === "bro") {
        contents.push({ role: "model", parts: [{ text: history[i + 1].content }] })
        i += 2
      } else {
        i += 1
      }
    } else {
      i += 1
    }
  }
  contents.push({ role: "user", parts: [{ text: message }] })
  return contents
}

async function askGemini(
  message: string,
  history: ChatMessage[]
): Promise<{ text: string; model: string } | null> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) return null

  const models = [
    "gemini-2.0-flash",
    "gemini-2.0-flash-exp",
    "gemini-1.5-flash-latest",
    "gemini-1.5-flash",
  ]

  for (const model of models) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents: buildGeminiContents(history, message),
            generationConfig: { maxOutputTokens: 600, temperature: 0.8 },
          }),
        }
      )
      if (!res.ok) {
        const err = await res.text()
        console.error(`[chat] Gemini ${model} error ${res.status}:`, err)
        continue
      }
      const data = (await res.json()) as {
        candidates?: Array<{ content: { parts: Array<{ text: string }> } }>
      }
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text
      if (text) return { text, model }
    } catch (e) {
      console.error(`[chat] Gemini ${model} threw:`, e)
      continue
    }
  }
  return null
}

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
    const data = (await res.json()) as { content?: Array<{ type: string; text: string }> }
    return data.content?.find((b) => b.type === "text")?.text ?? null
  } catch {
    return null
  }
}

// In-memory fallback — only used when no AI key is set
const LIBRARY = [
  { title: "Crispy Tofu Stir-Fry", keys: ["tofu", "broccoli", "soy", "stir", "fry", "asian", "garlic", "pepper"], time: 20, servings: 2, tags: "quick • high-protein • vegan", desc: "Golden crispy tofu with broccoli in savory soy sauce.", how: "1. Press & cube tofu, pan-fry until golden.\n2. Stir-fry broccoli + garlic.\n3. Return tofu, add soy sauce, toss. Serve over rice." },
  { title: "Spiced Chickpea Curry", keys: ["chickpea", "chickpeas", "spinach", "tomato", "curry", "turmeric", "cumin", "indian"], time: 25, servings: 4, tags: "comfort • high-protein • vegan", desc: "Warming, protein-packed curry ready in 25 minutes.", how: "1. Sauté onion + garlic.\n2. Add cumin, turmeric, paprika — stir 1 min.\n3. Add chickpeas + tomatoes, simmer 10 min.\n4. Stir in spinach. Serve with rice." },
  { title: "Roasted Veggie Buddha Bowl", keys: ["roast", "veggie", "quinoa", "bowl", "sweet potato", "broccoli", "avocado"], time: 35, servings: 2, tags: "whole-foods • vegan • meal-prep", desc: "Colorful bowl with roasted veggies, quinoa, and tahini.", how: "1. Roast sweet potato, broccoli & pepper at 200°C 25 min.\n2. Cook quinoa.\n3. Assemble with avocado. Drizzle tahini + lemon." },
  { title: "Black Bean Tacos", keys: ["black bean", "beans", "taco", "avocado", "cilantro", "mexican", "tortilla"], time: 15, servings: 2, tags: "quick • comfort • vegan", desc: "Quick and satisfying tacos with spiced black beans.", how: "1. Heat black beans with cumin, paprika & garlic 5 min.\n2. Warm tortillas.\n3. Fill with beans, avocado, tomato & cilantro." },
  { title: "Mushroom & Lentil Bolognese", keys: ["mushroom", "lentil", "lentils", "pasta", "bolognese", "tomato", "italian"], time: 40, servings: 4, tags: "comfort • high-protein • vegan", desc: "Hearty plant-based pasta sauce.", how: "1. Brown mushrooms 8 min.\n2. Add onion, garlic, carrot.\n3. Add lentils + tomatoes + 500ml water. Simmer 20 min. Serve over pasta." },
  { title: "Garlic Pasta with Spinach", keys: ["pasta", "garlic", "spinach", "olive oil", "quick", "spaghetti"], time: 15, servings: 2, tags: "quick • simple • vegan", desc: "Simple, garlicky pasta with wilted spinach.", how: "1. Cook pasta; reserve 1 cup water.\n2. Sauté garlic in olive oil.\n3. Add spinach, wilt. Toss pasta + water. Season." },
  { title: "Quick Fried Rice", keys: ["rice", "fried", "soy", "carrot", "peas", "asian", "leftover", "garlic"], time: 15, servings: 2, tags: "quick • asian • vegan", desc: "Best use of leftover rice — 15 minutes.", how: "1. Heat oil high; add garlic + veg.\n2. Add cold rice, fry 3 min.\n3. Add soy sauce, toss." },
  { title: "Lentil Soup", keys: ["lentil", "lentils", "soup", "carrot", "potato", "vegetable", "warm"], time: 30, servings: 4, tags: "comfort • high-protein • vegan", desc: "Warming, filling soup.", how: "1. Sauté onion, carrot, celery.\n2. Add lentils + potato + tomatoes + 1L stock.\n3. Simmer 20 min. Season with cumin + lemon." },
  { title: "Avocado & Chickpea Toast", keys: ["avocado", "bread", "toast", "chickpea", "breakfast"], time: 10, servings: 1, tags: "quick • breakfast • vegan", desc: "Upgraded avocado toast with crispy chickpeas.", how: "1. Toast bread.\n2. Mash avocado with lemon.\n3. Pan-fry chickpeas with paprika. Top toast." },
  { title: "Banana Oat Smoothie Bowl", keys: ["banana", "oat", "oats", "smoothie", "breakfast", "fruit"], time: 5, servings: 1, tags: "breakfast • quick • vegan", desc: "Thick smoothie bowl in 5 minutes.", how: "1. Blend frozen banana + oats + coconut milk.\n2. Pour into bowl.\n3. Top with fruit + nuts." },
]

const STOP_WORDS = new Set([
  "i","have","the","a","an","and","or","with","some","want","to","eat","make",
  "cook","what","can","do","me","my","is","are","use","in","of","for","that",
  "it","at","on","be","this","but","not","from","by","you","how","any","just",
  "also","get","need","something","please","would","like","help","suggest",
  "recipe","recipes","idea","ideas",
  // Portuguese
  "eu","tenho","quero","fazer","comer","uma","um","com","que","para","tem",
  "meu","minha","gostaria","posso","pode","como","estou","ainda","nao",
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

export async function POST(req: Request) {
  let body: RequestBody
  try {
    body = (await req.json()) as RequestBody
  } catch {
    return NextResponse.json({ reply: "What would you like to cook? Tell me your ingredients! 🥦", _source: "error" })
  }

  const message = body.message?.trim()
  const history = body.history ?? []
  if (!message) {
    return NextResponse.json({ reply: "Tell me what you have and I’ll find something delicious! 🥦", _source: "empty" })
  }

  // 1. Gemini (free)
  const gemini = await askGemini(message, history)
  if (gemini) {
    const res = NextResponse.json({ reply: gemini.text, _source: `gemini:${gemini.model}` })
    res.cookies.set("bro_used_free", "1", { path: "/", maxAge: 60 * 60 * 24 * 7, httpOnly: false })
    return res
  }

  // 2. Claude (paid, optional)
  const claudeReply = await askClaude(message, history)
  if (claudeReply) {
    const res = NextResponse.json({ reply: claudeReply, _source: "claude" })
    res.cookies.set("bro_used_free", "1", { path: "/", maxAge: 60 * 60 * 24 * 7, httpOnly: false })
    return res
  }

  // 3. Database
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
        const res = NextResponse.json({ reply, _source: "db" })
        res.cookies.set("bro_used_free", "1", { path: "/", maxAge: 60 * 60 * 24 * 7, httpOnly: false })
        return res
      }
    }
  } catch {
    // DB unavailable
  }

  // 4. In-memory fallback
  const keywords = tokenize(message)
  const match = bestLibraryMatch(keywords)
  const reply = `🌿 ${match.title}\n${match.desc}\n\n⏱ ${match.time} min  •  🍽 ${match.servings} servings  •  ${match.tags}\n\n📋 How to make it:\n${match.how}\n\nLooks good? 😋 Tell me your ingredients and I’ll find something more specific!`
  const res = NextResponse.json({ reply, _source: "library" })
  res.cookies.set("bro_used_free", "1", { path: "/", maxAge: 60 * 60 * 24 * 7, httpOnly: false })
  return res
}
