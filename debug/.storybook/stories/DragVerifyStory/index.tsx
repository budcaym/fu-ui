import React, { useState } from "react"
import { storiesOf } from "@storybook/react"
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs"
import { Spin } from "antd"
import DragVerify, {
    DragVerifyProps,
} from "../../../../src/DragVerify"
// } from "../../../../es/DragVerify"
import { getRandomNumberByRange } from "../../../../src/utils/tools"
const StoriesType = "多媒体"

const subTitle = "/ DragVerify 人机认证"
/* storiesOf(StoriesType, module)
    .addDecorator(withKnobs)
    .add("图片验证", () => {
        let [loading, changeLoading] = useState(false)
        return (
            <section style={{ display: "flex", justifyContent: "center" }}>
                <Spin spinning={loading}>
                    <DragVerify
                        canvasWidth={560}
                        canvasHeight={280}
                        getImgSrc={getRandomImg}
                        changeLoading={changeLoading}
                    />
                </Spin>
            </section>
        )
    }) */
const DragVerifyDemo = (props: DragVerifyProps) => {
    let [loading, changeLoading] = useState(false),
        { canvasHeight, canvasWidth } = props
    return (
        <section style={{ display: "flex", justifyContent: "center" }}>
            <Spin spinning={loading}>
                <DragVerify
                    canvasWidth={canvasWidth}
                    canvasHeight={canvasHeight}
                    getImgSrc={getRandomImg}
                    changeLoading={changeLoading}
                />
            </Spin>
        </section>
    )
}
function getRandomImg() {
    return (
        "https://picsum.photos/500/250/?image=" +
        getRandomNumberByRange(0, 1024)
    )
}
export default {
    title: StoriesType + subTitle,
    component: DragVerifyDemo,
    argTypes: {
        canvasWidth: {
            control: "number",
            description: "图片的宽度（与滑动条同宽）",
            name: "canvasWidth",
        },
        canvasHeight: {
            control: "number",
            description: "图片的高度",
            name: "canvasHeight",
        },
        getImgSrc: { control: "text", name: "getImgSrc" },
    },
}

// 示例1
export const DragVerifyDemo1 = DragVerifyDemo.bind({})
DragVerifyDemo1.args = {
    canvasWidth: 560,
    canvasHeight: 280,
}
DragVerifyDemo1.docsName = "交互认证"
/* DragVerifyDemo1.parameters = {
    docs: {
        source: {
            code: `字符串`,
        },
    },
} */
