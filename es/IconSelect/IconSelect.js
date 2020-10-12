import { __assign } from "tslib";
import React from "react";
import cl from "classnames";
import { $fuPrefix } from '../assets/fix';

var IconSelect = function SelectIcon(props) {
  var onChange = props.onChange,
      itemArr = props.itemArr,
      index = props.index,
      size = props.size,
      itemStyle = props.itemStyle;
  return React.createElement("section", {
    className: $fuPrefix + "IconSelect"
  }, itemArr.map(function (v, i) {
    return React.createElement("div", {
      style: __assign(__assign({
        width: size || 80,
        height: size || 80
      }, itemStyle), {
        background: "#ccc url('" + v.icon + "') no-repeat center/cover"
      }),
      key: v.value,
      className: cl("selecticon", {
        active: index === i
      }),
      onClick: function () {
        return onChange(v, i);
      }
    }, index === i && React.createElement("span", {
      className: "selected"
    }));
  }));
};

export default IconSelect;