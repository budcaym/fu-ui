// .storybook/manager.js

import { addons } from "@storybook/addons"
import customTheme from "./customTheme"

addons.setConfig({
    previewTabs: {
        // canvas: {
        //     hidden: true,
        // },
        'storybook/docs/panel': {
            title: '文档'
        }
    },
    theme: customTheme,
    isFullscreen: false,
})
