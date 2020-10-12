import React, { useState, useCallback } from "react"
import { SmileOutlined, PayCircleOutlined } from "@ant-design/icons"
import Tabs, { MenuArrType } from "../../../../src/Tabs"
const StoriesType = "数据展示"
const subTitle = "/ Tabs 选项标签"

const itemArr: MenuArrType[] = [
    {
        value: "1",
        name: "杭州",
        icon: () => <SmileOutlined />,
    },
    {
        value: "2",
        name: "上海",
        icon: () => <PayCircleOutlined />,
    },
    {
        value: "3",
        name: "南京",
        icon: () => <PayCircleOutlined />,
    },
]
const DragVerifyDemo = (props) => {
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
    return <Tabs index={index} itemArr={itemArr} onChange={onChange}></Tabs>
}
export default {
    title: StoriesType + subTitle,
    component: DragVerifyDemo,
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
                    selectIcon: () => ReactElement <br/>
                    icon: () => ReactElement <br/>
                    name: string | number | never <br/>
                }>`,
        },
        onChange: {
            name: "onChange",
            description: "Function(item: typeof itemArr[i], i: number)",
        },
    },
}

// 示例1
export const DragVerifyDemo1 = DragVerifyDemo.bind({})
DragVerifyDemo1.args = {
    index: 0,
}
DragVerifyDemo1.docsName = "交互认证"
/* DragVerifyDemo1.parameters = {
    docs: {
        source: {
            code: `字符串`,
        },
    },
} */
