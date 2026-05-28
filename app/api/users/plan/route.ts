import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { createCheckoutSession, createCustomerPortalSession } from "@/lib/stripe"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      plan: true,
      trialEndsAt: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
    },
  })

  return NextResponse.json(user)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL!

  if (body.action === "checkout") {
    const checkoutSession = await createCheckoutSession({
      userId: session.user.id,
      email: session.user.email!,
      priceId: process.env.STRIPE_PRICE_ID_PRO!,
      successUrl: `${appUrl}/settings/billing?success=1`,
      cancelUrl: `${appUrl}/pricing`,
    })
    return NextResponse.json({ url: checkoutSession.url })
  }

  if (body.action === "portal") {
    const user = await db.user.findUnique({ where: { id: session.user.id } })
    if (!user?.stripeCustomerId) {
      return NextResponse.json({ error: "No billing account" }, { status: 400 })
    }
    const portalSession = await createCustomerPortalSession({
      customerId: user.stripeCustomerId,
      returnUrl: `${appUrl}/settings/billing`,
    })
    return NextResponse.json({ url: portalSession.url })
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 })
}
