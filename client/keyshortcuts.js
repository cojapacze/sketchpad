// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/keyshortcuts.js
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


/*global window, document, console*/
/*global Eventsmanager*/
/**
 * Palette of colors
 * @class
 * @param {DOMElement} el
 * @param {function} pickCb
 */
function Keyshortcuts(config) {
    "use strict";
    // Call parent constructor
    Eventsmanager.call(this, config);
    this.shortcuts = [];
    this.registerEvents();

}
Keyshortcuts.prototype = Object.create(Eventsmanager.prototype);

Object.assign(Keyshortcuts.prototype, {
    disabled: false,

    disable: function disable() {
        "use strct";
        this.disabled = true;
    },
    enable: function enable() {
        "use strct";
        this.disabled = false;
    },
    isMac: function isMac() {
        "use strct";
        return (navigator.appVersion.indexOf("Mac") !== -1);
    },
    checkIfPressed: function checkIfPressed(shortcut, e) {
        "use strict";
        if (shortcut.metaKey !== "optional" && !!shortcut.metaKey !== !!e.metaKey) {
            return false;
        }
        if (shortcut.altKey !== "optional" && !!shortcut.altKey !== !!e.altKey) {
            return false;
        }
        if (shortcut.shiftKey !== "optional" && !!shortcut.shiftKey !== !!e.shiftKey) {
            return false;
        }
        if (shortcut.ctrlKey !== "optional" && !!shortcut.ctrlKey !== !!e.ctrlKey) {
            return false;
        }
        if (shortcut.keyCode !== e.keyCode) {
            return false;
        }
        return true;
    },
    onKeyDown: function (e) {
        "use strict";
        if (this.disabled) {
            return false;
        }
        var i;
        var shortcut;
        for (i = 0; i < this.shortcuts.length; i += 1) {
            shortcut = this.shortcuts[i];
            if ((!shortcut.pressed || shortcut.repeatable) && this.checkIfPressed(shortcut, e)) {
                shortcut.pressed = true;
                // console.log("KeyDown", shortcut);
                if (typeof shortcut.callbackDown === "function") {
                    shortcut.callbackDown(e);
                    // e.stopPropagation();
                    // e.preventDefault();
                }
            }
        }
    },
    onKeyUp: function (e) {
        "use strict";
        if (this.disabled) {
            return false;
        }
        var i;
        var shortcut;
        for (i = 0; i < this.shortcuts.length; i += 1) {
            shortcut = this.shortcuts[i];
            if (shortcut.pressed && (this.checkIfPressed(shortcut, e) || 1)) {
                shortcut.pressed = false;
                // console.log("KeyUp", shortcut);
                if (typeof shortcut.callbackUp === "function") {
                    shortcut.callbackUp(e);
                    // e.stopPropagation();
                    // e.preventDefault();
                }
            }
        }
    },
    registerEvents: function registerEvents() {
        "use strict";
        var that = this;
        window.addEventListener("keydown", function (e) {
            //disable shortcuts when INPUT element is focused
            if (document.activeElement.tagName === "INPUT") {
                return;
            }
            return that.onKeyDown(e);
        });
        window.addEventListener("keyup", function (e) {
            //disable shortcuts when INPUT element is focused
            if (document.activeElement.tagName === "INPUT") {
                return;
            }
            return that.onKeyUp(e);
        });
    },
    getKeycodeStr: function (keyCode) {
        "use strict";
        var chr;
        switch (keyCode) {
        case 32:
            chr = "space";//space
            break;
        case 91:
            chr = (this.isMac())
                ? "⌘"
                : "WIN";//cmd
            break;
        case 18:
            chr = (this.isMac())
                ? "⌥"
                : "ALT";//alt
            break;
        case 16:
            chr = (this.isMac())
                ? "⇪"
                : "SHIFT";//shift
            break;
        case 17:
            chr = (this.isMac())
                ? "ctrl"
                : "CTRL";//control
            break;
        case 27:
            chr = "Esc";//escape
            break;
        case 20:
            chr = (this.isMac())
                ? "⇪"
                : "Caps lock";//capslock
            break;
        case 13:
            chr = "⏎";//enter
            break;
        case 8:
            chr = "⌫";//backspace
            break;
        case 187:
            chr = "+";//=
            break;
        case 189:
            chr = "-";//-
            break;
        default:
            chr = String.fromCharCode(keyCode);
        }
        return chr;
    },
    getShortcutStr: function (shortcut) {
        "use strict";
        var strParts = [];
        if (shortcut.metaKey === true) {
            strParts.push((this.isMac())
                ? "⌘"
                : "WIN");
        }
        if (shortcut.altKey === true) {
            strParts.push((this.isMac())
                ? "⌥"
                : "ALT");
        }
        if (shortcut.ctrlKey === true) {
            strParts.push((this.isMac())
                ? "ctrl"
                : "CTRL");
        }
        if (shortcut.shiftKey === true) {
            strParts.push((this.isMac())
                ? "⇪"
                : "SHIFT");
        }
        if (shortcut.keyCode) {
            strParts.push(this.getKeycodeStr(shortcut.keyCode));
        }
        return strParts.join(" + ");
    },


    /* interface */
    addShortcut: function addShortcut(shortcut, callbackDown, callbackUp) {
        "use strict";
        if (!typeof callbackDown === "function") {
            throw new Error("Keyshortcuts::addShortcut(shortcut, callbackDown, callbackUp) - callbackDown must be a function");
        }
        shortcut.callbackDown = callbackDown;
        shortcut.callbackUp = callbackUp;
        this.shortcuts.push(shortcut);
    }

});
window.Keyshortcuts = Keyshortcuts;