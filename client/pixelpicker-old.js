// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/pixelpicker-old.js
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


/*global window, Eventsmanager*/

/**
 * Picks color from image
 * @class
 * @param {DOMElement} el
 * @param {string} imgSrc
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
    el.classList.add("pixelpicker");

    var width = 200,
        height = 220;
    this.width = width;
    this.height = height;

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


    var img = document.createElement("img");
    img.addEventListener("load", function () {
        if (config.backgroundImage) {
            this.background = document.createElement("div");
            this.background.style = "width: 100%; height:100%; position: absolute;";
            this.background.style.backgroundImage = "url(" + config.backgroundImage.toString() + ")";
            this.background.style.width = img.width + "px";
            this.background.style.height = img.height + "px";
            el.appendChild(this.background);
        }

        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        el.style.width = img.width + "px";
        el.style.height = img.height + "px";
        canvas.style = "position: absolute;";
        canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);

        canvas.addEventListener("click", function (e) {
            var pixelData = canvas.getContext('2d').getImageData(e.offsetX, e.offsetY, 1, 1).data;
            pickCb(pixelData[0], pixelData[1], pixelData[2], pixelData[3] / 255);
        });
        el.appendChild(canvas);
    });
    img.src = config.imageSrc;

}
Pixelpicker.prototype = Object.create(Eventsmanager.prototype);

Object.assign(Pixelpicker.prototype, {
   color: {
        hue: 0,
        saturation: 0,
        value: 0,
        red: 0,
        green: 0,
        blue: 0,
        alpha: 1
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

    setColor: function setColor(col, noPropagate) {
        "use strict";
    },


});
window.Pixelpicker = Pixelpicker;