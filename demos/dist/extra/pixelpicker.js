// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/pixelpicker.js
 *
 * Sketchpad.pro
 * {@link http://sketchpad.pro|Sketchpad.pro - drawing board sketch free}
 *
 * @copyright 2016-2017 positivestudio.co
 * @version 0.5.1
 * @author positivestudio.co
 *
 * @licstart  The following is the entire license notice for the
 *  JavaScript code in this page.
 *
 * Copyright (C) 2016  positivestudio.co
 *
 *  Sketchpad.pro - drawing board sketch pad
 *  Copyright (C) 2016  positivestudio.co
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as
 *  published by the Free Software Foundation, either version 3 of the
 *  License, or (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 * @file Inputs stack
 *
 * Date: 2016-08-11T14:00Z
 */


/*global window, addEvent*/
/*global Eventsmanager, Keyshortcuts*/
/**
 * Palette of colors
 * @class
 * @param {DOMElement} el
 * @param {function} pickCb
 */
function Pixelpicker(config) {
    "use strict";
    // Call parent constructor
    Eventsmanager.call(this, config);

    if (typeof config.keyModifiers !== "object") {
        config.keyModifiers = {};
    }
    var el = config.containerEl;
    this.containerEl = el;
    el.classList.add("Pixelpicker");

    var width = 200,
        height = 220;


    this.width = width;
    this.height = height;

    this.threshold = 0.15;
    this.x = 0;
    this.y = 0;

    this.color = {
        hue: 0,
        saturation: 0,
        value: 0,
        red: 0,
        green: 0,
        blue: 0,
        alpha: 1
    };
    // alert(1);
    el.style.position = "relative";
    el.style.width = width + "px";
    el.style.height = height + "px";//yeap
    el.style.display = "inline-block";

    this.colorBgEl = document.createElement("div");
    this.colorBgEl.style.backgroundImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAB3RJTUUH4AcGEAAdMvv9RwAAAFBJREFUWMPt18EJACAIhWGLNnJah3Im28B36CDE/66CfBCirYgoa5KZ9hJ3b+vbhgMAAICj5lzNsYrqzxMAAAAAAAAA8/eA2vf8CwAA+B5wAUhhDw4II7MzAAAAAElFTkSuQmCC')";
    this.colorBgEl.style.backgroundSize = "16px";
    this.colorBgEl.style.backgroundPosition = "50% 50%";
    this.colorBgEl.className = "color-bg";
    this.colorBgEl.style.width = width + "px";
    this.colorBgEl.style.height = Math.floor(height * (1 / 11)) + "px";
    this.colorBgEl.style.borderRadius = window.radius + "px " + window.radius + "px 0px 0px";
    this.colorBgEl.style.overflow = "hidden";

    this.colorEl = document.createElement("div");
    this.colorEl.className = "color";
    this.colorEl.style.width = "100%";
    this.colorEl.style.height = "100%";
    this.colorEl.style.cursor = "pointer";

    this.colorBgEl.appendChild(this.colorEl);
    this.colorBgEl.style.position = "absolute";
    this.colorBgEl.style.top = "0px";
    this.colorBgEl.style.left = "0px";




    this.paletteBgEl = document.createElement("div");
    this.paletteBgEl.className = "palette-bg";
    this.paletteBgEl.style.position = "absolute";
    this.paletteBgEl.style.backgroundImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAB3RJTUUH4AcGEAAdMvv9RwAAAFBJREFUWMPt18EJACAIhWGLNnJah3Im28B36CDE/66CfBCirYgoa5KZ9hJ3b+vbhgMAAICj5lzNsYrqzxMAAAAAAAAA8/eA2vf8CwAA+B5wAUhhDw4II7MzAAAAAElFTkSuQmCC')";
    this.paletteBgEl.style.backgroundSize = "16px";
    this.paletteBgEl.style.backgroundPosition = "50% 50%";
    this.paletteBgEl.style.width = width + "px";
    this.paletteBgEl.style.height = Math.floor(height * (10 / 11)) + "px";
    this.paletteBgEl.style.borderRadius = window.radius + "px " + window.radius + "px 0px 0px";
    this.paletteBgEl.style.overflow = "hidden";
    this.paletteBgEl.style.left = "0px";
    this.paletteBgEl.style.top = Math.floor(height * (1 / 11)) + "px";

    this.paletteCanvas = document.createElement("canvas");
    this.paletteCanvas.className = "palette";
    this.paletteCanvas.width = width;
    this.paletteCanvas.height = Math.floor(height * (10 / 11));
    this.paletteContext2d = this.paletteCanvas.getContext("2d");
    this.paletteIData = this.paletteContext2d.createImageData(this.paletteCanvas.width, this.paletteCanvas.height);
    this.paletteCanvas.style.cursor = "crosshair";
    this.paletteCanvas.style.position = "absolute";
    this.paletteCanvas.style.left = "0px";
    this.paletteCanvas.style.top = Math.floor(height * (1 / 11)) + "px";
    var that = this;

    var img = document.createElement("img");
    img.addEventListener("load", function () {
        // if (config.backgroundImage) {
        //     this.background = document.createElement("div");
        //     this.background.style = "width: 100%; height:100%; position: absolute;";
        //     this.background.style.backgroundImage = "url(" + config.backgroundImage.toString() + ")";
        //     this.background.style.width = img.width + "px";
        //     this.background.style.height = img.height + "px";
        //     el.appendChild(this.background);
        // }

        // var canvas = document.createElement('canvas');
        // canvas.width = img.width;
        // canvas.height = img.height;
        // el.style.width = img.width + "px";
        // el.style.height = img.height + "px";
        // canvas.style = "position: absolute;";
        that.paletteContext2d.drawImage(img, 0, 0, img.width, img.height, 0, 0, that.width, that.width * (img.height / img.width));
        // canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);

        // canvas.addEventListener("click", function (e) {
        //     var pixelData = canvas.getContext('2d').getImageData(e.offsetX, e.offsetY, 1, 1).data;
        //     pickCb(pixelData[0], pixelData[1], pixelData[2], pixelData[3] / 255);
        // });
        // el.appendChild(canvas);
    });
    img.src = config.imageSrc;

    this.palettePointerEl = document.createElement("div");
    this.palettePointerEl.className = "pointer palette-pointer";
    this.palettePointerEl.position = "absolute";
    this.palettePointerEl.style.width = width * 0.06 + "px";
    this.palettePointerEl.style.height = width * 0.06 + "px";
    this.palettePointerEl.style.backgroundColor = "transparent";
    this.palettePointerEl.style.position = "absolute";
    this.palettePointerEl.style.border = "1px solid white";
    this.palettePointerEl.style.borderRadius = "50%";
    this.palettePointerEl.style.cursor = "crosshair";
    this.palettePointerEl.style.boxShadow = "inset 0 0 2px #000";

    this.thresholdSliderEl = document.createElement("div");
    this.thresholdSliderEl.className = "slider alpha-slider";
    this.thresholdSliderEl.style.width = width * 0.03 + "px";
    this.thresholdSliderEl.style.height = height * 0.11 + "px";
    this.thresholdSliderEl.style.backgroundColor = "transparent";
    this.thresholdSliderEl.style.border = "1px solid white";
    this.thresholdSliderEl.style.position = "absolute";
    this.thresholdSliderEl.style.top = -height * 0.01 + "px";
    this.thresholdSliderEl.style.left = this.width - width * 0.015 + "px";
    this.thresholdSliderEl.style.cursor = "col-resize";
    this.thresholdSliderEl.style.boxShadow = "inset 0 0 2px #000";
    this.thresholdSliderEl.style.zIndex = 100;

    this.redInput = document.createElement("input");
    this.redInput.title = "R:";

    this.greenInput = document.createElement("input");
    this.greenInput.title = "G:";

    this.blueInput = document.createElement("input");
    this.blueInput.title = "B:";

    this.alphaInput = document.createElement("input");
    this.alphaInput.title = "A:";

    this.valuesEl = document.createElement("div");


    [this.redInput, this.greenInput, this.blueInput, this.alphaInput].forEach(function (inputEl) {
        var titleEl = document.createElement("span");
        titleEl.textContent = inputEl.title;
        that.valuesEl.appendChild(titleEl);
        that.valuesEl.appendChild(inputEl);
        inputEl.type = "number";
        inputEl.className = inputEl.title;
        if (inputEl === that.alphaInput) {
            inputEl.min = 0;
            inputEl.max = 1;
            inputEl.step = 0.01;
            inputEl.maxLength = 4;
        } else {
            inputEl.min = 0;
            inputEl.max = 255;
            inputEl.step = 1;
            inputEl.maxLength = 3;
        }
        inputEl.addEventListener("change", function () {
            that.updateFromInputs();
        });
    });

    el.appendChild(this.colorBgEl);
    el.appendChild(this.paletteBgEl);
    el.appendChild(this.paletteCanvas);

    el.appendChild(this.thresholdSliderEl);
    el.appendChild(this.palettePointerEl);
    // el.appendChild(this.valuesEl);



    function pickPaletteEvent(e) {
        var x = that.normalize(e.offsetX, 0, that.paletteCanvas.width);
        var y = that.normalize(e.offsetY, 0, that.paletteCanvas.height);
        that.pickPalette(x, y);
    }
    addEvent(this.paletteCanvas, "slide", pickPaletteEvent);


    function changeThresholdEvent(e) {
        var x = that.normalize(e.offsetX, 0, that.width);
        var threshold = (x / that.width) * 1;
        that.changeThreshold(threshold);
    }

    addEvent(this.colorEl, "slide", changeThresholdEvent);

    function thresholdWheel(e) {
        that.changeThreshold(that.threshold - (e.deltaX / 100) / 2);
        e.preventDefault();
    }
    this.colorEl.addEventListener("wheel", thresholdWheel);
    this.thresholdSliderEl.addEventListener("wheel", thresholdWheel);

    this.setThresholdSlider(0);
    if (config.color) {
        this.setColor(config.color);
    }

    function paletteWheel(e) {
        that.pickPalette(that.x - e.deltaX / 2, that.y - e.deltaY / 2);
        e.preventDefault();
    }
    this.paletteCanvas.addEventListener("wheel", paletteWheel);
    this.palettePointerEl.addEventListener("wheel", paletteWheel);

    this.keyshortcuts = new Keyshortcuts();
    this.keyshortcuts.disable();


    this.keyshortcuts.addShortcut(Object.assign({altKey: false, keyCode: 37, repeatable: true}, config.keyModifiers), function () {//left
        // e.stopImmediatePropagation();
        that.changeThreshold(that.threshold - 0.01);
    });
    this.keyshortcuts.addShortcut(Object.assign({altKey: false, keyCode: 39, repeatable: true}, config.keyModifiers), function () {//right
        // e.stopImmediatePropagation();
        that.changeThreshold(that.threshold + 0.01);
    });

    this.keyshortcuts.addShortcut(Object.assign({altKey: true, keyCode: 38, repeatable: true}, config.keyModifiers), function () {//shift + up
        // e.stopImmediatePropagation();
        that.pickPalette(that.color.saturation, that.color.value - 1);
    });
    this.keyshortcuts.addShortcut(Object.assign({altKey: true, keyCode: 40, repeatable: true}, config.keyModifiers), function () {//shift + down
        // e.stopImmediatePropagation();
        that.pickPalette(that.color.saturation, that.color.value + 1);
    });
    this.keyshortcuts.addShortcut(Object.assign({altKey: true, keyCode: 37, repeatable: true}, config.keyModifiers), function () {//shift + left
        // e.stopImmediatePropagation();
        that.pickPalette(that.color.saturation - 1, that.color.value);
    });
    this.keyshortcuts.addShortcut(Object.assign({altKey: true, keyCode: 39, repeatable: true}, config.keyModifiers), function () {//shift + right
        // e.stopImmediatePropagation();
        that.pickPalette(that.color.saturation + 1, that.color.value);
    });


    return this;

}
Pixelpicker.prototype = Object.create(Eventsmanager.prototype);

Object.assign(Pixelpicker.prototype, {

    normalize: function normalize(v, min, max) {
        "use strict";
        if (v < min) {
            v = min;
        }
        if (v > max) {
            v = max;
        }
        return v;
    },
    setPalettePointer: function setPalettePointer(x, y) {
        "use strict";
        this.x = x;
        this.y = y;
        this.palettePointerEl.style.left = -this.width * 0.03 + x + "px";
        this.palettePointerEl.style.top = -this.height * 0.03 + this.height * (1 / 10) + y + "px";
    },

    pickPalette: function pickPalette(x, y) {
        "use strict";
        console.log("pickPalette", x, y);
        x = this.normalize(x, 0, this.width);
        y = this.normalize(y, 0, this.height);

        var pixelData = this.paletteContext2d.getImageData(x, y, 1, 1).data;
        this.setPalettePointer(x, y);
        var rgba = {
            r: pixelData[0],
            g: pixelData[1],
            b: pixelData[2],
            a: pixelData[3] / 255
        };
        // pickCb(pixelData[0], pixelData[1], pixelData[2], pixelData[3] / 255);
        this.setColor(rgba);
        // s = this.normalize(s, 0, 100);
        // v = this.normalize(v, 0, 100);
        // this.color.saturation = s;
        // this.color.value = v;
        // var rgb = this.HSVtoRGB(this.color.hue, this.color.saturation, this.color.value);
        // this.setPalettePointer(this.color.saturation, this.color.value);
        // var rgba = rgb;
        // rgba.a = this.color.alpha;
        // this.setColor(rgba);
    },
    setThresholdSlider: function setThresholdSlider(threshold) {
        "use strict";
        this.thresholdSliderEl.style.left = this.width * (threshold) - this.width * 0.015 + "px";
    },

    setThreshold: function setThreshold(threshold) {
        "use strict";
        threshold = Math.round(threshold * 100) / 100;
        this.threshold = threshold;
        this.setThresholdSlider(threshold);
    },


    changeThreshold: function changeAlpha(threshold) {
        "use strict";
        threshold = this.normalize(threshold, 0, 1);
        this.threshold = threshold;
        this.setThreshold(threshold);
    },
    focus: function focus() {
        "use strict";
        this.isFocused = true;
    },
    blur: function blur() {
        "use strict";
        this.isFocused = false;
    },
    getColor: function getColor() {
        "use strict";
        var color = {
            red: parseInt(this.color.red, 10),
            green: parseInt(this.color.green, 10),
            blue: parseInt(this.color.blue, 10),
            alpha: parseFloat(this.color.alpha)
        };
        return color;
    },
    putPixel: function (idata, x, y, pixel) {
        "use strict";
        var i = (x + y * idata.width) * 4;
        idata.data[i] = pixel.r;
        idata.data[i + 1] = pixel.g;
        idata.data[i + 2] = pixel.b;
        idata.data[i + 3] = pixel.a;
    },


    triggerUpdate: function triggerUpdate() {
        "use strict";
        var rgba = this.getColor();
        this.dispatch("change", {color: rgba});
    },
    updateFromInputs: function updateFromInputs() {
        "use strict";
        this.setColor({
            r: this.redInput.value,
            g: this.greenInput.value,
            b: this.blueInput.value,
            a: this.alphaInput.value
        });
        this.setAlpha(this.alphaInput.value);
    },

    setColor: function setColor(col, noPropagate) {
        "use strict";
        this.color.red = col.r;
        this.color.green = col.g;
        this.color.blue = col.b;
        this.color.alpha = col.a;

        this.redInput.value = col.r;
        this.greenInput.value = col.g;
        this.blueInput.value = col.b;
        this.alphaInput.value = col.a;
        // this.setThresholdSlider(col.a);
        // this.setPalettePointer(HSV.s, HSV.v);

        var rgba = this.getColor();
        this.colorEl.style.backgroundColor = "rgba(" + rgba.red + "," + rgba.green + "," + rgba.blue + "," + rgba.alpha + ")";
        // console.log("rgba(" + rgba.red + "," + rgba.green + "," + rgba.blue + "," + rgba.alpha + ")");
        if (!noPropagate) {
            this.triggerUpdate();
        }
    }

});
window.Pixelpicker = Pixelpicker;