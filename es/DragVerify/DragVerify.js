import React, { useEffect, useRef } from "react";
import CanvasAuth from "../assets/canvasDrag";
import { $fuPrefix } from '../assets/fix';
export var DragVerify = function (props) {
  var canvasRef = useRef(null),
      canvasWidth = props.canvasWidth,
      canvasHeight = props.canvasHeight,
      getImgSrc = props.getImgSrc,
      changeLoading = props.changeLoading,
      onSuccess = props.onSuccess,
      onFail = props.onFail,
      onRefresh = props.onRefresh;
  useEffect(function () {
    var canvasWrap = canvasRef.current,
        canvasAuth = new CanvasAuth({
      domConfig: {
        sliderText: "向右滑动滑块填充拼图",
        canvasWidth: canvasWidth,
        canvasHeight: canvasHeight,
        getImgSrc: getImgSrc
      },
      el: canvasWrap,
      onSuccess: onSuccess,
      onFail: onFail,
      changeLoading: changeLoading,
      onRefresh: onRefresh
    });
    canvasAuth.init();
  }, []);
  return React.createElement("div", {
    className: $fuPrefix + "dargAuth"
  }, React.createElement("div", {
    className: "captcha",
    style: {
      position: "relative",
      width: canvasWidth
    },
    ref: canvasRef
  }, React.createElement("canvas", {
    width: canvasWidth,
    height: canvasHeight
  })));
};
export default DragVerify;