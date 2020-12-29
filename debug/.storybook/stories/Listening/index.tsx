import React, { useState } from "react";
import Listening from "../../../../src/Listening";
import { CaretRightOutlined } from "@ant-design/icons";
const StoriesType = "";

const subTitle = "/ Listening ";
const ListeningDemo = (props) => {
    return (
        <Listening
            customStyle={{
                color: "cornflowerblue",
            }}
        >
            <CaretRightOutlined />
            试听
        </Listening>
    );
};

export default {
    title: StoriesType + subTitle,
    component: ListeningDemo,
    argTypes: {},
};
export const ListeningDemo1 = ListeningDemo.bind({});

ListeningDemo1.args = {};
ListeningDemo1.docsName = "";
