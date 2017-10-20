// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/sketchpad.tool.circle.js
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



/*global NSSketchpad, Input, ToolFillable*/

/**
 * Tool for drawing circles and elipses
 * @class
 * @extends Tool
 * @param {object} config - tool config
 */
function ToolCirc(config) {
    "use strict";
    ToolFillable.call(this, config);
}

ToolCirc.prototype = Object.create(ToolFillable.prototype);

Object.assign(ToolCirc.prototype, {
    lineWidth: 1,
    toolLabel: "Circle",//◯
    layers: ["F"],
    toolId: "circle",
    keyCode: 67, //c
    color: {
        r: 0,
        g: 0,
        b: 0,
        a: 1
    },

    fillColor: {
        r: 255,
        g: 127,
        b: 0,
        a: 0
    },


    /**
     * [startInput description]
     * @memberof ToolCirc#
     * @param  {any} id - unique id in current moment
     * @param  {integer} x  - x coordinate
     * @param  {integer} y  - y coordinate
     * @return {Input} - returns new Input for current tool touch
     */
    startInput: function startPath(id, x, y, e) {
        "use strict";
        // console.log("Tool.startInput");
        if (e && e.altKey) {
            x = Math.round(x / 10) * 10;
            y = Math.round(y / 10) * 10;
        }

        var sketchpad = this.sketchpad;
        var input = new Input({
            sketchpad: sketchpad,
            id: id,
            tool: this.toolId,
            color: this.getColorStr(),
            fillColor: this.getFillColorStr(),
            size: this.lineWidth,
            layers: this.layers,
            uid: this.sketchpad.UID
        });
        // input.addPoint(new Date().getTime(), x, y);

        input.firstX = x;
        input.firstY = y;

        input.selectorDiv = document.createElement("div");
        input.selectorDiv.style.position = "absolute";
        input.selectorDiv.style.border = "1px solid white";
        input.selectorDiv.style.borderRadius = "50%";
        input.selectorDiv.style.display = "block";


        if (this.sketchpad.centerViewport) {
            input.selectorDiv.style.left = this.sketchpad.width / 2 + x - 1 + "px";
            input.selectorDiv.style.top = this.sketchpad.height / 2 + y - 1 + "px";
        } else {
            input.selectorDiv.style.left = x - 1 + "px";
            input.selectorDiv.style.top = y - 1 + "px";
        }


        input.selectorDiv.style.width = "1px";
        input.selectorDiv.style.height = "1px";

        input.selectorDiv2 = document.createElement("div");
        input.selectorDiv2.style.position = "absolute";
        input.selectorDiv2.style.border = "1px dashed black";
        input.selectorDiv2.style.borderRadius = "50%";
        input.selectorDiv2.style.display = "block";

        if (this.sketchpad.centerViewport) {
            input.selectorDiv2.style.left = this.sketchpad.width / 2 + x - 1 + "px";
            input.selectorDiv2.style.top = this.sketchpad.height / 2 + y - 1 + "px";
        } else {
            input.selectorDiv2.style.left = x - 1 + "px";
            input.selectorDiv2.style.top = y - 1 + "px";
        }

        input.selectorDiv2.style.width = "1px";
        input.selectorDiv2.style.height = "1px";

        sketchpad.containerEl.appendChild(input.selectorDiv);
        sketchpad.containerEl.appendChild(input.selectorDiv2);

        input.addPoint(new Date().getTime(), (x), (y));
        return input;
    },

    /**
     * [moveInput description]
     * @memberof ToolCirc#
     * @param  {Input} input - [description]
     * @param  {number} x -    [description]
     * @param  {number} y -   [description]
     * @param  {HTMLEvent} e -    [description]
     * @return {undefined}       [description]
     */
    moveInput: function drawPath(input, x, y, e) {
        "use strict";
        if (e && e.altKey) {
            x = Math.round(x / 10) * 10;
            y = Math.round(y / 10) * 10;
        }

        var fristX = input.firstX;
        var fristY = input.firstY;

        var w = Math.abs(x - fristX);
        var h = Math.abs(y - fristY);
        if (e.shiftKey) {
            w = h;
        }


        if (this.sketchpad.centerViewport) {
            input.selectorDiv.style.left = this.sketchpad.width / 2 + fristX - w + "px";
            input.selectorDiv.style.top = this.sketchpad.height / 2 + fristY - h + "px";
            input.selectorDiv2.style.left = this.sketchpad.width / 2 + fristX - w + "px";
            input.selectorDiv2.style.top = this.sketchpad.height / 2 + fristY - h + "px";

        } else {
            input.selectorDiv.style.left = fristX - w + "px";
            input.selectorDiv.style.top = fristY - h + "px";
            input.selectorDiv2.style.left = fristX - w + "px";
            input.selectorDiv2.style.top = fristY - h + "px";
        }


        input.selectorDiv.style.width = w * 2 + "px";
        input.selectorDiv.style.height = h * 2 + "px";

        input.selectorDiv2.style.width = w * 2 + "px";
        input.selectorDiv2.style.height = h * 2 + "px";
    },

    /**
     * [finishInput description]
     * @memberof ToolCirc#
     * @param  {Input} input - [description]
     * @param  {number} x -    [description]
     * @param  {number} y -   [description]
     * @param  {HTMLEvent} e -    [description]
     * @return {undefined}       [description]
     */
    finishInput: function endPath(input, x, y, e) {
        "use strict";
        if (e && e.altKey) {
            x = Math.round(x / 10) * 10;
            y = Math.round(y / 10) * 10;
        }

        var sketchpad = this.sketchpad;

        var firstX = input.firstX;
        var firstY = input.firstY;

        var h = Math.abs(y - firstY);
        if (e.shiftKey) {
            x = firstX + h;
        }

        input.addPoint(new Date().getTime(), (x), (y));
        sketchpad.containerEl.removeChild(input.selectorDiv);
        sketchpad.containerEl.removeChild(input.selectorDiv2);
    },


    /**
     * Recalulates scale
     * @param  {Object} config      - configuration of drawing client viewport
     * @param  {number} s           - scale
     * @return {number}             - recalculated scale
     */
    recalcS: function recalcS(config, s) {
        "use strict";
        var sketchpad = this.sketchpad;
        s *= (1 / config.scl);
        s *= sketchpad.scale;
        return s;
    },

    /**
     * Draw engine
     * @memberof ToolCirc#
     * @param  {object} config - Drawing parameters
     * @param  {object} points - List of points to draw
     * @return {undefined}
     */
    drawFramePath: function drawFramePath(config, points) {
        "use strict";
        var toolConfig = config.cnf;
        var sketchpad = this.sketchpad,
            ll,
            r,
            context;
        if (!toolConfig.lay || !toolConfig.lay.length) {
            console.warn("no layers to draw");
            return;
        }
        var p1, p2;
        for (ll = 0; ll < toolConfig.lay.length; ll += 1) {
            switch (toolConfig.lay[ll]) {
            case sketchpad.LAYER_BACK:
                context = sketchpad.contextB2D;
                break;
            case sketchpad.LAYER_FRONT:
                context = sketchpad.context2D;
                break;
            default:
                context = sketchpad.context2D;
            }

            context.save();

            context.rotate(sketchpad.rotation * Math.PI / 180);
            context.scale(sketchpad.scale, sketchpad.scale);


            context.translate(config.vpx, config.vpy);
            context.translate(-sketchpad.viewportX, -sketchpad.viewportY);

            context.scale(1 / config.scl, 1 / config.scl);
            context.rotate(-config.rot * Math.PI / 180);

            p1 = {x: points.x[0], y: points.y[0]};
            p2 = {x: points.x[1], y: points.y[1]};

            // set center of canvas to cener of drawing circle
            context.translate(p1.x, p1.y);
            context.beginPath();
            context.scale(1, Math.abs(p2.y - p1.y) / Math.abs(p2.x - p1.x));


            r = Math.abs(p2.x - p1.x);

            context.arc(0, 0, r, 0, Math.PI * 2, false); // Outer circle
            context.restore();
            context.strokeStyle = toolConfig.col;
            context.fillStyle = toolConfig.fcl;
            context.lineWidth = this.recalcS(config, toolConfig.siz);

            context.fill();
            context.stroke();
            context.restore();


        }


    }
});
NSSketchpad.avaliableTools.push(ToolCirc);
