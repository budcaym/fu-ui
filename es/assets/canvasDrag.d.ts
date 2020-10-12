export declare class CanvasAuth {
    constructor({ el, onSuccess, onFail, onRefresh, changeLoading, domConfig: { sliderText, canvasWidth, canvasHeight, getImgSrc }, }: {
        el: any;
        onSuccess: any;
        onFail: any;
        onRefresh: any;
        changeLoading: any;
        domConfig: {
            sliderText: any;
            canvasWidth: any;
            canvasHeight: any;
            getImgSrc: any;
        };
    });
    el: HTMLElement;
    sliderContainer: HTMLElement;
    refreshIcon: HTMLDivElement;
    slider: HTMLDivElement;
    sliderMask: HTMLDivElement;
    sliderIcon: HTMLDivElement;
    text: HTMLDivElement;
    img: HTMLImageElement;
    onSuccess: () => void;
    onFail: () => void;
    onRefresh: () => void;
    changeLoading: (bool: any) => {};
    sliderText: string;
    canvas: any;
    block: any;
    canvasCtx: any;
    blockCtx: any;
    getImgSrc: any;
    trail: any[];
    l: number;
    r: number;
    w: number;
    h: number;
    L: any;
    x: any;
    y: any;
    init(): void;
    initDOM(): void;
    initImg(): void;
    draw(): void;
    clean(): void;
    bindEvents(): void;
    verify(): {
        spliced: boolean;
        TuringTest: boolean;
    };
    reset(): void;
}
export default CanvasAuth;
