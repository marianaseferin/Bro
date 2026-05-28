import type { Meta, StoryObj } from "@storybook/react"
import { PaywallGate } from "../../components/paywall/PaywallGate"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"

function SampleContent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Habit tracking</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">Your 7-day streak, weekly progress, and monthly goals appear here.</p>
        <div className="mt-4 h-24 rounded-lg bg-muted animate-pulse" />
      </CardContent>
    </Card>
  )
}

const meta: Meta<typeof PaywallGate> = {
  title: "Components/PaywallGate",
  component: PaywallGate,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
}

export default meta
type Story = StoryObj<typeof meta>

export const Locked: Story = {
  args: {
    locked: true,
    title: "Track your habits",
    description: "Habit tracking is available on trial and Pro plans.",
    children: <SampleContent />,
  },
}

export const Unlocked: Story = {
  args: {
    locked: false,
    children: <SampleContent />,
  },
}
