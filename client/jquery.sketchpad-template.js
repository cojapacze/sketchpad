/*global jQuery, Sketchpad, Pixelpicker, Colorpalette*/
(function ($) {
    "use strict";

    /* file: sketchpad.js */

    $.fn.sketchpad = function (options) {
        if (!options) {
            options = {};
        }
        return this.each(function (ignore, el) {
            options.containerEl = el;
            if (el.sketchpadModule) {
                return el.sketchpadModule;
            } else {
                el.sketchpadModule = new Sketchpad(options);
                return el.sketchpadModule;
            }
        });
    };

    $.fn.pixelpicker = function (options) {
        if (!options) {
            options = {};
        }
        return this.each(function (ignore, el) {
            options.containerEl = el;
            if (el.pixelpickerModule) {
                return el.pixelpickerModule;
            } else {
                el.pixelpickerModule = new Pixelpicker(options);
                return el.pixelpickerModule;
            }
        });
    };

    $.fn.colorpalette = function (options) {
        if (!options) {
            options = {};
        }
        return this.each(function (ignore, el) {
            options.containerEl = el;
            if (el.colorpaletteModule) {
                return el.colorpaletteModule;
            } else {
                el.colorpaletteModule = new Colorpalette(options);
                // console.log("Colorpalette", el.colorpalette);
                return el.colorpaletteModule;
            }
        });

    };

}(jQuery));