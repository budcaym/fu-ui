import { getRandomNumberByRange } from '../utils/tools';
var PI = Math.PI;

function createCanvas(width, height) {
  var canvas = createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function createImg(onload, url) {
  var img = createElement("img");
  img.crossOrigin = "Anonymous";
  img.onload = onload;
  img.src = url;
  return img;
}

function createElement(tagName) {
  return document.createElement(tagName);
}

function addClass(tag, className) {
  if (tag.classList) {
    tag.classList.add(className);
  } else {
    tag.className += " " + className;
  }
}

function removeClass(tag, className) {
  if (tag.classList) {
    tag.classList.remove(className);
  } else {
    var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
    tag.className = tag.className.replace(reg, " ");
  }
}

function draw(ctx, operation, x, y, r, l) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + l / 2, y);
  ctx.arc(x + l / 2, y - r + 2, r, 0, 2 * PI);
  ctx.lineTo(x + l / 2, y);
  ctx.lineTo(x + l, y);
  ctx.lineTo(x + l, y + l / 2);
  ctx.arc(x + l + r - 2, y + l / 2, r, 0, 2 * PI);
  ctx.lineTo(x + l, y + l / 2);
  ctx.lineTo(x + l, y + l);
  ctx.lineTo(x, y + l);
  ctx.lineTo(x, y);
  ctx.arc(x, y + l / 2, r, 1.5 * PI, 0.5 * PI);
  ctx.fillStyle = "#fff";
  ctx.globalCompositeOperation = "xor";
  ctx[operation]();
}

function sum(x, y) {
  return x + y;
}

function square(x) {
  return x * x;
}

function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

var CanvasAuth = function () {
  function CanvasAuth(_a) {
    var el = _a.el,
        onSuccess = _a.onSuccess,
        onFail = _a.onFail,
        onRefresh = _a.onRefresh,
        changeLoading = _a.changeLoading,
        _b = _a.domConfig,
        sliderText = _b.sliderText,
        canvasWidth = _b.canvasWidth,
        canvasHeight = _b.canvasHeight,
        getImgSrc = _b.getImgSrc;
    this.el = null;
    this.sliderContainer = null;
    this.refreshIcon = null;
    this.slider = null;
    this.sliderMask = null;
    this.sliderIcon = null;
    this.text = null;
    this.img = null;

    this.onSuccess = function () {};

    this.onFail = function () {};

    this.onRefresh = function () {};

    this.sliderText = "";
    this.canvas = null;
    this.block = null;
    this.canvasCtx = null;
    this.blockCtx = null;
    this.getImgSrc = null;
    this.trail = [];
    this.l = 42;
    this.r = 10;
    this.w = 0;
    this.h = 0;
    this.L = null;
    this.x = null;
    this.y = null;
    this.el = el;
    this.onSuccess = onSuccess;
    this.onFail = onFail;
    this.onRefresh = onRefresh;
    this.sliderText = sliderText;
    this.w = canvasWidth;
    this.h = canvasHeight;
    this.getImgSrc = getImgSrc;
    this.changeLoading = changeLoading;
    this.L = this.l + this.r * 2;
  }

  CanvasAuth.prototype.init = function () {
    this.initDOM();
    this.initImg();
    this.draw();
    this.bindEvents();
  };

  CanvasAuth.prototype.initDOM = function () {
    var canvas = this.el.querySelector("canvas");
    var block = canvas.cloneNode(true);
    var sliderContainer = createElement("div");
    var refreshIcon = createElement("div");
    var sliderMask = createElement("div");
    var slider = createElement("div");
    var sliderIcon = createElement("span");
    var text = createElement("span");
    block.className = "block";
    sliderContainer.className = "sliderContainer";
    sliderContainer.style.borderRadius = "4px";
    refreshIcon.className = "refreshIcon";
    sliderMask.className = "sliderMask";
    slider.className = "slider";
    sliderIcon.className = "sliderIcon";
    slider.style.borderRadius = "4px";
    text.innerHTML = this.sliderText;
    text.className = "sliderText";
    var el = this.el;
    el.appendChild(refreshIcon);
    el.appendChild(block);
    slider.appendChild(sliderIcon);
    sliderMask.appendChild(slider);
    sliderContainer.appendChild(sliderMask);
    sliderContainer.appendChild(text);
    el.appendChild(sliderContainer);
    Object.assign(this, {
      canvas: canvas,
      block: block,
      sliderContainer: sliderContainer,
      refreshIcon: refreshIcon,
      slider: slider,
      sliderMask: sliderMask,
      sliderIcon: sliderIcon,
      text: text,
      canvasCtx: canvas.getContext("2d"),
      blockCtx: block.getContext("2d")
    });
  };

  CanvasAuth.prototype.initImg = function () {
    var _this = this;

    this.changeLoading(true);
    var img = createImg(function () {
      _this.changeLoading(false);

      draw(_this.canvasCtx, "fill", _this.x, _this.y, _this.r, _this.l);
      draw(_this.blockCtx, "clip", _this.x, _this.y, _this.r, _this.l);

      _this.canvasCtx.drawImage(img, 0, 0, _this.w, _this.h);

      _this.blockCtx.drawImage(img, 0, 0, _this.w, _this.h);

      var y = _this.y - _this.r * 2 + 2;

      var ImageData = _this.blockCtx.getImageData(_this.x, y, _this.L, _this.L);

      _this.block.width = _this.w;

      _this.blockCtx.putImageData(ImageData, 0, y);
    }, this.getImgSrc());
    this.img = img;

    img.onerror = function () {
      _this.changeLoading(false);
    };
  };

  CanvasAuth.prototype.draw = function () {
    this.x = getRandomNumberByRange(this.L + 10, this.w - (this.L + 10));
    this.y = getRandomNumberByRange(10 + this.r * 2, this.h - (this.L + 10));
  };

  CanvasAuth.prototype.clean = function () {
    this.canvasCtx.clearRect(0, 0, this.w, this.h);
    this.blockCtx.clearRect(0, 0, this.w, this.h);
    this.text.innerHTML = this.sliderText;
  };

  CanvasAuth.prototype.bindEvents = function () {
    var _this = this;

    this.el.onselectstart = function () {
      return false;
    };

    this.refreshIcon.onclick = function () {
      _this.reset();

      typeof _this.onRefresh === "function" && _this.onRefresh();
    };

    var originX,
        originY,
        trail = [],
        isMouseDown = false,
        timelen = 0,
        mousertimer;
    this.slider.addEventListener("mousedown", function (e) {
      originX = e.x;
      originY = e.y;
      isMouseDown = true;
    });

    var mouseMove = function (e) {
      if (!isMouseDown) return false;
      var moveX = e.x - originX;
      var moveY = e.y - originY;
      if (moveX < 0 || moveX + 38 >= _this.w) return false;
      _this.slider.style.left = moveX + "px";
      var blockLeft = (_this.w - 40 - 20) / (_this.w - 40) * moveX;
      _this.block.style.left = blockLeft + "px";
      _this.text.innerHTML = "";
      addClass(_this.sliderContainer, "sliderContainer_active");
      _this.sliderMask.style.width = moveX + "px";
      trail.push(moveY);

      if (_this.canvas.style.display == "none") {
        _this.canvas.style.display = "block";
        _this.block.style.display = "block";
        _this.refreshIcon.style.display = "block";
      }
    };

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", function (e) {
      if (!isMouseDown) return false;
      isMouseDown = false;
      if (e.x == originX) return false;
      removeClass(_this.sliderContainer, "sliderContainer_active");
      _this.trail = trail;

      var _a = _this.verify(),
          spliced = _a.spliced,
          TuringTest = _a.TuringTest;

      if (spliced) {
        if (TuringTest) {
          addClass(_this.sliderContainer, "sliderContainer_success");
          typeof _this.onSuccess === "function" && _this.onSuccess();
          _this.refreshIcon.style.display = "none";
          _this.sliderMask.style.width = '100%';
          _this.slider.style.left = '100%';
          _this.text.innerHTML = "验证成功";
          document.removeEventListener("mousemove", mouseMove);

          _this.sliderContainer.onmouseenter = function () {
            return false;
          };
        } else {
          addClass(_this.sliderContainer, "sliderContainer_fail");
          typeof _this.onFail === "function" && _this.onFail();
          var timer_1 = setTimeout(function () {
            _this.reset();

            clearTimeout(timer_1);
          }, 1000);
        }
      } else {
        addClass(_this.sliderContainer, "sliderContainer_fail");
        typeof _this.onFail === "function" && _this.onFail();
        var timer_2 = setTimeout(function () {
          _this.reset();

          clearTimeout(timer_2);
        }, 1000);
      }
    });
  };

  CanvasAuth.prototype.verify = function () {
    var arr = this.trail;
    var average = arr.reduce(sum) / arr.length;
    var deviations = arr.map(function (x) {
      return x - average;
    });
    var stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length);
    var left = parseInt(this.block.style.left);
    return {
      spliced: Math.abs(left - this.x) < 5,
      TuringTest: average !== stddev
    };
  };

  CanvasAuth.prototype.reset = function () {
    this.sliderContainer.className = "sliderContainer";
    this.slider.style.left = '0px';
    this.block.style.left = 0;
    this.sliderMask.style.width = '0px';
    this.clean();
    this.initImg();
    this.draw();
  };

  return CanvasAuth;
}();

export { CanvasAuth };
export default CanvasAuth;