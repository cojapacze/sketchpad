// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/sketchpad.js
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


/*global NSSketchpad*/
/*global Eventsmanager*/
/*global console, window, alert, Sketch, Room*/
/*global Input*/
/*global randomColor*/
/*global Resources, Progressbar*/

/**
 * Calculate correct input coordinates
 * fixed to target element offset
 *
 * @param  {HTMLElement} target - target element
 * @param  {number} screenX - coordinate y
 * @param  {number} screenY - coordinate x
 * @return {object}  - {x: number, y: number}
 */
function calculateOffsetXY(target, screenX, screenY) {
    "use strict";
    var
        style = target.currentStyle || window.getComputedStyle(target, null),
        borderLeftWidth = parseInt(style.borderLeftWidth, 10) || 0,
        borderTopWidth = parseInt(style.borderTopWidth, 10) || 0,
        rect = target.getBoundingClientRect(),
        offsetX = screenX - borderLeftWidth - rect.left,
        offsetY = screenY - borderTopWidth - rect.top;

    return {
        x: offsetX,
        y: offsetY
    };
}
window.calculateOffsetXY = calculateOffsetXY;

/**
 * Generate random string
 *
 * @param  {number} length - number of letters
 * @return {string} - speakable string
 */
function randomName(length) {
    "use strict";
    var vowels = ["a", "e", "i", "o", "u", "y"],
        cons = ["b", "c", "d", "g", "h", "j", "k", "l", "m", "n", "p", "r", "s", "t", "v", "w"],
        i,
        result = "";
    for (i = 0; i < length; i += 1) {
        result += cons[Math.floor(Math.random() * cons.length)] + vowels[Math.floor(Math.random() * vowels.length)];
    }
    return result.substring(0, length);
}

/**
 * Canvas Sketchpad plugin
 * @global
 * @class
 * @borrows Room as room
 * @param {object} config - Config of sketchpad
 * @param {HTMLElement} [config.containerEl=window] - HTML element that will contain Sketchpad
 * @param {string} [config.token="#public"] - Room token
 * @param {url} [config.backgroundImage] - url to image that will be on background of sketchpad
 * @param {url} [config.backgroundPdf] - url to pdf that will be on background of sketchpad
 * @param {url} [config.foregroundImage] - url to image that will be on foreground of sketchpad
 * @param {WebSocket} [config.ws] - WebSocket that will be used to exchange draw events
 * @param {boolean} [config.readOnly=false] - define if sketchpad should be drawable or not
 * @param {integer} [config.syncNetworkDataFrequency=100] - how offen data should be send in ms
 * @example
 * {
 *   containerEl: sketchpadEl, //HTMLElement
 *   token: room_token, //string token of room where user is connected
 *   backgroundImage: "images/bg.png", //image behind scene
 *   backgroundPdf: "images/bg.pdf", //pdf behind scene
 *   foregroundImage: "images/fg.png", //image covering scene
 *   ws: ws, //WebSocket adapter or null for standalone mockup
 *   readOnly: false, //set true for disabling drawing
 * }
 *
 * @property {object} config - The current config passed to create sketchpad.
 * @property {number} defaults.players - The default number of players.
 * @property {string} defaults.level - The default level for the party.
 * @property {object} defaults.treasure - The default treasure.
 * @property {number} defaults.treasure.gold - How much gold the party starts with.
 * @property {boolean} defaults.treasure.gold - How much gold the party starts with.
 *
 * @return {Sketchpad} - instance of sketchpad
 */
function Sketchpad(config) {
    "use strict";
    Eventsmanager.call(this, config);
    console.log("sketchpad.js", "Sketchpad::constructor", config);

    var name = randomName(6);
    var color = randomColor();

    if (!config.features) {
        config.features = "*";
    }
    this.initialised = false;

    this.drawingPaused = false;
    this.pausedQueue = [];

    this.displayCrosshair = true;
    this.displayGrid = false;

    this.UID = name[0].toUpperCase() + name.substr(1);//Math.random() * 666;
    this.user = {};
    this.COLOR = color;
    this.editorsCount = 0;
    this.viewersCount = 0;

    this.resources = new Resources({
        sketchpad: this
    });
    /**
     * Current config
     * @type {object}
     */
    config = config || {};
    if (NSSketchpad.watermarkImageSrc) {
        this.watermark = new Image();
        this.watermark.src = NSSketchpad.watermarkImageSrc;

        /**
         * display Appropriate Legal Notices
         */
        this.watermark.title = NSSketchpad.watermarkTitle;
        this.watermark.alt = "sketchpad.pro";
        this.watermark.style.cursor = "help";
        this.watermark.onload = function () {
            var copy = this;
            copy.addEventListener("click", function () {
                alert(copy.title);
            });
        };

        this.watermark.style.position = "absolute";
        this.watermark.style.right = "0px";
        this.watermark.style.bottom = "0px";
        this.watermark.crossOrigin = "anonymous";
    }
    this.password = config.password || "";

    this.setMetaConfigFreeze = NaN;
    this.config = config;

    /**
     * current room token
     * @type {string}
     */
    this.token = config.token || "#public";

    /**
     * web socket to exchange data
     * @type {WebSocket}
     */
    this.ws = config.ws || {addEventListener: function () {
        return;
    }, send: function () {
        return;
    }};

    /**
     * HTML element that will contain Sketchpad
     * @type {HTMLElement}
     */
    this.containerEl = config.containerEl || document.body;

    /**
     * Progress bar parent
     */
    this.progressParentEl = config.progressParentEl || this.containerEl;

    // length of net frame
    /**
     * How offen shoud send sketchpad update
     * Bigger values casuses bigger delay
     * Smaller values incrase usage of bandwitch
     * @type {integer}
     */
    this.syncNetworkDataFrequency = config.syncNetworkDataFrequency || Math.round(1000 / 1);

    this.syncPointerDataFrequency = config.syncPointerDataFrequency || Math.round(1000 / 10);

    /**
     * set true if center of viewport should be at center of screen
     * @type {boolean}
     */
    this.centerViewport = true;//obsolete
    /**
     * set to true to disable use input
     * @type {boolean}
     */
    this.readOnly = config.readOnly || false;
    //////alert("setconfig.readonly constructor" + this.readOnly);
    /**
     * list of registered tools
     * @type {Object}
     */
    this.tools = {};

    /**
     * id of current tool
     * @type {string|integer}
     */
    this.tool = null;
    /**
     * [viewportX description]
     * @type {Number}
     */
    this.viewportX = parseFloat(config.viewportX) || 0;
    /**
     * [viewportY description]
     * @type {Number}
     */
    this.viewportY = parseFloat(config.viewportY) || 0;
    /**
     * Saved scale
     * @type {Number}
     */
    this.scale = parseFloat(config.viewportScale) || 1;

    /**
     * Saved rotation - in deg
     */
    this.rotation = parseFloat(config.viewportZRotation) || 0;

    //consts
    this.LAYER_FRONT = "F";
    this.LAYER_BACK = "B";

    /**
     * if true received commands will be executed immediately
     * @type {Boolean}
     */
    this.receivingHistory = false;

    /**
     * list of active inputs in current time (ex. touched finger)
     * @type {Array}
     */
    this.inputs = {}; // active inputs


    this.backgroundCanvas = document.createElement("canvas");
    this.backgroundCanvas.style.width = "100%";
    this.backgroundCanvas.style.height = "100%";
    this.backgroundCanvas.style.position = "absolute";
    this.backgroundCanvas.style.transformOrigin = "0 0";
    this.backgroundCanvas.style.webkitTransformOrigin = "0 0";
    this.backgroundCanvas.style.MozTransformOrigin = "0 0";
    this.backgroundCanvas.style.msTransformOrigin = "0 0";
    this.backgroundCanvas.style.OTransformOrigin = "0 0";
    this.containerEl.appendChild(this.backgroundCanvas);

    /**
     * Background iframe??
     */
    this.backgroundIFrame = document.createElement("iframe");
    this.backgroundIFrame.style.display = "none";
    this.backgroundIFrame.style.position = "absolute";
    this.backgroundIFrame.style.transformOrigin = "0 0";
    this.backgroundIFrame.style.webkitTransformOrigin = "0 0";
    this.backgroundIFrame.style.MozTransformOrigin = "0 0";
    this.backgroundIFrame.style.msTransformOrigin = "0 0";
    this.backgroundIFrame.style.OTransformOrigin = "0 0";
    this.backgroundIFrame.style.border = 0;
    this.containerEl.appendChild(this.backgroundIFrame);

    /**
     * Background image
     */
    this.background = document.createElement("img");
    this.background.style.position = "absolute";
    this.background.style.transformOrigin = "0 0";
    this.background.style.webkitTransformOrigin = "0 0";
    this.background.style.MozTransformOrigin = "0 0";
    this.background.style.msTransformOrigin = "0 0";
    this.background.style.OTransformOrigin = "0 0";
    this.containerEl.appendChild(this.background);

    /**
     * Container for viewports
     */
    this.hudsEl = document.createElement("div");
    this.hudsEl.style.zIndex = 1;
    this.hudsEl.style.width = "100%";
    this.hudsEl.style.height = "100%";
    this.hudsEl.style.position = "absolute";
    this.hudsEl.style.backgroundPosition = "center center";
    this.hudsEl.style.transformOrigin = "0 0";
    this.hudsEl.style.webkitTransformOrigin = "0 0";
    this.hudsEl.style.MozTransformOrigin = "0 0";
    this.hudsEl.style.msTransformOrigin = "0 0";
    this.hudsEl.style.OTransformOrigin = "0 0";
    this.hudsEl.style.transition = "opacity .5s";
    this.containerEl.appendChild(this.hudsEl);

    /**
     * Container for tools projector
     */
    this.projectorEl = document.createElement("div");
    this.projectorEl.style.zIndex = 2;
    this.projectorEl.style.width = "100%";
    this.projectorEl.style.height = "100%";
    this.projectorEl.style.position = "absolute";
    this.projectorEl.style.backgroundPosition = "center center";
    this.projectorEl.style.transformOrigin = "0 0";
    this.projectorEl.style.webkitTransformOrigin = "0 0";
    this.projectorEl.style.MozTransformOrigin = "0 0";
    this.projectorEl.style.msTransformOrigin = "0 0";
    this.projectorEl.style.OTransformOrigin = "0 0";
    this.pointerEl = document.createElement("div");
    this.pointerEl.position = "absolute";
    this.pointerEl.display = "none";
    this.projectorEl.appendChild(this.pointerEl);
    this.containerEl.appendChild(this.projectorEl);

    /**
     * Foreground canvas
     * @type {HTMLCanvas}
     */
    this.canvas = document.createElement("canvas");
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    this.canvas.style.position = "absolute";

    /**
     * Background canvas
     * @type {HTMLCanvas}
     */
    this.canvasB = document.createElement("canvas");
    this.canvasB.style.width = "100%";
    this.canvasB.style.height = "100%";
    this.canvasB.style.position = "absolute";

    /**
     * foreground canvas do project input from tools
     * @type {HTMLCanvas}
     */
    this.canvasProjector = document.createElement("canvas");
    this.canvasProjector.style.width = "100%";
    this.canvasProjector.style.height = "100%";
    this.canvasProjector.style.position = "absolute";

    this.objectsCanva = document.createElement("div");
    this.objectsCanva.style.width = "100%";
    this.objectsCanva.style.height = "100%";
    this.objectsCanva.style.position = "absolute";


    /**
     * Foreground
     */
    this.foreground = document.createElement("img");
    this.foreground.style.position = "absolute";
    this.foreground.style.transformOrigin = "0 0";
    this.foreground.style.webkitTransformOrigin = "0 0";
    this.foreground.style.MozTransformOrigin = "0 0";
    this.foreground.style.msTransformOrigin = "0 0";
    this.foreground.style.OTransformOrigin = "0 0";

    /**
     * Crosshair
     */
    this.crosshairEl = document.createElement("div");
    this.crosshairEl.className = "crosshair";
    this.crosshairEl.style.position = "absolute";
    this.crosshairEl.style.transformOrigin = "0 0";
    this.crosshairEl.style.webkitTransformOrigin = "0 0";
    this.crosshairEl.style.MozTransformOrigin = "0 0";
    this.crosshairEl.style.msTransformOrigin = "0 0";
    this.crosshairEl.style.OTransformOrigin = "0 0";
    this.crosshairEl.style.backgroundImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QAQAA9AFN/YZW7AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH4AoTDyESpvZyZAAAANxJREFUWMPtllEKwjAQRF+ipghKFVqhXs/jeAbvIOKpLMUfQVpt4k8LIkULsSxiBvZr2c0wO7sEAgICfh3Hw34t+f4S2Po00F8gsQKMJAElqoAxBuAuReAex3Ep7QErTcAL4z5jbuXuqJ055zSwAG5v+p59HLwDJgBpmgKUjezKOTdSSk2ttVetdQ24RtUoz/O2/gZsfI/Nc8yfIkuSZAdkjVL6JcynG9FnBOc3uVIpVQMXoOrIV4OvYSP7726Blu7hTcBaG/X00iAExkVRiI9A1IQVcPrrL1lAgDceLw8ximVPrtAAAAAASUVORK5CYII=')";

    /**
     * Loading
     */
    this.loadingEl = document.createElement("div");
    this.loadingEl.style.position = "absolute";
    this.loadingEl.style.display = "flex";
    this.loadingEl.style.width = "100%";
    this.loadingEl.style.height = "100%";
    this.loadingEl.style.backgroundColor = "rgba(255, 255, 255, .4)";
    this.loadingEl.textContent = "...please wait...";
    this.loadingEl.style.color = "#000";
    this.loadingEl.style.justifyContent = "center";
    this.loadingEl.style.alignItems = "center";

    //parent element must be relative
    this.containerEl.style.position = "relative";
    this.containerEl.style.overflow = "hidden";

    this.containerEl.appendChild(this.canvasB);
    this.containerEl.appendChild(this.objectsCanva);
    this.containerEl.appendChild(this.canvas);
    this.containerEl.appendChild(this.canvasProjector);
    if (this.watermark) {
        this.containerEl.appendChild(this.watermark);
    }

    this.containerEl.appendChild(this.foreground);
    this.containerEl.appendChild(this.crosshairEl);
    this.containerEl.appendChild(this.loadingEl);

    /**
     * width of sketchpad
     * @type {Number}
     */
    this.width = 0;
    /**
     * height of sketchpad
     * @type {Number}
     */
    this.height = 0;

    this.windowWidth = 0;
    this.windowHeight = 0;

    /**
     * current room
     * @type {Room}
     */
    this.room = new Room(this.token, this);

    /**
     * user is away
     */
    this.away = false;
    var that = this;


    /**
     * Register avaliabled tools
     */
    NSSketchpad.avaliableTools.forEach(function (Tool) {
        that.registerTool(Tool.prototype.toolId, Tool, {});
    });

    // default drawing tool
    this.setTool(NSSketchpad.defaultTool);


    function syncPointer() {
        if (that.lastSendPointerX !== that.pointerX || that.lastSendPointerY !== that.pointerY) {
            that.lastSendPointerX = that.pointerX;
            that.lastSendPointerY = that.pointerY;
            that.sendMessageToServer({
                cmd: "pointer-move",
                x: that.pointerX,
                y: that.pointerY
            });
        }
        setTimeout(syncPointer, that.syncPointerDataFrequency);
    }



    function initConnection(e) {
        //websocket is initialized
        that.openConnection(e, that.token);
        var configObj = Object.assign({}, that.config);
        delete configObj.ws;
        delete configObj.containerEl;
        var loginObj = {
            cmd: "open",
            user_id: that.UID,
            user_color: that.COLOR,
            room_token: that.token,
            room_password: that.password,
            room_config: configObj,
            viewportX: parseFloat(that.viewportX) || 0,
            viewportY: parseFloat(that.viewportY) || 0,
            width: parseFloat(that.width) || 0,
            height: parseFloat(that.height) || 0,
            viewportScale: parseFloat(that.scale) || 1,
            viewportZRotation: parseFloat(that.rotation) || 0
        };
        // loginObj.room_config.defaultPageConfig =
        var msg = JSON.stringify(loginObj);
        that.ws.send(msg);
        // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!initConnection", loginObj);
        //
        //
        // that.sendCurrentViewport();
        //
        //
        that.dispatch("initConnection");

    }


    // push set config to event loop, to make round for subscription
    setTimeout(function () {
        that.clearSketchpad();//create canvas
        that.createEventsDraw();//register events
        /**
         * Strt syncing network
         */
        that.syncNetworkData();
        syncPointer();
        /**
         * Strt syncing canvas
         */
        that.syncCanvasFrame();

        // that.setConfigSketchpad(config, "constructor to");
        that.setMetaConfig(config, false);
        //that.setSketchConfig(config, false);

        // init connection after setting config because sometimes reply from server is faster than timeout 0
        that.ws.addEventListener("message", function (e) {
            that.receiveMessageFromServer(e);
        }, true);

        if (that.ws.readyState === 1) {
            // alert("readyState");
            initConnection();
        } else {
            that.ws.addEventListener("open", initConnection, true);
        }

    // sketchpad.initialised = true;


        // alert("Init connection");
        that.initialised = true;

        if (that.config.createPageConfig) {
            var sketch = that.room.addSketch(that, that.config.createPageConfig);
            that.room.setActiveSketch(that, sketch);
        }
        that.dispatch("initialised", this);
    }, 0);

    return this;

}

Sketchpad.prototype = Object.create(Eventsmanager.prototype);

Object.assign(Sketchpad.prototype, {
    addSketchPage: function addSketchPage(config, onAdded) {
        "use strict";
        var that = this;
        config = Object.assign({
            sid: "asp" + Math.random() + "h" + (config && config.backgroundPdf && config.backgroundPdf.fingerprint)
        }, config);
        this.sendMessageToServer({
            cmd: "page",
            config: config
        }, false, function onError() {//offline mode
            var sketch = that.room.addSketch(that, config, "no_autoselect");
            that.room.setActiveSketch(that, sketch);
        });
        function onSketchAdded(sketch) {
            // console.log("onSketchAdded", sketch);
            if (config.sid === sketch.getId()) {
                // console.log("CATCHED PAGE CREATION", config, sketch);
                that.removeListener("sketch-added", onSketchAdded);
                if (typeof onAdded === "function") {
                    onAdded(sketch, config);
                }
            }
        }
        this.on("sketch-added", onSketchAdded);
    },
    getToolsConfigs: function getToolsConfigs() {
        "use strict";
        var toolsConfigs = {},
            toolConfig;
        var that = this;
        Object.keys(this.tools).forEach(function (toolId) {
            var tool = that.tools[toolId];
            toolConfig = tool.getToolConfig();
            toolsConfigs[toolConfig.toolId] = toolConfig;
        });
        return toolsConfigs;
    },

    setToolsConfigs: function setToolsConfigs(toolsConfigs) {
        "use strict";
        // var toolsConfigs = config.toolsConfigs || {};
        var that = this;
        Object.keys(this.tools).forEach(function (toolId) {
            var tool = that.tools[toolId];
            var toolConfig = toolsConfigs[toolId];
            if (tool && toolConfig) {
                // console.log("Tool", toolId, "set cofig", toolConfig);
                tool.setToolConfig(toolConfig);
            }
        });
    },

    setMetaConfig: function setMetaConfig(config, freeze) {
        "use strict";
        console.log("%cSET META CONFIG", "background:green", config, freeze);
        if (this.setMetaConfigFreeze) {
            return false;
        }
        // alert("setMetaConfig");

        if (freeze) {
            this.setMetaConfigFreeze = freeze;
        }

        config = config || {};

        this.config = Object.assign(this.config, config);
        // console.log("THIS CONFIG", this.config);
        this.token = config.token || "#public";
        if (config.password) {
            this.password = config.password || "";
        }

        if (config.toolsConfigs) {
            this.setToolsConfigs(config.toolsConfigs);
        }

        this.syncNetworkDataFrequency = config.syncNetworkDataFrequency || Math.round(1000 / 1);
        this.centerViewport = true;//config.centerViewport || true;


        if (this.config.defaultTool && this.getTool(this.config.defaultTool)) {
            this.setTool(this.config.defaultTool);
        }

        this.displayGrid = this.config.features.displayGrid || false;

        if (this.config.features.displayCrosshair) {
            this.crosshairEl.style.display = "block";
        } else {
            this.crosshairEl.style.display = "none";
        }

        if (this.config.features.displayViewports) {
            this.hudsEl.style.display = "block";
        } else {
            this.hudsEl.style.display = "none";
        }

        this.dispatch("setMetaConfig", config, this.setMetaConfigFreeze);
        // this.planRefreshWindow();

        return this;

    },

    setSketchConfig: function setSketchConfig(config) {
        "use strict";
        // console.log("%csetSketchConfig", "background:blue", config);
        // debugger;
        //position
        config.viewportX = parseFloat(config.viewportX) || 0;
        config.viewportY = parseFloat(config.viewportY) || 0;
        this.setViewportPosition(config.viewportX, config.viewportY);
        //scale
        config.viewportScale = parseFloat(config.viewportScale) || 1;
        this.setScale(config.viewportScale);
        //rotation
        config.viewportZRotation = parseFloat(config.viewportZRotation) || 0;
        this.setRotation(config.viewportZRotation);

        var that = this;
        if (config.backgroundColor) {
            this.backgroundColor = config.backgroundColor;
            this.containerEl.style.backgroundColor = config.backgroundColor;
        } else {
            this.backgroundColor = false;
            this.containerEl.style.backgroundColor = "transparent";
        }

        if (!config.width) {
            config.width = 1024;
        }
        if (!config.height) {
            config.height = 768;
        }

        // var backgroundWidth = config.width || "100%";
        // if (parseInt(backgroundWidth, 10) === parseInt(backgroundWidth, 10)) { // we want type casting!
        //     backgroundWidth += "px";
        // }

        //background iframe

        if (config.backgroundUrl) {
            this.backgroundUrl = config.backgroundUrl;
            this.backgroundIFrame.style.display = "block";
            this.backgroundIFrame.width = config.width;
            this.backgroundIFrame.style.width = config.width + "px";
            this.backgroundIFrame.height = config.height;
            this.backgroundIFrame.style.height = config.height + "px";
            this.backgroundIFrame.src = config.backgroundUrl;
            this.backgroundIFrame.crossOrigin = "anonymous";
        } else {
            this.backgroundIFrame.src = "about:blank";
            this.backgroundUrl = false;
            this.backgroundIFrame.style.display = "none";
        }
        // alert(this.progressParentEl);
        //background image
        if (config.backgroundImage) {
            this.backgroundImage = config.backgroundImage;
            this.background.style.display = "none";
            this.background.onload = function () {
                that.background.style.display = "block";
                console.log("ON LOAD!");
                // alert("onload" + that.background.style.display);
                that.planRefreshWindow(0, "sketchpad.js:setSketchConfig:background.onload");
                that.backgroundImageProgressbar.uploadComplete();
                // that.backgroundImageProgressbar.uploadComplete();
            };
            this.background.onerror = function () {
                that.backgroundImageProgressbar.cancel();
            };

            // this.background.addEventListener("progress", function (e) {
            //     console.log("Image progress", e);
            // });
            // this.background.addEventListener("load", function (e) {
            //     console.log("load", e);
            // });
            // this.background.addEventListener("loadend", function (e) {
            //     console.log("loadend", e);
            // });
            // this.background.addEventListener("cancel", function (e) {
            //     console.log("cancel", e);
            // });
            // alert("backgroundImage:" + config.backgroundImage);
            if (this.backgroundImageProgressbar && !this.backgroundImageProgressbar.completed) {
                this.backgroundImageProgressbar.cancel();//
            }
            this.background.onerror = function () {
                that.backgroundImageProgressbar.cancel();
            };
            this.backgroundImageProgressbar = new Progressbar({
                progressParentEl: this.progressParentEl
            });
            this.backgroundImageProgressbar.startFakeProgress();
            this.background.src = config.backgroundImage.toString();
            this.background.crossOrigin = "anonymous";
        } else {
            this.background.src = "";
            this.backgroundImage = false;
            this.background.style.display = "none";
            // alert("not set" + this.background.style.display);
        }

        //foreground image
        if (config.foregroundImage) {
            this.foregroundImage = config.foregroundImage;
            this.foreground.style.display = "none";
            this.foreground.onload = function () {
                that.foreground.style.display = "block";
                that.planRefreshWindow(0, "sketchpad.js:setSketchConfig:foreground.onload");
                that.foregroundImageProgressbar.uploadComplete();
            };
            this.foreground.onerror = function () {
                that.foregroundImageProgressbar.cancel();
            };

            // alert("foregroundImage");
            if (this.foregroundImageProgressbar && !this.foregroundImageProgressbar.completed) {
                this.foregroundImageProgressbar.cancel();
            }
            this.foregroundImageProgressbar = new Progressbar({
                progressParentEl: this.progressParentEl
            });
            this.foregroundImageProgressbar.startFakeProgress();
            this.foreground.src = config.foregroundImage.toString();
            this.foreground.crossOrigin = "anonymous";
        } else {
            this.foreground.src = "";
            this.foregroundImage = false;
            this.foreground.style.display = "none";
        }

        this.planRefreshWindow(0, "sketchpad.js:setSketchConfig");
        this.dispatch("setPageConfig", config);
        return this;
    },


    getRoomConfig: function getRoomConfig() {
        "use strict";
        var config = {};
        //board
        config.token = this.token;
        config.password = this.password;

        config.currentSketchSid = (this.room.sketch && this.room.sketch.getId()) || "getRoomConfig-empty-sketch";
        // config.defaultPageConfig = this.config.defaultPageConfig;
        config.toolsConfigs = this.getToolsConfigs();
        config.defaultTool = this.tool;
        config.toolbar = this.config.toolbar;
        // config.currentPageNo = "";
        // config.displayToolbar = this.config.displayToolbar;
        // config.displayViewports = this.config.displayViewports;
        // config.displayCrosshair = this.config.displayCrosshair;
        config.features = this.config.features;
        // config.startPosition = this.config.startPosition; //???

        return config;
    },

    getSketchConfig: function getSketchConfig() {
        "use strict";
        var config = {};
        // config.sid = "hahaha";
        /**
         * Position
         */
        config.viewportX = parseFloat(this.viewportX) || 0;
        config.viewportY = parseFloat(this.viewportY) || 0;
        config.viewportScale = parseFloat(this.scale) || 1; //this.getScale();
        config.viewportZRotation = parseFloat(this.rotation) || 0; //this.getRotation();

        // var backgroundWidth = config.width || "100%";

        // if (parseInt(backgroundWidth, 10) === parseInt(backgroundWidth, 10)) { // we want type casting!
        //     backgroundWidth += "px";
        // }

        /////////////////// extra config ////////////////////
        if (this.config.backgroundType) {
            config.backgroundType = this.config.backgroundType;
        }
        if (this.config.backgroundColorR) {
            config.backgroundColorR = this.config.backgroundColorR;
        }
        if (this.config.backgroundColorG) {
            config.backgroundColorG = this.config.backgroundColorG;
        }
        if (this.config.backgroundColorB) {
            config.backgroundColorB = this.config.backgroundColorB;
        }
        if (this.config.backgroundColorR) {
            config.backgroundColorA = this.config.backgroundColorA;
        }

        if (this.config.backgroundMapsLocation) {
            config.backgroundMapsLocation = this.config.backgroundMapsLocation;
        }

        if (this.config.backgroundPdf) {
            config.backgroundPdf = this.config.backgroundPdf;
        }

        if (this.config.backgroundMapsType) {
            config.backgroundMapsType = this.config.backgroundMapsType;
        }
        if (this.config.backgroundMapsZoom) {
            config.backgroundMapsZoom = this.config.backgroundMapsZoom;
        }
        //////////////////

        // background
        if (this.backgroundColor) {
            config.backgroundColor = this.backgroundColor;
        }
        if (this.backgroundImage) {
            config.backgroundImage = this.backgroundImage;
        }
        if (this.backgroundUrl) {
            config.backgroundUrl = this.backgroundUrl;
        }
        //foreground
        if (this.foregroundImage) {
            config.foregroundImage = this.foregroundImage;
        }

        return config;
    },

    saveSketchpad: function saveSketchpad(savePassword) {
        "use strict";
        var output = [];
        var roomConfig = this.getRoomConfig();

        if (!savePassword) {
            roomConfig.password = "";
        }

        output.push({
            hello: "Visit site www.sketchpad.pro to open this file.",
            site: "http://sketchpad.pro",
            description: "Sketchpad room file",
            cmd: "meta",
            config: roomConfig
        });
        var i;
        for (i = 0; i < this.room.sketches.length; i += 1) {
            output.push(this.room.sketches[i].getPageConfig(this));
            output = output.concat(this.room.sketches[i].getFrames());
        }
        return output;
    },

    /**
     * Returns color from canvas
     * @param  {number} x - screen x
     * @param  {number} y - screen y
     * @return {object}   - ex. {r:0, g:0, b:0, a:0}
     */
    colorPicker: function colorPicker(x, y) {
        "use strict";

        var outputCanvas = document.createElement("canvas");
        outputCanvas.width = 1;
        outputCanvas.height = 1;

        var context2D = outputCanvas.getContext("2d");
        if (this.backgroundColor) {
            context2D.fillStyle = this.backgroundColor;
            context2D.fillRect(0, 0, outputCanvas.width, outputCanvas.height);
        }
        context2D.translate(-this.width / 2 - x, -this.height / 2 - y);
        if (this.background && this.background.width) {
            context2D.save();
            context2D.translate(this.width / 2, this.height / 2);
            context2D.rotate(this.rotation * Math.PI / 180);
            context2D.scale(this.scale, this.scale);
            context2D.translate(-this.viewportX, -this.viewportY);
            context2D.drawImage(this.background, -this.background.width / 2, -this.background.height / 2);
            context2D.restore();
        }
        context2D.drawImage(this.canvasB, 0, 0);
        context2D.drawImage(this.canvas, 0, 0);
        if (this.foreground && this.foreground.width) {
            context2D.save();
            context2D.translate(this.width / 2, this.height / 2);
            context2D.rotate(this.rotation * Math.PI / 180);
            context2D.scale(this.scale, this.scale);
            context2D.translate(-this.viewportX, -this.viewportY);
            context2D.drawImage(this.foreground, -this.foreground.width / 2, -this.foreground.height / 2);
            context2D.restore();
        }
        if (this.watermark) {
            context2D.drawImage(this.watermark, this.width - this.watermark.width, this.height - this.watermark.height);
        }

        var pixel = context2D.getImageData(0, 0, 1, 1).data;
        var color = {
            r: pixel[0],
            g: pixel[1],
            b: pixel[2],
            a: pixel[3] / 255
        };
        return color;
    },

    /**
     * SAVE IMAGE EXPORT IMAGE SAVE PHOTO
     */
    renderOutputCanvas: function renderOutputCanvas(defaultBackgroundColor) {
        "use strict";
        var outputCanvas = document.createElement("canvas");
        var x = this.viewportX,
            y = this.viewportY,
            width = this.width,
            height = this.height,
            rotation = this.rotation,
            scale = this.scale;
        outputCanvas.width = width;
        outputCanvas.height = height;
        var context2D = outputCanvas.getContext("2d");
        if (defaultBackgroundColor) {
            if (!this.backgroundColor || this.backgroundColor === "transparent") {
                this.backgroundColor = defaultBackgroundColor;
            }
        }
        if (this.backgroundColor) {
            context2D.fillStyle = this.backgroundColor;
            context2D.fillRect(0, 0, outputCanvas.width, outputCanvas.height);
        }
        if (this.backgroundCanvas) {
            context2D.drawImage(this.backgroundCanvas, 0, 0);
        }
        if (this.background && this.background.width) {
            context2D.save();
            context2D.translate(width / 2, height / 2);
            context2D.rotate(rotation * Math.PI / 180);
            context2D.scale(scale, scale);
            context2D.translate(-x, -y);
            context2D.drawImage(this.background, -this.background.width / 2, -this.background.height / 2);
            context2D.restore();
        }
        context2D.drawImage(this.canvasB, 0, 0);
        context2D.drawImage(this.canvas, 0, 0);
        if (this.foreground && this.foreground.width) {
            context2D.save();
            context2D.translate(width / 2, height / 2);
            context2D.rotate(rotation * Math.PI / 180);
            context2D.scale(scale, scale);
            context2D.translate(-x, -y);
            context2D.drawImage(this.foreground, -this.foreground.width / 2, -this.foreground.height / 2);
            context2D.restore();
        }
        if (this.watermark) {
            context2D.drawImage(this.watermark, width - this.watermark.width, height - this.watermark.height);
        }

        return outputCanvas;
    },
    screenshot: function screenshot(callback, mimeType, qualityArgument) {
        "use strict";
        var outputCanvas = this.renderOutputCanvas();
        return outputCanvas.toBlob(callback, mimeType, qualityArgument);
    },
    toDataURL: function toDataURL(type, encoderOptions) {
        "use strict";
        var defaultBackgroundColor = false;
        if (encoderOptions === "image/jpeg") {
            defaultBackgroundColor = "white";
        }
        var outputCanvas = this.renderOutputCanvas(defaultBackgroundColor);
        return outputCanvas.toDataURL(type, encoderOptions);
    },

    /**
     * Draws 100px grid on background.
     *
     * @param  {object} config - ``{size: 1000, step: 100, substep: 10}``
     */
    showGrid: function drawGrid(config) {
        "use strict";
        var context = this.contextProjector2D;
        if (!context) {//sentry
            return false;
        }
        var that = this;
        this.displayGrid = true;
        //config is not required
        config = config || {};
        // var size = config.size || 1000;
        var step = config.step || 100;
        var substep = config.substep || 10;
        var alpha = 0.2;
        var subAlpha = 0.1;

        context.save();
        function line(x1, y1, x2, y2, color) {
            context.beginPath();
            context.strokeStyle = color;
            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
            context.stroke();
        }
        function lineH(y, color) {
            line(0, y, that.width, y, color);
        }
        function lineV(x, color) {
            line(x, 0, x, that.height, color);
        }

        lineH(this.height / 2, "rgba(0,0,0,0.1)");
        lineV(this.width / 2, "rgba(0,0,0,0.1)");

        var x, y;
        for (x = this.width / 2; x <= this.width; x += step) {
            lineV(x, "rgba(255,0,0," + alpha + ")");
        }
        for (x = this.width / 2; x > 0; x -= step) {
            lineV(x, "rgba(255,0,0," + alpha + ")");
        }
        for (x = this.width / 2; x <= this.width; x += substep) {
            lineV(x, "rgba(255,0,0," + subAlpha + ")");
        }
        for (x = this.width / 2; x > 0; x -= substep) {
            lineV(x, "rgba(255,0,0," + subAlpha + ")");
        }
        for (y = this.height / 2; y <= this.height; y += step) {
            lineH(y, "rgba(255,0,0," + alpha + ")");
        }
        for (y = this.height / 2; y > 0; y -= step) {
            lineH(y, "rgba(255,0,0," + alpha + ")");
        }
        for (y = this.height / 2; y <= this.height; y += substep) {
            lineH(y, "rgba(255,0,0," + subAlpha + ")");
        }
        for (y = this.height / 2; y > 0; y -= substep) {
            lineH(y, "rgba(255,0,0," + subAlpha + ")");
        }
        context.restore();
    },
    hideGrid: function hideGrid() {
        "use strict";
        this.displayGrid = false;
        this.contextProjector2D.clearRect(0, 0, this.width, this.height);
    },

    clearSketchpad: function clearSketchpad() {
        "use strict";
        this.windowWidth = this.containerEl.clientWidth;
        this.windowHeight = this.containerEl.clientHeight;

        this.backgroundCanvas.width = this.windowWidth;
        this.backgroundCanvas.height = this.windowHeight;

        this.canvas.width = this.windowWidth;
        this.canvas.height = this.windowHeight;

        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.canvasB.width = this.windowWidth;
        this.canvasB.height = this.windowHeight;

        this.canvasProjector.width = this.windowWidth;
        this.canvasProjector.height = this.windowHeight;

        this.context2D = this.canvas.getContext("2d");
        this.contextB2D = this.canvasB.getContext("2d");
        this.contextProjector2D = this.canvasProjector.getContext("2d");
        this.context2D.lineCap = "round";
        this.context2D.lineJoin = "round";
        this.contextB2D.lineCap = "round";
        this.contextProjector2D.lineJoin = "round";
        this.contextProjector2D.lineCap = "round";
        this.contextProjector2D.lineJoin = "round";

        /**
         * Clear and reset canvas
         */
        this.objectsCanva.innerHTML = "";
        this.context2D.setTransform(1, 0, 0, 1, 0, 0);
        this.contextB2D.clearRect(0, 0, this.width, this.height);


        if (this.centerViewport) {
            this.context2D.translate(this.width / 2, this.height / 2);
            this.contextB2D.translate(this.width / 2, this.height / 2);

        }

        var posX,
            posY,
            troX,
            troY;

        if (this.displayGrid) {
            this.showGrid();
        }
        /**
         * move background (iframe)
         */
        if (this.backgroundIFrame) {
            if (this.centerViewport) {
                posX = (this.width / 2) - ((this.backgroundIFrame.width) / 2);
                posY = (this.height / 2) - ((this.backgroundIFrame.height) / 2);
                troX = (this.width / 2);
                troY = (this.height / 2);
                this.backgroundIFrame.style.transformOrigin = troX + "px " + troY + "px";
                this.backgroundIFrame.style.webkitTransformOrigin = troX + "px " + troY + "px";
                this.backgroundIFrame.style.MozTransformOrigin = troX + "px " + troY + "px";
                this.backgroundIFrame.style.msTransformOrigin = troX + "px " + troY + "px";
                this.backgroundIFrame.style.OTransformOrigin = troX + "px " + troY + "px";

                this.backgroundIFrame.style.transform = "scale(" + (1 * this.scale) + ") rotate(" + (1 * this.rotation) + "deg) translate(" + -1 * this.viewportX + "px, " + -1 * this.viewportY + "px) translate(" + posX + "px, " + posY + "px)";
                this.backgroundIFrame.style.webkitTransform = "scale(" + (1 * this.scale) + ") rotate(" + (1 * this.rotation) + "deg) translate(" + -1 * this.viewportX + "px, " + -1 * this.viewportY + "px) translate(" + posX + "px, " + posY + "px)";
                this.backgroundIFrame.style.MozTransform = "scale(" + (1 * this.scale) + ") rotate(" + (1 * this.rotation) + "deg) translate(" + -1 * this.viewportX + "px, " + -1 * this.viewportY + "px) translate(" + posX + "px, " + posY + "px)";
                this.backgroundIFrame.style.msTransform = "scale(" + (1 * this.scale) + ") rotate(" + (1 * this.rotation) + "deg) translate(" + -1 * this.viewportX + "px, " + -1 * this.viewportY + "px) translate(" + posX + "px, " + posY + "px)";
                this.backgroundIFrame.style.OTransform = "scale(" + (1 * this.scale) + ") rotate(" + (1 * this.rotation) + "deg) translate(" + -1 * this.viewportX + "px, " + -1 * this.viewportY + "px) translate(" + posX + "px, " + posY + "px)";
            } else {
                this.backgroundIFrame.style.transform = "translate(" + (1 * -this.viewportX) + "px, " + (1 * -this.viewportY) + "px) scale(" + (1 * this.scale) + ")";
                this.backgroundIFrame.style.webkitTransform = "translate(" + (1 * -this.viewportX) + "px, " + (1 * -this.viewportY) + "px) scale(" + (1 * this.scale) + ")";
                this.backgroundIFrame.style.MozTransform = "translate(" + (1 * -this.viewportX) + "px, " + (1 * -this.viewportY) + "px) scale(" + (1 * this.scale) + ")";
                this.backgroundIFrame.style.msTransform = "translate(" + (1 * -this.viewportX) + "px, " + (1 * -this.viewportY) + "px) scale(" + (1 * this.scale) + ")";
                this.backgroundIFrame.style.OTransform = "translate(" + (1 * -this.viewportX) + "px, " + (1 * -this.viewportY) + "px) scale(" + (1 * this.scale) + ")";
            }
        }

        /**
         * move background position (image)
         */
        if (this.background) {
            if (this.centerViewport) {
                posX = (this.width / 2) - ((this.background.width) / 2);
                posY = (this.height / 2) - ((this.background.height) / 2);
                troX = (this.width / 2);
                troY = (this.height / 2);
                this.background.style.transformOrigin = troX + "px " + troY + "px";
                this.background.style.webkitTransformOrigin = troX + "px " + troY + "px";
                this.background.style.MozTransformOrigin = troX + "px " + troY + "px";
                this.background.style.msTransformOrigin = troX + "px " + troY + "px";
                this.background.style.OTransformOrigin = troX + "px " + troY + "px";

                this.background.style.transform = "scale(" + (1 * this.scale) + ") rotate(" + (1 * this.rotation) + "deg) translate(" + -1 * this.viewportX + "px, " + -1 * this.viewportY + "px) translate(" + posX + "px, " + posY + "px)";
                this.background.style.webkitTransform = "scale(" + (1 * this.scale) + ") rotate(" + (1 * this.rotation) + "deg) translate(" + -1 * this.viewportX + "px, " + -1 * this.viewportY + "px) translate(" + posX + "px, " + posY + "px)";
                this.background.style.MozTransform = "scale(" + (1 * this.scale) + ") rotate(" + (1 * this.rotation) + "deg) translate(" + -1 * this.viewportX + "px, " + -1 * this.viewportY + "px) translate(" + posX + "px, " + posY + "px)";
                this.background.style.msTransform = "scale(" + (1 * this.scale) + ") rotate(" + (1 * this.rotation) + "deg) translate(" + -1 * this.viewportX + "px, " + -1 * this.viewportY + "px) translate(" + posX + "px, " + posY + "px)";
                this.background.style.OTransform = "scale(" + (1 * this.scale) + ") rotate(" + (1 * this.rotation) + "deg) translate(" + -1 * this.viewportX + "px, " + -1 * this.viewportY + "px) translate(" + posX + "px, " + posY + "px)";
            } else {
                this.background.style.transform = "translate(" + (1 * -this.viewportX) + "px, " + (1 * -this.viewportY) + "px) scale(" + (1 * this.scale) + ")";
                this.background.style.webkitTransform = "translate(" + (1 * -this.viewportX) + "px, " + (1 * -this.viewportY) + "px) scale(" + (1 * this.scale) + ")";
                this.background.style.MozTransform = "translate(" + (1 * -this.viewportX) + "px, " + (1 * -this.viewportY) + "px) scale(" + (1 * this.scale) + ")";
                this.background.style.msTransform = "translate(" + (1 * -this.viewportX) + "px, " + (1 * -this.viewportY) + "px) scale(" + (1 * this.scale) + ")";
                this.background.style.OTransform = "translate(" + (1 * -this.viewportX) + "px, " + (1 * -this.viewportY) + "px) scale(" + (1 * this.scale) + ")";
            }
        }

        /**
         * move foreground (image)
         */
        if (this.foreground) {

            if (this.centerViewport) {
                posX = (this.width / 2) - ((this.foreground.width) / 2);
                posY = (this.height / 2) - ((this.foreground.height) / 2);
                troX = (this.width / 2);
                troY = (this.height / 2);
                this.foreground.style.transformOrigin = troX + "px " + troY + "px";
                this.foreground.style.webkitTransformOrigin = troX + "px " + troY + "px";
                this.foreground.style.MozTransformOrigin = troX + "px " + troY + "px";
                this.foreground.style.msTransformOrigin = troX + "px " + troY + "px";
                this.foreground.style.OTransformOrigin = troX + "px " + troY + "px";

                this.foreground.style.transform = "scale(" + (1 * this.scale) + ") rotate(" + (1 * this.rotation) + "deg) translate(" + -1 * this.viewportX + "px, " + -1 * this.viewportY + "px) translate(" + posX + "px, " + posY + "px)";
                this.foreground.style.webkitTransform = "scale(" + (1 * this.scale) + ") rotate(" + (1 * this.rotation) + "deg) translate(" + -1 * this.viewportX + "px, " + -1 * this.viewportY + "px) translate(" + posX + "px, " + posY + "px)";
                this.foreground.style.MozTransform = "scale(" + (1 * this.scale) + ") rotate(" + (1 * this.rotation) + "deg) translate(" + -1 * this.viewportX + "px, " + -1 * this.viewportY + "px) translate(" + posX + "px, " + posY + "px)";
                this.foreground.style.msTransform = "scale(" + (1 * this.scale) + ") rotate(" + (1 * this.rotation) + "deg) translate(" + -1 * this.viewportX + "px, " + -1 * this.viewportY + "px) translate(" + posX + "px, " + posY + "px)";
                this.foreground.style.OTransform = "scale(" + (1 * this.scale) + ") rotate(" + (1 * this.rotation) + "deg) translate(" + -1 * this.viewportX + "px, " + -1 * this.viewportY + "px) translate(" + posX + "px, " + posY + "px)";
            } else {
                this.foreground.style.transform = "translate(" + (1 * -this.viewportX) + "px, " + (1 * -this.viewportY) + "px) scale(" + (1 * this.scale) + ")";
                this.foreground.style.webkitTransform = "translate(" + (1 * -this.viewportX) + "px, " + (1 * -this.viewportY) + "px) scale(" + (1 * this.scale) + ")";
                this.foreground.style.MozTransform = "translate(" + (1 * -this.viewportX) + "px, " + (1 * -this.viewportY) + "px) scale(" + (1 * this.scale) + ")";
                this.foreground.style.msTransform = "translate(" + (1 * -this.viewportX) + "px, " + (1 * -this.viewportY) + "px) scale(" + (1 * this.scale) + ")";
                this.foreground.style.OTransform = "translate(" + (1 * -this.viewportX) + "px, " + (1 * -this.viewportY) + "px) scale(" + (1 * this.scale) + ")";
            }
        }

        this.hudsEl.style.transformOrigin = (this.width / 2) + "px " + (this.height / 2) + "px";
        this.hudsEl.style.webkitTransformOrigin = (this.width / 2) + "px " + (this.height / 2) + "px";
        this.hudsEl.style.MozTransformOrigin = (this.width / 2) + "px " + (this.height / 2) + "px";
        this.hudsEl.style.msTransformOrigin = (this.width / 2) + "px " + (this.height / 2) + "px";
        this.hudsEl.style.OTransformOrigin = (this.width / 2) + "px " + (this.height / 2) + "px";

        this.hudsEl.style.transform = "scale(" + (1 * this.scale) + ") rotate(" + (1 * this.rotation) + "deg) translate(" + -1 * this.viewportX + "px, " + -1 * this.viewportY + "px)";
        this.hudsEl.style.webkitTransform = "scale(" + (1 * this.scale) + ") rotate(" + (1 * this.rotation) + "deg) translate(" + -1 * this.viewportX + "px, " + -1 * this.viewportY + "px)";
        this.hudsEl.style.MozTransform = "scale(" + (1 * this.scale) + ") rotate(" + (1 * this.rotation) + "deg) translate(" + -1 * this.viewportX + "px, " + -1 * this.viewportY + "px)";
        this.hudsEl.style.msTransform = "scale(" + (1 * this.scale) + ") rotate(" + (1 * this.rotation) + "deg) translate(" + -1 * this.viewportX + "px, " + -1 * this.viewportY + "px)";
        this.hudsEl.style.OTransform = "scale(" + (1 * this.scale) + ") rotate(" + (1 * this.rotation) + "deg) translate(" + -1 * this.viewportX + "px, " + -1 * this.viewportY + "px)";

    },
    refreshWindow: function refreshWindow(ignore) {//sourceTagInfo
        "use strict";
        // console.log("%c!!!!refreshWindow - EXECUTED", "background:red", sourceTagInfo);
        if (!this.initialised) {
            return;
        }
        if (this.receivingHistory) {
            return;
        }
        // if (!(this.room.sketch instanceof Sketch)) {
        //     return;
        // }
        this.sendInputs();
        this.drawInputs();

        var that = this;

        /**
         * RE-DRAW whole sketch.
         * should be really fast!
         */
        var postponeDrawingVersion = String(Date.now());
        var postponeSketch = this.room.sketch;
        this.postponeDrawingVersion = postponeDrawingVersion;
        var postponeChunkLength = 100;
        function postponeDrawing(commands, position) {
            if (postponeDrawingVersion !== that.postponeDrawingVersion) {
                return;
            }
            if (postponeSketch !== that.room.sketch) {
                return;
            }
            var i;
            for (i = position; i < commands.length && i < position + postponeChunkLength; i += 1) {
                that.drawSketchFrame(commands[i].evs, that.room.sketch);
            }
            if (i < commands.length) {
                setTimeout(function () {
                    postponeDrawing(commands, i);
                }, 0);
            }
        }
        if (this.room && (this.room.sketch instanceof Sketch)) {
            if (this.room.sketch.framesHistory.length > 1024 * 1) {
                this.loadingEl.style.display = "flex";
                this.loadingEl.textContent = "...";
            } else {
                this.loadingEl.style.display = "none";
            }
            that.clearSketchpad();
            var commands = that.room.sketch.getCommandsHist();
            postponeDrawing(commands, 0);
            that.loadingEl.style.display = "none";
            that.dispatch("changeViewport");
            that.dispatch("refreshWindow");
        }


    },

    planRefreshWindow: function planRefreshWindow(to, sourceTagInfo) {
        "use strict";
        to = parseInt(to) || 0;
        //console.log("%cplanRefreshWindow", "background:orange", to, sourceTagInfo);
        if (this.planRefreshWindowTo) {
            clearTimeout(this.planRefreshWindowTo);
        }
        var that = this;
        this.planRefreshWindowTo = setTimeout(function () {
            that.refreshWindow(sourceTagInfo);
        }, to);

    },
    setViewportPosition: function setViewportPosition(viewportX, viewportY, holdHuds) {
        "use strict";
        viewportX = parseFloat(viewportX);
        viewportY = parseFloat(viewportY);
        var e = {
            deltaX: viewportX - this.viewportX,
            deltaY: viewportY - this.viewportY
        };

        this.viewportX = viewportX;
        this.viewportY = viewportY;

        /**
         * refresh window
         */
        var that = this;
        this.once("refreshWindow", function () {
            that.dispatch("setViewportPosition", e);
            if (!holdHuds) {
                /**
                 * inform other users about this change
                 */
                that.sendCurrentViewport();
            }
        }, "setViewportPosition:sendCurrentViewport");
        this.planRefreshWindow(0, "sketchpad.js:setViewportPosition");
        return this;
    },

    moveViewportRelative: function moveViewportRelative(x, y) {
        "use strict";
        var theta = -this.rotation;
        var p = {
            x: (x) * (1 / this.scale),
            y: (y) * (1 / this.scale)
        };

        theta = (Math.PI * 2) * (theta / 360);
        p = {
            x: Math.cos(theta) * (p.x) - Math.sin(theta) * (p.y),
            y: Math.sin(theta) * (p.x) + Math.cos(theta) * (p.y)
        };

        this.setViewportPosition(this.viewportX - p.x, this.viewportY - p.y);
        return this;
    },

    /**
     * sets the scale (scale) of sketchpad
     * @param {float} z - precentage of scale (.5 for 50% etc.)
     */
    setScale: function setScale(z) {
        "use strict";
        z = parseFloat(z);
        if (!z) {
            z = 1;
        }
        this.scale = z;
        // window.sessionStorage.setItem("scale", this.scale);
        this.setViewportPosition(this.viewportX, this.viewportY);
        return this;
    },

    /**
     * sets the scale (scale) of sketchpad
     * @param {float} z - precentage of scale (.5 for 50% etc.)
     */
    setRotation: function setRotation(o) {
        "use strict";
        o = o % 360;
        if (o < 0) {
            o += 360;
        }
        this.rotation = o;
        // window.sessionStorage.setItem("rotation", this.rotation);
        this.setViewportPosition(this.viewportX, this.viewportY);
        this.dispatch("setRotation", {
            o: o
        });
        return this;
    },


    /**
     * Register tool in sketchpad
     * before use.
     *
     * @param  {string} toolId            - unique id for tool
     * @param  {Tool} ToolClass           - child class of Tool
     */
    registerTool: function registerTool(toolId, ToolClass, config) {
        "use strict";
        // fix empty object
        if (typeof config !== "object") {
            config = {};
        }
        config.toolId = toolId;
        config.sketchpad = this;
        var tool = new ToolClass(config);
        // save tool on sketchpad list
        this.tools[tool.toolId] = tool;
        var that = this;
        function onChangeToolConfig() {
            if (this === that.getCurrentTool() && that.user && that.user.user_id) {
                that.projectPointer(that.pointerX, that.pointerY);
            }
        }
        tool.on("changeParams", onChangeToolConfig);
        /**
         * Run register tool callback
         */
        if (this.config && this.config.registerToolCb) {
            if (typeof this.config.registerToolCb === "function") {
                this.config.registerToolCb(tool);
            }
        }
    },

    /**
     * [getLastTool description]
     * @return {Tool} [description]
     */
    getCurrentTool: function getCurrentTool() {
        "use strict";
        return this.getTool(this.tool);
    },
    /**
     * [getCurrentToolId description]
     * @return {Any} [description]
     */
    getCurrentToolId: function getCurrentToolId() {
        "use strict";
        return this.tool;
    },

    /**
     * Returns registered tool by id.
     *
     * @param  {string} id - id of registered tool
     */
    getTool: function getTool(id) {
        "use strict";
        if (!id) {
            return this.getCurrentTool();
        }
        return this.tools[id];
    },


    /**
     * [drawSketchNewFrames description]
     * @private
     */
    drawSketchNewFrames: function drawSketchNewFrames() {
        "use strict";
        if (!(this.room.sketch instanceof Sketch)) {
            return;
        }

        if (this.room) {
            var i,
                commands = this.room.sketch.getCommandsCurrent();
            for (i = 0; i < commands.length; i += 1) {
                // console.log("dsf", commands[i].evs);
                this.drawSketchFrame(commands[i].evs, this.room.sketch);
            }
        }
    },

    /**
     * reset sketchpad
     * @return {undefined} [description]
     */
    reset: function reset(remote) {
        "use strict";
        this.room.reset();
        if (!remote) {
            var message = {
                cmd: "reset",
                ts: new Date().getTime()
            };
            this.sendMessageToServer(message);
        }
        this.dispatch("reset");
        this.planRefreshWindow(0, "sketchpad.js:reset");
    },

    /**
     * [canDraw description]
     * @return {boolean} [description]
     */
    canDraw: function canDraw() {
        "use strict";
        return !this.readOnly;
    },

    /**
     * [clearCanvas description]
     * @return {undefined} [description]
     */
    clearCanvas: function clearCanvas() {
        "use strict";
        this.inputs = {};
        this.context2D.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.contextB2D.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    /**
     * [setTool description]
     * @param {Any} tool [description]
     */
    setTool: function setTool(tool, extra) {
        "use strict";
        if (!this.getTool(tool)) {
            return;
        }
        var hasChanged = (this.tool !== tool);
        var lastToolId = this.tool;
        this.tool = tool;
        this.dispatch("setTool", {
            hasChanged: hasChanged,
            lastToolId: lastToolId,
            tool: this.getTool(tool),
            extra: extra
        });
        return this;
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
        if (this.drawingPaused) {
            this.pausedQueue.push({
                config: config,
                points: points
            });
            return;
        }
        if (points.x.length > 0) {
            var tool = this.getTool(config.tol);
            if (tool) {
                // draw using tool defined in config of part of one finger movement
                tool.drawFramePath(config, points);
            } else {
                console.warn("sketchpad.js", "Unknown tool", config);
            }
        }
    },

    /**
     * Draw one time frame with parts of multiple paths
     * (ex. parts of many fingers movement)
     *
     * @param  {array} draw             - array of paths with frames
     */
    drawFrame: function drawFrame(draw) {
        "use strict";
        //console.log("drawBatch", draw);
        var i;
        for (i = 0; i < draw.length; i += 1) {
            this.drawFramePath(draw[i], draw[i].pts);
        }
    },

    pauseDrawing: function pauseDrawing() {
        "use strict";
        this.drawingPaused = true;
    },
    resumeDrawing: function pauseDrawing() {
        "use strict";
        var i;
        this.drawingPaused = false;
        var pausedQueue = this.pausedQueue;
        this.pausedQueue = [];
        for (i = 0; i < pausedQueue.length; i += 1) {
            this.drawFramePath(pausedQueue[i].config, pausedQueue[i].points);
        }
    },
    /**
     *
     * DRAWING INPUTS
     *
     * Grind new inputs into draw frames
     * and render it on screen
     *
     * ! Must be run before room sketch change !
     *
     */
    drawInputs: function drawInputs() {
        "use strict";
        var inputFragmentList = [],
            input, // helper var in input loop
            // mark,
            inputFragmentData,
            inputFragment;

        var that = this;
        Object.keys(this.inputs).forEach(function (i) {
            input = that.inputs[i];
            if (input) {
                inputFragmentData = input.getPointsToDraw();
                if (inputFragmentData) {
                    inputFragment = {};
                    inputFragment.tol = input.tool;
                    inputFragment.cnf = input.getConfig();
                    inputFragment.vpx = input.viewportX; // tofix: can be missmatch between this what was drawen and this what was send, input must contain info about viewport
                    inputFragment.vpy = input.viewportY;
                    inputFragment.scl = input.scale;
                    inputFragment.rot = input.rotation;
                    inputFragment.wdh = input.width;
                    inputFragment.hgt = input.height;
                    inputFragment.pts = inputFragmentData;
                    inputFragment.uid = input.UID;
                    //inputFragment.sid = not required - user allways is drawing on current sketch
                    inputFragmentList.push(inputFragment);
                }
            }
        });

        // draw current frame of inputs
        if (inputFragmentList.length > 0) {
            this.drawFrame(inputFragmentList);
        }

    },

    /**
     * Draw using sketch many time frames
     *
     * @param  {array} draw             - array of paths with frames
     * @param  {Sketch} sketch          - sketch with cached tools
     */
    drawSketchFrame: function drawSketchFrame(draw, sketch) {
        "use strict";
        var i,
            pathFrameConfig;
        for (i = 0; i < draw.length; i += 1) {
            // pathFrame = cached config by ``draw[i].id``
            if (draw[i].cid !== undefined) {
                pathFrameConfig = sketch.getCachedFrame(draw[i].cid);
            }
            // pathFrameConfig.txt = draw[i].txt;
            // draw draw[i].pts - points of movement (at least 2 points)
            this.drawFramePath(pathFrameConfig, draw[i].pts);
        }
    },

    /**
     * Start of one input
     * "many inputs can exists in one time"
     * uses toolId = this.getTool(this.getCurrentToolId())
     *
     * @param  {Event} e                - input event (eg. TouchEvent)
     * @param  {any} id                 - unique identifier in current time
     * @param  {integer} x              - x position in viewport
     * @param  {integer} y              - y position in viewport
     */
    startPath: function startPath(e, id, x, y) {
        "use strict";
        // if (!this.canDraw()) {
        //     return false;
        // }

        if (this.inputs[id]) {
            //inputs are distinct in moment
            return false;
        }

        var toolId = this.getCurrentToolId(),
            tool = this.getTool(toolId);
        var input = tool.startInput(id, x, y, e);
        this.inputs[id] = input;
        this.dispatch("startPath", input);
    },

    /**
     * Movement of one input
     *
     * @param  {Event} e                - input event (eg. TouchEvent)
     * @param  {Any} id                 - unique identifier in current time (must be initialised by startPath)
     * @param  {integer} x              - x position in viewport
     * @param  {integer} y              - y position in viewport
     */
    drawPath: function drawPath(e, id, x, y) {
        "use strict";
        // if (!this.canDraw()) {
        //     return false;
        // }

        if (!this.inputs[id]) {
            //input must be initialized by startPath
            return false;
        }
        var tool = this.getTool(this.inputs[id].tool);
        tool.moveInput(this.inputs[id], x, y, e);
    },

    /**
     * End of one input
     *
     * @param  {Event} e                - input event (eg. TouchEvent)
     * @param  {Any} id                 - unique identifier in current time (must be initialised by startPath)
     * @param  {integer} x              - x position in viewport
     * @param  {integer} y              - y position in viewport
     */
    endPath: function endPath(e, id, x, y) {
        "use strict";
        // if (!this.canDraw()) {
        //     return false;
        // }

        if (!this.inputs[id]) {
            //input must exists
            return false;
        }

        var tool = this.getTool(this.inputs[id].tool);

        tool.finishInput(this.inputs[id], x, y, e);

        //clear stack before delete
        this.sendInputs();
        this.drawInputs();

        //remove non exists inputs
        delete this.inputs[id];

    },

    /**
     * Heartbeat of drawing engine
     *
     * Draws new inputs (phisical Input and waiting Input in current sketch)
     */
    syncCanvasFrame: function syncCanvasFrame() {
        "use strict";
        // screen size change
        var that = this;
        if (
            (this.windowWidth !== this.containerEl.clientWidth) || (this.windowHeight !== this.containerEl.clientHeight)
        ) {
            this.windowWidth = this.containerEl.clientWidth;
            this.windowHeight = this.containerEl.clientHeight;
            this.once("refreshWindow", function () {
                that.sendCurrentViewport();
            }, "syncCanvasFrame:sendCurrentViewport:(resize)");

            this.planRefreshWindow(1000, "room.js:syncCanvasFrame:(resize)");
        }
        if (this.receivingHistory) {
            this.loadingEl.textContent = this.receivingHistoryInputsLoaded + "/" + this.receivingHistoryInputsTotal;
        }

        window.requestAnimationFrame(function syncCanvasFrameSetTimeout() {
            that.syncCanvasFrame();
        });
        this.drawSketchNewFrames();
        this.drawInputs();
    },

    /**
     * Calculates/fixes position of direct input methods (TouchEvent, MouseEvent...)
     *
     * @param  {integer} x                  - x position in direct input viewport
     * @param  {integer} y                  - y position in direct input viewport
     * @return {object}                     - obect witch coordinates {x: corrx, y: corry}
     */
    mainPos: function mainPos(x, y) {
        "use strict";
        var pos = calculateOffsetXY(this.containerEl, x, y);

        if (this.centerViewport) {
            pos.x = pos.x - this.width / 2;
            pos.y = pos.y - this.height / 2;
        }
        return pos;
    },

    projectPointer: function projectPointer(x, y) {
        "use strict";
        var tool = this.getTool();
        var cursorStyle = tool.getCursor();
        var pointerEl = this.pointerEl;
        this.pointerEl.style.display = "block";
        //special styles
        if (cursorStyle && cursorStyle.pointer) {
            this.containerEl.style.cursor = cursorStyle.pointer;
        }
        this.containerEl.style.cursor = cursorStyle.pointer;
        Object.assign(pointerEl.style, cursorStyle);
        pointerEl.style.position = "absolute";
        pointerEl.style.left = x + "px";
        pointerEl.style.top = y + "px";
    },

    pointerMove: function pointerMove(x, y) {
        "use strict";
        this.pointerX = parseInt(x + this.width / 2, 10);
        this.pointerY = parseInt(y + this.height / 2, 10);
        this.projectPointer(this.pointerX, this.pointerY);
    },
    /**
     * Add event listeners to draw area
     *
     */
    createEventsDraw: function createEventsDraw() {
        "use strict";
        var drawObj = this.containerEl,
            that = this;

        /**
         * Mouse support
         */
        drawObj.addEventListener("mousedown", function mousedown(e) {
            if (that.inputEventsDisabled) {
                return false;
            }
            e.preventDefault();
            // if (!that.canDraw()) return false;
            that.mouseLB = true;
            var p = that.mainPos(e.clientX, e.clientY);
            that.startPath(e, 0, p.x, p.y);

        }, false);

        drawObj.addEventListener("mousemove", function mousemove(e) {
            if (that.inputEventsDisabled) {
                return false;
            }
            var p = that.mainPos(e.clientX, e.clientY);
            that.pointerMove(p.x, p.y);
            e.preventDefault();
            if (that.mouseLB) {
                that.drawPath(e, 0, p.x, p.y);
            }
        }, false);


        drawObj.addEventListener("mouseup", function mouseup(e) {
            if (that.inputEventsDisabled) {
                return false;
            }
            e.preventDefault();
            that.mouseLB = false;
            var p = that.mainPos(e.clientX, e.clientY);
            that.endPath(e, 0, p.x, p.y);
        }, false);


        drawObj.addEventListener("mouseleave", function mouseleave(e) {
            if (that.inputEventsDisabled || !that.mouseLB) {
                return false;
            }
            e.preventDefault();
            that.mouseLB = false;
            var p = that.mainPos(e.clientX, e.clientY);
            that.endPath(e, 0, p.x, p.y);
        }, false);

        drawObj.addEventListener("contextmenu", function contextmenu(e) {
            if (that.inputEventsDisabled || !that.mouseLB) {
                return false;
            }
            that.mouseLB = false;
            var p = that.mainPos(e.clientX, e.clientY);
            that.endPath(e, 0, p.x, p.y);
        }, false);

        /**
         * Touch support
         */
        drawObj.addEventListener("touchstart", function touchstart(e) {
            if (that.inputEventsDisabled) {
                return false;
            }
            // this.touched = true;
            e.preventDefault();
            var i,
                p;
            for (i = 0; i < e.changedTouches.length; i += 1) {
                p = that.mainPos(e.changedTouches[i].clientX, e.changedTouches[i].clientY);
                //make sure that other events are beyond mouse inputs (<10)
                that.startPath(e, e.changedTouches[i].identifier + 10, p.x, p.y);
            }

        }, false);

        drawObj.addEventListener("touchmove", function touchmove(e) {
            if (that.inputEventsDisabled) {
                return false;
            }
            e.preventDefault();
            var i,
                p;
            for (i = 0; i < e.changedTouches.length; i += 1) {
                p = that.mainPos(e.changedTouches[i].clientX, e.changedTouches[i].clientY);
                //make sure that other events are beyond mouse inputs (<10)
                that.drawPath(e, e.changedTouches[i].identifier + 10, p.x, p.y);
            }

        }, false);

        drawObj.addEventListener("touchend", function touchend(e) {
            if (that.inputEventsDisabled) {
                return false;
            }
            e.preventDefault();
            var i,
                p;
            for (i = 0; i < e.changedTouches.length; i += 1) {
                p = that.mainPos(e.changedTouches[i].clientX, e.changedTouches[i].clientY);
                //make sure that other events are beyond mouse inputs (<10)
                that.endPath(e, e.changedTouches[i].identifier + 10, p.x, p.y);
            }

        }, false);

        // drawObj.addEventListener("touchcancel", function touchend(e) {
        //     if (that.inputEventsDisabled) {
        //         return false;
        //     }
        //     e.preventDefault();
        //     var i,
        //         p;
        //     for (i = 0; i < e.changedTouches.length; i += 1) {
        //         p = that.mainPos(e.changedTouches[i].clientX, e.changedTouches[i].clientY);
        //         //make sure that other events are beyond mouse inputs (<10)
        //         that.endPath(e, e.changedTouches[i].identifier + 10, p.x, p.y);
        //     }

        // }, false);

    },

    disableInputEvents: function disableInputEvents() {
        "use strict";
        this.inputEventsDisabled = true;
    },
    enableInputEvents: function enableInputEvents() {
        "use strict";
        this.inputEventsDisabled = false;
    },
    /**
     * Connection to server has been established
     *
     * @param  {Event} e                - openConnection event
     * @param  {string} token           - room token to join
     */
    openConnection: function openConnection(ignore, token) {
        "use strict";
        console.info("sketchpad.js", "[info] openConnection", token);
        // this.room = new Room(token, this);
    },

    /**
     * Returns current viewport
     */
    getCurrentViewport: function getCurrentViewport() {
        "use strict";
        return {
            sid: (this.room.sketch && this.room.sketch.getId()) || "getCurrentViewport-init",
            x: this.viewportX,
            y: this.viewportY,
            width: this.width,
            height: this.height,
            scale: this.scale,
            rotation: this.rotation,
            away: this.away
        };
    },

    /**
     * Sends current status of this client viewport
     */
    sendCurrentViewport: function sendCurrentViewport() {
        "use strict";
        if (!(this.room.sketch instanceof Sketch)) {
            return;
        }
        // debugger;

        var obj = {
            cmd: "update-viewport",
            user: {
                user_id: (this.user && this.user.user_id) || this.UID,
                color: this.COLOR,
                viewport: this.getCurrentViewport()
            }
        };
        this.sendMessageToServer(obj);

        //self update
        // console.log("selfupdate, obj", obj);
        this.room.updateClient(obj.user);
        this.dispatch("updateClient", obj.user);

    },


    undo: function undo() {
        "use strict";
        this.room.sketch.undo(this);
    },

    redo: function redo() {
        "use strict";
        this.room.sketch.redo(this);
    },


    /**
     * Convert object into JSON and send it to server
     *
     * @param  {object}
     * @return {undefined}
     */
    sendStringToServer: function sendStringToServer(str, onSuccess, onError) {
        "use strict";
        if (this.ws.readyState === 1) {
            try {
                this.ws.send(str);
                if (typeof onSuccess === "function") {
                    onSuccess();
                }
            } catch (e) {
                console.error("Error sending ws message", e, str);
                if (typeof onError === "function") {
                    onError(e);
                }
            }
        } else {
            if (typeof onError === "function") {
                onError("offline");
            }
            return "ignore";
            // console.log("WebSocket is not OPEN, ignore message", obj);
        }
    },
    /**
     * Convert object into JSON and send it to server
     *
     * @param  {object}
     * @return {undefined}
     */
    sendMessageToServer: function sendMessageToServer(obj, onSuccess, onError) {
        "use strict";
        var msg = JSON.stringify(obj);
        return this.sendStringToServer(msg, onSuccess, onError);
    },


    executeInputCommand: function executeInputCommand(obj) {
        "use strict";
        var sketch, receivingHistoryTmp;//=this.room.sketch

        // console.warn("Response:", obj);
        switch (obj.cmd) {
        case "ping":
            // console.log("[Pong] reply on ping request:", obj);
            this.sendMessageToServer({
                cmd: "pong",
                requestNo: obj.no,
                requestTs: obj.ts
            });
            break;
        case "goto":
            if (obj.position) {
                if (obj.position.pageNo) {
                    sketch = this.room.getSketchByNo(obj.position.pageNo);
                    if (sketch) {
                        this.room.setActiveSketch(this, sketch);
                    }
                }
                if (obj.position.x !== undefined && obj.position.y !== undefined) {
                    this.setViewportPosition(obj.position.x, obj.position.y);
                }
                if (obj.position.scale) {
                    this.setScale(obj.position.scale);
                }
                if (obj.position.rotation) {
                    this.setRotation(obj.position.rotation);
                }
            }
            break;
        case "room-status":
            this.editorsCount = obj.editorsCount;
            this.viewersCount = obj.viewersCount;
            this.dispatch("changeRoomStatus");
            break;

        case "set-permissions":
            if (obj.permissions) {
                this.readOnly = !obj.permissions.canDraw;
                this.dispatch("set-permissions", obj.permissions);
            } else {
                console.error("Received not valid permissions in set-permission response");
            }
            break;
        case "meta":
            // console.log("META", obj);
            if (obj.config) {
                this.setMetaConfig(obj.config, "freeze");
            } else {
                console.error("Received not valid config in meta response");
            }
            break;
        case "page":
            // console.log("!!!!!!!!!!!!!!!!!!!", "page", obj);
            if (obj.config) {//validate?
                sketch = this.room.setPageConfig(this, obj.config);//insert or update based on coonfig.sid
                // if ((obj.user && obj.user.user_id === this.user.user_id) || (!this.room.sketch)) { //autoselect page create by self
                //     this.room.setActiveSketch(this, sketch);
                // }
            } else {
                console.error("Received not valid page config in page response");
            }
            // alert("page");
            break;
        case "remove-page":
            // console.log("!!!!!!!!!!!!!!!!!!!", "remove-page", obj);
            if (obj.sid) {
                sketch = this.room.getSketchBySid(obj.sid);
            }
            if (sketch instanceof Sketch) {
                this.room.removeSketch(this, sketch, "remoteRemove");
            } else {
                console.warn("cannot remove sketch by input sid", "[", obj.sid, "]");
            }
            break;
        case "clear-page":
            // alert("clear-page");
            // console.log("!!!!!!!!!!!!!!!!!!!", "clear-page", obj);
            if (obj.sid) {
                sketch = this.room.getSketchBySid(obj.sid);
            }
            if (sketch instanceof Sketch) {
                sketch.reset(this, sketch, "remoteClear");//now: params not required
                this.dispatch("sketch-cleared", sketch);
                this.planRefreshWindow(0, "sketchpad.js:executeInputCommand:clear-page");
            } else {
                console.warn("cannot clear sketch by input sid", "[", obj.sid, "]");
            }
            break;

        case "history-begin":
            // console.log("history begin", obj);
            this.receivingHistory = true;
            this.loadingEl.style.display = "flex";
            this.receivingHistoryInputsTotal = obj.inputsCount || obj.messagesCount || "?"; //messagesCount is count of all messages including pages, meta etc. may be higher than inputsCount
            this.receivingHistoryInputsLoaded = 0;
            this.loadingEl.textContent = this.receivingHistoryInputsLoaded + "/" + this.receivingHistoryInputsTotal;
            break;
        case "netspeed-begin":
            this.room.sketch.grindingThreshold = 1000;
            break;
        case "inputs":
            if (obj.sid) {
                sketch = this.room.getSketchBySid(obj.sid);
            }
            if (!(sketch instanceof Sketch)) {
                console.warn("cannot find sketch by input sid, creating new sketch", "[", obj.sid, "]");
                //generally this is a fallback. each sketch should be initialised by "page" command
                sketch = this.room.addSketch(this, Object.assign(this.getSketchConfig(), {
                    sid: obj.sid
                }), "remoteSketch");
                if (!this.room.sketch) {
                    this.room.setActiveSketch(this, sketch);
                }
            }
            if (this.receivingHistory) {
                this.receivingHistoryInputsLoaded += 1;
            }
            //if we are adding inputs to hidden sketch
            if (sketch !== this.room.sketch) {
                receivingHistoryTmp = this.receivingHistory;
                this.receivingHistory = true;
            }
            sketch.grindBulkFrame(this, obj, this.receivingHistory);
            if (sketch !== this.room.sketch) {
                this.receivingHistory = receivingHistoryTmp;
            }
            break;
        case "history-end":
            //console.log("History-END");
            this.receivingHistory = false;
            this.loadingEl.style.display = "none";
            this.planRefreshWindow(0, "sketchpad.js:executeInputCommand:history-end");
            break;
        case "netspeed-end":
            this.room.sketch.grindingThreshold = 1000 / 60;
            break;
        case "init-begin":
            this.initialised = false;
            break;
        case "init-end":
            this.initialised = true;
            /*set active page from config*/
            if (!this.config.currentPageNo) {
                this.config.currentPageNo = 1;
            }
            sketch = this.room.getSketchByNo(this.config.currentPageNo);
            if (!sketch) {
                this.config.currentPageNo = 1;
                sketch = this.room.getSketchByNo(this.config.currentPageNo);
            }
            if (sketch) {
                this.room.setActiveSketch(this, sketch);
            }
            this.dispatch("initialised");
            break;
        case "reset":
            //alert("reset");
            this.reset("remote");
            // this.planRefreshWindow();
            break;
        case "user-hello":
            if (obj.user && obj.user.user_id && obj.user.viewport) {
                obj.user.user_id = String(obj.user.user_id);
                this.room.addClient(obj.user);
                this.dispatch("addClient", obj.user);
            } else {
                console.error("dropping user-hello, wrong  ``user || user.user_id``");
            }
            break;
        case "pointer-move":
            if (obj.user_id) {
                this.room.setViewportPointer(obj.user_id, obj.x, obj.y);
            } else {
                console.error("dropping pointer-move, wrong ``user_id``");
            }
            break;

        case "update-viewport":
            if (obj.user && obj.user.user_id && obj.user.viewport) {
                obj.user.user_id = String(obj.user.user_id);
                // console.log("update-viewport", obj.user);
                this.room.updateClient(obj.user);
                this.dispatch("updateClient", obj.user);
            } else {
                console.error("dropping user-viewport, wrong  ``user || user.user_id``");
            }
            break;
        case "user-bye":
            if (obj.user && obj.user.user_id) {
                obj.user.user_id = String(obj.user.user_id);
                this.room.removeClientById(obj.user.user_id);
                this.dispatch("removeClient", obj.user);
            } else {
                console.error("dropping user-bye, wrong  ``user || user.user_id``");
            }
            break;
        case "undo":
            // console.log("receive undo", obj);
            if (obj && obj.uid && obj.sid) {
                sketch = this.room.getSketchBySid(obj.sid);
                if (sketch instanceof Sketch) {
                    sketch.undoSketch(this, obj.uid);
                } else {
                    console.error("sketch not exists", obj.sid, obj);
                }
                if (sketch === this.room.sketch) {
                    this.planRefreshWindow(0, "sketchpad.js:executeInputCommand:undo");
                }
            }
            break;
        case "you":
            if (obj && obj.user) {
                this.user = obj.user;
                this.dispatch("identify", obj.user);
            }
            break;
        default:
            // console.warn("sketchpad.js", "Unknown response:", obj);
            this.dispatch("customMessageFromServer", obj);

        }
    },
    /**
     * Receive JSON string from server, convert into object and execute command
     *
     * @param  {json-string}
     * @return {undefined}
     */
    receiveMessageFromServer: function receiveMessageFromServer(msg) {
        "use strict";
        var obj = JSON.parse(msg.data);
        var that = this;
        if (obj) {
            setTimeout(function () {
                that.executeInputCommand(obj);
            }, 0);
        }

    },


    /**
     * Sends new inputs to server.
     * This method is executed periodicly
     * and also can be executed on important events
     * like end of input.
     *
     * Timeout of periodic can be set in:
     * ``config.syncNetworkDataFrequency``
     *
     * Longer value causes time shift between clients.
     *
     * ! Must be run before room sketch change !
     *
     */
    sendInputs: function sendInputs() {
        "use strict";
        if (!this.room || !this.room.sketch) {
            // throw new Error("Cant send inputs while room.sketch don't exists");
            // console.warn("Cant send inputs while room.sketch don't exists");
            return;
        }
        var message = {
            cmd: "inputs",
            sid: this.room.sketch.getId(), // if fails that means that sendInputs is run before room and sketch initialisation, maybe can be omitted
            ts: new Date().getTime(),
            uid: this.UID,
            // dt: new Date().getTime() - this.start_time,
            evs: []
        };

        // for all paths
        var inputFragment,
            input,
            // mark,
            pathData;
        var that = this;
        Object.keys(this.inputs).forEach(function (i) {
            input = that.inputs[i];
            if (input && i !== 666) {
                pathData = input.getPointsToSend();
                if (pathData) {
                    //fragment of paths
                    inputFragment = {};
                    inputFragment.tol = input.tool;
                    inputFragment.cnf = input.getConfig();
                    inputFragment.vpx = input.viewportX; //tofix: this same input fragment to send can have different viewport than this what was drawen
                    inputFragment.vpy = input.viewportY;
                    inputFragment.scl = input.scale;
                    inputFragment.rot = input.rotation;
                    inputFragment.wdh = input.width;
                    inputFragment.hgt = input.height;
                    inputFragment.pts = pathData;
                    inputFragment.uid = input.UID; //overwitten by server
                    message.evs.push(inputFragment);
                }
            }
        });

        if (message.evs.length > 0) {
            this.sendMessageToServer(message);
            var sketch = this.room.sketch;
            // apply own input message to sketch history
            sketch.grindBulkFrame(this, message, true);
        }

    },

    /**
     * Heartbeat of network synchronization
     *
     * ``this.syncNetworkDataFrequency`` defines interval
     *
     */
    syncNetworkData: function syncNetworkData() {
        "use strict";
        // clear old call
        if (this.syncNetworkDataTimeout) {
            clearTimeout(this.syncNetworkDataTimeout);
        }
        this.syncNetworkDataTimeout = 0;


        // hook up next interval
        var that = this;
        this.syncNetworkDataTimeout = setTimeout(function () {
            that.syncNetworkData();
        }, this.syncNetworkDataFrequency);

        // do the thing
        this.sendInputs();

    }

});
