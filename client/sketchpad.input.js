// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/sketchpad.input.js
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


/**
 *
 * Input stack for registering one drawing events path
 * ex. for one finger on touch devices
 * Input stack can by chuckend into smaller parts
 * used to draw current frame or be sended to server
 *
 * @class Input
 * @param {object} config {id, layers, tool, color, fillColor, size}
 */
function Input(config) {
    "use strict";
    // Object.getPrototypeOf(this).instance += 1;
    Input.prototype.instance += 1;
    this.timestamp = new Date().getTime();

    this.type = config.type || "draw";
    this.uid = config.uid;
    this.id = config.id;
    this.layers = config.layers;
    this.tool = config.tool;
    this.font = config.font;
    this.color = config.color;
    this.fillColor = config.fillColor;
    this.size = config.size;
    this.center = config.center;

    this.listT = [];
    this.listX = [];
    this.listY = [];
    this.listP = [];
    this.lastT = NaN;
    this.lastX = NaN;
    this.lastY = NaN;
    this.lastP = NaN;

    this.lastSendPointer = 0;
    this.lastDrawPointer = 0;

    this.sketchpad = config.sketchpad;
    this.viewportX = this.sketchpad.viewportX; //tofix: this same input fragment can have diffrent viewport than that was drawen
    this.viewportY = this.sketchpad.viewportY;
    this.scale = this.sketchpad.scale;
    this.rotation = this.sketchpad.rotation;
    this.width = this.sketchpad.width;
    this.height = this.sketchpad.height;
    this.UID = this.sketchpad.UID; //overwitten by server
    this.url = config.url;
    return this;
}


Input.prototype = {
    instance: 0,

    getConfig: function getConfig() {
        "use strict";
        return {
            lay: this.layers.slice(),
            siz: this.size,
            col: this.color,
            fcl: this.fillColor,
            txt: this.textContent,
            fnt: this.font,
            axs: this.axis,
            tst: 1,
            url: this.url,
            cen: this.center,
            mrh: this.mirrorH,
            mrv: this.mirrorV,
            mvh: this.mirrorVH,
            rbw: this.rainbow
        };
    },
    /**
     * Add point to input path
     * @param {timestamp} t - current timestamp of move
     * @param {integer} x - x coordinate
     * @param {integer} y - y coordinate
     */
    addPoint: function addPoint(t, x, y, force) {
        "use strict";
        if (this.sketchpad.readOnly) {
            return;
        }
        if ((x !== this.lastX) || (y !== this.lastY) || (force)) {
            this.lastT = t - this.timestamp;
            this.lastX = x;
            this.lastY = y;
            this.listT.push(t - this.timestamp);
            this.listX.push(x);
            this.listY.push(y);
        }
    },
    /**
     * Returns last point
     * @return {object} - ex. {x: 0, y: 0} or false
     */
    getLastPoint: function getLastPoint() {
        "use strict";
        if (this.listX.length) {
            return {
                x: this.listX[this.listX.length - 1],
                y: this.listY[this.listY.length - 1]
            };
        } else {
            return false;
        }

    },
    /**
     * Returns part of input stack that were not yet send
     * @return {object} - ex. {t: [0, 3, 6], x: [0, 1, 2], y: [3, 2, 1]}
     */
    getPointsToSend: function getPointsToSend() {
        "use strict";
        var i;
        if (this.lastSendPointer < this.listX.length - 1) {
            var t = this.listT[this.lastSendPointer];
            var dataT = this.listT.slice(this.lastSendPointer);
            var dataX = this.listX.slice(this.lastSendPointer);
            var dataY = this.listY.slice(this.lastSendPointer);
            this.lastSendPointer = this.listX.length - 1;
            for (i = 0; i < dataT.length; i += 1) {
                dataT[i] -= t;
            }
            var data = {
                t: dataT,//keep this
                x: dataX,
                y: dataY
            };
            return data;
        }
    },
    /**
     * Returns part of input stack that were not yet drawed
     * @return {object} - {t: [0, 3, 6], x: [0, 1, 2], y: [3, 2, 1]}
     */
    getPointsToDraw: function getPointsToDraw() {
        "use strict";
        if (this.lastDrawPointer < this.listX.length - 1) {
            var dataX = this.listX.slice(this.lastDrawPointer);
            var dataY = this.listY.slice(this.lastDrawPointer);
            var dataT = this.listT.slice(this.lastDrawPointer);
            this.lastDrawPointer = this.listX.length - 1;
            var data = {
                t: dataT,
                x: dataX,
                y: dataY
            };
            return data;
        }
    }
};
