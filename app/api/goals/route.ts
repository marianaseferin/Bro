import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { GoalCreateSchema, GoalUpdateSchema } from "@/lib/validations"
import { hasAccess } from "@/lib/subscription"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const goals = await db.goal.findMany({
    where: { userId: session.user.id },
    orderBy: { startDate: "desc" },
  })

  return NextResponse.json(goals)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const user = await db.user.findUnique({ where: { id: session.user.id } })
  if (!user || !hasAccess(user)) {
    return NextResponse.json({ error: "UPGRADE_REQUIRED" }, { status: 403 })
  }

  const body = await req.json()
  const parsed = GoalCreateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const goal = await db.goal.create({
    data: { userId: user.id, ...parsed.data },
  })

  return NextResponse.json(goal, { status: 201 })
}

export async function PATCH(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const goalId = searchParams.get("id")
  if (!goalId) return NextResponse.json({ error: "Missing goal id" }, { status: 400 })

  const body = await req.json()
  const parsed = GoalUpdateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const goal = await db.goal.updateMany({
    where: { id: goalId, userId: session.user.id },
    data: parsed.data,
  })

  return NextResponse.json(goal)
}
