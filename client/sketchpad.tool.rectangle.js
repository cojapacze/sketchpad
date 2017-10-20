// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/sketchpad.tool.rectangle.js
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
 * @constructor
 * @augments Tool
 * @param {object} config - tool config
 */
function ToolRect(config) {
    "use strict";
    ToolFillable.call(this, config);
}
ToolRect.prototype = Object.create(ToolFillable.prototype);

Object.assign(ToolRect.prototype, {
    layers: ["F"],
    toolLabel: "Rectangle",//□
    toolId: "rectangle",
    keyCode: 82, //r
    lineWidth: 1,
    color: {
        r: 0,
        g: 0,
        b: 0,
        a: 1
    },

    fillColor: {
        r: 255,
        g: 80,
        b: 0,
        a: 0
    },


    /**
     * [startInput description]
     * @memberof ToolRect#
     * @param  {any} id - unique id in current moment
     * @param  {integer} x  - x coordinate
     * @param  {integer} y  - y coordinate
     * @return {Input} - returns new Input for current tool touch
     */
    startInput: function startPath(id, x, y, e) {
        "use strict";
        if (e.altKey) {
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
            layers: this.layers
        });

        input.firstX = x;
        input.firstY = y;
        input.selectorDiv = document.createElement("div");
        input.selectorDiv.style.position = "absolute";
        // input.selectorDiv.style.border = "1px dotted " + this.getColorStr();
        input.selectorDiv.style.border = "1px solid black";
        input.selectorDiv.style.outline = "1px dashed white";
        input.selectorDiv.style.outlineOffset = "-1px";
        // input.selectorDiv.style.border = "1px dotted black";
        // input.selectorDiv.style.backgroundColor = this.getFillColorStr();
        input.selectorDiv.style.display = "block";
        if (this.sketchpad.centerViewport) {
            input.selectorDiv.style.left = this.sketchpad.width / 2 + x + "px";
            input.selectorDiv.style.top = this.sketchpad.height / 2 + y + "px";
        } else {
            input.selectorDiv.style.left = x + "px";
            input.selectorDiv.style.top = y + "px";
        }

        input.selectorDiv.style.width = "1px";
        input.selectorDiv.style.height = "1px";

        sketchpad.containerEl.appendChild(input.selectorDiv);

        input.addPoint(new Date().getTime(), x, y);
        return input;
    },

    /**
     * [moveInput description]
     * @memberof ToolRect#
     * @param  {Input} input - [description]
     * @param  {number} x -    [description]
     * @param  {number} y -   [description]
     * @param  {HTMLEvent} e -    [description]
     * @return {undefined}       [description]
     */
    moveInput: function drawPath(input, x, y, e) {
        "use strict";
        if (e.altKey) {
            x = Math.round(x / 10) * 10;
            y = Math.round(y / 10) * 10;
        }

        var firstX = input.firstX;
        var firstY = input.firstY;

        var h = Math.abs(y - firstY);
        if (e.shiftKey) {
            if (x < firstX) {
                x = firstX - h;
            } else {
                x = firstX + h;
            }
        }

        var sx = Math.min(firstX, x);
        var sy = Math.min(firstY, y);
        var ex = Math.max(firstX, x);
        var ey = Math.max(firstY, y);

        h = (ey - sy);
        var w = (ex - sx);

        // console.log(w, h);
        if (this.sketchpad.centerViewport) {
            input.selectorDiv.style.left = this.sketchpad.width / 2 + sx - 1 + "px";
            input.selectorDiv.style.top = this.sketchpad.height / 2 + sy - 1 + "px";
        } else {
            input.selectorDiv.style.left = sx + "px";
            input.selectorDiv.style.top = sy + "px";
        }

        input.selectorDiv.style.width = w + "px";
        input.selectorDiv.style.height = h + "px";
    },

    /**
     * [finishInput description]
     * @memberof ToolRect#
     * @param  {Input} input - [description]
     * @param  {number} x -    [description]
     * @param  {number} y -   [description]
     * @param  {HTMLEvent} e -    [description]
     * @return {undefined}       [description]
     */
    finishInput: function endPath(input, x, y, e) {
        "use strict";
        if (e.altKey) {
            x = Math.round(x / 10) * 10;
            y = Math.round(y / 10) * 10;
        }

        var sketchpad = this.sketchpad;
        var firstX = input.firstX;
        var firstY = input.firstY;

        var h = Math.abs(y - firstY);
        if (e.shiftKey) {
            if (x < firstX) {
                x = firstX - h;
            } else {
                x = firstX + h;
            }
        }

        input.addPoint(new Date().getTime(), x, y);
        sketchpad.containerEl.removeChild(input.selectorDiv);
    },


    /**
     * Draw engine
     * @memberof ToolRect#
     * @param  {object} Drawing parameters
     * @param  {object} List of points to draw
     * @return {object}
     */
    drawFramePath: function drawFramePath(config, points) {
        "use strict";
        var toolConfig = config.cnf;
        var sketchpad = this.sketchpad,
            ll,
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
            context.beginPath();
            context.strokeStyle = toolConfig.col;
            context.fillStyle = toolConfig.fcl;
            context.lineWidth = toolConfig.siz;

            context.rotate(sketchpad.rotation * Math.PI / 180);
            context.scale(sketchpad.scale, sketchpad.scale);


            context.translate(config.vpx, config.vpy);
            context.translate(-sketchpad.viewportX, -sketchpad.viewportY);

            context.scale(1 / config.scl, 1 / config.scl);
            context.rotate(-config.rot * Math.PI / 180);


            p1 = {x: points.x[0], y: points.y[0]};
            p2 = {x: points.x[1], y: points.y[1]};
            context.rect(
                p1.x,
                p1.y,
                p2.x - p1.x,
                p2.y - p1.y
            );
            context.fill();
            context.stroke();
            context.restore();

        }


    }
});
NSSketchpad.avaliableTools.push(ToolRect);
