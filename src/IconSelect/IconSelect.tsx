import React, { CSSProperties } from "react"
import cl from "classnames"
import { $fuPrefix } from '../assets/fix'
// import "./SelectIcon.scss";
export type itemArrType = {
    icon: string,
    value: string
}
export interface SelectIconProps {
    itemArr: Array<itemArrType>
    index: number
    onChange: (v, i) => void
    size?: number | string
    itemStyle?: CSSProperties
}
const IconSelect = function SelectIcon(props: SelectIconProps) {
    let { onChange, itemArr, index, size, itemStyle} = props
    return (
        <section className={`${$fuPrefix}IconSelect`}>
            {
                itemArr.map((v, i) => (
                    <div
                        style={{
                            width: size || 80,
                            height: size || 80,
                            ...itemStyle,
                            background: `#ccc url('${v.icon}') no-repeat center/cover`,
                        }}
                        key={v.value}
                        className={cl("selecticon", {
                            active: index === i,
                        })}
                        onClick={() => onChange(v, i)}
                    >
                        {index === i && <span className="selected"></span>}
                    </div>
                ))
            }
        </section>
    )
}

export default IconSelect
