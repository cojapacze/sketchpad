// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/sketchpad.tool.colorpicker.js
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
 * Tool for moving viewport
 *
 * @class
 * @extends ToolFillable
 * @param {object} config - tool config
 */
function ToolColorpicker(config) {
    "use strict";
    ToolFillable.call(this, config);
    this.toolId = config.toolId || "colorpicker";
    this.layers = [];
}
ToolColorpicker.prototype = Object.create(ToolFillable.prototype);

Object.assign(ToolColorpicker.prototype, {
    maxLayers: 0,
    keyCode: 73, //i
    toolLabel: "Colorpicker",
    toolId: "colorpicker",
    color: {
        r: 128,
        g: 128,
        b: 128,
        a: 0
    },
    getCursor: function getCursor() {
        "use strict";
        var size = 10;


        var style = {
            pointer: "none",
            marginLeft: -size / 2 + "px",
            marginTop: -size / 2 + "px",
            width: size + "px",
            height: size + "px",
            borderRadius: "50%",
            // border: "none",
            border: "1px solid black",
            backgroundColor: this.getColorStr()
        };

        return style;

    },
    /**
     * MouseDown/TouchStart
     *
     * @memberof ToolColorpicker#
     * @param  {any} id - unique id in current moment
     * @param  {integer} x  - x coordinate
     * @param  {integer} y  - y coordinate
     * @return {Input} - returns new Input for current tool touch
     */
    startInput: function startPath(id, x, y, e) {
        "use strict";
        var sketchpad = this.sketchpad;
        var input = new Input({
            sketchpad: sketchpad,
            id: id,
            tool: this.toolId
        });
        var color = this.sketchpad.colorPicker(x, y);
        if (e.shiftKey || e.button === 2) {
            this.fillColorChanged = true;
            this.setFillColor(color.r, color.g, color.b, color.a);
        } else {
            this.colorChanged = true;
            this.setColor(color.r, color.g, color.b, color.a);
        }
        input.tmpCursor = this.sketchpad.containerEl.style.cursor;
        sketchpad.containerEl.style.cursor = "crosshair";

        return input;
    },

    /**
     * MouseMove/TouchMove
     *
     * @memberof ToolColorpicker#
     * {@link http://sketchpad.pro|Sketchpad.pro - drawing board sketch free}
     *
     */
    moveInput: function moveInput(input, x, y, e) {
        "use strict";
        var color = this.sketchpad.colorPicker(x, y);
        if (e.button === 2) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (e.shiftKey || e.button === 2) {
            this.fillColorChanged = true;
            this.setFillColor(color.r, color.g, color.b, color.a);
        } else {
            this.colorChanged = true;
            this.setColor(color.r, color.g, color.b, color.a);
        }
        return input;
    },

    /**
     * MouseUp/TouchEnd
     *
     * @memberof ToolColorpicker#
     * {@link http://sketchpad.pro|Sketchpad.pro - drawing board sketch free}
     */
    finishInput: function finishInput(input, x, y, e) {
        "use strict";
        var color = this.sketchpad.colorPicker(x, y);
        if (e.button === 2) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (e.shiftKey || e.button === 2) {
            this.fillColorChanged = true;
            this.setFillColor(color.r, color.g, color.b, color.a);
        } else {
            this.colorChanged = true;
            this.setColor(color.r, color.g, color.b, color.a);
        }
        this.sketchpad.containerEl.style.cursor = input.tmpCursor;

        return input;

    },

    /**
     * Draw engine runs both for drawed and received paths
     * @memberof ToolColorpicker#
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
NSSketchpad.avaliableTools.push(ToolColorpicker);