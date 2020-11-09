import React, { useEffect, useRef, useState } from "react";
import { Slider } from "antd";
import { $fuPrefix } from "../assets/fix";
export interface SpecialSliderProps {
    value: number;
    onChange: Function;
    max?: number;
    min?: number;
}

const SpecialSlider: React.SFC<SpecialSliderProps> = (props) => {
    const { value, max, min } = props;
    const [inlayWidth, setInlayWidth] = useState(0);
    const offsetWidth = useRef(
        Math.floor((Math.abs(min) / (Math.abs(max) + Math.abs(min))) * 100)
    );
    const handleChange = (value) => {
        let result = 0;
        if (value > 100) {
            result = 100;
        } else if (value < -100) {
            result = -100;
        } else {
            result = value;
        }
        props.onChange(result);
    };
    useEffect(() => {
        setInlayWidth(Math.abs(value) * (offsetWidth.current / 100));
    }, [props.value]);

    return (
        <div className={`${$fuPrefix}SpecialSlider`}>
            <Slider value={value} onChange={handleChange} max={max} min={min}>
                <span
                    className="custom-track"
                    style={{
                        width: `${inlayWidth}%`,
                        right:
                            value >= 0 ? "0%" : `${100 - offsetWidth.current}%`,
                        left: value >= 0 ? `${offsetWidth.current}%` : "auto",
                    }}
                ></span>
            </Slider>
        </div>
    );
};

SpecialSlider.defaultProps = {
    max: 100,
    min: -100,
};
export default SpecialSlider;
