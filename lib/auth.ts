import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import { db } from "@/lib/db"
import { daysFromNow } from "@/lib/utils"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY!,
      from: process.env.RESEND_FROM_EMAIL ?? "noreply@brocook.app",
    }),
  ],
  session: { strategy: "database" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id
      session.user.plan = (user as { plan?: string }).plan ?? "FREE"
      session.user.trialEndsAt = (user as { trialEndsAt?: Date }).trialEndsAt ?? null
      return session
    },
  },
  events: {
    async createUser({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          plan: "TRIAL",
          trialEndsAt: daysFromNow(14),
        },
      })
    },
  },
})
