import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "../../components/ui/button"
import { Sparkles, Zap } from "lucide-react"

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link", "accent"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "xl", "icon"],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { children: "Cook with Bro" } }

export const Accent: Story = {
  args: { children: "Upgrade to Pro", variant: "accent" },
}

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Sparkles className="h-4 w-4" />
        Get suggestions
      </>
    ),
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-4">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="accent">
        <Zap className="h-4 w-4" /> Accent
      </Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-3 p-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
}
