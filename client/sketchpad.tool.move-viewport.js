// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/sketchpad.tool.move-viewport.js
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
 * Tool for moving viewport
 *
 * @class
 * @extends Tool
 * @param {object} config - tool config
 */
function ToolMoveViewport(config) {
    "use strict";
    Tool.call(this, config);
    this.toolId = config.toolId || "move-viewport";
    this.layers = [];
}
ToolMoveViewport.prototype = Object.create(Tool.prototype);

Object.assign(ToolMoveViewport.prototype, {
    maxLayers: 0,
    keyCode: 32, //space
    toolLabel: "Move",//👋
    toolId: "move-viewport",

    getCursor: function getCursor() {
        "use strict";

        var style = {
            pointer: "move",
            border: "none",
            borderRadius: 0,
            backgroundColor: "rgba(0,0,0,0)"
        };

        return style;

    },
    /**
     * MouseDown/TouchStart
     *
     * @memberof ToolMoveViewport#
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
            tool: this.toolId
        });

        input.tmpCursor = this.sketchpad.containerEl.style.cursor;
        input.startX = x;
        input.startY = y;

        input.viewportX = this.sketchpad.viewportX;
        input.viewportY = this.sketchpad.viewportY;
        sketchpad.containerEl.style.cursor = "move";

        sketchpad.hudsEl.style.opacity = 0;
        return input;
    },

    /**
     * MouseMove/TouchMove
     *
     * @memberof ToolMoveViewport#
     * {@link http://sketchpad.pro|Sketchpad.pro - drawing board sketch free}
     *
     */
    moveInput: function moveInput(input, x, y, e) {
        "use strict";
        if (e && e.altKey) {
            x = Math.round(x / 10) * 10;
            y = Math.round(y / 10) * 10;
        }
        var p = {
            x: (x - input.startX) * (1 / this.sketchpad.scale),
            y: (y - input.startY) * (1 / this.sketchpad.scale)
        };
        var sketchpad = this.sketchpad;
        p = this.rotate(-sketchpad.rotation, p);

        var newX = input.viewportX - p.x,
            newY = input.viewportY - p.y;

        if (e && e.shiftKey) {
            newX = Math.round(newX / 10) * 10;
            newY = Math.round(newY / 10) * 10;
        }
        this.sketchpad.setViewportPosition(newX, newY);
    },

    /**
     * MouseUp/TouchEnd
     *
     * @memberof ToolMoveViewport#
     * {@link http://sketchpad.pro|Sketchpad.pro - drawing board sketch free}
     */
    finishInput: function finishInput(input, x, y, e) {
        "use strict";
        if (e && e.altKey) {
            x = Math.round(x / 10) * 10;
            y = Math.round(y / 10) * 10;
        }

        this.moveInput(input, x, y, e);

        this.sketchpad.containerEl.style.cursor = input.tmpCursor;
        // sketchpad.hudsEl.style.display = "block";
        this.sketchpad.hudsEl.style.opacity = 1;

    },

    /**
     * Draw engine runs both for drawed and received paths
     * @memberof ToolMoveViewport#
     * @param  {object} Drawing parameters
     * @param  {object} List of points to draw
     * @return {undefined}
     */
    drawFramePath: function drawFramePath() {
        "use strict";
        // DO NOTHING
        return;

    }
});
NSSketchpad.avaliableTools.push(ToolMoveViewport);