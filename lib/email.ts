import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendWelcomeEmail({
  to,
  name,
}: {
  to: string
  name: string
}) {
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "noreply@brocook.app",
    to,
    subject: "Welcome to BroCook! 🥦",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2f6b3e;">Hey ${name}, welcome to BroCook!</h1>
        <p>Your 14-day free trial has started. Explore all features and start your plant-based journey.</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard"
           style="background:#2f6b3e;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;margin-top:16px;">
          Start cooking
        </a>
        <p style="color:#547849;margin-top:24px;font-size:14px;">Your Bro companion is ready to help. 🥦</p>
      </div>
    `,
  })
}

export async function sendTrialEndingEmail({
  to,
  name,
  daysLeft,
}: {
  to: string
  name: string
  daysLeft: number
}) {
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "noreply@brocook.app",
    to,
    subject: `Your BroCook trial ends in ${daysLeft} day${daysLeft !== 1 ? "s" : ""}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2f6b3e;">Hey ${name}!</h1>
        <p>Your trial ends in <strong>${daysLeft} day${daysLeft !== 1 ? "s" : ""}</strong>. Don't lose access to your recipes and habits.</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/pricing"
           style="background:#e8a020;color:#1c2b18;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;margin-top:16px;">
          Upgrade to Pro
        </a>
      </div>
    `,
  })
}
