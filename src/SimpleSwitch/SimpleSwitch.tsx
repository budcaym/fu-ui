import React, { useState } from "react";
import { $fuPrefix } from "../assets/fix";

export interface SimpleSwitchProps {
    leftText: string;
    rightText: string;
    onChange: Function;
    checked?: boolean;
    defaultValue?: boolean;
}

const SimpleSwitch: React.SFC<SimpleSwitchProps> = (props) => {
    const { leftText, rightText, onChange, defaultValue, checked } = props;
    const [innerChecked, setInnerChecked] = useState(defaultValue);
    return (
        <div className={`${$fuPrefix}SimpleSwitch`}>
            <span
                className="sliding-shoe"
                style={{
                    left: innerChecked ? "0px" : "56px",
                }}
            />
            <span
                className="left-area"
                style={{ color: innerChecked ? "#1890FF" : "#808C9C" }}
                onClick={() => {
                    let value;
                    checked === undefined ? (value = true) : (value = checked);
                    onChange(value);
                    setInnerChecked(value);
                }}
            >
                {leftText}
            </span>
            <span
                className="right-area"
                style={{ color: innerChecked ? "#808C9C" : "#1890FF" }}
                onClick={() => {
                    let value;
                    checked === undefined ? (value = false) : (value = checked);
                    onChange(value);
                    setInnerChecked(value);
                }}
            >
                {rightText}
            </span>
        </div>
    );
};

SimpleSwitch.defaultProps = {
    defaultValue: true,
};
export default SimpleSwitch;
