// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/sketchpad.room.js
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


/*global NSSketchpad, Sketch, Sketchpad*/

/**
 * Represents room with sketch
 * @class
 * @param {string} room_token - room name
 */
function Room(room_token, sketchpad) {
    "use strict";
    /**
     * Validate constructor data
     */
    if (!(sketchpad instanceof Sketchpad)) {
        throw new Error("Room(room_token, sketchpad)", room_token, "sketchpad must be instanceof Sketchpad.");
    }
    /**
     * Sketchpad that contain this room
     */
    this.sketchpad = sketchpad;
    /**
     * Token of current room
     * @type {string}
     */
    this.room_token = room_token;
    /**
     * Sketch in room
     * @type {Sketch}
     */
    this.sketches = [];
    this.prevSketch = [];
    this.totalCount = 0;

    /**
     * List of connected users
     * @type {Array}
     */
    this.clients = [];


    sketchpad.room = this;

    // setTimeout(function () {//addSketch after room is assigned to sketchpad, to make possible run sketchpad.planRefreshWindow() that is using this assigment
    // }, 0);
    // this.sketch = new Sketch();

    return this;
}
Room.prototype = {
    reset: function reset() {
        "use strict";
        var i;
        for (i = this.sketches.length - 1; i >= 0; i -= 1) {
            this.sketches[i].destructor();
            this.sketches.splice(i, 1);
        }
        this.sketch = undefined;
    },
    getSketchBySid: function getSketchBySid(sid) {
        "use strict";
        var i;
        for (i = 0; i < this.sketches.length; i += 1) {
            if (this.sketches[i].getId() === sid) {
                return this.sketches[i];
            }
        }
        return false;
    },
    getSketchByNo: function getSketchByNo(no) {
        "use strict";
        var i = parseInt(no, 10) - 1;
        return this.sketches[i];
    },
    getCurrentSketchNo: function getCurrentSketchNo() {
        "use strict";
        return this.sketches.indexOf(this.sketch) + 1;
    },
    addSketch: function addSketch(sketchpad, config) {//, remoteSketchFlag
        "use strict";

        // if (!remoteSketchFlag && !sketchpad.canDraw()) {
        //     console.error("Insufficient permissions to perform `addSketch` operation");
        //     return;
        // }
        // var autoSelect = !remoteSketchFlag;
        sketchpad.sendInputs();
        sketchpad.drawInputs();
        // if (autoSelect) {
        //     if (this.sketch) {//is avtive sketch
        //         //save current settings to sketch
        //         this.sketch.setConfig(sketchpad.getSketchConfig());
        //         this.prevSketch.push(this.sketch);
        //     }
        // }

        this.totalCount += 1;
        if (!config) {
            throw new Error("Room.addSketch - config param is required");
        }
        config = Object.assign({
            titleNo: this.totalCount
        }, config);

        // console.log("NEW SKETCH", config);
        var sketch = new Sketch(config);
        // sketchpad.setSketchConfig(sketch.getConfig());// we need this line as long as arg. config is not required


        //we really need this?
        // if (!this.sketch) {
        //     this.sketch = sketch;
        // }
        this.sketches.push(sketch);

        sketchpad.dispatch("sketch-added", sketch);//, remoteSketchFlag

        // console.log("NEW SKETCH2", this.sketch.getConfig());

        // if (!remoteSketchFlag) {
        //     sketchpad.sendMessageToServer({
        //         cmd: "page",
        //         config: this.sketch.getConfig()
        //     });
        // }
        // if (autoSelect) {
        //     sketchpad.planRefreshWindow();//refreshSketchpad
        // }

        return sketch;
    },
    setPageConfig: function setPageConfig(sketchpad, pageConfig) {
        "use strict";
        var sketch;
        if (pageConfig.sid) {
            sketch = this.getSketchBySid(pageConfig.sid);
        }
        if (sketch) {
            if (this.sketch === sketch) {
                this.sketch.setConfig(sketchpad.getSketchConfig());
            }
            sketch.setConfig(pageConfig);
            if (this.sketch === sketch) {
                sketchpad.setSketchConfig(sketch.getConfig());
            }
            sketchpad.dispatch("sketch-changed", sketch);
        } else {
            sketch = this.addSketch(sketchpad, pageConfig, "remoteFlag");
        }
        if (!this.sketch) {
            this.setActiveSketch(sketchpad, sketch);
        }
        return sketch;
    },

    setActiveSketch: function setActiveSketch(sketchpad, sketch) {
        "use strict";
        // console.log("Set active sketch", sketch.config);
        if (!(sketch instanceof Sketch)) {
            console.error("sketchpad.room.js", "setActiveSketch(sketchpad, sketch) - sketch instanceof Sketch is required");
            return;
        }
        sketchpad.sendInputs();
        sketchpad.drawInputs();

        if (this.sketch) {//is active sketch
            //save current settings to sketch
            this.sketch.setConfig(sketchpad.getSketchConfig());
            this.prevSketch.push(this.sketch);
        }

        this.sketch = sketch;
        sketchpad.setSketchConfig(sketch.getConfig());

        sketchpad.dispatch("sketch-changed", sketch);
        sketchpad.dispatch("historySketch-status", sketch.getHistoryStatus());

        sketchpad.planRefreshWindow(0, "room.js:setActiveSketch");//refreshSketchpad
    },

    removeSketch: function removeSketch(sketchpad, sketch, remoteRemoveFlag) {
        "use strict";

        if (!remoteRemoveFlag && !sketchpad.canDraw()) {
            console.error("Insufficient permissions to perform `removeSketch` operation");
            return;
        }
        if (!(sketch instanceof Sketch)) {
            throw new Error("sketchpad.room.js:removeSketch(sketchpad, sketch, remoteRemoveFlag), sketch must be instanceof Sketch");
        }

        sketchpad.sendInputs();
        sketchpad.drawInputs();
        var i;
        //remove sketch form history
        for (i = this.prevSketch.length - 1; i >= 0; i -= 1) {
            if (this.prevSketch[i] === sketch) {
                this.prevSketch.splice(i, 1);
            }
        }
        //remove sketch form stash
        for (i = this.sketches.length - 1; i >= 0; i -= 1) {
            if (this.sketches[i] === sketch) {
                this.sketches.splice(i, 1);
            }
        }

        if (this.sketch === sketch) {//if we are removing active sketch
            if (this.prevSketch.length > 0) {
                this.sketch = this.prevSketch.pop();//activ last prev sketch
                sketchpad.setSketchConfig(this.sketch.getConfig());
                sketchpad.dispatch("sketch-changed", this.sketch);
            } else if (this.sketches.length > 0) {
                this.sketch = this.sketches[0];//activ any sketch from sketches (should never happen?)
                sketchpad.dispatch("sketch-changed", this.sketch);
                sketchpad.setSketchConfig(this.sketch.getConfig());
            } else {
                this.sketch = null; // heh, what now?
                sketchpad.setSketchConfig({});
            }
        }

        sketchpad.dispatch("sketch-removed", sketch);
        if (!remoteRemoveFlag) {
            sketchpad.sendMessageToServer({
                cmd: "remove-page",
                sid: sketch.getId()
            });
        }
        sketchpad.planRefreshWindow(0, "room.js:removeSketch");//refreshSketchpad
    },
    /**
     * [addClient description]
     * @param {object} user  - new user that entered the room
     */
    addClient: function addClient(user) {
        "use strct";
        /**
         * configure client viewport element
         */
        var randomColor = user.user_color || {
            r: Math.round(25 + Math.random() * 205),
            g: Math.round(25 + Math.random() * 205),
            b: Math.round(25 + Math.random() * 205)
        };
        var viewportEl = document.createElement("div");
        var usernameEl = document.createElement("div");
        var pointerEl = document.createElement("div");

        pointerEl.style.display = "none";
        pointerEl.style.backgroundColor = "rgba(" + randomColor.r + ", " + randomColor.g + ", " + randomColor.b + ", 0.5)";
        pointerEl.style.position = "absolute";
        pointerEl.style.borderRadius = "50%";
        pointerEl.style.marginLeft = "-5px";
        pointerEl.style.marginTop = "-5px";
        pointerEl.style.width = "10px";
        pointerEl.style.height = "10px";

        usernameEl.className = "username";

        usernameEl.textContent = "New ID: " + user.user_id;// + "(" + user.viewport.x + ", " + user.viewport.y + ", " + user.viewport.width + ", " + user.viewport.height + ", " + user.viewport.scale + ")";
        usernameEl.style.backgroundColor = "rgba(" + randomColor.r + ", " + randomColor.g + ", " + randomColor.b + ", 1)";
        usernameEl.style.color = "#FFF";
        // usernameEl.style.boxShadow = "0px 0px 2px rgba(" + randomColor.r + ", " + randomColor.g + ", " + randomColor.b + ", 0.5)";
        usernameEl.style.fontSize = "12px";

        viewportEl.appendChild(pointerEl);
        viewportEl.appendChild(usernameEl);
        viewportEl.className = "viewport";
        // viewportEl.style.outline = "1px solid rgba(" + randomColor.r + ", " + randomColor.g + ", " + randomColor.b + ", 0.5)";
        viewportEl.style.position = "absolute";
        viewportEl.style.overflow = "hidden";
        viewportEl.style.border = "1px solid rgba(" + randomColor.r + ", " + randomColor.g + ", " + randomColor.b + ", 1)";
        viewportEl.style.boxSizing = "border-box";

        // viewportEl.style.boxShadow = "inset 0 0 1px .5px rgba(" + randomColor.r + ", " + randomColor.g + ", " + randomColor.b + ", 1)";
        // viewportEl.id = "viewport-" + user.user_id;

        user.pointerEl = pointerEl;
        user.viewportEl = viewportEl;
        this.setViewport(viewportEl, user, this.sketchpad);
        // if (user.user_id === this.sketchpad.user.user_id) {
        //     this.sketchpad.projectorEl.appendChild(user.viewportEl);
        // } else {
        this.sketchpad.hudsEl.appendChild(user.viewportEl);
        // }

        this.clients.push(user);
        this.redrawViewports();
    },
    setViewportPointer: function setViewportPointer(user_id, x, y) {
        "use strict";
        // console.log("setViewportPointer", user_id, x, y);
        var user = this.getClientById(user_id);
        if (user) {
            user.pointerEl.style.display = "block";
            // var pointerEl = user.pointerEl;
            // if (user_id === this.sketchpad.user.user_id) {
            //     var tool = this.sketchpad.getTool();
            //     // var pointer = tool.getPointer();
            //     // var size = tool.getSize();
            //     var cursorStyle = tool.getCursor();

            //     //special styles
            //     if (cursorStyle && cursorStyle.pointer) {
            //         this.sketchpad.containerEl.style.cursor = cursorStyle.pointer;
            //     }
            //     this.sketchpad.containerEl.style.cursor = cursorStyle.pointer;
            //     Object.assign(pointerEl.style, cursorStyle);
            // }
            user.pointerEl.style.left = x + "px";
            user.pointerEl.style.top = y + "px";
        }
    },
    setViewport: function setViewport(viewportEl, user, sketchpad) {
        "use strict";
        if (!(this.sketch instanceof Sketch)) {
            return;
        }

        var viewport = user.viewport;
        // console.log("setViewport", viewport);
        if (viewport.sid !== sketchpad.room.sketch.getId()) {
            viewportEl.style.display = "none";
        } else {
            viewportEl.style.display = "block";
        }
        if (user.user_id === sketchpad.user.user_id) {
            viewportEl.style.border = "none";
            viewportEl.style.zIndex = 2;
        }
        viewportEl.querySelector(".username").textContent = "" + ((user.viewport.away)
            ? "[Away]"
            : "") + " " + user.user_name;// + " " + "(" + viewport.x + ", " + viewport.y + ", " + viewport.width + ", " + viewport.height + ", " + viewport.scale + "/" + sketchpad.scale + ")";

        viewportEl.style.top = "0px";
        viewportEl.style.left = "0px";

        viewportEl.style.width = viewport.width + "px";
        viewportEl.style.height = viewport.height + "px";
        viewportEl.style.transformOrigin = viewport.x + "px " + viewport.y + "px";
        viewportEl.style.webkitTransformOrigin = viewport.x + "px " + viewport.y + "px";
        viewportEl.style.MozTransformOrigin = viewport.x + "px " + viewport.y + "px";
        viewportEl.style.msTransformOrigin = viewport.x + "px " + viewport.y + "px";
        viewportEl.style.OTransformOrigin = viewport.x + "px " + viewport.y + "px";

        var transform = "translate(" + sketchpad.width / 2 + "px," + sketchpad.height / 2 + "px) scale(" + (1 / viewport.scale) + ") rotate(" + (-1 * viewport.rotation) + "deg) translate(" + viewport.x + "px, " + viewport.y + "px) translate(" + (-viewport.width / 2) + "px, " + (-viewport.height / 2) + "px)";
        viewportEl.style.transform = transform;
        viewportEl.style.webkitTransform = transform;
        viewportEl.style.MozTransform = transform;
        viewportEl.style.msTransform = transform;
        viewportEl.style.OTransform = transform;
    },

    redrawViewports: function redrawViewports() {
        "use strict";
        var that = this;
        this.clients.forEach(function (user) {
            that.setViewport(user.viewportEl, user, that.sketchpad);
        });
    },

    /**
     * Update information about user
     * @param  {object} updatedUser {user_id: number, updated values...}
     */
    updateClient: function updateClient(updatedUser) {
        "use strict";
        var i,
            user;
        // console.log("???????????!!!!!!!!!!!!!", updatedUser);
        for (i = 0; i < this.clients.length; i += 1) {
            user = this.clients[i];
            // be sure that user_id is a number, not for ex. string from json
            if (user.user_id === updatedUser.user_id) {
                user.webrtc = updatedUser.webrtc;
                user.viewport = updatedUser.viewport;
                // console.log("!!!!!!!!!!!!!", user);
            }
        }
        this.redrawViewports();
    },

    getClientById: function getClientById(user_id) {
        "use strict";
        // console.warn("Removing user", user_id);
        // var that = this;

        var i,
            client;
        for (i = this.clients.length - 1; i >= 0; i -= 1) {
            client = this.clients[i];
            if (String(client.user_id) === String(user_id)) {
                return client;
                // that.sketchpad.hudsEl.removeChild(client.viewportEl);
                // this.clients.splice(i, 1);
            }
        }

    },

    /**
     * [removeClientById description]
     * @param  {number} user_id  - user id to be removed
     */
    removeClientById: function removeClientById(user_id) {
        "use strict";
        console.warn("Removing user", user_id);
        var that = this;

        var i,
            client;
        for (i = this.clients.length - 1; i >= 0; i -= 1) {
            client = this.clients[i];
            if (String(client.user_id) === String(user_id)) {
                that.sketchpad.hudsEl.removeChild(client.viewportEl);
                // that.sketchpad.projectorEl.removeChild(client.viewportEl);
                this.clients.splice(i, 1);
            }
        }
    }

};
