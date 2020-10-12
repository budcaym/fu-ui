import { ReactElement } from "react";
export declare type MenuArrType = {
    value: string | number;
    selectIcon?: () => ReactElement;
    icon: () => ReactElement;
    name: string | number | never;
};
export interface TabsProps {
    itemArr: Array<Partial<MenuArrType>>;
    index: number;
    onChange: (num: any, i: any) => void;
}
export declare function Tabs(props: TabsProps): JSX.Element;
export default Tabs;
