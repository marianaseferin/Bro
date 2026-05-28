import type { Meta, StoryObj } from "@storybook/react"
import { tokens } from "../../design-system/tokens"

function ColorSwatch({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex flex-col items-start gap-2 min-w-32">
      <div
        className="h-16 w-full rounded-lg border border-black/10 shadow-sm"
        style={{ background: value }}
      />
      <div>
        <p className="text-xs font-semibold text-gray-700">{name}</p>
        <p className="text-xs text-gray-400 font-mono">{value}</p>
      </div>
    </div>
  )
}

function ColorGrid() {
  return (
    <div className="p-6 space-y-8" style={{ background: tokens.colors.background }}>
      <div>
        <h2 className="text-lg font-bold mb-4" style={{ color: tokens.colors.foreground }}>
          Design Tokens — Colors
        </h2>
        <div className="flex flex-wrap gap-4">
          {Object.entries(tokens.colors).map(([key, value]) => (
            <ColorSwatch key={key} name={key} value={value} />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold mb-4" style={{ color: tokens.colors.foreground }}>
          Sidebar Colors
        </h2>
        <div className="flex flex-wrap gap-4">
          {Object.entries(tokens.sidebar).map(([key, value]) => (
            <ColorSwatch key={key} name={key} value={value} />
          ))}
        </div>
      </div>
    </div>
  )
}

const meta: Meta<typeof ColorGrid> = {
  title: "Design Tokens/Colors",
  component: ColorGrid,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof meta>

export const All: Story = {}
