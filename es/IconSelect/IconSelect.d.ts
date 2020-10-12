import { CSSProperties } from "react";
export declare type itemArrType = {
    icon: string;
    value: string;
};
export interface SelectIconProps {
    itemArr: Array<itemArrType>;
    index: number;
    onChange: (v: any, i: any) => void;
    size?: number | string;
    itemStyle?: CSSProperties;
}
declare const IconSelect: (props: SelectIconProps) => JSX.Element;
export default IconSelect;
