import React, { useEffect, useRef, Dispatch, SetStateAction } from "react"
import SmileOutlined from '@ant-design/icons/SmileOutlined';
import CanvasAuth from "../assets/canvasDrag"
import { $fuPrefix } from '../assets/fix';

export interface DragVerifyProps {
    canvasWidth: number | string
    canvasHeight: number | string
    changeLoading: Dispatch<SetStateAction<boolean>>
    getImgSrc: () => string
    onSuccess?: () => void | undefined
    onFail?: () => void | undefined
    onRefresh?: () => void | undefined
    // loadCom: ReactElement<HTMLElement> /* HTMLUnknownElement */
}
export const DragVerify = (props: DragVerifyProps) => {
    const canvasRef = useRef(null),
        { canvasWidth, canvasHeight, getImgSrc, changeLoading, onSuccess, onFail, onRefresh } = props
    useEffect(() => {
        let canvasWrap = canvasRef.current,
        canvasAuth = new CanvasAuth({
            domConfig: {
                sliderText: "向右滑动滑块填充拼图",
                canvasWidth,
                canvasHeight,
                getImgSrc
            },
            el: canvasWrap,
            onSuccess,
            onFail,
            changeLoading,
            onRefresh
        })
        canvasAuth.init()
    }, [])
    return (
        <div className={`${$fuPrefix}dargAuth`}>
            <div
                className="captcha"
                style={{
                    position: "relative",
                    width: canvasWidth
                }}
                ref={canvasRef}
                /*@mouseup.once='hadMouse' */
            >
                <canvas width={canvasWidth} height={canvasHeight}
                ></canvas>
            </div>
        </div>
    )
}
export default DragVerify
