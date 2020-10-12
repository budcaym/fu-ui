import React, { useState, useMemo, ReactComponentElement, ReactElement } from "react"
import cl from "classnames"
import { $fuPrefix } from '../assets/fix'
export type MenuArrType = {
    value: string | number
    selectIcon?: () => ReactElement
    icon: () => ReactElement
    name: string | number | never
}
export interface TabsProps {
    itemArr: Array<Partial<MenuArrType>>
    index: number
    onChange: (num, i) => void
}
export function Tabs(props: TabsProps) {
    let { index, itemArr, onChange } = props
    let [menuHover, setMenuHover] = useState(index),
        itemW = useMemo(() => 100/itemArr.length, [itemArr.length])
    return (
        <ul
            className={`${$fuPrefix}TabsCom`}
        >
            <li className="activeBg" style={{
                left: index * itemW + '%' ,
                width: `${itemW}%`
            }}>
            </li>
            {itemArr.map((v, i) => (
                <li
                    className={cl({
                        active: i === index,
                        hover: menuHover == i,
                    })}
                    style={{
                        width: `${itemW}%`
                    }}
                    key={v.value}
                    onMouseOver={() => setMenuHover(i)}
                    onMouseLeave={() => setMenuHover(-1)}
                    onClick={() => {
                        if (i === index) return
                        onChange(v, i)
                    }}>
                        <span className={`${$fuPrefix}PreIcon`}>
                            {
                                v.icon && v.icon()
                            }
                        </span>
                    {v.name}
                </li>
            ))}
        </ul>
    )
}
export default Tabs
