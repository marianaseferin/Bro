import type { Meta, StoryObj } from "@storybook/react"
import { tokens } from "../../design-system/tokens"

function SpacingScale() {
  return (
    <div className="p-8 space-y-4" style={{ background: tokens.colors.background, color: tokens.colors.foreground }}>
      <h1 className="font-bold" style={{ fontSize: tokens.typography.size2xl, marginBottom: "1rem" }}>
        Spacing Scale
      </h1>
      {Object.entries(tokens.spacing).map(([key, value]) => (
        <div key={key} className="flex items-center gap-4">
          <span className="w-10 text-sm font-mono text-right">{key}</span>
          <div
            style={{
              width: value,
              height: "1.5rem",
              background: tokens.colors.primary,
              borderRadius: "4px",
              minWidth: "4px",
            }}
          />
          <span className="text-xs text-gray-400 font-mono">{value}</span>
        </div>
      ))}
      <div className="pt-4">
        <h2 className="font-semibold mb-2" style={{ fontSize: tokens.typography.sizeLg }}>
          Border Radius
        </h2>
        <div className="flex gap-4 items-end">
          {["0.25rem", "0.5rem", tokens.radius, "1rem", "1.5rem"].map((r) => (
            <div key={r} className="flex flex-col items-center gap-1">
              <div
                style={{
                  width: "4rem",
                  height: "4rem",
                  background: tokens.colors.secondary,
                  borderRadius: r,
                  border: `2px solid ${tokens.colors.border}`,
                }}
              />
              <span className="text-xs text-gray-400 font-mono">{r}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const meta: Meta<typeof SpacingScale> = {
  title: "Design Tokens/Spacing",
  component: SpacingScale,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof meta>

export const Scale: Story = {}
