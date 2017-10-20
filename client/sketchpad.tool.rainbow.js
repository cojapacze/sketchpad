// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/sketchpad.tool.rainbow.js
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
 * @version 0.5.1
 * @tutorial solver
 * @tutorial tutorial-1
 * @tutorial tutorial-2
 * @extends Tool
 * CONNECT
 * @throws {InvalidArgumentException}
 * @param {object} config - tool config
 */
function ToolRainbow(config) {
    "use strict";
    Tool.call(this, config);
}

ToolRainbow.prototype = Object.create(Tool.prototype);

Object.assign(ToolRainbow.prototype, {
    toolId: "rainbow",

    lineWidth: 1,
    keyCode: 66, //b
    toolLabel: "Rainbow",//🌈
    hideByDefault: false,

    getCursor: function getCursor() {
        "use strict";
        var size = parseInt(this.getSize() + 1, 10);
        size = size + 10;
        var style = {
            pointer: "crosshair",
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
     * Get color based on x, y coordinates
     *
     * @memberof ToolRainbow#
     * @param  {number} x           - x
     * @param  {number} y           - y
     * @return {string} - color as "rgba(0,0,0,1)"" string
     */
    getColorStr: function getColorStr(x, y) {
        "use strict";
        this.color.r = Math.floor(Math.sin(x / 50) * 256);
        this.color.g = Math.floor(Math.cos(y / 50) * 256);
        this.color.b = Math.floor(Math.cos(x / 50) * 256);
        this.color.a = 1;
        return "rgba(" + this.color.r + "," + this.color.g + "," + this.color.b + "," + this.color.a + ")";
    },

    /**
     * Draw part of rainbow
     *
     * @memberof ToolRainbow#
     * @param  {object} config      - Drawing parameters
     * @param  {array} points       - List of points to draw
     */
    drawFramePath: function drawFramePath(config, points) {
        "use strict";
        var toolConfig = config.cnf;
        var sketchpad = this.sketchpad,
            l,
            ll,
            context;
        context = null;
        if (!toolConfig.lay || !toolConfig.lay.length) {
            console.warn("no layers to draw");
            return;
        }
        var p1, p2;
        // for each layer
        for (ll = 0; ll < toolConfig.lay.length; ll += 1) {
            // switch context...
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

            // if there are points to draw (should be)
            if (points && points.x && points.y && points.x.length > 1) {
                for (l = 1; l < points.x.length; l += 1) {

                    p1 = {x: points.x[l - 1], y: points.y[l - 1]};
                    p2 = {x: points.x[l], y: points.y[l]};
                    context.beginPath();
                    context.strokeStyle = this.getColorStr(p1.x, p1.y);
                    context.lineCap = 'miter';
                    context.lineJoin = 'miter';
                    // console.log(config.siz);
                    context.lineWidth = toolConfig.siz + 100 / (10 + this.distance(p1.x, p1.y, p2.x, p2.y));

                    context.moveTo(p1.x, p1.y);
                    context.lineTo(p2.x, p2.y);
                    context.stroke();
                }
            }
            context.restore();

        }
    }

});
NSSketchpad.avaliableTools.push(ToolRainbow);
