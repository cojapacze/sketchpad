// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/sketchpad.sketch.js
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


/*global Eventsmanager, alert*/

/**
 * Sketch object
 * @class
 *
 */
function Sketch(config) {
    "use strict";
    // console.log("Sketch constructor config", config);
    // console.log("Sketch constructor this.config", this.config);
    Eventsmanager.call(this, config);

    // console.log("after Eventsmanager.call", this.config, config, this);

    this.config = Object.assign({
        sid: String(Date.now() + Math.random()),
        cts: Date.now()
    }, config); // sketch config like viewport position, scale, tools, background, foreground, ...
    // console.log("Sketch constructor this.config2", JSON.stringify(this.config));
    // console.log("Sketch constructor config2", config);

    this.toolsCache = [];
    this.framesHistory = [];
    this.newFrames = [];
    this.myStash = []; // my clipboard

    this.bulkId = 0;
    this.grindingThreshold = 1000 / 60; //requestAnimationFrame fps
    this.userBFramesCounter = 0;
    // console.log("New Sketch Object Config this.config ", this.config);
    this.setConfig(this.config);
    // console.log("New Sketch Object Config this.getConfig() ", this.getConfig());
    return this;
}


Sketch.prototype = Object.create(Eventsmanager.prototype);

Object.assign(Sketch.prototype, {

    getHistoryStatus: function getHistoryStatus() {
        "use strict";
        var result = {
            undo: this.userBFramesCounter,
            redo: this.myStash.length
        };
        return result;
    },
    getId: function getId() {
        "use strict";
        return String(this.config.sid);
    },
    setConfig: function setConfig(config) {
        "use strict";
        // console.log("%csetConfig", "background:yellow", "[", this.getId(), "]", config);
        // debugger;
        this.config = Object.assign(this.config, config);
    },
    getConfig: function getConfig() {
        "use strict";
        return this.config;
    },
    getPageConfig: function getPageConfig(sketchpad) {
        "use strict";

        //update current sketch config (position etc.) before save
        if (this === sketchpad.room.sketch) {
            this.setConfig(sketchpad.getSketchConfig());
        }

        var meta = {
            // hello: "Visit site www.sketchpad.pro to open this file.",
            // site: "http://sketchpad.pro",
            description: "Drawing board sketch page",
            version: "0.5.1",

            timestamp: Date.now(),
            timestampISO: new Date().toISOString(),
            // username: sketchpad.UID,
            host: document.location.host,
            cmd: "page",
            config: this.getConfig()//config,
            // toolsConfig: sketchpad.getToolsConfigs(),
            // user: {
            //     username: sketchpad.UID,
            //     viewport: {
            //         x: sketchpad.viewportX,
            //         y: sketchpad.viewportY,
            //         width: sketchpad.width,
            //         height: sketchpad.height,
            //         scale: sketchpad.scale,
            //         rotation: sketchpad.rotation
            //     }
            // }
        };
        return meta;

    },
    getFrames: function getFrames() {
        "use strict";
        var data = this.framesHistory.concat(this.newFrames);
        var i,
            ii;
        for (i = 0; i < data.length; i += 1) {
            for (ii = 0; ii < data[i].evs.length; ii += 1) {
                /**
                 * fixed by using cid poperty // !!! data[i].evs[ii].id is messed: once it is input event identifier, next its id of cached tool (this.toolCache) config in sketch, need fix, possible unespected behavior in edge cases
                 */
                if (data[i].evs[ii].cid !== undefined) {
                    Object.assign(data[i].evs[ii], this.getCachedFrame(data[i].evs[ii].cid));
                }
                data[i].cmd = "inputs";
                data[i].sid = this.getId();
            }
        }
        return data;
    },
    /**
     * Cache frame by saving each configuration only once
     * configuration = viewport position + scale + rotation + width + height + tool config
     *
     * @param  {object} tool - drawing frame
     * @return {integer}      [description]
     */
    cacheFrame: function cacheFrame(tool) {
        "use strict";
        var i = this.toolsCache.findIndex(function (el) {
            if (!el) {
                return false;
            }
            if (el.tol === tool.tol &&
                    el.vpx === tool.vpx &&
                    el.vpy === tool.vpy &&
                    el.scl === tool.scl &&
                    el.rot === tool.rot &&
                    el.hgt === tool.hgt &&
                    el.wdh === tool.wdh &&
                    JSON.stringify(el.cnf) === JSON.stringify(tool.cnf)) { //to optimize
                return true;
            } else {
                return false;
            }
        });
        if (i === -1) {
            this.toolsCache.push({
                vpx: tool.vpx,
                vpy: tool.vpy,
                scl: tool.scl,
                rot: tool.rot,
                tol: tool.tol,
                hgt: tool.hgt,
                wdh: tool.wdh,
                cnf: tool.cnf
            });
            return this.toolsCache.length - 1;
        } else {
            return i;
        }
    },

    /**
     * [getTool description]
     * @param  {integer} id [description]
     * @return {object}    [description]
     */
    getCachedFrame: function getCachedFrame(id) {
        "use strict";
        return this.toolsCache[id];
    },

    // save: function save(sketchpad, ignore) {//, savePassword
    //     "use strict";
    //     this.setConfig(sketchpad.getSketchConfig()); //get current config (position etc.) before save
    //     var data = this.framesHistory.concat(this.newFrames);
    //     var i,
    //         ii;
    //     for (i = 0; i < data.length; i += 1) {
    //         for (ii = 0; ii < data[i].evs.length; ii += 1) {
    //             /**
    //              * fixed by using cid poperty // !!! data[i].evs[ii].id is messed: once it is input event identifier, next its id of cached tool (this.toolCache) config in sketch, need fix, possible unespected behavior in edge cases
    //              */
    //             if (data[i].evs[ii].cid !== undefined) {
    //                 Object.assign(data[i].evs[ii], this.getCachedFrame(data[i].evs[ii].cid));
    //             }
    //             data[i].cmd = "inputs";
    //         }
    //     }
    //     // var config = Object.assign({}, sketchpad.config);
    //     // delete config.ws;
    //     // delete config.containerEl;

    //     // if (!savePassword) {
    //     //     config.password = "";
    //     // }

    //     data.unshift({
    //         hello: "Visit site www.sketchpad.pro to open this file.",
    //         site: "http://sketchpad.pro",
    //         description: "Drawing board sketch file.",
    //         version: "0.9.1",
    //         timestamp: Date.now(),
    //         timestampISO: new Date().toISOString(),
    //         // username: sketchpad.UID,
    //         // editable: savePassword,
    //         // host: document.location.host,
    //         cmd: "sketch-meta",
    //         config: this.getConfig()
    //         // toolsConfig: sketchpad.getToolsConfigs(),
    //         // user: {
    //         //     username: sketchpad.UID,
    //         //     viewport: {
    //         //         x: sketchpad.viewportX,
    //         //         y: sketchpad.viewportY,
    //         //         width: sketchpad.width,
    //         //         height: sketchpad.height,
    //         //         scale: sketchpad.scale,
    //         //         rotation: sketchpad.rotation
    //         //     }
    //         // }
    //     });

    //     this.dispatch("onSave", {data: data});
    //     return data;
    // },

    /**
     * reset sketch
     * @return {undefined} [description]
     */
    reset: function reset() {
        "use strict";
        /**
         * cache of tools
         * @type {Array}
         */
        this.toolsCache = [];

        /**
         * cache of tools
         * @type {Array}
         */
        this.myStash = [];
        /**
         * frames that has been already drawen
         * @type {Array}
         */
        this.framesHistory = [];

        /**
         * new frames waiting to draw
         * @type {Array}
         */
        this.newFrames = [];

        /**
         * should be equal to requestAnimationFrame fps
         * @type {number}
         */
        this.grindingThreshold = 1000 / 60;
    },


    /**
     * Gets bulkFrame and grinds it to newFrames stack
     * or to framesHistory if receivingHistory is true
     *
     * @param  {object} bulkFrame        [description]
     * @param  {boolean} receivingHistory [description]
     * @return {undefined}                  [description]
     */
    grindBulkFrame: function grindBulkFrame(sketchpad, bulkFrame, receivingHistory) {
        "use strict";
        var groundFrame,
            lastTimestamp,
            firstTimestamp,
            i,
            honeycomb,
            that = this;

        this.bulkId += 1;
        if (sketchpad.UID === bulkFrame.uid) {
            if (!this.userBFramesCounter) {
                sketchpad.dispatch("undoAvaliable");
            }
            this.userBFramesCounter += 1;
        }
        // console.log("bulkFrame", bulkFrame);
        function scrape(bulkPath, lastTimestamp) {
            var groundPath;
            var cutOff = 0;

            // calculate number of points for one frame
            // all t,x,y of bulkPath.pts are related
            while (bulkPath.pts.t[cutOff] <= lastTimestamp) {
                cutOff += 1;
            }
            // try to have minimal 2 length of points
            if (cutOff < 2) {
                cutOff = 2;
            }

            groundPath = {
                cid: that.cacheFrame(bulkPath),
                pts: {
                    t: bulkPath.pts.t.splice(0, cutOff),
                    x: bulkPath.pts.x.splice(0, cutOff),
                    y: bulkPath.pts.y.splice(0, cutOff)
                }
            };

            // repeat last point
            // to keep continous connection between groundPath;s points
            var lastT = groundPath.pts.t[groundPath.pts.t.length - 1];
            var lastX = groundPath.pts.x[groundPath.pts.x.length - 1];
            var lastY = groundPath.pts.y[groundPath.pts.y.length - 1];
            bulkPath.pts.t.unshift(lastT);
            bulkPath.pts.x.unshift(lastX);
            bulkPath.pts.y.unshift(lastY);

            return groundPath;
        }
        if (bulkFrame.evs && bulkFrame.evs.length) {
            while (bulkFrame.evs.length) {
                firstTimestamp = bulkFrame.evs[0].pts.t[0];
                lastTimestamp = firstTimestamp + this.grindingThreshold;
                groundFrame = {
                    uid: bulkFrame.uid,
                    bid: this.bulkId,
                    evs: []
                };
                //for every input
                for (i = bulkFrame.evs.length - 1; i >= 0; i -= 1) {
                    if (bulkFrame.evs[i].pts.t.length > 1) {
                        honeycomb = scrape(bulkFrame.evs[i], lastTimestamp);
                        groundFrame.evs.push(honeycomb);
                    }
                    if (bulkFrame.evs[i].pts.t.length < 2) {
                        bulkFrame.evs.splice(i, 1);
                    }
                }
                if (receivingHistory) {
                    this.framesHistory.push(groundFrame);
                } else {
                    this.newFrames.push(groundFrame);
                }
            }
        }

    },

    /**
     * [getCommandsHist description]
     * @return {array} [description]
     */
    getCommandsHist: function getCommandsHist() {
        "use strict";
        return this.framesHistory;
    },

    /**
     * [getCommandsCurrent description]
     * @return {array} [description]
     */
    getCommandsCurrent: function getCommandsCurrent() {
        "use strict";
        var speed = 1, //should dynamicly adjust to time
            frames = this.newFrames.splice(0, speed),
            i;
        if (frames.length) {
            for (i = 0; i < frames.length; i += 1) {
                this.framesHistory.push(frames[i]);
            }
            return frames;
        } else {
            return [];
        }
    },

    undoSketch: function undo(sketchpad, uid) {
        "use strict";

        var bid = false;
        var removed = [];
        var that = this;

        function removeFromStack(stack, uid, bid) {
            var undoFrame;
            var i;
            // if (!uid) {
            //     alert("removing with no uid");
            // }
            var last = stack.length;
            for (last = last - 1; last > -1; last -= 1) {
                if ((!bid && stack[last].uid === uid) || (stack[last].uid === uid && stack[last].bid === bid)) {
                    undoFrame = stack.splice(last, 1)[0];
                    bid = undoFrame.bid;
                    //remember full info about movement to be ready to send
                    for (i = 0; i < undoFrame.evs.length; i += 1) {
                        if (undoFrame.evs[i].cid !== undefined) {
                            Object.assign(undoFrame.evs[i], that.getCachedFrame(undoFrame.evs[i].cid));
                        }
                    }
                    removed.push(undoFrame);
                }
            }

        }
        removeFromStack(this.newFrames, uid, bid);
        removeFromStack(this.framesHistory, uid, bid);

        if (sketchpad.UID === uid) {
            if (removed.length) {
                this.userBFramesCounter -= 1;
                if (this.userBFramesCounter === 0) {
                    sketchpad.dispatch("undoUnavaliable");
                }
            }
        }

        return removed;
    },

    sendUndo: function sendUndo(sketchpad) {
        "use strict";
        sketchpad.sendMessageToServer({
            sid: this.getId(), // need rethinkng if null will happen
            cmd: "undo",
            uid: sketchpad.UID,//overwritten by server
            user: {
                user_id: sketchpad.UID//overwritten by server
            }
        });
    },

    undo: function undo(sketchpad) {
        "use strict";
        sketchpad.sendInputs(); // make sure that all current moves are send to others
        var undoMoves = this.undoSketch(sketchpad, sketchpad.UID);
        this.sendUndo(sketchpad);
        sketchpad.planRefreshWindow(0, "undo");
        this.myStash = this.myStash.concat(undoMoves);

        if (this.myStash.length > 0) {
            sketchpad.dispatch("redoAvaliable");
        }
    },

    redo: function redo(sketchpad) {
        "use strict";
        if (this.myStash && this.myStash.length > 0) {
            if (!this.myStash.length) {
                console.warn("Redo stash empty!");
                return;
            }
            var redoFragment = this.myStash.splice(-1)[0];
            var redoMsg = {
                uid: sketchpad.UID,
                ts: new Date().getTime(),
                cmd: "inputs",
                evs: redoFragment.evs
            };
            sketchpad.sendMessageToServer(redoMsg);
            // console.log("sketchpad.js", "redoMsg", redoMsg);
            this.grindBulkFrame(sketchpad, redoFragment);
            if (this.myStash.length === 0) {
                sketchpad.dispatch("redoUnavaliable");
            }
        } else {
            sketchpad.dispatch("redoUnavaliable"); // shoud not be nessesary, UI shoud have this event already
        }
    },

    destructor: function destructor() {
        "use strict";
        this.reset();
    }

});
