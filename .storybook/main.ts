import type { StorybookConfig } from "@storybook/web-components-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-a11y",
    {
      name: '@storybook/addon-essentials',
      options: {
        docs: 'iframe'
      }
    }
  ],

  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },

};
export default config;
