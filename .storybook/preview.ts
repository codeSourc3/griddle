import type { Preview } from "@storybook/web-components";
import { html } from "lit";

const preview: Preview = {
  
  parameters: {
    docs: {
      inlineStories: false,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ["autodocs"],
  decorators: [(story) => html`<div style="display: revert">${story()}</div>`]
};

export default preview;
