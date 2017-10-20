// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/eventsmanager.js
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


/*global window, addEvent*/

/**
 * Palette of colors
 * @class
 * @param {DOMElement} el
 * @param {function} pickCb
 */
function Eventsmanager() {
    "use strict";
    /**
     * Key array for registering callback functions for events
     * @type {Object}
     */
    this.registeredCallbacks = {};
    this.registeredCallbacksOnce = {};
}

Eventsmanager.prototype = {
    /**
     * Register event
     *
     * @param  {string}   event    - event name
     * @param  {function} callback - callback function
     */
    on: function on(event, callbackFn) {
        "use strict";
        if (!this.registeredCallbacks[event]) {
            this.registeredCallbacks[event] = [];
        }
        this.registeredCallbacks[event].push(callbackFn);
        return this;
    },
    removeListener: function removeListener(event, callbackFn) {
        "use strict";
        if (!this.registeredCallbacks[event]) {
            return;
        }
        var i;
        for (i = this.registeredCallbacks[event].length - 1; i >= 0; i -= 1) {
            if (this.registeredCallbacks[event][i] === callbackFn) {
                this.registeredCallbacks[event].splice(i, 1);
            }
        }
        this.registeredCallbacks[event].indexOf(callbackFn);
    },
    once: function on(event, callbackFn, uniqueId) {
        "use strict";
        if (!this.registeredCallbacksOnce[event]) {
            this.registeredCallbacksOnce[event] = [];
        }
        var added = false;
        if (uniqueId) {
            this.registeredCallbacksOnce[event].forEach(function (callback) {
                if (callback.id === uniqueId) {
                    callback.fn = callbackFn;
                    added = true;
                    return;
                }
            });
        }
        if (!added) {
            this.registeredCallbacksOnce[event].push({
                id: uniqueId,
                fn: callbackFn
            });
        }
        return this;
    },
    /**
     * Dispatch event
     * @param  {string} event - event name
     * @param  {any} param - argument passed to callback functions
     * @param  {any} param2 - argument 2 passed to callback functions
     * @param  {any} param3 - argument 2 passed to callback functions ... dont f with Douglas
     */
    dispatch: function dispatch(event, param, param2, param3) {
        "use strict";

        var that = this;
        if (this.registeredCallbacks[event]) {
            this.registeredCallbacks[event].forEach(function (callback) {
                callback.call(that, param, param2, param3);
            });
        }
        if (this.registeredCallbacksOnce[event]) {
            this.registeredCallbacksOnce[event].forEach(function (callback) {
                // console.log("CALLING ONCE", callback);
                callback.fn.call(that, param, param2, param3);
            });
            delete this.registeredCallbacksOnce[event];
        }
        return this;
    }
};

window.Eventsmanager = Eventsmanager;