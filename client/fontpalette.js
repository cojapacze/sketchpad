// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/fontpalette.js
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
function Fontpalette(config) {
    "use strict";
    // Call parent constructor
    Eventsmanager.call(this, config);
    if (typeof config.keyModifiers !== "object") {
        config.keyModifiers = {};
    }

    // var pickCb = config.pick;
    var el = config.containerEl;
    this.containerEl = el;
    el.classList.add("fontpalette");

    var width = 200,
        height = 220;


    this.width = width;
    this.height = height;
    this.font = "Georgia";
    this.size = 60;
    this.color = {
        hue: 0,
        saturation: 0,
        value: 0,
        red: 0,
        green: 0,
        blue: 0,
        alpha: 1
    };
    this.minSize = config.minSize || 10;
    this.maxSize = config.maxSize || 100;
    this.fontList = config.fontList || ["Arial", "Arial Black", "Arial Narrow", "Courier New", "Lucida Sans Typewriter", "Papyrus", "Tahoma", "Times New Roman", "Trebuchet MS", "Comic Sans MS", "Verdana"];

    el.style.position = "relative";
    el.style.width = width + "px";
    el.style.height = height + "px";//yeap
    el.style.display = "inline-block";

    var that = this;
    this.fontListSelectEl = document.createElement("select");
    this.fontListSelectEl.style.height = Math.floor(height * (1 / 11)) + "px";
    this.fontListSelectEl.style.width = "100%";
    this.fontListSelectEl.style.lineHeight = Math.floor(height * (1 / 11)) + "px";

    this.fontList.forEach(function (font) {
        var optionEl = document.createElement("option");
        optionEl.value = font;
        optionEl.textContent = font;
        that.fontListSelectEl.appendChild(optionEl);
    });
    function onFontChange(e) {
        that.setFont(e.target.value);
    }
    this.fontListSelectEl.addEventListener("change", onFontChange);

    this.previewCanvas = document.createElement("canvas");
    this.previewCanvas.className = "palette";
    this.previewCanvas.width = width;
    this.previewCanvas.height = Math.floor(height * (9 / 11));

    this.previewContext2d = this.previewCanvas.getContext("2d");
    this.paletteIData = this.previewContext2d.createImageData(this.previewCanvas.width, this.previewCanvas.height);
    this.previewCanvas.style.cursor = "crosshair";
    this.previewCanvas.style.position = "absolute";
    this.previewCanvas.style.left = "0px";
    this.previewCanvas.style.top = "20px";

    this.sizeEl = document.createElement("div");
    this.sizeEl.style.backgroundColor = "transparent";
    this.sizeEl.style.position = "absolute";
    this.sizeEl.className = "bg";
    this.sizeEl.style.top = (height * (10 / 11)) + "px";
    this.sizeEl.style.left = "0px";
    this.sizeEl.style.cursor = "col-resize";
    this.sizeEl.style.borderLeft = width + "px solid transparent";
    this.sizeEl.style.borderBottom = (height * (1 / 11)) + "px solid black";

    this.sizeSliderEl = document.createElement("div");
    this.sizeSliderEl.className = "slider hue-slider";
    this.sizeSliderEl.style.marginLeft = -width * 0.015 + "px";
    this.sizeSliderEl.style.marginTop = -height * 0.01 + "px";

    this.sizeSliderEl.style.width = width * 0.03 + "px";
    this.sizeSliderEl.style.height = height * (0.11) + "px";
    this.sizeSliderEl.style.position = "absolute";
    this.sizeSliderEl.style.top = (10 / 11) * height + "px";
    this.sizeSliderEl.style.left = "0px";
    this.sizeSliderEl.style.backgroundColor = "white";
    this.sizeSliderEl.style.cursor = "col-resize";
    this.sizeSliderEl.style.boxShadow = "inset 0 0 2px #000";
    this.sizeSliderEl.style.zIndex = "100";


    function changeSize(e) {
        var x = that.normalize(that.width + e.offsetX, 0, that.width);
        var size = that.minSize + (x / that.width) * (that.maxSize - that.minSize);
        that.setSize(size);
    }

    function vWheel(e) {
        e.preventDefault();
        that.setSize(that.size - e.deltaY / 2);
    }
    this.previewCanvas.addEventListener("wheel", vWheel);

    function hWheel(e) {
        e.preventDefault();
        that.setSize(that.size - e.deltaX / 2);
    }

    this.sizeSliderEl.addEventListener("wheel", hWheel);
    this.sizeEl.addEventListener("wheel", hWheel);

    addEvent(this.sizeEl, "slide", changeSize);
    this.keyshortcuts = new Keyshortcuts();
    this.keyshortcuts.disable();

    // this.keyshortcuts.addShortcut(Object.assign({shiftKey: false, keyCode: 38, repeatable: true}, config.keyModifiers), function () {//up
    //     console.log("up");
    // });
    // this.keyshortcuts.addShortcut(Object.assign({shiftKey: false, keyCode: 40, repeatable: true}, config.keyModifiers), function () {//down
    //     console.log("down");
    // });

    this.keyshortcuts.addShortcut(Object.assign({shiftKey: false, keyCode: 37, repeatable: true}, config.keyModifiers), function () {//left
        // e.stopImmediatePropagation();
        that.setSize(that.size - 1);
    });
    this.keyshortcuts.addShortcut(Object.assign({shiftKey: false, keyCode: 39, repeatable: true}, config.keyModifiers), function () {//right
        // e.stopImmediatePropagation();
        that.setSize(that.size + 1);
    });


    this.redrawPreview();

    el.appendChild(this.fontListSelectEl);
    el.appendChild(this.previewCanvas);
    el.appendChild(this.sizeEl);
    el.appendChild(this.sizeSliderEl);

}
Fontpalette.prototype = Object.create(Eventsmanager.prototype);

Object.assign(Fontpalette.prototype, {
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

    setSize: function setSize(size) {
        "use strict";
        this.size = this.normalize(size, this.minSize, this.maxSize);
        this.sizeSliderEl.style.left = this.width * (this.size - this.minSize) / (this.maxSize - this.minSize) + "px";
        this.redrawPreview();
        this.dispatch("change", {size: this.size});
    },
    setFont: function setFont(font) {
        "use strict";
        this.font = font;
        this.fontListSelectEl.value = font;
        this.dispatch("change", {font: this.font});
        this.redrawPreview();
    },
    setColor: function setColor(color) {
        "use strict";
        this.color = color;
        this.redrawPreview();
    },
    redrawPreview: function redrawPreview() {
        "use strict";
        var context = this.previewContext2d;
        context.clearRect(0, 0, this.previewCanvas.width, this.previewCanvas.height);
        context.font = this.size + "px " + this.font;
        context.textAlign = "left";
        context.textBaseline = "middle";
        context.fillStyle = "rgba(" + this.color.r + "," + this.color.g + "," + this.color.b + "," + this.color.a + ")";
        context.fillText("Lorem ipsum", 0, this.previewCanvas.height / 2);
        // this.dispatch("change", {font: this.font, size: this.size, color: this.color});

    }

});
window.Fontpalette = Fontpalette;