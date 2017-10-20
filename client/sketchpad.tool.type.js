// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/sketchpad.tool.type.js
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
 * @class
 * Tool type
 *
 * @extends Tool
 * @implements Tool
 *
 * @param {object} config - tool config {fontSize:20,color: "black"}
 */
function ToolType(config) {
    "use strict";
    Tool.call(this, config);
    // this.setSize(32);
    this.toolId = config.toolId || "type";
}

ToolType.prototype = Object.create(Tool.prototype);

Object.assign(ToolType.prototype, {
    toolLabel: "Text",//"T"
    toolId: "type",
    font: "Arial",
    keyCode: 84, //t
    color: {
        r: 0,
        g: 0,
        b: 0,
        a: 1
    },
    size: 14,

    getToolConfig: function getToolConfig() {
        "use strict";
        var config = Tool.prototype.getToolConfig.call(this);
        return Object.assign(config, {
            font: this.getFont(),
            size: this.getSize()
        });
    },

    setToolConfig: function setToolConfig(config) {
        "use strict";
        Tool.prototype.setToolConfig.call(this, config);

        if (parseFloat(config.size)) {
            this.setSize(parseFloat(config.size));
        }

        if (config.font) {
            // console.log("setFont", config.font);
            this.setFont(config.font);
        }
        this.dispatch("changeParams");
        return this;
    },
    /**
     * Set size
     * @param {integer} size - tool size
     */
    setSize: function setSize(size) {
        "use strict";
        // alert("SetSize:" + size);
        this.size = parseFloat(size);
        this.dispatch("changeParams");
        return this;
    },

    /**
     * Get current size
     * @return {integer} number
     */
    getSize: function getSize() {
        "use strict";
        return this.size;
    },


    /**
     * Sets font
     * @memberof ToolType#
     * @param {string} font - font name
     */
    setFont: function setFont(font) {
        "use strict";
        this.font = font;
        this.dispatch("changeParams");
        return this;
    },

    /**
     * Returns current font
     * @memberof ToolType#
     */
    getFont: function getFont() {
        "use strict";
        return this.font;
    },

    /**
     * On click
     *
     * @memberof ToolType#
     *
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
            // fillColor: this.getFillColorStr(),
            font: this.getFont(),
            size: this.getSize(),
            layers: this.layers
        });

        var inputWidth = 10000;

        input.typeInput = document.createElement("input");
        input.typeInput.value = "enter text here";
        input.typeInput.placeholder = "enter text here";
        input.typeInput.style.border = 0;
        input.typeInput.style.boxShadow = "none";
        input.typeInput.style.position = "absolute";
        input.typeInput.style.outline = "0";
        input.typeInput.style.overflow = "hidden";
        input.typeInput.style.padding = 0;
        input.typeInput.style.margin = 0;
        input.typeInput.style.fontFamily = this.getFont();
        input.typeInput.style.fontSize = this.getSize() + "px";
        input.typeInput.style.display = "inline-block";
        input.typeInput.style.color = this.getColorStr();
        input.typeInput.style.backgroundColor = "rgba(255,255,255,0)";
        if (this.sketchpad.centerViewport) {
            input.typeInput.style.left = this.sketchpad.width / 2 + x - 1 + "px";
            input.typeInput.style.top = this.sketchpad.height / 2 + y - this.getSize() / 2 + "px";
        } else {
            input.typeInput.style.left = x - 1 + "px";
            input.typeInput.style.top = y - this.getSize() / 2 + "px";
        }
        input.typeInput.style.width = inputWidth + "px";

        input.typeInput.style.height = this.getSize() + "px";
        input.typeInput.style.lineHeight = this.getSize() + "px";

        function write() {

            if (input.typeInput.written) {
                return false;
            }
            input.typeInput.written = true;
            input.addPoint(new Date().getTime(), input.x - 1, input.y);
            input.addPoint(new Date().getTime(), input.x, input.y);
            input.textContent = input.typeInput.value;

            sketchpad.inputs[667] = input;
            sketchpad.sendInputs();
            sketchpad.drawInputs();

            delete sketchpad.inputs[667];
            sketchpad.containerEl.removeChild(input.typeInput);
            /** rethink **/
            // sketchpad.containerEl.scrollLeft = 0;
            // sketchpad.containerEl.scrollTop = 0;
        }

        input.typeInput.addEventListener("blur", write);
        input.typeInput.addEventListener("change", write);
        input.typeInput.addEventListener("keyup", function (e) {
            if (e.keyCode === 13) {
                write();
            }
            if (e.keyCode === 27) {
                input.typeInput.value = "";
                write();
            }
        });
        // this.write = write;
        // input.typeInputContainer.appendChild(input.typeInput);
        sketchpad.containerEl.appendChild(input.typeInput);

        return input;
    },

    /**
     * [moveInput description]
     * @memberof ToolType#
     * @param  {Input} input - [description]
     * @param  {number} x -    [description]
     * @param  {number} y -   [description]
     * @param  {HTMLEvent} e -    [description]
     * @return {undefined}       [description]
     */
    moveInput: function moveInput(input, x, y, e) {
        "use strict";
        if (e.altKey) {
            x = Math.round(x / 10) * 10;
            y = Math.round(y / 10) * 10;
        }

        y -= this.getSize() / 2;
        // input.typeInput.style.position = "absolute";
        if (this.sketchpad.centerViewport) {
            input.typeInput.style.left = this.sketchpad.width / 2 + x + "px";
            input.typeInput.style.top = this.sketchpad.height / 2 + y + "px";
        } else {
            input.typeInput.style.left = x + "px";
            input.typeInput.style.top = y + "px";
        }

    },

    /**
     * [finishInput description]
     * @memberof ToolType#
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

        input.x = x;
        input.y = y;
        input.typeInput.value = "";
        input.typeInput.focus();
        input.typeInput.select();
    },

    /**
     * Draw engine
     * @memberof ToolType#
     * @param  {object} Drawing parameters
     * @param  {object} List of points to draw
     * @return {undefined}
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


            context.font = toolConfig.siz + "px " + toolConfig.fnt;
            context.fillStyle = toolConfig.col;
            context.textAlign = "left";
            context.textBaseline = "middle";

            context.fillText(toolConfig.txt, points.x[0], points.y[0]);
            context.restore();
        }


    }
});

NSSketchpad.avaliableTools.push(ToolType);
