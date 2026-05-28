import type { Preview } from "@storybook/react"
import "../app/globals.css"
import { tokens } from "../design-system/tokens"

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: tokens.colors.background },
        { name: "dark", value: "#111a0e" },
        { name: "card", value: tokens.colors.card },
        { name: "sidebar", value: tokens.sidebar.background },
      ],
    },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },
    layout: "centered",
  },
}

export default preview
