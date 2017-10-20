// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/sketchpad.tool.mandala.js
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
 * @param {object} config - tool config
 */
function ToolMandala(config) {
    "use strict";
    Tool.call(this, config);
}


ToolMandala.prototype = Object.create(Tool.prototype);

Object.assign(ToolMandala.prototype, {
    layers: ["F"],
    axis: 7,
    color: {
        r: 0,
        g: 0,
        b: 0,
        a: 1
    },
    toolId: "mandala",
    toolLabel: "Mandala",
    lineWidth: 1,
    keyCode: 77, //m
    mirrorV: false,
    mirrorH: true,
    mirrorVH: false,
    rainbow: false,
    hideByDefault: false,

    // getCursor: function getCursor() {
    //     "use strict";
    //     var size = parseInt(this.getSize() + 1, 10);
    //     size = size / 2 + (size) / (size / 5 + 0);
    //     var style = {
    //         pointer: "crosshair",
    //         marginLeft: -size / 2 + "px",
    //         marginTop: -size / 2 + "px",
    //         width: size + "px",
    //         height: size + "px",
    //         border: "1px solid black",
    //         boxSizing: "border-box",
    //         borderRadius: "50%",
    //         // border: "1px solid black";
    //         backgroundColor: "rgba(0,0,0,0)"
    //     };

    //     return style;

    // },
    getToolConfig: function getToolConfig() {
        "use strict";
        var config = Tool.prototype.getToolConfig.call(this);
        return Object.assign(config, {
            axis: this.axis,
            mirrorV: this.mirrorV,
            mirrorH: this.mirrorH,
            mirrorVH: this.mirrorVH,
            rainbow: this.rainbow
        });
    },

    setToolConfig: function setToolConfig(config) {
        "use strict";
        Tool.prototype.setToolConfig.call(this, config);

        if (parseInt(config.axis, 10)) {
            this.axis = parseInt(config.axis, 10);
        }
        this.mirrorV = config.mirrorV;
        this.mirrorH = config.mirrorH;
        this.mirrorVH = config.mirrorVH;
        this.rainbow = config.rainbow;
        this.dispatch("changeParams");

        return this;
    },

    startInput: function startPath(id, x, y, e) {
        "use strict";
        if (e.altKey) {
            x = Math.round(x / 10) * 10;
            y = Math.round(y / 10) * 10;
        }

        var input = Tool.prototype.startInput.call(this, id, x, y);

        input.mirrorV = this.mirrorV; //flipv
        input.mirrorH = this.mirrorH; //fliph
        input.mirrorVH = this.mirrorVH; //yng-yang
        input.rainbow = this.rainbow; //
        input.axis = this.axis;

        return input;
    },


    /**
     * Get color based on x, y coordinates
     *
     * @memberof ToolRainbow#
     * @param  {number} x           - x
     * @param  {number} y           - y
     * @return {string} - color as "rgba(0,0,0,1) string
     */
    getRbwColorStr: function getRbwColorStr(x, y) {
        "use strict";
        var color = {
            r: 0,
            g: 0,
            b: 0,
            a: 1
        };
        color.r = Math.abs(Math.floor(Math.sin(x / 50) * 255)) % 255;
        color.g = Math.abs(Math.floor(Math.cos(y / 50) * 255)) % 255;
        color.b = Math.abs(Math.floor(Math.cos(x / 50) * 255)) % 255;
        // this.color.a = 1;
        return "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.a + ")";
    },


    /**
     * Draw on canvas one path part
     * (ex. part of one finger movement)
     *
     * @param  {object} config      - config of drawing viewport
     * @param  {array} points       - points of movement (at least 2 points)
     */
    drawFramePath: function drawFramePath(config, points) {
        "use strict";

        var toolConfig = config.cnf;

        var sketchpad = this.sketchpad,
            context,
            l,
            ll,
            k = toolConfig.axs,
            i,
            angle;

        if (!toolConfig.lay || !toolConfig.lay.length) {
            console.warn("no layers to draw");
            return;
        }
        function rotate(px, py, theta, n) {
            if ((n % 2) === 1) {
                n = 1;//trolololo
            }

            return {
                x: Math.cos(theta) * (px) - Math.sin(theta) * (py),
                y: Math.sin(theta) * (px) + Math.cos(theta) * (py)
            };
        }
        var p1,
            p2;

        var that = this;
        function line(context, p1, p2) {
            context.save();
            context.beginPath();

            context.rotate(sketchpad.rotation * Math.PI / 180);
            context.scale(sketchpad.scale, sketchpad.scale);


            context.translate(config.vpx, config.vpy);
            context.translate(-sketchpad.viewportX, -sketchpad.viewportY);

            context.scale(1 / config.scl, 1 / config.scl);
            context.rotate(-config.rot * Math.PI / 180);


            context.lineWidth = toolConfig.siz;// / 2 + (toolConfig.siz) / (toolConfig.siz / 5 + that.distance(p1.x, p1.y, p2.x, p2.y) / 10);
            if (toolConfig.rbw) {
                context.strokeStyle = that.getRbwColorStr(p1.x, p1.y);
            } else {
                context.strokeStyle = toolConfig.col;
            }

            context.moveTo(p1.x, p1.y);
            context.lineTo(p2.x, p2.y);
            context.stroke();
            context.restore();
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


            if (points && points.x && points.x.length > 1) {
                for (l = 1; l < points.x.length; l += 1) {
                    for (i = 0; i < k; i += 1) {
                        angle = i * 2 * Math.PI / k;

                        if (true) {
                            p1 = rotate(points.x[l - 1], points.y[l - 1], angle, i);
                            p2 = rotate(points.x[l], points.y[l], angle, i);
                            line(context, p1, p2);
                        }
                        if (toolConfig.mrh) {
                            p1 = rotate(points.x[l - 1], -points.y[l - 1], angle, i);
                            p2 = rotate(points.x[l], -points.y[l], angle, i);
                            line(context, p1, p2);
                        }
                        if (toolConfig.mrv) {
                            p1 = rotate(-points.x[l - 1], points.y[l - 1], angle, i);
                            p2 = rotate(-points.x[l], points.y[l], angle, i);
                            line(context, p1, p2);
                        }
                        if (toolConfig.mrvh) {
                            p1 = rotate(-points.x[l - 1], -points.y[l - 1], angle, i);
                            p2 = rotate(-points.x[l], -points.y[l], angle, i);
                            line(context, p1, p2);
                        }

                    }

                }
            }
        }
    }

});
NSSketchpad.avaliableTools.push(ToolMandala);


