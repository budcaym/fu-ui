import { Dispatch, SetStateAction } from "react";
export interface DragVerifyProps {
    canvasWidth: number | string;
    canvasHeight: number | string;
    changeLoading: Dispatch<SetStateAction<boolean>>;
    getImgSrc: () => string;
    onSuccess?: () => void | undefined;
    onFail?: () => void | undefined;
    onRefresh?: () => void | undefined;
}
export declare const DragVerify: (props: DragVerifyProps) => JSX.Element;
export default DragVerify;
