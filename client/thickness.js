// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/thickness.js
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
function Thickness(config) {
    "use strict";
    Eventsmanager.call(this, config);
    if (typeof config.keyModifiers !== "object") {
        config.keyModifiers = {};
    }

    var el = config.containerEl;
    this.containerEl = el;
    el.classList.add("thickness");

    var width = 20,
        height = 220;

    this.minValue = config.minValue || 0.01;
    this.maxValue = config.maxValue || 20;
    this.width = width;
    this.height = height;

    this.size = config.size || 1;

    el.style.position = "relative";
    el.style.width = width + "px";
    el.style.height = height + "px";//yeap
    el.style.display = "inline-block";

    this.bgEl = document.createElement("div");
    this.bgEl.style.backgroundColor = "transparent";
    this.bgEl.style.position = "absolute";
    this.bgEl.className = "bg";
    this.bgEl.style.top = "0px";
    this.bgEl.style.left = "0px";
    this.bgEl.style.cursor = "row-resize";
    //this.bgEl.style.borderRadius = "50%";
    this.bgEl.style.borderLeft = width + "px solid transparent";
    this.bgEl.style.borderBottom = height + "px solid black";


    this.sliderEl = document.createElement("div");
    this.sliderEl.className = "slider hue-slider";
    this.sliderEl.style.width = width * 1.2 + "px";
    this.sliderEl.style.height = height * 0.03 + "px";
    this.sliderEl.style.position = "absolute";
    this.sliderEl.style.top = 0.1 * height + "px";
    this.sliderEl.style.left = -width * 0.1 + "px";
    this.sliderEl.style.backgroundColor = "white";
    this.sliderEl.style.cursor = "row-resize";
    this.sliderEl.style.boxShadow = "inset 0 0 2px #000";
    this.sliderEl.style.zIndex = "100";

    this.sizeInput = document.createElement("input");
    this.sizeInput.title = "S:";

    this.keyshortcuts = new Keyshortcuts();
    var that = this;


    el.appendChild(this.bgEl);
    el.appendChild(this.sliderEl);


    // this.keyshortcuts = new Keyshortcuts();

    function changeSizeEvent(e) {
        var y = that.normalize(e.offsetY, 0, that.height);
        var size = that.minValue + (y / that.height) * (that.maxValue - that.minValue);
        that.setSize(size);
    }
    addEvent(this.bgEl, "slide", changeSizeEvent);

    function sizeWheel(e) {
        that.setSize(that.size - e.deltaY / 2);
        e.preventDefault();
    }
    this.bgEl.addEventListener("wheel", sizeWheel);
    this.sliderEl.addEventListener("wheel", sizeWheel);

    this.keyshortcuts.addShortcut(Object.assign({shiftKey: false, keyCode: 38, repeatable: true}, config.keyModifiers), function () {//up
        var size = that.size;
        if (that.size <= 1) {
            size = Math.round(size * 10 - 1) / 10;
        } else {
            size = Math.round(size - 1);
        }
        that.setSize(size);
    });

    this.keyshortcuts.addShortcut(Object.assign({shiftKey: false, keyCode: 40, repeatable: true}, config.keyModifiers), function () {//down
        var size = that.size;
        if (that.size < 1) {
            size = Math.round(size * 10 + 1) / 10;
        } else {
            size = Math.round(size + 1);
        }
        that.setSize(size);
    });

    // this.keyshortcuts.addShortcut({shiftKey: false, keyCode: 38, repeatable: true}, function (e) {//up
    //     e.stopImmediatePropagation();
    //     that.setSize(that.size * 0.9);
    // });
    // this.keyshortcuts.addShortcut({shiftKey: false, keyCode: 40, repeatable: true}, function (e) {//down
    //     e.stopImmediatePropagation();
    //     that.setSize(that.size * 1.1);
    // });


}

Thickness.prototype = Object.create(Eventsmanager.prototype);

Object.assign(Thickness.prototype, {
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

    triggerUpdate: function triggerUpdate() {
        "use strict";
        this.dispatch("change", {size: this.size});
    },

    setSize: function setSize(size) {
        "use strict";
        this.size = this.normalize(size, this.minValue, this.maxValue);
        this.sliderEl.style.top = this.height * (this.size - this.minValue) / (this.maxValue - this.minValue) - this.height * 0.015 + "px";
        this.triggerUpdate();
    }

});

window.Thickness = Thickness;