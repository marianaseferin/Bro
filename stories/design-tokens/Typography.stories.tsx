import type { Meta, StoryObj } from "@storybook/react"
import { tokens } from "../../design-system/tokens"

function TypographyScale() {
  const sizes = [
    ["size5xl", tokens.typography.size5xl, "Display — Big hero text"],
    ["size4xl", tokens.typography.size4xl, "H1 — Page title"],
    ["size3xl", tokens.typography.size3xl, "H2 — Section title"],
    ["size2xl", tokens.typography.size2xl, "H3 — Card title"],
    ["sizeXl", tokens.typography.sizeXl, "H4 — Sub-heading"],
    ["sizeLg", tokens.typography.sizeLg, "Large body text"],
    ["sizeMd", tokens.typography.sizeMd, "Body / default text"],
    ["sizeSm", tokens.typography.sizeSm, "Small — labels, captions"],
    ["sizeXs", tokens.typography.sizeXs, "XS — badges, tags"],
  ] as const

  return (
    <div className="p-8 space-y-6" style={{ background: tokens.colors.background, color: tokens.colors.foreground }}>
      <h1 className="font-bold" style={{ fontSize: tokens.typography.size2xl, marginBottom: "1rem" }}>
        Typography Scale
      </h1>
      {sizes.map(([key, size, label]) => (
        <div key={key} className="flex items-baseline gap-4 border-b border-gray-100 pb-4">
          <span
            className="font-semibold"
            style={{
              fontSize: size,
              lineHeight: tokens.typography.lineHeightTight,
              minWidth: 200,
            }}
          >
            {label}
          </span>
          <span className="text-xs text-gray-400 font-mono">{size} / {key}</span>
        </div>
      ))}
    </div>
  )
}

const meta: Meta<typeof TypographyScale> = {
  title: "Design Tokens/Typography",
  component: TypographyScale,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof meta>

export const Scale: Story = {}
