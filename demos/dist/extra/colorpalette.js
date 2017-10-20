// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/colorpalette.js
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
function Colorpalette(config) {
    "use strict";
    // Call parent constructor
    Eventsmanager.call(this, config);

    if (typeof config.keyModifiers !== "object") {
        config.keyModifiers = {};
    }
    var el = config.containerEl;
    this.containerEl = el;
    el.classList.add("colorpalette");

    var width = 200,
        height = 220;


    this.width = width;
    this.height = height;

    this.color = {
        hue: 0,
        saturation: 0,
        value: 0,
        red: 0,
        green: 0,
        blue: 0,
        alpha: 1
    };

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


    this.paletteCanvas = document.createElement("canvas");
    this.paletteCanvas.className = "palette";
    this.paletteCanvas.width = width * 0.9;
    this.paletteCanvas.height = Math.floor(height * (9 / 11));
    this.paletteContext2d = this.paletteCanvas.getContext("2d");
    this.paletteIData = this.paletteContext2d.createImageData(this.paletteCanvas.width, this.paletteCanvas.height);
    this.paletteCanvas.style.cursor = "crosshair";
    this.paletteCanvas.style.position = "absolute";
    this.paletteCanvas.style.left = "0px";
    this.paletteCanvas.style.top = Math.floor(height * (1 / 11)) + "px";

    this.palettePointerEl = document.createElement("div");
    this.palettePointerEl.className = "pointer palette-pointer";
    this.palettePointerEl.position = "absolute";
    this.palettePointerEl.style.width = width * 0.06 + "px";
    this.palettePointerEl.style.height = width * 0.06 + "px";
    this.palettePointerEl.style.backgroundColor = "white";
    this.palettePointerEl.style.position = "absolute";
    this.palettePointerEl.style.borderRadius = "50%";
    this.palettePointerEl.style.cursor = "crosshair";
    this.palettePointerEl.style.boxShadow = "inset 0 0 2px #000";
    this.hueCanvas = document.createElement("canvas");
    this.hueCanvas.className = "hue";
    this.hueCanvas.width = width * 0.1;
    this.hueCanvas.height = height * (9 / 11);
    this.hueContext2d = this.hueCanvas.getContext("2d");
    this.hueIData = this.hueContext2d.createImageData(this.hueCanvas.width, this.hueCanvas.height);
    this.hueCanvas.style.cursor = "row-resize";

    this.hueCanvas.style.position = "absolute";
    this.hueCanvas.style.top = (1 / 11) * height + "px";
    this.hueCanvas.style.left = 0.9 * width + "px";

    this.hueSliderEl = document.createElement("div");
    this.hueSliderEl.className = "slider hue-slider";
    this.hueSliderEl.style.width = width * 0.12 + "px";
    this.hueSliderEl.style.height = height * 0.03 + "px";
    this.hueSliderEl.style.position = "absolute";
    this.hueSliderEl.style.top = 0.1 * height + "px";
    this.hueSliderEl.style.left = 0.89 * width + "px";
    this.hueSliderEl.style.backgroundColor = "white";
    this.hueSliderEl.style.cursor = "row-resize";
    this.hueSliderEl.style.boxShadow = "inset 0 0 2px #000";
    this.hueSliderEl.style.zIndex = 100;

    this.alphaCanvas = document.createElement("canvas");
    this.alphaCanvas.className = "alpha";
    this.alphaCanvas.width = width;
    this.alphaCanvas.height = height * (1 / 11);
    this.alphaContext2d = this.alphaCanvas.getContext("2d");
    this.alphaIData = this.alphaContext2d.createImageData(this.alphaCanvas.width, this.alphaCanvas.height);

    this.alphaCanvas.style.backgroundImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAB3RJTUUH4AcGEAAdMvv9RwAAAFBJREFUWMPt18EJACAIhWGLNnJah3Im28B36CDE/66CfBCirYgoa5KZ9hJ3b+vbhgMAAICj5lzNsYrqzxMAAAAAAAAA8/eA2vf8CwAA+B5wAUhhDw4II7MzAAAAAElFTkSuQmCC')";
    this.alphaCanvas.style.backgroundSize = "16px";
    this.alphaCanvas.style.backgroundPosition = "50% 50%";
    this.alphaCanvas.style.cursor = "col-resize";
    this.alphaCanvas.style.position = "absolute";
    this.alphaCanvas.style.top = (10 / 11) * height + "px";
    this.alphaCanvas.style.left = "0px";
    this.alphaCanvas.style.borderRadius = "0px 0px " + window.radius + "px " + window.radius + "px";
    this.alphaCanvas.style.overflow = "hidden";


    this.alphaSliderEl = document.createElement("div");
    this.alphaSliderEl.className = "slider alpha-slider";
    this.alphaSliderEl.style.width = width * 0.03 + "px";
    this.alphaSliderEl.style.height = height * 0.11 + "px";
    this.alphaSliderEl.style.backgroundColor = "white";
    this.alphaSliderEl.style.position = "absolute";
    this.alphaSliderEl.style.top = (10 / 11) * height - height * 0.01 + "px";
    this.alphaSliderEl.style.left = this.alphaCanvas.width - width * 0.015 + "px";
    this.alphaSliderEl.style.cursor = "col-resize";
    this.alphaSliderEl.style.boxShadow = "inset 0 0 2px #000";
    this.alphaSliderEl.style.zIndex = 100;

    this.redInput = document.createElement("input");
    this.redInput.title = "R:";

    this.greenInput = document.createElement("input");
    this.greenInput.title = "G:";

    this.blueInput = document.createElement("input");
    this.blueInput.title = "B:";

    this.alphaInput = document.createElement("input");
    this.alphaInput.title = "A:";

    this.valuesEl = document.createElement("div");

    var that = this;

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
    el.appendChild(this.paletteCanvas);
    el.appendChild(this.hueCanvas);
    el.appendChild(this.alphaCanvas);

    el.appendChild(this.hueSliderEl);
    el.appendChild(this.alphaSliderEl);
    el.appendChild(this.palettePointerEl);
    // el.appendChild(this.valuesEl);


    this.drawHue();
    this.drawPalette(this.color.hue);

    function changeHueEvent(e) {
        var y = that.normalize(e.offsetY, 0, that.hueCanvas.height);
        var hue = (y / that.hueCanvas.height) * 360;
        that.changeHue(hue);
    }
    addEvent(this.hueCanvas, "slide", changeHueEvent);
    addEvent(this.colorEl, "tap", function () {
        var color = that.getColor();
        that.dispatch("set", {color: color});
    });
    // this.hueCanvas.addEventListener("mousemove", changeHue);



    function pickPaletteEvent(e) {
        var x = that.normalize(e.offsetX, 0, that.paletteCanvas.width);
        var y = that.normalize(e.offsetY, 0, that.paletteCanvas.height);
        var s = (x / that.paletteCanvas.width) * 100,
            v = (y / that.paletteCanvas.height) * 100;
        that.pickPalette(s, v);
    }

    addEvent(this.paletteCanvas, "slide", pickPaletteEvent);


    function changeAlphaEvent(e) {
        var x = that.normalize(e.offsetX, 0, that.alphaCanvas.width);
        var alpha = (x / that.alphaCanvas.width) * 1;
        that.changeAlpha(alpha);
    }

    addEvent(this.alphaCanvas, "slide", changeAlphaEvent);
    this.setHueSlider(0);
    if (config.color) {
        this.setColor(config.color);
    }


    function alphaWheel(e) {
        that.changeAlpha(that.color.alpha - (e.deltaX / 100) / 2);
        e.preventDefault();
    }
    this.alphaCanvas.addEventListener("wheel", alphaWheel);
    this.alphaSliderEl.addEventListener("wheel", alphaWheel);

    function hueWheel(e) {
        that.changeHue(that.color.hue - e.deltaY / 2);
        e.preventDefault();
    }
    this.hueCanvas.addEventListener("wheel", hueWheel);
    this.hueSliderEl.addEventListener("wheel", hueWheel);

    function paletteWheel(e) {
        that.pickPalette(that.color.saturation - e.deltaX / 2, that.color.value - e.deltaY / 2);
        e.preventDefault();
    }
    this.paletteCanvas.addEventListener("wheel", paletteWheel);
    this.palettePointerEl.addEventListener("wheel", paletteWheel);

    this.keyshortcuts = new Keyshortcuts();
    this.keyshortcuts.disable();


    this.keyshortcuts.addShortcut(Object.assign({altKey: false, keyCode: 38, repeatable: true}, config.keyModifiers), function () {//up
        // e.stopImmediatePropagation();
        that.changeHue(that.color.hue - 1);
    });
    this.keyshortcuts.addShortcut(Object.assign({altKey: false, keyCode: 40, repeatable: true}, config.keyModifiers), function () {//down
        // e.stopImmediatePropagation();
        that.changeHue(that.color.hue + 1);
    });
    this.keyshortcuts.addShortcut(Object.assign({altKey: false, keyCode: 37, repeatable: true}, config.keyModifiers), function () {//left
        // e.stopImmediatePropagation();
        that.changeAlpha(that.color.alpha - 0.01);
    });
    this.keyshortcuts.addShortcut(Object.assign({altKey: false, keyCode: 39, repeatable: true}, config.keyModifiers), function () {//right
        // e.stopImmediatePropagation();
        that.changeAlpha(that.color.alpha + 0.01);
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
Colorpalette.prototype = Object.create(Eventsmanager.prototype);

Object.assign(Colorpalette.prototype, {

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
    pickPalette: function pickPalette(s, v) {
        "use strict";
        s = this.normalize(s, 0, 100);
        v = this.normalize(v, 0, 100);
        this.color.saturation = s;
        this.color.value = v;
        var rgb = this.HSVtoRGB(this.color.hue, this.color.saturation, this.color.value);
        this.setPalettePointer(this.color.saturation, this.color.value);
        var rgba = rgb;
        rgba.a = this.color.alpha;
        this.setColor(rgba);
    },
    changeHue: function changeHue(hue) {
        "use strict";
        hue = hue % 360;
        if (hue < 0) {
            hue += 360;
        }
        // console.log(hue);
        this.setHueSlider(hue);
        this.color.hue = hue;
        this.drawPalette(hue);

        var rgb = this.HSVtoRGB(hue, this.color.saturation, this.color.value);
        rgb.a = this.color.alpha;
        // if (rgb.r || rgb.g || rgb.b) {
        //     this.setColor(rgb);
        // }
        this.setColor(rgb);
        // this.color.red = rgb.r;
        // this.color.green = rgb.g;
        // this.color.blue = rgb.b;

        // this.redInput.value = rgb.r;
        // this.greenInput.value = rgb.g;
        // this.blueInput.value = rgb.b;

        // this.setHueSlider(hue);
        // this.darwAlpha(rgb);
        // this.setPalettePointer(this.color.saturation, this.color.value);

        // this.setColor({
        //     r: this.color.red,
        //     g: this.color.green,
        //     b: this.color.blue,
        //     a: this.color.alpha
        // });
        // var rgba = this.getColor();
        // this.colorEl.style.backgroundColor = "rgba(" + rgba.red + "," + rgba.green + "," + rgba.blue + "," + rgba.alpha + ")";

        // this.triggerUpdate();

        //that.setColor(rgb);
    },
    changeAlpha: function changeAlpha(alpha) {
        "use strict";
        alpha = this.normalize(alpha, 0, 1);
        this.color.alpha = alpha;
        this.setAlpha(alpha);
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
    HSVtoRGB: function HSVtoRGB(hue, saturation, value) {
        "use strict";
        var sat = saturation / 100,
            V = value / 100,
            C = sat * V,
            H = hue / 60,
            X = C * (1 - Math.abs(H % 2 - 1)),
            m = V - C,
            precision = 255;

        C = (C + m) * precision;
        X = (X + m) * precision;
        m = m * precision;

        if (H >= 0 && H < 1) {
            return {r: C, g: X, b: m};
        }
        if (H >= 1 && H < 2) {
            return {r: X, g: C, b: m};
        }
        if (H >= 2 && H < 3) {
            return {r: m, g: C, b: X};
        }
        if (H >= 3 && H < 4) {
            return {r: m, g: X, b: C};
        }
        if (H >= 4 && H < 5) {
            return {r: X, g: m, b: C};
        }
        if (H >= 5 && H < 6) {
            return {r: C, g: m, b: X};
        }
        return {r: 0, g: 0, b: 0};
    },

    /**
     * [RGBtoHSV description]
     * @param {number} red   0-255
     * @param {number} green 0-255
     * @param {number} blue  0-255
     * @return {object} - {h: number, s: number, v: number}
     */
    RGBtoHSV: function RGBtoHSV(red, green, blue) {
        "use strict";
        var r = red / 255;
        var g = green / 255;
        var b = blue / 255;

        var cmax = Math.max(r, g, b);
        var cmin = Math.min(r, g, b);
        var delta = cmax - cmin;
        var h = 0;
        var s = 0;

        if (delta) {
            if (cmax === r) {
                h = ((g - b) / delta);
            }
            if (cmax === g) {
                h = 2 + (b - r) / delta;
            }
            if (cmax === b) {
                h = 4 + (r - g) / delta;
            }
            if (cmax) {
                s = delta / cmax;
            }
        }

        var hue,
            saturation,
            value;
        hue = 60 * h;
        if (hue < 0) {
            hue += 360;
        }
        saturation = (s * 100);
        value = (cmax * 100);
        return {
            h: hue,
            s: saturation,
            v: value
        };
    },

    putPixel: function (idata, x, y, pixel) {
        "use strict";
        var i = (x + y * idata.width) * 4;
        idata.data[i] = pixel.r;
        idata.data[i + 1] = pixel.g;
        idata.data[i + 2] = pixel.b;
        idata.data[i + 3] = pixel.a;
    },

    drawHue: function drawHue() {
        "use strict";
        var x,
            y,
            c;
        for (x = 0; x < this.hueCanvas.width; x += 1) {
            for (y = 0; y < this.hueCanvas.height; y += 1) {
                c = this.HSVtoRGB((y / this.hueCanvas.height) * 360, 100, 100);
                this.putPixel(this.hueIData, x, y, {
                    r: c.r,
                    g: c.g,
                    b: c.b,
                    a: 255
                });
            }
        }
        this.hueContext2d.putImageData(this.hueIData, 0, 0);
    },

    setAlphaSlider: function setAlphaSlider(alpha) {
        "use strict";
        // console.log("setAlphaSlider", alpha);
        this.alphaSliderEl.style.left = this.alphaCanvas.width * (alpha / 1) - this.width * 0.015 + "px";
    },

    setAlpha: function setAlpha(alpha) {
        "use strict";
        alpha = Math.round(alpha * 100) / 100;
        this.color.alpha = alpha;
        this.setColor({
            r: this.color.red,
            g: this.color.green,
            b: this.color.blue,
            a: this.color.alpha
        });
    },

    setHueSlider: function setHueSlider(hue) {
        "use strict";
        this.hueSliderEl.style.top = this.height * (1 / 11) + this.hueCanvas.height * (hue / 360) - this.height * 0.015 + "px";
    },

    setPalettePointer: function setPalettePointer(s, v) {
        "use strict";
        var x = this.paletteCanvas.width * (s / 100),
            y = this.paletteCanvas.height * (v / 100);
        this.palettePointerEl.style.left = -this.width * 0.03 + x + "px";
        this.palettePointerEl.style.top = -this.height * 0.03 + this.height * (1 / 10) + y + "px";
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
        var HSV = {
            h: this.color.hue,
            s: this.color.saturation,
            v: this.color.value
        };
        if (col.r || col.g || col.b) {
            HSV = this.RGBtoHSV(col.r, col.g, col.b);
        }
        if (col.r === col.g && col.g === col.b) {
            HSV.h = this.color.hue;
        }
        // console.log("colorpalette.js:setColor", col);
        this.color.red = col.r;
        this.color.green = col.g;
        this.color.blue = col.b;
        this.color.alpha = col.a;
        this.color.hue = HSV.h;
        this.color.saturation = HSV.s;
        this.color.value = HSV.v;
        this.redInput.value = col.r;
        this.greenInput.value = col.g;
        this.blueInput.value = col.b;
        this.alphaInput.value = col.a;
        // console.log(JSON.stringify(this.color));
        // if (this.color.saturation || this.color.value) {
        this.setHueSlider(HSV.h);
        // }
        this.drawPalette(HSV.h);
        this.darwAlpha(col);
        this.setAlphaSlider(col.a);
        this.setPalettePointer(HSV.s, HSV.v);

        var rgba = this.getColor();
        this.colorEl.style.backgroundColor = "rgba(" + rgba.red + "," + rgba.green + "," + rgba.blue + "," + rgba.alpha + ")";
        // console.log("rgba(" + rgba.red + "," + rgba.green + "," + rgba.blue + "," + rgba.alpha + ")");
        if (!noPropagate) {
            this.triggerUpdate();
        }
    },


    drawPalette: function drawPalette(hue) {
        "use strict";
        var x,
            y,
            c;
        for (x = 0; x < this.paletteCanvas.width; x += 1) {
            for (y = 0; y < this.paletteCanvas.height; y += 1) {
                c = this.HSVtoRGB(hue, (x / this.paletteCanvas.width) * 100, (y / this.paletteCanvas.height) * 100);
                this.putPixel(this.paletteIData,
                        x,
                        y,
                        {
                    r: c.r,
                    g: c.g,
                    b: c.b,
                    a: 255
                });
            }
        }
        this.paletteContext2d.putImageData(this.paletteIData, 0, 0);
    },


    darwAlpha: function darwAlpha(col) {
        "use strict";
        var x,
            y;
        for (x = 0; x < this.alphaCanvas.width; x += 1) {
            for (y = 0; y < this.alphaCanvas.height; y += 1) {
                this.putPixel(this.alphaIData, x, y, {
                    r: col.r,
                    g: col.g,
                    b: col.b,
                    a: 255 * (x / this.alphaCanvas.width)
                });
            }
        }
        this.alphaContext2d.putImageData(this.alphaIData, 0, 0);
    }

});
window.Colorpalette = Colorpalette;