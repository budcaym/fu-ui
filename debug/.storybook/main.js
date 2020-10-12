const path = require("path")
module.exports = {
    stories: ["./stories/**/*.tsx"],
    logLevel: "debug",
    addons: [
        {
            name: "@storybook/addon-docs",
           /*  options: {
                sourceLoaderOptions: null
            } */
        },
        "@storybook/addon-controls",
        // "@storybook/addon-knobs", // 也是参数动态设置的addons
        "@storybook/preset-scss",
    ],
    /* webpackFinal: (config) => {
    } */
}
