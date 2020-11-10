import React, { useState } from "react";
import SimpleSwitch from "../../../../src/SimpleSwitch";
const StoriesType = "数据展示";

const subTitle = "/ SimpleSwitch 滑动开关";
const SimpleSwitchDemo = (props) => {
    const { leftText, rightText, defaultValue } = props;
    const onChange = (value) => {
        console.log(value);
    };
    return (
        <SimpleSwitch
            leftText={leftText}
            rightText={rightText}
            defaultValue={defaultValue}
            checked={false}
            onChange={onChange}
        ></SimpleSwitch>
    );
};

export default {
    title: StoriesType + subTitle,
    component: SimpleSwitchDemo,
    argTypes: {
        leftText: {
            name: "leftText",
            description: "开关左边的文本",
        },
        rightText: {
            name: "rightText",
            description: `
            开关右边的文本
            `,
        },
        defaultValue: {
            name: "min",
            description: `
            默认值，非必须
            `,
            defaultValue: 'true',
        },
        checked: {
            name: "checked",
            description: `
            结果值，会覆盖组件默认值
            `,
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
export const SimpleSwitchDemo1 = SimpleSwitchDemo.bind({});

SimpleSwitchDemo1.args = {
    leftText: "左边",
    rightText: "右边",
    defaultValue: false,
};
SimpleSwitchDemo1.docsName = "交互认证";
