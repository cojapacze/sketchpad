// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/sketchpad.tool.highlighter.js
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
function ToolHighlighter(config) {
    "use strict";
    Tool.call(this, config);
}



ToolHighlighter.prototype = Object.create(Tool.prototype);

Object.assign(ToolHighlighter.prototype, {
    toolId: "highlighter",
    color: {
        r: 255,
        g: 255,
        b: 15,
        a: 0.5
    },
    layers: ["B"],
    lineWidth: 16,
    keyCode: 72, //h
    toolLabel: "Highlighter",//•,

    getCursor: function getCursor() {
        "use strict";
        var size = parseInt(this.getSize(), 10);
        size = size / 2 + (size) / (size / 5 + 0);
        var style = {
            pointer: "none",
            marginLeft: -size / 2 + "px",
            marginTop: -size / 2 + "px",
            width: size + "px",
            height: size + "px",
            border: "none",
            borderRadius: 0,
            // border: "1px solid black";
            backgroundColor: this.getColorStr()
        };

        return style;

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
        var sketchpad = this.sketchpad,
            context,
            l,
            ll,
            p1,
            p2;

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
            context.lineCap = "butt";
            context.lineJoin = "round";

            context.rotate(sketchpad.rotation * Math.PI / 180);
            context.scale(sketchpad.scale, sketchpad.scale);


            context.translate(config.vpx, config.vpy);
            context.translate(-sketchpad.viewportX, -sketchpad.viewportY);

            context.scale(1 / config.scl, 1 / config.scl);
            context.rotate(-config.rot * Math.PI / 180);

            // context.save();
            // context.beginPath();
            context.strokeStyle = toolConfig.col;
            context.lineWidth = toolConfig.siz;

            if (points && points.x && points.x.length > 1) {
                for (l = 1; l < points.x.length; l += 1) {
                    p1 = {x: points.x[l - 1], y: points.y[l - 1]};
                    p2 = {x: points.x[l], y: points.y[l]};

                    context.beginPath();
                    context.lineWidth = toolConfig.siz / 2 + (toolConfig.siz) / (toolConfig.siz / 5 + this.distance(p1.x, p1.y, p2.x, p2.y) / 10);
                    context.moveTo(p1.x, p1.y);
                    context.lineTo(p2.x, p2.y);
                    context.stroke();
                }
            }

            context.restore();

        }
    }
});
NSSketchpad.avaliableTools.push(ToolHighlighter);


