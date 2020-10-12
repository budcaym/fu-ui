import { getRandomNumberByRange } from '../utils/tools'

/* const l = 42,
    // 滑块边长
    r = 10,
    // 滑块半径
    w = 280,
    // canvas宽度
    h = 140,
    // canvas高度
    PI = Math.PI
const L = l + r * 2 // 滑块实际边长 */
const PI = Math.PI // canvas高度
     

function createCanvas(width, height) {
    const canvas = createElement("canvas")
    canvas.width = width
    canvas.height = height
    return canvas
}

function createImg(onload, url) {
    const img = createElement("img")
    img.crossOrigin = "Anonymous"
    img.onload = onload 
    //   img.onerror = () => {
    //     img.src = getRandomImg()
    //   }
    img.src = url
    return img
}

function createElement(tagName) {
    return document.createElement(tagName)
}

function addClass(tag, className) {
    //加兼容 ie10才能有classList
    if (tag.classList) {
        tag.classList.add(className)
    } else {
        tag.className += " " + className
    }
}

function removeClass(tag, className) {
    //加兼容 ie10才能有classList
    if (tag.classList) {
        tag.classList.remove(className)
    } else {
        var reg = new RegExp("(\\s|^)" + className + "(\\s|$)")
        tag.className = tag.className.replace(reg, " ")
    }
}

function draw(ctx, operation, x, y, r, l) {
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + l / 2, y)
    ctx.arc(x + l / 2, y - r + 2, r, 0, 2 * PI)
    ctx.lineTo(x + l / 2, y)
    ctx.lineTo(x + l, y)
    ctx.lineTo(x + l, y + l / 2)
    ctx.arc(x + l + r - 2, y + l / 2, r, 0, 2 * PI)
    ctx.lineTo(x + l, y + l / 2)
    ctx.lineTo(x + l, y + l)
    ctx.lineTo(x, y + l)
    ctx.lineTo(x, y)
    // ctx.beginPath()
    ctx.arc(x, y + l / 2, r, 1.5 * PI, 0.5 * PI)
    ctx.fillStyle = "#fff"
    ctx.globalCompositeOperation = "xor"
    /* if(operation === 'clip') {
        ctx.stroke()
        ctx.lineWidth = 4
    } */
    // ctx.fill()
    ctx[operation]()
}

function sum(x, y) {
    return x + y
}

function square(x) {
    return x * x
} //防抖

function debounce(fn, delay) {
    // 维护一个 timer
    let timer = null
    return function() {
        // 通过 ‘this’ 和 ‘arguments’ 获取函数的作用域和变量
        let context = this
        let args = arguments
        clearTimeout(timer)
        timer = setTimeout(function() {
            fn.apply(context, args)
        }, delay)
    }
}

export class CanvasAuth {
    constructor({
        el,
        onSuccess,
        onFail,
        onRefresh,
        changeLoading,
        domConfig: { sliderText, canvasWidth, canvasHeight, getImgSrc},
    }) {
        this.el = el
        this.onSuccess = onSuccess
        this.onFail = onFail
        this.onRefresh = onRefresh
        this.sliderText = sliderText
        this.w = canvasWidth
        this.h = canvasHeight
        this.getImgSrc = getImgSrc
        this.changeLoading = changeLoading
        this.L = this.l + this.r * 2 // canvas滑块实际边长
    }
    el: HTMLElement = null
    sliderContainer: HTMLElement = null
    refreshIcon: HTMLDivElement = null
    slider: HTMLDivElement = null
    sliderMask: HTMLDivElement = null
    sliderIcon: HTMLDivElement = null
    text: HTMLDivElement = null
    img: HTMLImageElement = null
    onSuccess = () => {}
    onFail = () => {}
    onRefresh = () => {}
    changeLoading: (bool) => {}

    sliderText = ""
    canvas = null
    block = null
    canvasCtx = null
    blockCtx = null
    getImgSrc = null
    trail = []
    l = 42 // 滑块宽度
    r = 10 // canvas剪切区小圆球半径
    w = 0 // canvas宽度
    h = 0
    L = null
    x = null
    y = null
    init() {
        this.initDOM()
        this.initImg()
        this.draw()
        this.bindEvents()
    }

    initDOM() {
        const canvas: HTMLCanvasElement = this.el.querySelector("canvas") // 画布
        const block = canvas.cloneNode(true) as HTMLCanvasElement // 滑块

        const sliderContainer = createElement("div")
        const refreshIcon = createElement("div")
        const sliderMask = createElement("div")
        const slider = createElement("div")
        const sliderIcon = createElement("span")
        const text = createElement("span")
        // canvas.style.display = "none"
        // block.style.display = "none"
        block.className = "block"
        sliderContainer.className = "sliderContainer"
        sliderContainer.style.borderRadius = "4px"
        refreshIcon.className = "refreshIcon"
        // refreshIcon.style.display = "none"
        sliderMask.className = "sliderMask"
        slider.className = "slider"
        sliderIcon.className = "sliderIcon"
        slider.style.borderRadius = "4px"
        text.innerHTML = this.sliderText
        text.className = "sliderText"
        const el = this.el
        el.appendChild(refreshIcon)
        el.appendChild(block)
        slider.appendChild(sliderIcon)
        sliderMask.appendChild(slider)
        sliderContainer.appendChild(sliderMask)
        sliderContainer.appendChild(text)
        el.appendChild(sliderContainer)
        Object.assign(this, {
            canvas,
            block,
            sliderContainer,
            refreshIcon,
            slider,
            sliderMask,
            sliderIcon,
            text,
            canvasCtx: canvas.getContext("2d"),
            blockCtx: block.getContext("2d"),
        })
    }

    initImg() {
        this.changeLoading(true)
        const img = createImg(() => {
            this.changeLoading(false)
            draw(this.canvasCtx, "fill", this.x, this.y, this.r, this.l)
            draw(this.blockCtx, "clip", this.x, this.y, this.r, this.l)
            this.canvasCtx.drawImage(img, 0, 0, this.w, this.h)
            this.blockCtx.drawImage(img, 0, 0, this.w, this.h)
            const y = this.y - this.r * 2 + 2
            const ImageData = this.blockCtx.getImageData(this.x, y, this.L, this.L)
            this.block.width = this.w
            // this.blockCtx.shadowBlur=10;//阴影
            // this.blockCtx.shadowColor="black";
            this.blockCtx.putImageData(ImageData, 0, y)
        }, this.getImgSrc())
        this.img = img
        img.onerror = () => {
            this.changeLoading(false)
        }
    }

    draw() {
        // 随机创建滑块的位置
        this.x = getRandomNumberByRange(this.L + 10, this.w - (this.L + 10))
        this.y = getRandomNumberByRange(10 + this.r * 2, this.h - (this.L + 10))
    }
    clean() {
        this.canvasCtx.clearRect(0, 0, this.w, this.h)
        this.blockCtx.clearRect(0, 0, this.w, this.h)
        // this.blockCtx.restore()
        this.text.innerHTML = this.sliderText
    }

    bindEvents() {
        this.el.onselectstart = () => false

        this.refreshIcon.onclick = () => {
            this.reset()
            typeof this.onRefresh === "function" && this.onRefresh()
        }

        let originX,
            originY,
            trail = [],
            isMouseDown = false,
            timelen = 0,
            mousertimer
        this.slider.addEventListener("mousedown", function(e) {
            originX = e.x
            originY = e.y
            isMouseDown = true
        })
        const mouseMove = (e): any => {
            if (!isMouseDown) return false
            const moveX = e.x - originX
            const moveY = e.y - originY
            if (moveX < 0 || moveX + 38 >= this.w) return false
            this.slider.style.left = moveX + "px"
            var blockLeft = ((this.w - 40 - 20) / (this.w - 40)) * moveX
            this.block.style.left = blockLeft + "px"
            this.text.innerHTML = ""
            addClass(this.sliderContainer, "sliderContainer_active")
            this.sliderMask.style.width = moveX + "px"
            trail.push(moveY)

            if (this.canvas.style.display == "none") {
                this.canvas.style.display = "block"
                this.block.style.display = "block"
                this.refreshIcon.style.display = "block"
            }
        }
        document.addEventListener("mousemove", mouseMove)

        /* this.sliderContainer.onmouseenter = (e) => {
            mousertimer = setInterval(() => {
                timelen++
                if (timelen > 6) {
                    this.canvas.style.display = "block"
                    this.block.style.display = "block"
                    this.refreshIcon.style.display = "block"
                    this.el.style.cssText = "top: -155px;"
                    clearInterval(mousertimer)
                }
            }, 100)
        } */

        // this.el.addEventListener("mouseleave", (e) => {
        //     clearInterval(mousertimer)
        //     this.canvas.style.display = "none"
        //     this.block.style.display = "none"
        //     this.refreshIcon.style.display = "none"
        //     // this.el.style.cssText = "top: -15px;"
        // })
        document.addEventListener("mouseup", (e): void | boolean => {
            // this.text.innerHTML = this.sliderText
            if (!isMouseDown) return false
            isMouseDown = false
            if (e.x == originX) return false
            removeClass(this.sliderContainer, "sliderContainer_active")
            this.trail = trail
            const { spliced, TuringTest } = this.verify()
            if (spliced) {
                if (TuringTest) {
                    addClass(this.sliderContainer, "sliderContainer_success")
                    typeof this.onSuccess === "function" && this.onSuccess()
                    // this.canvas.style.display = "none"
                    // this.block.style.display = "none"
                    this.refreshIcon.style.display = "none"
                    this.sliderMask.style.width = '100%'
                    this.slider.style.left = '100%'
                    this.text.innerHTML = "验证成功"
                    document.removeEventListener("mousemove", mouseMove)
                    this.sliderContainer.onmouseenter = () => {
                        return false
                    }
                } else {
                    addClass(this.sliderContainer, "sliderContainer_fail")
                    typeof this.onFail === "function" && this.onFail()
                    let timer = setTimeout(() => {
                        this.reset()
                        clearTimeout(timer)
                    }, 1000)
                }
            } else {
                addClass(this.sliderContainer, "sliderContainer_fail")
                typeof this.onFail === "function" && this.onFail()
                let timer = setTimeout(() => {
                    this.reset()
                    clearTimeout(timer)
                }, 1000)
            }
        })
    }

    verify() {
        const arr = this.trail // 拖动时y轴的移动距离

        const average = arr.reduce(sum) / arr.length // 平均值

        const deviations = arr.map((x) => x - average) // 偏差数组

        const stddev = Math.sqrt(
            deviations.map(square).reduce(sum) / arr.length
        ) // 标准差

        const left = parseInt(this.block.style.left)
        return {
            spliced: Math.abs(left - this.x) < 5,
            TuringTest: average !== stddev, // 只是简单的验证拖动轨迹，相等时一般为0，表示可能非人为操作
        }
    }

    reset() {
        this.sliderContainer.className = "sliderContainer"
        this.slider.style.left = '0px'
        this.block.style.left = 0
        this.sliderMask.style.width = '0px'
        this.clean()
        this.initImg()
        // this.img.src = this.getImgSrc()
        this.draw()
    }
}

export default CanvasAuth
