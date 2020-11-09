import React, { useState } from "react";
import BothwaySlider from "../../../../src/BothwaySlider";
const StoriesType = "数据展示";

const subTitle = "/ ImageList 滑动输入条加强版";
const BothwaySliderDemo = (props) => {
    const { value, max, min } = props;
    const [demoValue, setValue] = useState(value);
    const onChange = (value) => {
        setValue(value);
    };
    return (
        <BothwaySlider
            value={demoValue}
            onChange={onChange}
            max={max}
            min={min}
        ></BothwaySlider>
    );
};

export default {
    title: StoriesType + subTitle,
    component: BothwaySliderDemo,
    argTypes: {
        value: {
            name: "value",
            description: "滑动条的值",
            defaultValue: '0',
            table: {
                type: { summary: "number" },
            },
        },
        max: {
            name: "max",
            description: `
            最大值
            `,
            defaultValue: '100',
            table: {
                type: { summary: "number" },
            },
        },
        min: {
            name: "min",
            description: `
            最小值
            `,
            defaultValue: '-100',
            table: {
                type: { summary: "number" },
            },
        },
        onChange: {
            name: "onChange",
            description: `
            Function(value: number)
            值改变时的回调
            `,
        },
    },
};
export const BothwaySliderDemo1 = BothwaySliderDemo.bind({});

BothwaySliderDemo1.args = {
    value: 0,
    max: 100,
    min: -100,
};
BothwaySliderDemo1.docsName = "交互认证";
