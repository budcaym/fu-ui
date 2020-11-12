---
to:  debug/.storybook/stories/<%= name %>/index.tsx
---
import React, { useState } from "react";
import <%= name %> from "../../../../src/<%= name %>";
const StoriesType = "";

const subTitle = "/ <%= name %> ";
const <%= name %>Demo = (props) => {
    
    return (
        <<%= name %>
        ></<%= name %>>
    );
};

export default {
    title: StoriesType + subTitle,
    component: <%= name %>Demo,
    argTypes: {

    },
};
export const <%= name %>Demo1 = <%= name %>Demo.bind({});

<%= name %>Demo1.args = {

};
<%= name %>Demo1.docsName = "";
