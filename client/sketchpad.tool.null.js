// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/sketchpad.tool.null.js
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
function ToolNull(config) {
    "use strict";
    Tool.call(this, config);
    this.toolId = config.toolId || "null";
    this.layers = [];
}
ToolNull.prototype = Object.create(Tool.prototype);

Object.assign(ToolNull.prototype, {
    maxLayers: 0,
    keyCode: 27,
    toolLabel: "Null",//👋
    toolId: "null",

    /**
     * MouseDown/TouchStart
     *
     * @memberof ToolNull#
     * @return {Input} - returns new Input for current tool touch
     */
    startInput: function startPath(id) {
        "use strict";
        var sketchpad = this.sketchpad;
        var input = new Input({
            sketchpad: sketchpad,
            id: id,
            tool: this.toolId
        });
        input.tmpCursor = this.sketchpad.containerEl.style.cursor;
        sketchpad.containerEl.style.cursor = "none";
        return input;
    },

    /**
     * MouseMove/TouchMove
     *
     * @memberof ToolNull#
     * {@link http://sketchpad.pro|Sketchpad.pro - drawing board sketch free}
     *
     */
    moveInput: function moveInput() {
        "use strict";
        return;
    },

    /**
     * MouseUp/TouchEnd
     *
     * @memberof ToolNull#
     * {@link http://sketchpad.pro|Sketchpad.pro - drawing board sketch free}
     */
    finishInput: function finishInput(input) {
        "use strict";
        this.sketchpad.containerEl.style.cursor = input.tmpCursor;
        return;
    },

    /**
     * Draw engine runs both for drawed and received paths
     * @memberof ToolNull#
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
NSSketchpad.avaliableTools.push(ToolNull);
