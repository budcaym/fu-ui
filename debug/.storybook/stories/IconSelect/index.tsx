import React, { useState, useCallback } from "react"
import { SmileOutlined, PayCircleOutlined } from "@ant-design/icons"
import IconSelect, { itemArrType } from "../../../../src/IconSelect"
const StoriesType = "数据输入"
const subTitle = "/ IconSelect 图片选项"

const itemArr: itemArrType[] = [
    {
        value: "value1",
        icon: "https://picsum.photos/500/250/?image=2",
    },
    {
        value: "value2",
        icon: "https://picsum.photos/500/250/?image=3",
    },
    {
        value: "value3",
        icon: "https://picsum.photos/500/250/?image=4",
    },
]
const IconSelectDemo = (props) => {
    let [index, changeIndex] = useState(0),
        onChange = useCallback(
            (item, i) => {
                if (index === i) {
                    return
                }
                changeIndex(i)
            },
            [index]
        )
    return <IconSelect itemArr={itemArr} index={index} onChange={onChange} size={120} itemStyle={{
        marginLeft: 20
    }}/>
}
export default {
    title: StoriesType + subTitle,
    component: IconSelectDemo,
    argTypes: {
        index: {
            description: "当前选中项索引",
            name: "index",
        },
        itemArr: {
            name: "itemArr",
            description: `所有Tabs需要展示的数据
                Array<{ <br/>
                    value: string | number   <br/>
                    icon: string(http url)
                }>`,
        },
        onChange: {
            name: "onChange",
            description: "Function(item: typeof itemArr[i], i: number)",
        },
    },
}

// 示例1
export const IconSelectDemo1 = IconSelectDemo.bind({})
IconSelectDemo1.args = {
    index: 0,
}
IconSelectDemo1.docsName = "交互认证"
/* DragVerifyDemo1.parameters = {
    docs: {
        source: {
            code: `字符串`,
        },
    },
} */
