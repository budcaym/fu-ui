---
to: src/<%= name %>/<%= name %>.tsx
---
import React, { useState } from "react";
import { $fuPrefix } from "../assets/fix";

export interface <%= name %>Props {

}

const <%= name %>: React.SFC<<%= name %>Props> = (props) => {

    return (
        <div className={`${$fuPrefix}<%= name %>`}>
         
        </div>
    );
};

<%= name %>.defaultProps = {

};
export default <%= name %>;
