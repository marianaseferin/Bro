import type { Meta, StoryObj } from "@storybook/react"
import { TrialBanner } from "../../components/layout/TrialBanner"

const meta: Meta<typeof TrialBanner> = {
  title: "Components/TrialBanner",
  component: TrialBanner,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    daysLeft: { control: { type: "range", min: 0, max: 14 } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const ManyDaysLeft: Story = { args: { daysLeft: 12 } }
export const FewDaysLeft: Story = { args: { daysLeft: 3 } }
export const LastDay: Story = { args: { daysLeft: 1 } }
