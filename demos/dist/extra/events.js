// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/events.js
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


/*global window, calculateOffsetXY*/

// Test via a getter in the options object to see if the passive property is accessed
var supportsPassive = false;
try {
    var opts = Object.defineProperty({}, 'passive', {
        get: function () {
            "use strict";
            supportsPassive = true;
        }
    });
    window.addEventListener("test", null, opts);
} catch (e) {
    console.log("ignore", e);
}
window.supportsPassive = supportsPassive;

/**
 * Calculate element offset
 *
 * @param  {HTMLElement} target - target element
 * @param  {number} screenX - coordinate y
 * @param  {number} screenY - coordinate x
 * @return {object}  - {x: number, y: number}
 */
function elementOffset(el) {
    "use strict";
    var
        // style = el.currentStyle || window.getComputedStyle(el, null),
        borderLeftWidth = 0,//parseInt(style.borderLeftWidth, 10),
        borderTopWidth = 0,//parseInt(style.borderTopWidth, 10),
        rect = el.getBoundingClientRect(),
        offsetX = borderLeftWidth - rect.left,
        offsetY = borderTopWidth - rect.top;

    return {
        x: offsetX,
        y: offsetY
    };
}

function addEvent(el, event, callback, useCapture) {
    "use strict";
    var third = false;
    if (supportsPassive) {
        third = {
            passive: true
        };
    }
    third = false;

    function getSelectedText() {
        var text = "";
        if (window.getSelection) {
            text = window.getSelection().toString();
        } else if (document.selection !== undefined && document.selection.type === "Text") {
            text = document.selection.createRange().text;
        }
        return text;
    }
    function touch2mouse(e) {
        var i,
            touch,
            offset = elementOffset(el);
        for (i = 0; i < e.changedTouches.length; i += 1) {
            touch = e.changedTouches[i];
            touch.offsetX = touch.clientX + offset.x;
            touch.offsetY = touch.clientY + offset.y;
            callback(touch);
        }
    }
    var firstTouchStart,
        lastTouchEnd,
        swipeThreshold = 30;
    switch (event) {
    case "swipe-right":
        console.log("adding swipe right");
        el.addEventListener("touchstart", function (e) {
            // var i;
            firstTouchStart = e.changedTouches[0];
            // for (i = 0; i < e.changedTouches.length; i += 1) {
            //     callback(e.changedTouches[i]);
            // }
        }, useCapture);
        el.addEventListener("mousedown", function (e) {
            console.log("mdsr");
            firstTouchStart = e;
        }, useCapture);

        el.addEventListener("touchend", function (e) {
            lastTouchEnd = e.changedTouches[e.changedTouches.length - 1];
            if (!lastTouchEnd || !firstTouchStart) {
                // console.log("swipe-right-mouseup");
                return;
            }
            if (lastTouchEnd.screenX - firstTouchStart.screenX > swipeThreshold && !getSelectedText() && !(document.activeElement.type === "text")) {
                callback(e);
            }
        }, useCapture);
        el.addEventListener("mouseup", function (e) {
            lastTouchEnd = e;
            if (!lastTouchEnd || !firstTouchStart) {
                // console.log("swipe-right-mouseup");
                return;
            }
            if (lastTouchEnd.screenX - firstTouchStart.screenX > swipeThreshold && !getSelectedText() && !(document.activeElement.type === "text")) {
                callback(e);
            }
        }, useCapture);

        // el.addEventListener("mouseover", callback, useCapture);
        break;

    case "hover-in":
        el.addEventListener("touchstart", function (e) {
            var i;
            for (i = 0; i < e.changedTouches.length; i += 1) {
                callback(e.changedTouches[i]);
            }
        }, useCapture);
        el.addEventListener("touchmove", function (e) {
            var i;
            for (i = 0; i < e.changedTouches.length; i += 1) {
                callback(e.changedTouches[i]);
            }
        }, useCapture);
        el.addEventListener("mouseover", callback, useCapture);
        break;

    case "hover-out":
        el.addEventListener("mouseout", callback, useCapture);
        break;

    case "tap":
        // console.log("add tap", useCapture);
        el.addEventListener("touchstart", function (e) {
            e.preventDefault();
            if (document.activeElement !== e.target && document.activeElement.tagName === "INPUT") {
                document.activeElement.blur();
            }

            var i;
            for (i = 0; i < e.changedTouches.length; i += 1) {
                e.changedTouches[i].stopPropagation = e.stopPropagation && e.stopPropagation.bind(e);
                e.changedTouches[i].preventDefault = e.preventDefault && e.preventDefault.bind(e);
                callback(e.changedTouches[i]);
            }
            e.preventMouseFallback = true;
        }, useCapture);
        el.addEventListener("mousedown", function (e) {
            callback(e);
        }, useCapture);
        // el.addEventListener("touchmove", function (e) {
        //     var i;
        //     for (i = 0; i < e.changedTouches.length; i += 1) {
        //         callback(e.changedTouches[i]);
        //     }
        // });
        break;
    case "pop":
        el.addEventListener("touchend", function (e) {
            e.preventDefault();
            if (document.activeElement !== e.target && document.activeElement.tagName === "INPUT") {
                document.activeElement.blur();
            }
            var i;
            for (i = 0; i < e.changedTouches.length; i += 1) {
                e.changedTouches[i].stopPropagation = e.stopPropagation && e.stopPropagation.bind(e);
                e.changedTouches[i].preventDefault = e.preventDefault && e.preventDefault.bind(e);
                callback(e.changedTouches[i]);
            }
            e.preventMouseFallback = true;
        }, useCapture);
        el.addEventListener("mouseup", function (e) {
            callback(e);
        }, useCapture);
        // el.addEventListener("touchmove", function (e) {
        //     var i;
        //     for (i = 0; i < e.changedTouches.length; i += 1) {
        //         callback(e.changedTouches[i]);
        //     }
        // });
        break;
    case "slide":
        el.addEventListener("mousedown", callback, useCapture);
        el.addEventListener("mouseup", callback, useCapture);
        el.addEventListener("mousemove", function (e) {

            if (e.buttons || (e.buttons === undefined && e.which)) {
                callback(e);
            }
        }, useCapture);

        el.addEventListener("touchstart", touch2mouse, useCapture);
        el.addEventListener("touchend", touch2mouse, useCapture);
        el.addEventListener("touchmove", touch2mouse, useCapture);

        break;
    default:
        el.addEventListener(event, callback, useCapture);
    }
}
window.addEvent = addEvent;