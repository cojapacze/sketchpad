// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/sketchpad.tool.js
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


/*global NSSketchpad, Input, Tool, Sketchpad, Eventsmanager*/

/**
 * Default tool for drawing free lines
 * on layers.
 *
 * Use ``Tool`` class as base
 * for creating custom tools.
 *
 * @see {@link http://sketchpad.pro|Sketchpad.pro - drawing board sketch free}
 *
 * @class
 * @param {object} config - tool configuration ``{sketchpad: Sketchpad, toolId: string, lineWidth: number, layers: ["F", "B"], color: {r: number, g:number, b: number, a:number}}``
 * @example
 * {
 *   sketchpad: Sketchpad,
 *   toolId: string,
 *   lineWidth: number, //default 1
 *   layers: ["F", "B"], //default ["F", "B"]
 *   color: {r: number, g:number, b: number, a:number} //default {r: 0, g: 0, b: 0, a: 1}
 * }
 */
function Tool(config) {
    "use strict";
    Eventsmanager.call(this, config);
    // ↓ ToolChild.prototype = new Tool();
    if (!config) {
        return this;
    }

    if (!(config.sketchpad instanceof Sketchpad)) {
        console.warn("config.sketchpad must be instanceof Sketchpad");
        throw new Error("config.sketchpad must be instanceof Sketchpad");
    }

    this.sketchpad = config.sketchpad;
    if (config.toolId) {
        this.toolId = config.toolId;
    }
    if (config.lineWidth) {
        this.lineWidth = config.lineWidth;
    }
    if (config.layers) {
        this.layers = config.layers;
    }
    if (config.color) {
        this.color = config.color;
    }
}

Tool.prototype = Object.create(Eventsmanager.prototype);

Tool.prototype = Object.assign(Tool.prototype, {
    sketchpad: "error: undefined sketchpad object",
    layers: ["F"],
    toolLabel: "Default tool",
    toolId: "default_tool_class",
    lineWidth: 1,
    minSize: 0.1,
    maxSize: 100,
    maxLayers: 1,
    color: {
        r: 0,
        g: 0,
        b: 0,
        a: 1
    },


    getCursor: function getCursor() {
        "use strict";
        var size = parseInt(this.getSize() + 1, 10);

        var style = {
            pointer: "crosshair",
            // pointer: "none",
            marginLeft: -size / 2 + "px",
            marginTop: -size / 2 + "px",
            width: size + "px",
            height: size + "px",
            border: "1px solid black",
            boxSizing: "border-box",
            borderRadius: "50%",
            // border: "1px solid black";
            backgroundColor: "rgba(0,0,0,0)"
        };

        return style;

    },
    /**
     * Get tool configuration
     * @return {object} - tool configuration
     */
    getToolConfig: function getToolConfig() {
        "use strict";
        var config = {
            toolId: this.toolId,
            layers: this.layers,
            lineWidth: this.lineWidth,
            maxLayers: this.maxLayers,
            color: this.getColorStr()
        };
        return config;
    },

    /**
     * Sets configuration of tool
     * @param {config} config - tool configuration
     * @return {object} - this
     */
    setToolConfig: function setToolConfig(config) {
        "use strict";

        if (Array.isArray(config.layers)) {
            this.layers = config.layers;
        }
        var match, col;
        if (config.color) {
            switch (typeof config.color) {
            case "string":
                match = String(config.color).match(/([0-9]+),([0-9]+),([0-9]+),([0-9\.]+)/);
                col = {
                    r: parseInt(match && match[1]) || 0,
                    g: parseInt(match && match[2]) || 0,
                    b: parseInt(match && match[3]) || 0,
                    a: parseFloat(match && match[4]) || 0
                };
                this.setColor(col.r, col.g, col.b, col.a);
                // console.log("set color from string", JSON.parse(JSON.stringify(this.color)), col);
                break;
            case "object":
                // console.log("set color from object", config.color);
                this.setColor(config.color.r, config.color.g, config.color.b, config.color.a);
                break;
            }
        }

        if (parseFloat(config.lineWidth)) {
            this.setSize(parseFloat(config.lineWidth));
        }
        this.dispatch("changeParams");
        return this;
    },

    /**
     * Calculate distance between two points
     *
     * @memberof Tool#
     * @param  {number} x1          - start x
     * @param  {number} y1          - start y
     * @param  {number} x2          - end x
     * @param  {number} y2          - end y
     * @return {number} - distance
     */
    distance: function distance(x1, y1, x2, y2) {
        "use strict";
        return Math.sqrt(Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2));
    },

    /**
     * Rotate point over theta angle
     * @param  {float} theta - deg angle
     * @param  {object} p    - {x:.. ,y:..} point
     * @return {object}      - rotated point
     */
    rotate: function rotate(theta, p) {
        "use strict";

        theta = (Math.PI * 2) * (theta / 360);
        p = {
            x: Math.cos(theta) * (p.x) - Math.sin(theta) * (p.y),
            y: Math.sin(theta) * (p.x) + Math.cos(theta) * (p.y)
        };
        return p;
    },

    /**
     * Set tool color
     *
     * @param {byte} r 0-255
     * @param {byte} g 0-255
     * @param {byte} b 0-255
     * @param {number} a 0..1
     */
    setColor: function setColor(r, g, b, a) {
        "use strict";
        // console.log("setting color of tool", this, r, g, b, a);
        // debugger;
        if (a === undefined) {
            a = this.color.a;
        }
        this.color = {r: r, g: g, b: b, a: a};
        this.dispatch("changeParams");
        return this;
    },

    /**
     * Get current tool color
     *
     * @return {object} {r: byte, g: byte, b: byte, a: byte}
     */
    getColor: function getColor() {
        "use strict";
        return this.color;
    },

    /**
     * Get current tool color as "rgba(0,0,0,1)"" string
     *
     * @return {string}  - rgba() color string
     */
    getColorStr: function getColorStr() {
        "use strict";
        return "rgba(" + this.color.r + "," + this.color.g + "," + this.color.b + "," + this.color.a + ")";
    },

    /**
     * Set size
     * @param {integer} size - tool size
     */
    setSize: function setSize(size) {
        "use strict";
        this.lineWidth = parseFloat(size);
        this.dispatch("changeParams");
        return this;
    },

    /**
     * Get current size
     * @return {integer} number
     */
    getSize: function getSize() {
        "use strict";
        return this.lineWidth;
    },

    /** collecting events **/

    /**
     * Init new tool path (ex. one finger touch)
     *
     * @param  {string} id - unique id of path
     * @param  {int} x  - first x position
     * @param  {int} y  - first y position
     * @return {Input} - Input
     */
    startInput: function startPath(id, x, y, e) {
        "use strict";
        if (e && e.altKey) {
            x = Math.round(x / 10) * 10;
            y = Math.round(y / 10) * 10;
            // console.log(this.sketchpad.colorPicker(x, y));
            // return false;
        }

        var sketchpad = this.sketchpad;
        var input = new Input({
            sketchpad: sketchpad,
            id: id,
            tool: this.toolId,
            layers: this.layers,
            color: this.getColorStr(),
            size: this.lineWidth
        });
        input.addPoint(new Date().getTime(), x, y);
        input.addPoint(new Date().getTime(), x, y, "force"); // click = at least 1 dot//, x + 1, y
        return input;
    },

    /**
     * Record path movement
     *
     * @param  {Input} input - Input object initialised by Tool::startInput();
     * @param  {int} x - current x position
     * @param  {int} y - current y position
     */
    moveInput: function drawPath(input, x, y, e) {
        "use strict";
        if (e && e.altKey) {
            x = Math.round(x / 10) * 10;
            y = Math.round(y / 10) * 10;
        }

        if (e && e.shiftKey) {
            var lastPoint = input.getLastPoint();
            if (lastPoint) {
                if (Math.abs(lastPoint.x - x) < 10) {
                    x = lastPoint.x;
                }
                if (Math.abs(lastPoint.y - y) < 10) {
                    y = lastPoint.y;
                }
                if (lastPoint.x === x && lastPoint.y === y) {
                    return false;
                }
            }
        }

        input.addPoint(new Date().getTime(), x, y, e);
    },

    /**
     * Close tool path (ex. one finger touch)
     *
     * @param  {Input} input - Input object initialised by Tool::startInput();
     * @param  {int} x  - last x position
     * @param  {int} y  - last y position
     */
    finishInput: function endPath(input, x, y, e) {
        "use strict";
        if (e && e.altKey) {
            x = Math.round(x / 10) * 10;
            y = Math.round(y / 10) * 10;
        }

        input.addPoint(new Date().getTime(), x, y);
    },

    /** drawing events **/

    /**
     * Draw on canvas one path part
     * (ex. part of one finger movement)
     *
     * @param  {object} config      - config of drawing viewport
     * @param  {array} points       - points of movement (at least 2 points)
     */
    drawFramePath: function drawFramePath(config, points) {
        "use strict";
        var sketchpad = this.sketchpad,
            context,
            l,
            ll;

        var toolConfig = config.cnf;

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

            if (points && points.x && points.x.length > 1) {
                context.beginPath();
                context.lineCap = "round";
                context.lineJoin = "round";
                context.strokeStyle = toolConfig.col;
                context.lineWidth = toolConfig.siz;
                context.moveTo(points.x[0], points.y[0]);
                for (l = 1; l < points.x.length; l += 1) {
                    context.lineTo(points.x[l], points.y[l]);
                }
                context.stroke();
            }

            context.restore();

        }
    }

});
NSSketchpad.avaliableTools.push(Tool);