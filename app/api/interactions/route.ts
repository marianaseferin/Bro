import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { InteractionSchema } from "@/lib/validations"

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const parsed = InteractionSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const interaction = await db.interaction.create({
    data: {
      userId: session.user.id,
      suggestionId: parsed.data.suggestionId,
      action: parsed.data.action,
    },
  })

  return NextResponse.json(interaction, { status: 201 })
}
