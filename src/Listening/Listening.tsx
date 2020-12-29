import React, { CSSProperties, useState, useRef, useEffect } from "react";
import { $fuPrefix } from "../assets/fix";

export interface ListeningProps {
    customStyle?: CSSProperties;
    src: string;
    canPlay?:Function
}

const Listening: React.SFC<ListeningProps> = (props) => {
    const { src, customStyle } = props;
    const audioEl = useRef(null);
    const handleClick = (evt) => {
        evt.stopPropagation();

    };
    useEffect(()=>{
        audioEl.current.can
    },[])
    useEffect(() => {
        audioEl.current.src = src;
    }, [src]);
    return (
        <div
            className={`${$fuPrefix}Listening`}
            style={{ ...customStyle }}
            onClick={handleClick}
        >
            {props.children}
            <audio ref={audioEl}></audio>
        </div>
    );
};

Listening.defaultProps = {};
export default Listening;
