import React from 'react'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN'
import 'antd/dist/antd.min.css'
import '../../src/allStyle/index.scss'
export const parameters = {
    controls: { expanded: true },
    layout: "centered",
    viewMode: 'docs',
    showCanvas: false
}

export const decorators = [
    (Story) => (
        <ConfigProvider locale={zhCN}>
            <Story />
        </ConfigProvider>
    ),
]
