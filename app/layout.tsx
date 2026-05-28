import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "BroCook — Eating better can be easier than you think",
    template: "%s | BroCook",
  },
  description:
    "A daily companion that helps you transition to a more conscious, plant-based lifestyle.",
  keywords: ["plant-based", "recipes", "nutrition", "healthy eating", "vegan"],
  openGraph: {
    title: "BroCook",
    description: "Your plant-based food companion",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
