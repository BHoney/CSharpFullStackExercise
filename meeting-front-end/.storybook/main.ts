import type {StorybookConfig} from "@storybook/nextjs";

const config: StorybookConfig = {
    stories: [
        "../components/**/*.stories.@(ts|tsx|js|jsx|tsx)",
        "../stories/**/*.mdx",
        "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    ],
    addons: [
        "@storybook/addon-onboarding",
        "@storybook/addon-essentials",
        "@chromatic-com/storybook",
        "@storybook/addon-interactions",
        "@storybook/addon-styling-webpack"
    ],
    framework: {
        name: "@storybook/nextjs",
        options: {},
    },
    staticDirs: ["../public"],
};
export default config;
