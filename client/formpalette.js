// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/formpalette.js
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
/*global Eventsmanager, Keyshortcuts*/
/**
 * Palette of colors
 * @class
 * @param {DOMElement} el
 * @param {function} pickCb
 */
function Formpalette(config) {
    "use strict";
    // Call parent constructor
    Eventsmanager.call(this, config);
    if (typeof config.keyModifiers !== "object") {
        config.keyModifiers = {};
    }

    var el = config.containerEl;
    this.containerEl = el;
    el.classList.add("fontpalette");

    var width = 60,
        height = 220;

    this.width = width;
    this.height = height;
    this.keyshortcuts = new Keyshortcuts();

    el.style.position = "relative";
    el.style.width = width + "px";
    el.style.height = height + "px";//yeap
    el.style.display = "inline-block";
    el.style.fontSize = "12px";


}
Formpalette.prototype = Object.create(Eventsmanager.prototype);

Object.assign(Formpalette.prototype, {
    inputs: {},
    setInputValue: function setInputValue(inputName, value) {
        "use strict";
        if (this.inputs && this.inputs[inputName] && this.inputs[inputName].inputEl) {
            var input = this.inputs[inputName];
            switch (input.type) {
            case "checkbox":
                input.inputEl.checked = value;
                break;
            default:
                input.inputEl.value = value;
            }
        }
    },
    addInput: function addInput(config) {
        "use strict";
        var group = document.createElement("div");
        group.style.marginBottom = "8px";
        var label = document.createElement("span");
        label.style.padding = "0";
        label.style.margin = "0";
        label.style.fontSize = "12px";
        label.style.lineHeight = "12px";
        label.style.display = "block";
        label.textContent = config.title;
        label.style.marginBottom = "2px";
        var input = document.createElement("input");
        input.type = config.type || "text";
        input.name = config.name || "";

        // input.style.width = "100%";
        input.style.width = "48px";

        switch (input.type) {
        case "checkbox":
            input.style.height = "14px";
            input.style.width = "14px";
            input.style.lineHeight = "20px";
            break;
        }

        input.minValue = config.minValue;
        input.maxValue = config.maxValue;
        input.value = config.value;

        if (typeof config.onChange === "function") {
            input.addEventListener("change", config.onChange);
        }
        group.appendChild(label);
        group.appendChild(input);
        this.containerEl.appendChild(group);
        this.inputs[input.name] = {
            name: input.name,
            type: input.type,
            groupEl: group,
            labelEl: label,
            inputEl: input
        };
    }

});
window.Formpalette = Formpalette;