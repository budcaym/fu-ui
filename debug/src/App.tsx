/**
 * 已废弃
 * **/

import React, { useEffect, useState } from "react"
import { ConfigProvider, Spin, Alert } from 'antd';
import DragVerify from "@/DragVerify/DragVerify"
import { getRandomNumberByRange } from "@/utils/tools"
import zhCN from 'antd/es/locale/zh_CN'
import 'antd/dist/antd.less'
function MainCom() {
    let [loading, changeLoading] = useState(false)
    return (
        <ConfigProvider locale={zhCN}>
            <section style={{width: 560}}>
                <Spin spinning={loading}
                >
                    <DragVerify
                        canvasWidth={560}
                        canvasHeight={280}
                        getImgSrc={getRandomImg}
                        changeLoading={changeLoading}
                    ></DragVerify>
                </Spin>
            </section>
        </ConfigProvider>
    )
}
function getRandomImg() {
    // return "/api/files/" + getRandomNumberByRange(0, 299) + ".jpg" //
    return (
        "https://picsum.photos/500/250/?image=" +
        getRandomNumberByRange(0, 1024)
    )
}

export default class App extends React.Component {
    public render() {
        return <MainCom />
    }
}
