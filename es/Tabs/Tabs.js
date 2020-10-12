import React, { useState, useMemo } from "react";
import cl from "classnames";
import { $fuPrefix } from '../assets/fix';
export function Tabs(props) {
  var index = props.index,
      itemArr = props.itemArr,
      onChange = props.onChange;

  var _a = useState(index),
      menuHover = _a[0],
      setMenuHover = _a[1],
      itemW = useMemo(function () {
    return 100 / itemArr.length;
  }, [itemArr.length]);

  return React.createElement("ul", {
    className: $fuPrefix + "TabsCom"
  }, React.createElement("li", {
    className: "activeBg",
    style: {
      left: index * itemW + '%',
      width: itemW + "%"
    }
  }), itemArr.map(function (v, i) {
    return React.createElement("li", {
      className: cl({
        active: i === index,
        hover: menuHover == i
      }),
      style: {
        width: itemW + "%"
      },
      key: v.value,
      onMouseOver: function () {
        return setMenuHover(i);
      },
      onMouseLeave: function () {
        return setMenuHover(-1);
      },
      onClick: function () {
        if (i === index) return;
        onChange(v, i);
      }
    }, React.createElement("span", {
      className: $fuPrefix + "PreIcon"
    }, v.icon && v.icon()), v.name);
  }));
}
export default Tabs;