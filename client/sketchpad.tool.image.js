// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/sketchpad.tool.image.js
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
/*global NSSketchpad, Input, Tool, FileReader, Imagehost, alert, window, popnotifications*/
/*global atob, Blob, File, window*/


/**
 * @constructor
 * @augments Tool
 * @param {object} config - tool config
 */
function ToolImage(config) {
    "use strict";
    Tool.call(this, config);



    var that = this;
    this.emptyImage = document.createElement("img");
    this.emptyImage.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAArrAAAK6wGCiw1aAAAAB3RJTUUH4QQJFQY3bU7o3wAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAACR0lEQVR42uWbsU7rMBSG//ObMRkQguVKvAHv/wrsvEGlLiDUIdHd7MNAkHp7AzSJ7WM7lrK0Q+Uv+b6kR4oAeAbwAkCmYw9Lp+PpZtr8X+/9iaTuYfchBHHO3QJ4IQDx3p+cc/c7Oftwzt17708AhACEpKrqq4g8tr55EXlU1dfpahf+I4bqoWUI0+YP55/xvzp8QngYx9G1svFxHJ2IPFxufhYAAAzD8N73/V0rAPq+vxuG4X3uu1kAXdf5Vprw5XzXdf5qAK00Yc75RQBqbcJPzi8GUGMTfnJ+FYCamvCb86sA1NKEa5zfBKDUJixxfjOAEpuwxPkoAEpqwlLnowAopQlrnI8KwKoJW5yPDsCiCVucTwIgZxO2Op8EQK4mxHA+KYBUTYjpfHIAKZoQ0/ksAGI2IbbzWQDEakIK57MCWNuElM5nB7CmCSmdNwGwpAmpnTcBcG0TcjhvCuC7JuR03hzAXBNyOn+5bix+9KwJf6ar4mj1l5rY+TIBcOb8UVWPljNGEwCXzlvOGLMDmLvPW84YabD5g9U8wQzAkvt87hkjLZzPPU8wBbDm2T5nE2jpfOp5ghmAmM/2qZvAEpy3bAJLcN6yCSzJeYsmsDTnczeBJTqfswks0fmcTWDJzudoAkt3PnUTWIPzKZvAGpxP2QTW5HyKJrA252M3gTU6H7MJrNH5mE1gzc7HaAJrd35rE9iC81uawBac39IEtuT8miYQgIYQpBXnr21CCEEAKAGoc+7We/+GnSzv/dv08rQKdv76/Af/G22JqgLBTAAAAABJRU5ErkJggg==";
    var sketchpad = this.sketchpad;
    /**
     * Paste from clipboard
     */
    document.addEventListener("paste", function (event) {
        if (that.disabled) {
            return;
        }
        var items = (event.clipboardData && event.clipboardData.items) || (event.originalEvent.clipboardData && event.originalEvent.clipboardData.items);
        // console.log("PASTE", event);
        // console.log(JSON.stringify(items)); // will give you the mime types
        Object.keys(items).forEach(function (index) {
            var item = items[index];
            if (item.kind === 'file') {
                var file = item.getAsFile();
                //file.name = "Clipboard"; - .name is read only
                window.tmp = new Imagehost({
                    progressParentEl: sketchpad.progressParentEl || sketchpad.containerEl,
                    file: file
                }).on("success", function (e) {
                    var center = true;
                    that.onImagehostReady(e.url, 0, 0, 0, 0, center);
                }).on("error", that.onImagehostError.bind(that));
            }
        });
    });

    /**
     * Drop file or url
     */
    this.sketchpad.containerEl.addEventListener("dragover", function (e) {
        if (that.disabled) {
            return;
        }
        // e.dataTransfer.dropEffect = "copy";

        e.preventDefault();
        // console.log("dragover");
        // var img = document.createElement("img");
        // img.src = "data:image/gif;base64,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";
        // e.dataTransfer.setDragImage(img, 0, 0);
    });
    this.sketchpad.containerEl.addEventListener("dragenter", function (ignore) {
        if (that.disabled) {
            return;
        }
        // var img = document.createElement("img");
        // img.src = "data:image/gif;base64,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";
        // document.body.appendChild(img);
        // e.dataTransfer.setDragImage(img, 0, 0);
        // console.log(e.dataTransfer);
        // alert(1);
    });

    this.sketchpad.containerEl.addEventListener("drop", function (e) {
        if (that.disabled) {
            return;
        }
        var p = that.sketchpad.mainPos(e.clientX, e.clientY);

        // console.log("dorp", e);
        var imageUrl = e.dataTransfer.getData('URL');
        // console.log("url", e.dataTransfer.getData('URL'));
        // console.log("image/png", e.dataTransfer.getData('image/png'));
        // console.log("text/plain", e.dataTransfer.getData('text/plain'));
        // console.log("text/uri-list", e.dataTransfer.getData('text/uri-list'));
        // console.log("text", e.dataTransfer.getData('text'));
        if (imageUrl) {
            // console.log("imageUrl", imageUrl);
            window.tmp = new Imagehost({
                progressParentEl: sketchpad.progressParentEl || sketchpad.containerEl,
                url: imageUrl
            }).on("success", function (e) {
                that.onImagehostReady(e.url, p.x, p.y, p.x, p.y);
            }).on("error", that.onImagehostError.bind(that));
            e.preventDefault();
            return;
        }

        var html = e.dataTransfer.getData('text/html');
        // console.log("HTML", html);
        var src = html.match(/<img.+src\=(?:\"|\')(.+?)(?:\"|\')(?:.+?)>/);
        // console.log("SSSRRRCCC", src);
        if (src && src[1]) {
            var parser = document.createElement("span");
            parser.innerHTML = src[1];
            console.log("URL PARSED", encodeURI(parser.textContent));
            window.tmp = new Imagehost({
                progressParentEl: sketchpad.progressParentEl || sketchpad.containerEl,
                url: encodeURI(parser.textContent)
            }).on("success", function (e) {
                // alert(e.url);
                that.onImagehostReady(e.url, p.x, p.y, p.x, p.y);
            }).on("error", that.onImagehostError.bind(that));
            e.preventDefault();
            return;
        }
        // console.log("files", e.dataTransfer.files.length);
        // console.log("items", e.dataTransfer.items.length, e.dataTransfer.items);
        // var items = e.dataTransfer.items;
        // var i;
        // console.log("URI", e.dataTransfer.getData('text/uri-list'));
        // for (i = 0; i < items.length; i += 1) {
        //     console.log(items[i]);
        // }

        var files = e.dataTransfer.files;
        if (files.length > 0) {
            var file = files[0]; //use only first file
            // alert(file.type);
            if (FileReader !== undefined && (file.type.indexOf("image") !== -1 || file.type.indexOf("pdf") !== -1)) {
                window.tmp = new Imagehost({
                    progressParentEl: sketchpad.progressParentEl || sketchpad.containerEl,
                    file: file
                }).on("success", function (e) {
                    that.onImagehostReady(e.url, p.x, p.y, p.x, p.y);
                }).on("error", that.onImagehostError.bind(that));
            }
            e.preventDefault();
            return;
        }
        // e.stopPropagation();
    });

}
ToolImage.prototype = Object.create(Tool.prototype);
Object.assign(ToolImage.prototype, {
    layers: ["F"],
    toolLabel: "Image",//image
    toolId: "image",
    keyCode: 79, //o
    disabled: false,
    fieldThreshold: 100,
    disable: function disable() {
        "use strict";
        this.disabled = true;
    },
    enable: function enable() {
        "use strict";
        this.disabled = false;
    },
    getCursor: function getCursor() {
        "use strict";

        var style = {
            pointer: "crosshair",
            backgroundColor: "rgba(0,0,0,0)",
            borderRadius: "0",
            border: "none"
        };

        return style;

    },
    onImagehostError: function onImagehostError(e) {
        "use strict";
        popnotifications.notification(e.title, e.message);
        // alert(e.type + "\n" + e.message);
    },

    onImagehostReady: function onImagehostReady(url, sx, sy, ex, ey, center) {
        "use strict";
        var id = 777;
        var imageInput = new Input({
            sketchpad: this.sketchpad,
            id: id,
            tool: this.toolId,
            layers: this.layers,
            url: url,
            center: center
        });
        // alert(e.url);
        this.sketchpad.inputs[id] = imageInput;
        imageInput.addPoint(new Date().getTime(), sx, sy);
        imageInput.addPoint(new Date().getTime(), ex, ey, "force");
        //clear stack before delete
        this.sketchpad.sendInputs();
        this.sketchpad.drawInputs();
        //remove non exists inputs
        delete this.sketchpad.inputs[id];

    },


    /**
     * [startInput description]
     * @memberof ToolImage#
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
            layers: this.layers
        });

        input.firstX = x;
        input.firstY = y;
        input.selectorDiv = document.createElement("div");
        input.selectorDiv.style.position = "absolute";
        // input.selectorDiv.style.border = "1px dotted " + this.getColorStr();
        input.selectorDiv.style.border = "1px solid black";
        input.selectorDiv.style.outline = "1px dashed white";
        input.selectorDiv.style.outlineOffset = "-1px";
        // input.selectorDiv.style.border = "1px dotted black";
        // input.selectorDiv.style.backgroundColor = this.getFillColorStr();
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

        sketchpad.containerEl.appendChild(input.selectorDiv);

        // input.addPoint(new Date().getTime(), x, y);
        return input;
    },

    /**
     * [moveInput description]
     * @memberof ToolImage#
     * @param  {Input} input - [description]
     * @param  {number} x -    [description]
     * @param  {number} y -   [description]
     * @param  {HTMLEvent} e -    [description]
     * @return {undefined}       [description]
     */
    moveInput: function drawPath(input, x, y, e) {
        "use strict";
        if (e.altKey) {
            x = Math.round(x / 10) * 10;
            y = Math.round(y / 10) * 10;
        }

        var firstX = input.firstX;
        var firstY = input.firstY;

        if (Math.abs(firstX - x) < this.fieldThreshold || Math.abs(firstY - y) < this.fieldThreshold) {
            if (Math.abs(firstX - x) < Math.abs(firstY - y)) {
                input.selectorDiv.style.background = "linear-gradient(to right, rgba(0,0,0,.2), transparent)";
                input.selectorDiv.style.border = "1px dashed #888";
                input.selectorDiv.style.boxSizing = "border-box";
                input.selectorDiv.style.borderRight = "";
                input.selectorDiv.style.outline = "";
                // input.selectorDiv.style.filter = "invert(100%)";
                x = firstX + 100;
            } else {
                input.selectorDiv.style.background = "linear-gradient(to bottom, rgba(0,0,0,.2), transparent)";
                input.selectorDiv.style.border = "1px dashed #888";
                input.selectorDiv.style.boxSizing = "border-box";
                input.selectorDiv.style.borderBottom = "";
                input.selectorDiv.style.outline = "";
                // input.selectorDiv.style.filter = "invert(100%)";
                y = firstY + 100;
            }
        } else {
            input.selectorDiv.style.outline = "1px dashed white";
            input.selectorDiv.style.border = "1px solid black";
            input.selectorDiv.style.boxSizing = "";
            input.selectorDiv.style.background = "";
            input.selectorDiv.style.filter = "";
        }

        var h = Math.abs(y - firstY);
        if (e.shiftKey) {
            if (x < firstX) {
                x = firstX - h;
            } else {
                x = firstX + h;
            }
        }

        var sx = Math.min(firstX, x);
        var sy = Math.min(firstY, y);
        var ex = Math.max(firstX, x);
        var ey = Math.max(firstY, y);

        h = (ey - sy);
        var w = (ex - sx);

        // console.log(w, h);
        if (this.sketchpad.centerViewport) {
            input.selectorDiv.style.left = this.sketchpad.width / 2 + sx - 1 + "px";
            input.selectorDiv.style.top = this.sketchpad.height / 2 + sy - 1 + "px";
        } else {
            input.selectorDiv.style.left = sx + "px";
            input.selectorDiv.style.top = sy + "px";
        }

        input.selectorDiv.style.width = w + "px";
        input.selectorDiv.style.height = h + "px";
    },

    /**
     * [finishInput description]
     * @memberof ToolImage#
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

        var sketchpad = this.sketchpad;
        var firstX = input.firstX;
        var firstY = input.firstY;

        if (Math.abs(firstX - x) < this.fieldThreshold || Math.abs(firstY - y) < this.fieldThreshold) {
            if (Math.abs(firstX - x) < Math.abs(firstY - y)) {
                x = firstX;
            } else {
                y = firstY;
            }
        }

        var h = Math.abs(y - firstY);
        if (e.shiftKey) {
            if (x < firstX) {
                x = firstX - h;
            } else {
                x = firstX + h;
            }
        }


        // input.addPoint(new Date().getTime(), x, y);
        // input.uploadingFiles = [];

        var fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.style.position = "fixed";
        fileInput.style.display = "none";
        fileInput.accept = ".jpg,.jpeg,.png,.gif,.svg,image/*;capture=camera";
        fileInput.click();

        var that = this;
        function onImagehostReady(e) {
            that.onImagehostReady(e.url, firstX, firstY, x, y);
        }

        fileInput.addEventListener("change", function (e) {
            var files = e.target.files; // FileList object
            var i,
                f;
            for (i = 0; i < files.length; i += 1) {
                f = files[i];
                // console.log("readingFile", f);
                window.tmp = new Imagehost({
                    progressParentEl: sketchpad.progressParentEl || sketchpad.containerEl,
                    file: f
                }).on("success", onImagehostReady)
                    .on("error", that.onImagehostError.bind(that));
            }
        });

        sketchpad.containerEl.removeChild(input.selectorDiv);
    },


    /**
     * Draw engine
     * @memberof ToolImage#
     * @param  {object} Drawing parameters
     * @param  {object} List of points to draw
     * @return {object}
     */
    drawFramePath: function drawFramePath(config, points) {
        "use strict";
        var toolConfig = config.cnf;
        var sketchpad = this.sketchpad,
            ll,
            context;

        if (!toolConfig || !toolConfig.lay || !toolConfig.lay.length) {
            console.warn("no layers to draw");
            return;
        }
        var p1, p2, w, h;
        // console.log("drawFramePath", toolConfig);
        function drawImage(img) {
            // console.log("drawImage", img);
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
                context.beginPath();

                context.rotate(sketchpad.rotation * Math.PI / 180);
                context.scale(sketchpad.scale, sketchpad.scale);


                context.translate(config.vpx, config.vpy);
                context.translate(-sketchpad.viewportX, -sketchpad.viewportY);

                context.scale(1 / config.scl, 1 / config.scl);
                context.rotate(-config.rot * Math.PI / 180);

                p1 = {x: Math.min(points.x[0], points.x[1]), y: Math.min(points.y[0], points.y[1])};
                p2 = {x: Math.max(points.x[0], points.x[1]), y: Math.max(points.y[0], points.y[1])};

                w = p2.x - p1.x;
                h = p2.y - p1.y;

                if (w < 1 && h < 1) {
                    w = img.width;
                    h = img.height;
                }

                if (w < 1) {
                    w = img.width * (h / img.height);
                }

                if (h < 1) {
                    h = img.height * (w / img.width);
                }
                // console.log("toolConfig", toolConfig);
                if (toolConfig.cen) {
                    p1.x -= img.width / 2;
                    p1.y -= img.height / 2;
                }
                context.drawImage(
                    img,
                    p1.x,
                    p1.y,
                    w,
                    h
                );
                context.restore();
            }
        }
        var that = this;
        // alert(toolConfig.url);
        if (toolConfig.url) {
            // console.log("pause drawing", toolConfig.url);
            // sketchpad.pauseDrawing();
            sketchpad.resources.getImage(toolConfig.url, function (record) {
                if (!record.success) {
                    return;
                }
                drawImage(record.img);

            }, function (e) {
                console.warn("error loading image", toolConfig.url, e);
                if (that.emptyImage.complete && that.emptyImage.naturalWidth) {
                    drawImage(that.emptyImage);
                } else {
                    that.emptyImage.addEventListener("load", function () {
                        drawImage(that.emptyImage);
                    });
                }
            });
        } else {
            console.log("error url");
        }


    }
});
NSSketchpad.avaliableTools.push(ToolImage);
