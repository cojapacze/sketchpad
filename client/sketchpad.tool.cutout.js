// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/sketchpad.tool.cutout.js
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



/*global NSSketchpad, Input, Tool*/
/**
 * @class Tool ToolCutout
 * @augments Tool
 * @param {object} config - tool config
 */
function ToolCutout(config) {
    "use strict";
    Tool.call(this, config);
    this.toolId = config.toolId || "cutout";
}

ToolCutout.prototype = Object.create(Tool.prototype);

Object.assign(ToolCutout.prototype, {
    maxLayers: "*",
    toolId: "cutout",
    layers: ["F", "B"],
    toolLabel: "Cut-out",//"✃"
    getCursor: function getCursor() {
        "use strict";

        var style = {
            pointer: "crosshair",
            borderRadius: 0,
            backgroundColor: "rgba(0,0,0,0)",
            border: "none"
        };

        return style;

    },
    /**
     * [startInput description]
     * @memberof ToolCutout#
     * @param  {any} id - unique id in current moment
     * @param  {integer} x  - x coordinate
     * @param  {integer} y  - y coordinate
     * @return {Input} - returns new Input for current tool touch
     */
    startInput: function startPath(id, x, y, e) {
        "use strict";
        if (e && e.altKey) {
            x = Math.round(x / 10) * 10;
            y = Math.round(y / 10) * 10;
        }

        var sketchpad = this.sketchpad;
        var input = new Input({
            sketchpad: sketchpad,
            id: id,
            tool: this.toolId,
            layers: this.layers
        });


        input.selectorDiv = document.createElement("div");
        input.selectorDiv.style.position = "absolute";
        input.selectorDiv.style.border = "1px solid #f00";
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
        input.selectorDiv.style.background = "#f88";
        input.selectorDiv.style.opacity = "0.3";
        sketchpad.containerEl.appendChild(input.selectorDiv);
        input.addPoint(new Date().getTime(), x, y);
        return input;
    },

    /**
     * [moveInput description]
     * @memberof ToolCutout#
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

        var fristX = input.listX[0];
        var fristY = input.listY[0];

        var sx = Math.min(fristX, x);
        var sy = Math.min(fristY, y);
        var ex = Math.max(fristX, x);
        var ey = Math.max(fristY, y);

        if (this.sketchpad.centerViewport) {
            input.selectorDiv.style.left = this.sketchpad.width / 2 + sx + "px";
            input.selectorDiv.style.top = this.sketchpad.height / 2 + sy + "px";
        } else {
            input.selectorDiv.style.left = sx + "px";
            input.selectorDiv.style.top = sy + "px";
        }
        input.selectorDiv.style.width = (ex - sx) + "px";
        input.selectorDiv.style.height = (ey - sy) + "px";
        //input.addPoint(new Date().getTime(), x, y);
    },

    /**
     * [finishInput description]
     * @memberof ToolCutout#
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
        input.addPoint(new Date().getTime(), x, y);
        sketchpad.containerEl.removeChild(input.selectorDiv);
    },

    /**
     * Draw engine
     * @memberof ToolCutout#
     * @param  {object} Drawing parameters
     * @param  {object} List of points to draw
     * @return {undefined}
     */
    drawFramePath: function drawFramePath(config, points) {
        "use strict";
        var toolConfig = config.cnf;
        var sketchpad = this.sketchpad,
            ll;

        if (!toolConfig.lay || !toolConfig.lay.length) {
            console.warn("no layers to draw");
            return;
        }
        var context;
        for (ll = 0; ll < toolConfig.lay.length; ll += 1) {
            switch (toolConfig.lay[ll]) {
            case sketchpad.LAYER_BACK:
                context = sketchpad.contextB2D;
                break;
            case sketchpad.LAYER_FRONT:
                context = sketchpad.context2D;
                break;
            }

            context.save();
            context.rotate(sketchpad.rotation * Math.PI / 180);
            context.scale(sketchpad.scale, sketchpad.scale);


            context.translate(config.vpx, config.vpy);
            context.translate(-sketchpad.viewportX, -sketchpad.viewportY);

            context.scale(1 / config.scl, 1 / config.scl);
            context.rotate(-config.rot * Math.PI / 180);
            context.clearRect(points.x[0], points.y[0], points.x[1] - points.x[0], points.y[1] - points.y[0]);
            context.restore();
        }


    }
});
NSSketchpad.avaliableTools.push(ToolCutout);



