// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/sketchpad.tool._fillable.js
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
 * @constructor
 * @augments Tool
 * @param {object} config - tool config
 */
function ToolFillable(config) {
    "use strict";
    Tool.call(this, config);
}
ToolFillable.prototype = Object.create(Tool.prototype);

Object.assign(ToolFillable.prototype, {
    toolLabel: "_fillable class",
    toolId: "_fillable class",

    fillColor: {
        r: 128,
        g: 0,
        b: 128,
        a: 0.1
    },

    /**
     * Get tool configuration
     * @return {object} - tool configuration
     */
    getToolConfig: function getToolConfig() {
        "use strict";
        // alert("getToolConfig");
        var config = Tool.prototype.getToolConfig.call(this);
        return Object.assign(config, {
            fillColor: this.getFillColorStr()
        });
    },

    /**
     * Sets configuration of tool
     * @param {config} config - tool configuration
     * @return {object} - this
     */
    setToolConfig: function setToolConfig(config) {
        "use strict";
        // console.log("type set tool config");
        Tool.prototype.setToolConfig.call(this, config);
        var match, col;
        if (config.fillColor) {
            switch (typeof config.fillColor) {
            case "string":
                match = String(config.fillColor).match(/([0-9]+),([0-9]+),([0-9]+),([0-9\.]+)/);
                col = {
                    r: parseInt(match && match[1]) || 0,
                    g: parseInt(match && match[2]) || 0,
                    b: parseInt(match && match[3]) || 0,
                    a: parseFloat(match && match[4]) || 0
                };
                this.setFillColor(col.r, col.g, col.b, col.a);
                // console.log("set fill color from string", col);
                break;
            case "object":
                // console.log("set fill color from object", config.fillColor);
                this.setFillColor(config.fillColor.r, config.fillColor.g, config.fillColor.b, config.fillColor.a);
                break;
            }
        }

        this.dispatch("changeParams");

        return this;
    },

    /**
     * Sets color of fill
     * @memberof ToolFillable#
     * @param {byte} r Red
     * @param {byte} g Green
     * @param {byte} b Blue
     * @param {byte} a Alpha
     */
    setFillColor: function setFillColor(r, g, b, a) {
        "use strict";
        if (a === undefined) {
            a = this.fillColor.a;
        }
        this.fillColor = {
            r: r,
            g: g,
            b: b,
            a: a
        };
        this.dispatch("changeParams");

        return this;
    },

    /**
     * Get color of fill
     * @memberof ToolFillable#
     * @return {object} {r: byte, g: byte, b: byte, a: byte}
     */
    getFillColor: function getFillColor() {
        "use strict";
        return this.fillColor;
    },

    /**
     * Get color of fill as rgba string
     * @memberof ToolFillable#
     * @return {string} - rgba(r,g,b,a)
     */
    getFillColorStr: function getColorStr() {
        "use strict";
        return "rgba(" + this.fillColor.r + "," + this.fillColor.g + "," + this.fillColor.b + "," + this.fillColor.a + ")";
    }

});

