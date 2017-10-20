// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/polyfill.js
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


if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function(predicate) {
    'use strict';
    if (this == null) {
      throw new TypeError('Array.prototype.findIndex called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return i;
      }
    }
    return -1;
  };
}

(function() {
    var lastTime = 0,
        vendors = ['ms', 'moz', 'webkit', 'o'],
        x,
        length,
        currTime,
        timeToCall;

    for(x = 0, length = vendors.length; x < length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = 
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            currTime = new Date().getTime();
            timeToCall = Math.max(0, 16 - (currTime - lastTime));
            lastTime = currTime + timeToCall;
            return window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

if (typeof Object.assign != 'function') {
  (function () {
    Object.assign = function (target) {
      'use strict';
      // We must check against these specific cases.
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var output = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source !== undefined && source !== null) {
          for (var nextKey in source) {
            if (source.hasOwnProperty(nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }
      return output;
    };
  })();
}


if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    if (this == null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}


// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/NSSketchpad-agpl.js
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

/*global window*/

var NSSketchpad = {
    avaliableTools: [],
    defaultTool: "pen",
    // watermarkImageSrc: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAAAyCAYAAAAtDQLUAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AwKDyQ6TGXDbgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAOqUlEQVR42u2de4xU13nAf+fcO7MDy8u8MbaBzZq3Y+NHbCAkbmRSg2nkRN02KFC1tKqlqpINcSsnapK2jlyrkYtTpaojpa6EXRN120amLeAYokiujCmG4IBZG2MeCwbDssvuwu7szNxzT/+4Z5bZZV53Zu4+6PlJV7tz5z7O+e53vvN93znnDlgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVhGB2KElGMasGBAwaQUMuZKlUors+sgkBwlcq0HlgkphXCk8DOeP8x1uEG+ADLmSq18rX1fjzL5jnTGAveWkPcHwGUrKgvABkCX2BaOovrcM8LqcLPJd6SztAx5f92KafiRI6QcO4EHgAcQYgPAoo2Pt634/ma/4be+9O6oc6sdKQAWrF93asWzTyXveGTFz0eMfOEbAHPXfvHnK559qrfhK186BCBcR9jmUDNO5Mj7IYAZ9y89tOLZp5J3PfH1twIlEVbeIwB3hJSjw2wIKZRWmvF3zBoz6TN3yL72zhnZBqo9NUoMoCO08pnYcPv0SY1zEtfOXxrXuuftkSFfRyqtfKZ9duFnJzXOGdN3pftW2wxqTh/wLsCEebfFuk+dY2LD7bdOapwzJj5xfIMVj/UAy7Ijpqd0RrF8HUA48diUkWScAaTrTAWEdOQE2wyGQvCBHgshJlthWANYvgHUfhpAe0qPOulqMsarrRsxD9zpD3VlfyktQ2D/TEcuRCzQCWlDYGsAC3soECiM9nV61Nk9lTXWWuUqveX/L9rXXtDZBDphRoItw4xb6TkzH7xb9l5q192nzlXzIH2zFfejqquHBlSVdS7n2sKEvOT81XlC4nz3VznHugAT5t0mqpRtvroXO9KpUDb57pEri35qVCcArwZ6PKBcY6dPEZ/uf88vopMV3SNztcd05H6qRk5HXtnWEG+Qvt7gqTY0NIiTJ09W8hxv0PM1a9Y4ALt27VJDoudVPtTPA28BfLr/vVoIey/wSA2ukyny3XsE01IApgJtNVSWT4DbzP/fAF4J/L6CNv1ogf1NwL/llq/71Llal6+U13qkwnvsx4x05tAvi1xqVCeA5cA7g3WyUrpPncstWz6drFhvkpevBD295/UY+yWzIbBWFbXZvLKtIbmy/RiYM/iAkydPVnrtbwHP58pz165dQ6rnNenVpi1bvH/K4sZl7e9/dLHtcMvtCPFXaN0Z8jJPlOjnRAgPcHOOIVkBPIsZ9cynuHW3TNg1/Z7FTseHJy/2nL+0EfhH4HjI8n8FmJ/z+d2ccswGns72nuJ6CPw3wKU81zqc+2HM1FvenLXi3llth48dudp6YX2Nyhc0RHVDLlWbMP15tL4Y8h6/V2D/DbKY2HD7m1OWzp/VfvR4e9fJs18sIotizAGeKvDd3wFnQ17vd6XrLmj82pczQorYxzt+0ef1Jovl5l4lmDAeNs30gva1yvUAhRRCV+bz3CDbadOm/euiRYvqjhw5krpy5crv1FC2fw1kB8mecF03sXr16vNCCPHGG280KqVOA6+Vef0f5PEkD65cuXJpV1eXs2PHDlcI8ZLW+sNa6HmkBrDx8UfuuGX+vHjdpPFT2w634I5NvOz1JFtDXubRYvcX5juttVfGtV4E7gSeA34CfDffQU5dXKhUmoZ1v3HrvLUPL+k8cebXb3/nRYSUP9O+/2bI8t82SPAfmA3hyGVa+U/nJLzrAYTrvKI91VLqwnPXfGH6vLUPL5lx35LOfd/7e4D/APZUWb5CsYNvyrytnLIN4iFgbp79N8jizqY1C6bfs2j2xXePtB984eWyZZHnfoUM4HZjHMIEk3e59YmGxq+ungi4F9453Nt9+pNiZ7xhjGDYNvaCSqe7TGhdbQjcL1vHcZYppZ7euHHjrcuXL79v7969b7300ksA27LHVCnbl3P+XzNz5syFmzZtegDw9+3b19nZ2dmitX6xzOs/P3jHqlWr3HXr1sVbW1vZsWMHiUTi9WQyuTsKPS/WO4VPQshg6oQQsg7AibmVjGi15fPOnHhc5uQ6EFKOLbMe/0ywtOibpQ52EnWzAFfG3EaiZUBdSparLi4A3ERiNiBkLNaQDZcquHcncKHI977xTuMwYHQ4GkE4ciIgheOMr/H9UiYEqmiwTAghTa5LCseJbLBKCOkS0dLTRCIxFxhTX19/Z6TPUErXyCoei8USIU//GLhSJIeHPwwDQ6E8QBlzpZ/xcsNSDaAyXiUF35hvp5dMZgMDBbhCBg20BE8CK41X2V264xcyNx9Tc2U3E6Gzoa++MWlfqrXETEGrSXZ/32zl3StqdH+S2gGQriNUqiZXPlBp/mco8TOZa6a9iAgMU53xCOsBXNcVnufVXq+vr14RUkpHCCG0LrvpLynQ+ZSb5orUQwmny8rvBHyvL3UGwOtJ+rVvL9nQzJlgwsdCitNoGvo/mRCljGtrfyQ3FiGFO8hoEJV80UEmKk9usMaV6m/4wf1G47zOKlCp9DWI7HmKatpz2XVQKmOMldZa+zqE9csb8TjOGEBk01yZTGbI22UoD1CrwEW9/P7xM1rr+rZfHWsBGoBl5fbCQkqRMweqC2gp8ESF+SvNve8GJuY59AcEAx5bKjYGWi8CroY8bVYIxaxUoaNTCD3kvW5UIfb4fN5FmTKYNlSV1/qmmXCuTZupuj5SymwYnQGGZbFAOANoDNdHzbtXfsRugMfMVztCXCP3Y/nTYLTeXuTb75QT+uY4I062NObaP6xQfnkz5tJxhB/MzJHG1bcToauMOopwN1VNgxHtuT1hZJWOOYkIO4EhWVUipXTM89NaVx9FZUN33/d7gXEjPgdIMKdueZ733JXDt5y6+Ofu++amNi+Z+vjwj16ZY/KJ5T1cIdaj9ek83/8lwcDHNqDoSLSTqBMqlb6eWzNL1RDiSbT+3wrklzeLlRNOZnM+skK1jnDCq86dwI10HKEifdmEcEwgXOscYJY/IPzI57eFlKtq2agL4WdUHzXOdTmOI5RS13PNWkf9tpD+HKAQQkoppVKV3zInp+gxTIQ1gFeBd7TvD/bkyjD3oj0+Ydz4qXctmAEsHDt9Suu1Ty5eKeJnZ+enSQAnHvu1SqWP5Tn094EjBNMTHi4WNqq+VNZ9TwMaEazRFUK0aK3fiSJtYhpXKCOTbYiCSNcQ66w7PEQBsAC09nUSGB9BDvAoYafBSHFZSNG/2iEnKR9NEByVaIVwh8KQGIMVzFRw3Xg8Ho9v27ZNNDU16Yq14iYLR4rXVvYrmOvUxcfVyEh/CvwhsAr4dnndsZlbKIhHWV+ttfEwK5KzjtQDNInnbDpADs37AAW+nxzkJQ8bQgjBdaPn+xmvL7oQ2B1TRoOfCZwrsNUV0bMBI+wRhb/ScZz+9pLJZPrS6XS6EuOXSCRErgHUWqeGSwfCNszPGYNzd4V9YDYkFMKRsXIaaPY1QiUa6A7gx8D3gAfLMExp0/hdo5yVGKjvAodKmVpjysKGVuZ4Uc0a11LlG6C4wnXFCNO1SFm7fauIjR1Tb+b+CcD3PS+6hqj73wRdqrOfbZ7bT83WYvaJkh1tRNNJmpubRTwer3NdN2sAM57nVf2SEj/oDHU6nT4zWgxgHJgBhE/qa61VKnWN4GWRfZmeZEfR2LEvfQLwtFJdAF4qXcqIbCF4E++/EIwMFr52Kt0OeFr714L8jFdJ7mcCML1olYPkrjZ/y/d6gh69Wg+waPlMKKq1yQWqvlQk+a/+t/uYMC07sT3qiddl5dDq4glhQnPgqkqle6MyIt2nzx0F3kbrKwC+p4rJexvBUsqngX8vqMdGn5RSnYBWSvVElitz3ZhSyiNYvNAlhBCxWCzW3NwsqjCAaeCTS5cu7RkuHajUw1hPsAg9TA+4ON3dw+F/eHU3QO/Fy0tzlG0hwSRmtPJnAxzb9rMPLx46eqHrRKsAvqw9tZHr6xt3MzDh/TDBCw/2ESTDXyMYYc7yU+BTlUprgFM7f3np2vmLv+i90OYBj2nf/yrhp1LcW7CqRjFb97zddfXM+fGXjx4/C0waVIdc/ssYbwAuHXpfZ3qS6WRbRw+QqEH5+uXrpzOzTdm6r7aen9h+7EQrsFCl0htyyvafBDP3BzMW+OOcz/OByQxcQvVavjqKQatiVDqzEQi79nhOrXRy5/rNCEfOcuLxzMn//qVQqXRfpic52dQxW5+rBPNLs/wmwUL+0E5G95nz89/687/dHxtf3wY0ofWjxpmA4OUDuTnox7g+rWxFmRFN/xtRPM8rpGdhZbsJmNDU1IQQYvLZs2evPffcc3tisVi8s7Nzte/7n2lqanrSHHuRYDli2Rw8eDDR0dFx9cCBA4vMrq8R/J5KTdphFHye0j/2EmbLWv4NIc/bMKhcPypxfPZtJVNrXP5Crze5J+R1fjvi8oWV7+NFclSlzr1/QOuPx+4F9IN/8SeZtdu36vv/7I+u1aBeD0Wok/nkNzXCe2iCmQwYo1fomBuWnjmOswzQzzzzTEtzc7PasmXLBzWW7ekQ54UZgBqqdlhzD/B/iGbk5lXCLzLP5U/NVorLDM3I02FArN2+VQBi5/rN5YaXl8150ngOfohzQ8m3grJh8r81kZ9TF19SYFSfodbJtdu3OoAuIouh0ptztbiP67qLPc9rqUF55kZUz8uAaG5ulgBNTU3DtjJrpPwo0k3JzvWby0l85zuvnBfFDkvZbtLnpKwUhp7hNHwD8hMWi2X0oiNcwXKzYw2gZYgaKdbLigjf9/uMHbQytgbQMqIMnxkR134wnSk7B9NSPdlpMB0dHQeA9t7e3lYrlXDYHKAlCiYTvCUIrfz5AG2/ajkYGzvmC1eOnz4N3KLSmcUEU04gmALUacUWTraYNyG//vrrJ5RSW/fu3TsOeNTzvMVAvZWtxTI81GrajcXKNlLsjzNbomAasGDwThlzpVa+zvObuMe4/iNWlgpkWwQrW4vFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8ViuZn4PzktcrIt9MbIAAAAAElFTkSuQmCC"
    //please keep Appropriate Legal Notices
    watermarkTitle: "sketchpad.pro library is available under AGPL-3 license, visit http://developers.sketchpad.pro for source code. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY.",
    watermarkImageSrc: "data:image/svg+xml;utf8," + '<?xml version="1.0" encoding="UTF-8" standalone="no"?> <svg    xmlns:dc="http://purl.org/dc/elements/1.1/"    xmlns:cc="http://creativecommons.org/ns#"    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"    xmlns:svg="http://www.w3.org/2000/svg"    xmlns="http://www.w3.org/2000/svg"    xmlns:xlink="http://www.w3.org/1999/xlink"    xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"    xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"    width="128"    height="18"    viewBox="0 0 294.79549 53.369998"    id="svg2"    version="1.1"    inkscape:version="0.91 r13725"    sodipodi:docname="sketchpad-logo-clean.svg">   <sodipodi:namedview      pagecolor="#ffffff"      bordercolor="#666666"      borderopacity="1"      objecttolerance="10"      gridtolerance="10"      guidetolerance="10"      inkscape:pageopacity="0"      inkscape:pageshadow="2"      inkscape:window-width="1296"      inkscape:window-height="719"      id="namedview51"      showgrid="true"      inkscape:zoom="6.416994"      inkscape:cx="72.420486"      inkscape:cy="4.2725026"      inkscape:window-x="99"      inkscape:window-y="0"      inkscape:window-maximized="0"      inkscape:current-layer="layer1">     <inkscape:grid        type="xygrid"        id="grid3441" />   </sodipodi:namedview>   <defs      id="defs4">     <linearGradient        id="rainbow"        inkscape:collect="always">       <stop          offset="0"          style="stop-color:#ff0101;stop-opacity:1"          id="stop6" />       <stop          offset="0.04"          style="stop-color:#ff7901;stop-opacity:1"          id="stop8" />       <stop          offset="0.12"          style="stop-color:#fff001;stop-opacity:1"          id="stop10" />       <stop          offset="0.20"          style="stop-color:#96ff01;stop-opacity:1"          id="stop12" />       <stop          offset="0.27"          style="stop-color:#1fff01;stop-opacity:1"          id="stop14" />       <stop          offset="0.34"          style="stop-color:#01ff5b;stop-opacity:1"          id="stop16" />       <stop          offset="0.41"          style="stop-color:#01ffd2;stop-opacity:1"          id="stop18" />       <stop          offset="0.51"          style="stop-color:#01b4ff;stop-opacity:1"          id="stop20" />       <stop          offset="0.56"          style="stop-color:#013dff;stop-opacity:1"          id="stop22" />       <stop          offset="0.67"          style="stop-color:#3d01ff;stop-opacity:1"          id="stop24" />       <stop          offset="0.78"          style="stop-color:#b401ff;stop-opacity:1"          id="stop26" />       <stop          offset="0.87"          style="stop-color:#ff01d2;stop-opacity:1"          id="stop28" />       <stop          offset="0.95"          style="stop-color:#ff015b;stop-opacity:1"          id="stop30" />       <stop          offset="1"          style="stop-color:#ff0101;stop-opacity:1"          id="stop32" />     </linearGradient>     <linearGradient        xlink:href="#rainbow"        id="linearGradientRainbow"        gradientUnits="userSpaceOnUse"        x1="45"        y1="143"        x2="413"        y2="143"        gradientTransform="matrix(0.98959455,0,0,1.1096972,279.05272,-122.63917)" />     <linearGradient        inkscape:collect="always"        xlink:href="#rainbow"        id="linearGradient3379"        gradientUnits="userSpaceOnUse"        gradientTransform="matrix(0.98959455,0,0,1.1096972,279.05272,-122.63917)"        x1="45"        y1="143"        x2="413"        y2="143" />     <linearGradient        inkscape:collect="always"        xlink:href="#rainbow"        id="linearGradient3381"        gradientUnits="userSpaceOnUse"        gradientTransform="matrix(0.98959455,0,0,1.1096972,279.05272,-122.63917)"        x1="45"        y1="143"        x2="413"        y2="143" />     <linearGradient        inkscape:collect="always"        xlink:href="#rainbow"        id="linearGradient3383"        gradientUnits="userSpaceOnUse"        gradientTransform="matrix(0.98959455,0,0,1.1096972,279.05272,-122.63917)"        x1="45"        y1="143"        x2="413"        y2="143" />     <linearGradient        inkscape:collect="always"        xlink:href="#rainbow"        id="linearGradient3385"        gradientUnits="userSpaceOnUse"        gradientTransform="matrix(0.98959455,0,0,1.1096972,279.05272,-122.63917)"        x1="45"        y1="143"        x2="413"        y2="143" />     <linearGradient        inkscape:collect="always"        xlink:href="#rainbow"        id="linearGradient3387"        gradientUnits="userSpaceOnUse"        gradientTransform="matrix(0.98959455,0,0,1.1096972,279.05272,-122.63917)"        x1="45"        y1="143"        x2="413"        y2="143" />     <linearGradient        inkscape:collect="always"        xlink:href="#rainbow"        id="linearGradient3389"        gradientUnits="userSpaceOnUse"        gradientTransform="matrix(0.98959455,0,0,1.1096972,279.05272,-122.63917)"        x1="45"        y1="143"        x2="413"        y2="143" />     <linearGradient        inkscape:collect="always"        xlink:href="#rainbow"        id="linearGradient3391"        gradientUnits="userSpaceOnUse"        gradientTransform="matrix(0.98959455,0,0,1.1096972,279.05272,-122.63917)"        x1="45"        y1="143"        x2="413"        y2="143" />     <linearGradient        inkscape:collect="always"        xlink:href="#rainbow"        id="linearGradient3393"        gradientUnits="userSpaceOnUse"        gradientTransform="matrix(0.98959455,0,0,1.1096972,279.05272,-122.63917)"        x1="45"        y1="143"        x2="413"        y2="143" />     <linearGradient        inkscape:collect="always"        xlink:href="#rainbow"        id="linearGradient3395"        gradientUnits="userSpaceOnUse"        gradientTransform="matrix(0.98959455,0,0,1.1096972,279.05272,-122.63917)"        x1="45"        y1="143"        x2="413"        y2="143" />     <linearGradient        inkscape:collect="always"        xlink:href="#rainbow"        id="linearGradient3397"        gradientUnits="userSpaceOnUse"        gradientTransform="matrix(0.98959455,0,0,1.1096972,279.05272,-122.63917)"        x1="45"        y1="143"        x2="413"        y2="143" />     <linearGradient        inkscape:collect="always"        xlink:href="#rainbow"        id="linearGradient3399"        gradientUnits="userSpaceOnUse"        gradientTransform="matrix(0.98959455,0,0,1.1096972,279.05272,-122.63917)"        x1="45"        y1="143"        x2="413"        y2="143" />     <linearGradient        inkscape:collect="always"        xlink:href="#rainbow"        id="linearGradient3401"        gradientUnits="userSpaceOnUse"        gradientTransform="matrix(0.98959455,0,0,1.1096972,279.05272,-122.63917)"        x1="45"        y1="143"        x2="413"        y2="143" />   </defs>   <metadata      id="metadata35">     <rdf:RDF>       <cc:Work          rdf:about="">         <dc:format>image/svg+xml</dc:format>         <dc:type            rdf:resource="http://purl.org/dc/dcmitype/StillImage" />         <dc:title></dc:title>         <dc:publisher>           <cc:Agent>             <dc:title></dc:title>           </cc:Agent>         </dc:publisher>         <dc:rights>           <cc:Agent>             <dc:title>AGPL</dc:title>           </cc:Agent>         </dc:rights>         <dc:creator>           <cc:Agent>             <dc:title>positivestuido.co</dc:title>           </cc:Agent>         </dc:creator>         <dc:date>2017</dc:date>         <dc:subject>           <rdf:Bag>             <rdf:li>sketch drawing board real-time canvas surface</rdf:li>           </rdf:Bag>         </dc:subject>       </cc:Work>     </rdf:RDF>   </metadata>   <g      inkscape:label="Layer 1"      inkscape:groupmode="layer"      id="layer1"      transform="translate(-359.92474,-9.2357351)">     <path        inkscape:connector-curvature="0"        id="path4215"        style="fill:url(#linearGradientRainbow);fill-opacity:1;stroke:#000000;stroke-width:0.62875605;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"        d="m 348.50715,25.511773 0,5.415323 -1.78128,0 0,-3.417866 -16.30852,0 0,7.412776 18.0898,0 0,11.407687 -24.70029,0 0,-5.415322 1.78127,0 0,3.417866 16.30852,0 0,-7.412776 -18.08979,0 0,-11.407688 24.70029,0 z" />     <path        inkscape:connector-curvature="0"        id="path4217"        style="fill:url(#linearGradient3401);fill-opacity:1;stroke:#000000;stroke-width:0.62875605;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"        d="m 380.66401,44.332237 0,1.997456 -9.65843,0 0,-1.997456 3.04795,0 -4.71047,-7.412776 -7.32301,0 0,7.412776 3.95839,0 0,1.997456 -14.48766,0 0,-1.997456 3.91879,0 0,-26.854671 -3.91879,0 0,-1.997453 10.52927,0 0,19.441893 7.28343,0 4.39379,-7.412776 -3.20628,0 0,-1.997457 9.65844,0 0,1.997457 -4.31462,0 -4.94798,8.344922 5.3834,8.478085 4.39378,0 z" />     <path        inkscape:connector-curvature="0"        id="path4219"        style="fill:url(#linearGradient3399);fill-opacity:1;stroke:#000000;stroke-width:0.62875605;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"        d="m 384.07627,25.511773 24.70027,0 0,11.407688 -18.08978,0 0,7.412776 16.30851,0 0,-3.417866 1.78127,0 0,5.415322 -24.70027,0 0,-20.81792 z m 6.61049,1.997457 0,7.412776 16.30851,0 0,-7.412776 -16.30851,0 z" />     <path        inkscape:connector-curvature="0"        id="path4221"        style="fill:url(#linearGradient3397);fill-opacity:1;stroke:#000000;stroke-width:0.62875605;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"        d="m 429.88582,44.332237 0,1.997456 -14.25015,0 0,-18.820463 -3.91879,0 0,-1.997457 3.91879,0 0,-10.03166 6.61049,0 0,10.03166 7.63966,0 0,1.997457 -7.63966,0 0,16.823007 7.63966,0 z" />     <path        inkscape:connector-curvature="0"        id="path4223"        style="fill:url(#linearGradient3395);fill-opacity:1;stroke:#000000;stroke-width:0.62875605;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"        d="m 456.01112,40.914371 1.78128,0 0,5.415322 -24.70029,0 0,-20.81792 24.70029,0 0,5.415323 -1.78128,0 0,-3.417866 -16.30851,0 0,16.823007 16.30851,0 0,-3.417866 z" />     <path        inkscape:connector-curvature="0"        id="path4225"        style="fill:url(#linearGradient3393);fill-opacity:1;stroke:#000000;stroke-width:0.62875605;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"        d="m 493.35532,44.332237 0,1.997456 -10.25221,0 0,-1.997456 4.23547,0 0,-16.823007 -16.3085,0 0,16.823007 3.91879,0 0,1.997456 -14.44809,0 0,-1.997456 3.91879,0 0,-26.854671 -3.91879,0 0,-1.997453 10.5293,0 0,10.03166 18.08978,0 0,18.820464 4.23546,0 z" />     <path        inkscape:connector-curvature="0"        id="path4227"        style="fill:url(#linearGradient3391);fill-opacity:1;stroke:#000000;stroke-width:0.62875605;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"        d="m 494.28615,54.3639 3.9188,0 0,-26.85467 -3.9188,0 0,-1.997457 29.17326,0 0,20.81792 -18.64395,0 0,8.034207 3.91879,0 0,1.997454 -14.4481,0 0,-1.997454 z m 27.39199,-26.85467 -16.86268,0 0,16.823007 16.86268,0 0,-16.823007 z" />     <path        inkscape:connector-curvature="0"        id="path4229"        style="fill:url(#linearGradient3389);fill-opacity:1;stroke:#000000;stroke-width:0.62875605;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"        d="m 552.68831,44.332237 3.91882,0 0,1.997456 -28.61909,0 0,-11.407687 18.08978,0 0,-7.412776 -16.30851,0 0,3.417866 -1.78127,0 0,-5.415323 24.70027,0 0,18.820464 z m -6.61049,0 0,-7.412776 -16.30851,0 0,7.412776 16.30851,0 z" />     <path        inkscape:connector-curvature="0"        id="path4231"        style="fill:url(#linearGradient3387);fill-opacity:1;stroke:#000000;stroke-width:0.62875605;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"        d="m 577.98669,25.511773 0,-8.034207 -3.91879,0 0,-1.997453 10.52928,0 0,28.852124 3.91879,0 0,1.997456 -29.17325,0 0,-20.81792 18.64397,0 z m -16.86269,18.820464 16.86269,0 0,-16.823007 -16.86269,0 0,16.823007 z" />     <path        inkscape:connector-curvature="0"        id="path4233"        style="fill:url(#linearGradient3385);fill-opacity:1;stroke:#000000;stroke-width:0.62875605;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"        d="m 599.21968,46.329693 -7.60009,0 0,-6.791347 7.60009,0 0,6.791347 z" />     <path        inkscape:connector-curvature="0"        id="path4235"        style="fill:url(#linearGradient3383);fill-opacity:1;stroke:#000000;stroke-width:0.62875605;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"        d="m 601.71129,54.3639 3.91879,0 0,-26.85467 -3.91879,0 0,-1.997457 29.17325,0 0,20.81792 -18.64396,0 0,8.034207 3.91878,0 0,1.997454 -14.44807,0 0,-1.997454 z m 27.39197,-26.85467 -16.86268,0 0,16.823007 16.86268,0 0,-16.823007 z" />     <path        inkscape:connector-curvature="0"        id="path4237"        style="fill:url(#linearGradient3381);fill-opacity:1;stroke:#000000;stroke-width:0.62875605;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"        d="m 659.83544,25.511773 0,5.370936 -1.78128,0 0,-3.373479 -12.86473,0 0,16.823007 3.91879,0 0,1.997456 -14.44807,0 0,-1.997456 3.91879,0 0,-16.823007 -3.91879,0 0,-1.997457 25.17529,0 z" />     <path        inkscape:connector-curvature="0"        id="path4239"        style="fill:url(#linearGradient3379);fill-opacity:1;stroke:#000000;stroke-width:0.62875605;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"        d="m 687.87312,46.329693 -24.70028,0 0,-20.81792 24.70028,0 0,20.81792 z m -1.78128,-18.820463 -16.3085,0 0,16.823007 16.3085,0 0,-16.823007 z" />   </g> </svg> '
};

window.NSSketchpad = NSSketchpad;
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/misc.js
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
/*global window*/

/**
 * Generate random color
 * @param  {object} config - config of generator
 * @return {object} - rgba(number,number,number,1)
 */
function randomColor() {
    "use strict";
    var color = {
        r: Math.floor(Math.random() * 255),
        g: Math.floor(Math.random() * 0),//debug todo
        b: Math.floor(Math.random() * 0),//debug todo
        a: 1

    };
    return color;
}

window.randomColor = randomColor;
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
/*global window, alert*/
/*global HTMLElement*/
/*global Progressbar*/

/**
 * Resources manager
 * @param {object} config - 
 */
function Resources(config) {
    "use strict";
    this.images = [];
    this.config = config;
    this.sketchpad = config.sketchpad;
    return this;
}

Object.assign(Resources.prototype, {


    getImage: function getImage(url, callback, onError) {
        "use strict";
        var record,
            i;

        var that = this;
        function onImageLoaded(ignore) {
            callback(record);
            that.sketchpad.planRefreshWindow(0, "resources.js:getImage:onImageLoadedOnce");//to optimize: refres only if there are new frames
        }
        function onImageLoadedOnce(e) {
            record.loaded = true;
            record.success = true;
            console.log("on image loaded");
            record.loadEvent = e;
            record.progressbar.uploadComplete();
            onImageLoaded(e);
        }

        function onImageFail(e) {
            record.loaded = true;
            record.success = false;
            record.loadEvent = e;
            record.progressbar.cancel();
            if (typeof onError === "function") {
                return onError(record);
                // record.img.addEventListener("abort", onError);
            }
        }

        for (i = 0; i < this.images.length; i += 1) {
            record = this.images[i];
            if (record.url === url) {
                if (record.loaded) {
                    if (record.success) {
                        callback(record);
                    } else {
                        if (typeof onError === "function") {
                            return onError(record);
                        }
                    }
                } else {
                    // we need this image again even when is loading
                    record.img.addEventListener("load", onImageLoaded);
                    // if (typeof onError === "function") {
                    //     record.img.addEventListener("error", onError);
                    //     // record.img.addEventListener("abort", onError);
                    // }
                }
                return;
            }
        }
        var img = new Image();
        img.crossOrigin = "anonymous";//cross orgin fix
        var progressbar = new Progressbar({
            progressParentEl: this.sketchpad.progressParentEl
        });
        progressbar.startFakeProgress();
        record = {
            url: url,
            loaded: false,
            progressbar: progressbar,
            img: img
        };
        img.src = url;
        img.addEventListener("load", onImageLoadedOnce);
        img.addEventListener("error", onImageFail);
        this.images.push(record);
    }
});



window.Resources = Resources;


/*global NSSketchpad*/
/*global window, alert, Eventsmanager, Progressbar*/
/*global atob, File*/
function Imagehost(config) {
    "use strict";
    // Call parent constructor
    Eventsmanager.call(this, config);

    this.File = undefined;
    this.config = config;

    this.postPdfUrl = (NSSketchpad && NSSketchpad.postPdfUrl) || "https://uploader.imagehost.pro:3443/upload";
    this.postImageUrl = (NSSketchpad && NSSketchpad.postImageUrl) || "https://uploader.imagehost.pro:3443/upload";
    this.postWebshotUrl = (NSSketchpad && NSSketchpad.postWebshotUrl) || "https://uploader.imagehost.pro:3443/webshot?site=";
    this.proxyImageUrl = (NSSketchpad && NSSketchpad.proxyImageUrl) || "https://imagehost.pro/proxy";
    this.proxyExcludedDomain = (NSSketchpad && NSSketchpad.proxyExcludedDomain) || "imagehost.pro";

    if (config.file) {
        this.uploadFile(config.file);
    }
    if (config.url) {
        if (this.isDataURL(config.url)) {
            config.file = this.dataURItoFile(config.url);
            if (config.file) {
                this.uploadFile(config.file);
            } else {
                console.error("Error - wrong data url", config.url);
                return this;
            }
        } else {
            this.proxyUrl(config.url);
        }
    }
    this.progressbar = new Progressbar({
        name: config.url,
        progressParentEl: config.progressParentEl || window.document.body,
        style: {
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 200,
            height: "2px",
            width: "2px",
            backgroundColor: "rgba(155, 0, 0, 0.5)"
        }
    });
    // this.prepareLoadingElements();
    return this;
}

Imagehost.prototype = Object.create(Eventsmanager.prototype);

Object.assign(Imagehost.prototype, {
    // prepareLoadingElements: function () {
    //     "use strict";
    //     // alert("prepare elements");
    //     this.loadingBarEl = document.createElement("div");
    //     Object.assign(this.loadingBarEl.style, {
    //         position: "absolute",
    //         top: 0,
    //         left: 0,
    //         zIndex: 200,
    //         height: "2px",
    //         width: "2px",
    //         backgroundColor: "rgba(155, 0, 0, 0.9)"
    //     });
    //     var progressParentEl = this.config.progressParentEl || window.document.body;
    //     // console.log("!!!", progressParentEl, this.config);
    //     progressParentEl.appendChild(this.loadingBarEl);
    // },
    // fileSelected: function fileSelected() {
    //     "use strict";
    //     var file = document.getElementById('fileToUpload').files[0];
    //     if (file) {
    //         var fileSize = 0;
    //         if (file.size > 1024 * 1024) {
    //             fileSize = String(Math.round(file.size * 100 / (1024 * 1024)) / 100) + 'MB';
    //         } else {
    //             fileSize = String(Math.round(file.size * 100 / 1024) / 100) + 'KB';
    //         }

    //         document.getElementById('fileName').innerHTML = 'Name: ' + file.name;
    //         document.getElementById('fileSize').innerHTML = 'Size: ' + fileSize;
    //         document.getElementById('fileType').innerHTML = 'Type: ' + file.type;
    //     }
    // },
    isDataURL: function isDataURL(s) {
        "use strict";
        return !!s.match(/^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i);
    },

    dataURItoFile: function dataURItoFile(dataURI) {
        "use strict";
        if (typeof dataURI !== 'string') {
            this.dispatch("error", {type: "upload", message: "dataURI must be a string."});
            return;
        }
        dataURI = dataURI.split(',');
        var type = dataURI[0].split(':')[1].split(';')[0],
            byteString = atob(dataURI[1]),
            byteStringLength = byteString.length,
            arrayBuffer = new ArrayBuffer(byteStringLength),
            intArray = new Uint8Array(arrayBuffer);
        var i;
        for (i = 0; i < byteStringLength; i += 1) {
            intArray[i] = byteString.charCodeAt(i);
        }

        return new File([intArray], "file", {
            type: type
        });
    },
    proxyUrl: function proxyUrl(url) {
        "use strict";
        var parser = document.createElement('a');
        parser.href = url;
        var that = this;

        function dispatchSuccess(newUrl) {
            //make free one event loop for subscibers
            setTimeout(function () {
                that.dispatch("success", {
                    status: "ok",
                    url: newUrl
                });
            }, 0);
        }

        if (String(parser.hostname).indexOf(this.proxyExcludedDomain) !== -1) {
            dispatchSuccess(url);
        } else {
            dispatchSuccess(this.proxyImageUrl + "?url=" + encodeURIComponent(url));
        }
    },

    uploadProgress: function uploadProgress(e) {
        "use strict";

        this.dispatch("progress", e.loaded / e.total);
        // this.loadingBarEl.style.width = parseInt(e.loaded / e.total * 100, 10) + "%";
    },

    /**
     * Uploads file
     * @param  {File} File  - file
     */
    uploadFile: function uploadFile(File) {
        "use strict";
        this.File = File;
        // console.log("UPLOAD FILE", File);
        var fd = new FormData();
        fd.append("fileToUpload", File);
        var xhr = new XMLHttpRequest();
        var that = this;
        xhr.upload.addEventListener("progress", function (e) {
            // console.log("uploading progress", e);
            that.uploadProgress(e);
            that.progressbar.uploadProgress(e);
        }, false);

        // xhr.upload.onprogress = function (e) {
        //     // console.log("uploading progress", that.id);
        //     // that.uploadProgress(e);
        // };

        xhr.addEventListener("load", function (e) {
            console.log("uploading load", e);
            that.uploadComplete(e);
            that.progressbar.uploadComplete(e);
        }, false);

        xhr.addEventListener("error", function (e) {
            console.log("uploading error", e);
            that.uploadFailed(e);
            that.progressbar.uploadFailed(e);
        }, false);

        xhr.addEventListener("abort", function (e) {
            that.uploadCanceled(e);
            that.progressbar.uploadCanceled(e);
        }, false);
        // this.uploadProgress(0);


        var postUrl;
        // alert("!!!" + this.postPdfUrl);
        switch (String(File.type)) {
        case "application/pdf":
            postUrl = this.postPdfUrl;
            break;
        default:
            postUrl = this.postImageUrl;
        }
        // alert(File.type + "|" + postUrl);
        xhr.open("POST", postUrl);
        xhr.setRequestHeader("Content-Type", File.type);
        xhr.setRequestHeader("Content-Name", encodeURI(File.name));
        xhr.setRequestHeader("Content-Size", File.size);
        xhr.setRequestHeader("Content-LastModified", File.lastModified);
        xhr.send(File);
        this.dispatch("upload", xhr);

    },

    uploadComplete: function uploadComplete(e) {
        "use strict";
        // this.loadingBarEl.parentElement.removeChild(this.loadingBarEl);
        // this.uploadProgress(1);
        var response = {};
        try {
            response = JSON.parse(e.target.response);
        } catch (err) {
            this.dispatch("error", {type: "parse", title: "Upload fail", message: "Uknown response from server.", err: err});
        }
        if (response && response.status === "ok") {
            this.dispatch("success", response);
        } else {
            this.dispatch("error", {type: "response", title: "Upload fail", message: (response && response.message) || "Your upload was rejected by server.", response: response});
        }
    },

    uploadFailed: function uploadFailed(e) {
        "use strict";
        // this.loadingBarEl.parentElement.removeChild(this.loadingBarEl);
        console.error("uploadFailed", e);
        this.dispatch("error", {type: "fail", title: "Upload fail", message: "There was an error attempting to upload the file.", e: e});
    },

    uploadCanceled: function uploadCanceled(e) {
        "use strict";
        // this.loadingBarEl.parentElement.removeChild(this.loadingBarEl);
        this.dispatch("error", {type: "cancelled", title: "Upload cancelled", message: "The upload has been canceled by the user or the browser dropped the connection.", e: e});
    }
});

window.Imagehost = Imagehost;


/*global NSSketchpad*/
/*global window, alert, Eventsmanager*/
/*global atob, File*/

/**
 * Progressbar component
 *
 * @param {object} config - config.progressParentEl contain parent element where progress bar will be attached, if null then document.body will be parent element;
 *                          config.style contains styles for progressbar
 *
 */
function Progressbar(config) {
    "use strict";
    // Call parent constructor
    Eventsmanager.call(this, config);
    this.config = Object.assign({}, config);
    this.prepareLoadingElements();
    return this;
}

Progressbar.prototype = Object.create(Eventsmanager.prototype);

Object.assign(Progressbar.prototype, {

    /**
     * Creates HTML Elements of component
     */
    prepareLoadingElements: function () {
        "use strict";
        this.id = parseInt(Math.random() * 1000, 10);//"rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
        // console.log("CONSTRUCTOR ProgressBar", this.id);
        // alert("prepare elements");

        this.loadingBarEl = document.createElement("div");
        var style = Object.assign({
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 200,
            height: "2px",
            width: "2px",
            backgroundColor: "rgba(0, 0, 155, 0.5)",
            transition: "width 0.4s ease-in-out",
            webkitTransition: "width 0.4s ease-in-out",
            MozTransition: "width 0.5s ease-in-out",
            msTransition: "width 0.5s ease-in-out",
            OTransition: "width 0.5s ease-in-out"
        }, this.config.style);
        Object.assign(this.loadingBarEl.style, style);
        // console.log("PREPARE NEW PROGRESS BAR", style);
        if (!this.config.progressParentEl) {
            this.config.progressParentEl = window.document.body;
        }
        var progressParentEl = this.config.progressParentEl;
        progressParentEl.appendChild(this.loadingBarEl);
    },

    /**
     * Event handler for progress
     * @param  {object} e - ex. ``{total: 100, loaded: 50}``
     */
    uploadProgress: function uploadProgress(e) {
        "use strict";
        // console.log("upload", this.id);
        this.dispatch("progress", e.loaded / e.total);
        this.loadingBarEl.style.width = parseInt(e.loaded / e.total * 100, 10) + "%";
    },

    /**
     * Removes HTML Elements of component
     */
    uploadCompleteDestructor: function uploadCompleteDestructor() {
        "use strict";
        // debugger;
        var progressParentEl = this.config.progressParentEl;
        // console.log("UPLOAD COMPLETTE", "LB:", this.loadingBarEl, "PE:", progressParentEl, "CF:", this.config);
        // console.log("DESTRUCTOR ProgressBar", this.id, this.loadingBarEl);
        progressParentEl.removeChild(this.loadingBarEl);
    },

    /**
     * Event handler for complete
     */
    uploadComplete: function uploadComplete() {
        "use strict";
        if (this.completed) {
            console.log("%cDOUBLED COMPLETE", "background-color:orange", this.id);
            return;
        }
        this.completed = true;
        this.uploadProgress({
            loaded: 1,
            total: 1
        });
        clearInterval(this.fakeProgressTo);
        setTimeout(this.uploadCompleteDestructor.bind(this), 500);
    },

    /**
     * Starts fake, never ending progress (better spinner)
     */
    startFakeProgress: function fakeProgress() {
        "use strict";
        var that = this;
        that.fakeProgress = 0;
        that.fakeTotal = 100;
        this.fakeProgressTo = setInterval(function () {
            // console.log("ProgressBar - interval", that.id, that.fakeProgress);
            that.fakeProgress += (that.fakeTotal - that.fakeProgress) * 0.01;
            // if (that.fakeProgress >= that.fakeTotal) {
            //     that.fakeTotal *= 2;
            // }
            that.uploadProgress({
                loaded: that.fakeProgress,
                total: that.fakeTotal
            });
        }, 100);

    },

    /**
     * Cancel progres bar and remove it as soon as possible
     */
    cancel: function cancel(e) {
        "use strict";
        if (this.completed) {
            console.log("%DOUBLED CANCEL", "background-color:orange", this.id);
            return;
        }
        console.log("%cCANCEL", "background-color:orange", this.id, e);
        clearInterval(this.fakeProgressTo);
        this.config.progressParentEl.removeChild(this.loadingBarEl);
        this.completed = true;
        // this.uploadComplete();
    },
    uploadCanceled: function uploadCanceled(e) {
        "use strict";
        this.cancel(e);
    },
    uploadFailed: function uploadFailed(e) {
        "use strict";
        this.cancel(e);
    }

});

window.Progressbar = Progressbar;


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
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/colorpalette.js
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
function Colorpalette(config) {
    "use strict";
    // Call parent constructor
    Eventsmanager.call(this, config);

    if (typeof config.keyModifiers !== "object") {
        config.keyModifiers = {};
    }
    var el = config.containerEl;
    this.containerEl = el;
    el.classList.add("colorpalette");

    var width = 200,
        height = 220;


    this.width = width;
    this.height = height;

    this.color = {
        hue: 0,
        saturation: 0,
        value: 0,
        red: 0,
        green: 0,
        blue: 0,
        alpha: 1
    };

    el.style.position = "relative";
    el.style.width = width + "px";
    el.style.height = height + "px";//yeap
    el.style.display = "inline-block";

    this.colorBgEl = document.createElement("div");
    this.colorBgEl.style.backgroundImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAB3RJTUUH4AcGEAAdMvv9RwAAAFBJREFUWMPt18EJACAIhWGLNnJah3Im28B36CDE/66CfBCirYgoa5KZ9hJ3b+vbhgMAAICj5lzNsYrqzxMAAAAAAAAA8/eA2vf8CwAA+B5wAUhhDw4II7MzAAAAAElFTkSuQmCC')";
    this.colorBgEl.style.backgroundSize = "16px";
    this.colorBgEl.style.backgroundPosition = "50% 50%";
    this.colorBgEl.className = "color-bg";
    this.colorBgEl.style.width = width + "px";
    this.colorBgEl.style.height = Math.floor(height * (1 / 11)) + "px";
    this.colorBgEl.style.borderRadius = window.radius + "px " + window.radius + "px 0px 0px";
    this.colorBgEl.style.overflow = "hidden";

    this.colorEl = document.createElement("div");
    this.colorEl.className = "color";
    this.colorEl.style.width = "100%";
    this.colorEl.style.height = "100%";
    this.colorEl.style.cursor = "pointer";

    this.colorBgEl.appendChild(this.colorEl);
    this.colorBgEl.style.position = "absolute";
    this.colorBgEl.style.top = "0px";
    this.colorBgEl.style.left = "0px";


    this.paletteCanvas = document.createElement("canvas");
    this.paletteCanvas.className = "palette";
    this.paletteCanvas.width = width * 0.9;
    this.paletteCanvas.height = Math.floor(height * (9 / 11));
    this.paletteContext2d = this.paletteCanvas.getContext("2d");
    this.paletteIData = this.paletteContext2d.createImageData(this.paletteCanvas.width, this.paletteCanvas.height);
    this.paletteCanvas.style.cursor = "crosshair";
    this.paletteCanvas.style.position = "absolute";
    this.paletteCanvas.style.left = "0px";
    this.paletteCanvas.style.top = Math.floor(height * (1 / 11)) + "px";

    this.palettePointerEl = document.createElement("div");
    this.palettePointerEl.className = "pointer palette-pointer";
    this.palettePointerEl.position = "absolute";
    this.palettePointerEl.style.width = width * 0.06 + "px";
    this.palettePointerEl.style.height = width * 0.06 + "px";
    this.palettePointerEl.style.backgroundColor = "white";
    this.palettePointerEl.style.position = "absolute";
    this.palettePointerEl.style.borderRadius = "50%";
    this.palettePointerEl.style.cursor = "crosshair";
    this.palettePointerEl.style.boxShadow = "inset 0 0 2px #000";
    this.hueCanvas = document.createElement("canvas");
    this.hueCanvas.className = "hue";
    this.hueCanvas.width = width * 0.1;
    this.hueCanvas.height = height * (9 / 11);
    this.hueContext2d = this.hueCanvas.getContext("2d");
    this.hueIData = this.hueContext2d.createImageData(this.hueCanvas.width, this.hueCanvas.height);
    this.hueCanvas.style.cursor = "row-resize";

    this.hueCanvas.style.position = "absolute";
    this.hueCanvas.style.top = (1 / 11) * height + "px";
    this.hueCanvas.style.left = 0.9 * width + "px";

    this.hueSliderEl = document.createElement("div");
    this.hueSliderEl.className = "slider hue-slider";
    this.hueSliderEl.style.width = width * 0.12 + "px";
    this.hueSliderEl.style.height = height * 0.03 + "px";
    this.hueSliderEl.style.position = "absolute";
    this.hueSliderEl.style.top = 0.1 * height + "px";
    this.hueSliderEl.style.left = 0.89 * width + "px";
    this.hueSliderEl.style.backgroundColor = "white";
    this.hueSliderEl.style.cursor = "row-resize";
    this.hueSliderEl.style.boxShadow = "inset 0 0 2px #000";
    this.hueSliderEl.style.zIndex = 100;

    this.alphaCanvas = document.createElement("canvas");
    this.alphaCanvas.className = "alpha";
    this.alphaCanvas.width = width;
    this.alphaCanvas.height = height * (1 / 11);
    this.alphaContext2d = this.alphaCanvas.getContext("2d");
    this.alphaIData = this.alphaContext2d.createImageData(this.alphaCanvas.width, this.alphaCanvas.height);

    this.alphaCanvas.style.backgroundImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAB3RJTUUH4AcGEAAdMvv9RwAAAFBJREFUWMPt18EJACAIhWGLNnJah3Im28B36CDE/66CfBCirYgoa5KZ9hJ3b+vbhgMAAICj5lzNsYrqzxMAAAAAAAAA8/eA2vf8CwAA+B5wAUhhDw4II7MzAAAAAElFTkSuQmCC')";
    this.alphaCanvas.style.backgroundSize = "16px";
    this.alphaCanvas.style.backgroundPosition = "50% 50%";
    this.alphaCanvas.style.cursor = "col-resize";
    this.alphaCanvas.style.position = "absolute";
    this.alphaCanvas.style.top = (10 / 11) * height + "px";
    this.alphaCanvas.style.left = "0px";
    this.alphaCanvas.style.borderRadius = "0px 0px " + window.radius + "px " + window.radius + "px";
    this.alphaCanvas.style.overflow = "hidden";


    this.alphaSliderEl = document.createElement("div");
    this.alphaSliderEl.className = "slider alpha-slider";
    this.alphaSliderEl.style.width = width * 0.03 + "px";
    this.alphaSliderEl.style.height = height * 0.11 + "px";
    this.alphaSliderEl.style.backgroundColor = "white";
    this.alphaSliderEl.style.position = "absolute";
    this.alphaSliderEl.style.top = (10 / 11) * height - height * 0.01 + "px";
    this.alphaSliderEl.style.left = this.alphaCanvas.width - width * 0.015 + "px";
    this.alphaSliderEl.style.cursor = "col-resize";
    this.alphaSliderEl.style.boxShadow = "inset 0 0 2px #000";
    this.alphaSliderEl.style.zIndex = 100;

    this.redInput = document.createElement("input");
    this.redInput.title = "R:";

    this.greenInput = document.createElement("input");
    this.greenInput.title = "G:";

    this.blueInput = document.createElement("input");
    this.blueInput.title = "B:";

    this.alphaInput = document.createElement("input");
    this.alphaInput.title = "A:";

    this.valuesEl = document.createElement("div");

    var that = this;

    [this.redInput, this.greenInput, this.blueInput, this.alphaInput].forEach(function (inputEl) {
        var titleEl = document.createElement("span");
        titleEl.textContent = inputEl.title;
        that.valuesEl.appendChild(titleEl);
        that.valuesEl.appendChild(inputEl);
        inputEl.type = "number";
        inputEl.className = inputEl.title;
        if (inputEl === that.alphaInput) {
            inputEl.min = 0;
            inputEl.max = 1;
            inputEl.step = 0.01;
            inputEl.maxLength = 4;
        } else {
            inputEl.min = 0;
            inputEl.max = 255;
            inputEl.step = 1;
            inputEl.maxLength = 3;
        }

        inputEl.addEventListener("change", function () {
            that.updateFromInputs();
        });
    });

    el.appendChild(this.colorBgEl);
    el.appendChild(this.paletteCanvas);
    el.appendChild(this.hueCanvas);
    el.appendChild(this.alphaCanvas);

    el.appendChild(this.hueSliderEl);
    el.appendChild(this.alphaSliderEl);
    el.appendChild(this.palettePointerEl);
    // el.appendChild(this.valuesEl);


    this.drawHue();
    this.drawPalette(this.color.hue);

    function changeHueEvent(e) {
        var y = that.normalize(e.offsetY, 0, that.hueCanvas.height);
        var hue = (y / that.hueCanvas.height) * 360;
        that.changeHue(hue);
    }
    addEvent(this.hueCanvas, "slide", changeHueEvent);
    addEvent(this.colorEl, "tap", function () {
        var color = that.getColor();
        that.dispatch("set", {color: color});
    });
    // this.hueCanvas.addEventListener("mousemove", changeHue);



    function pickPaletteEvent(e) {
        var x = that.normalize(e.offsetX, 0, that.paletteCanvas.width);
        var y = that.normalize(e.offsetY, 0, that.paletteCanvas.height);
        var s = (x / that.paletteCanvas.width) * 100,
            v = (y / that.paletteCanvas.height) * 100;
        that.pickPalette(s, v);
    }

    addEvent(this.paletteCanvas, "slide", pickPaletteEvent);


    function changeAlphaEvent(e) {
        var x = that.normalize(e.offsetX, 0, that.alphaCanvas.width);
        var alpha = (x / that.alphaCanvas.width) * 1;
        that.changeAlpha(alpha);
    }

    addEvent(this.alphaCanvas, "slide", changeAlphaEvent);
    this.setHueSlider(0);
    if (config.color) {
        this.setColor(config.color);
    }


    function alphaWheel(e) {
        that.changeAlpha(that.color.alpha - (e.deltaX / 100) / 2);
        e.preventDefault();
    }
    this.alphaCanvas.addEventListener("wheel", alphaWheel);
    this.alphaSliderEl.addEventListener("wheel", alphaWheel);

    function hueWheel(e) {
        that.changeHue(that.color.hue - e.deltaY / 2);
        e.preventDefault();
    }
    this.hueCanvas.addEventListener("wheel", hueWheel);
    this.hueSliderEl.addEventListener("wheel", hueWheel);

    function paletteWheel(e) {
        that.pickPalette(that.color.saturation - e.deltaX / 2, that.color.value - e.deltaY / 2);
        e.preventDefault();
    }
    this.paletteCanvas.addEventListener("wheel", paletteWheel);
    this.palettePointerEl.addEventListener("wheel", paletteWheel);

    this.keyshortcuts = new Keyshortcuts();
    this.keyshortcuts.disable();


    this.keyshortcuts.addShortcut(Object.assign({altKey: false, keyCode: 38, repeatable: true}, config.keyModifiers), function () {//up
        // e.stopImmediatePropagation();
        that.changeHue(that.color.hue - 1);
    });
    this.keyshortcuts.addShortcut(Object.assign({altKey: false, keyCode: 40, repeatable: true}, config.keyModifiers), function () {//down
        // e.stopImmediatePropagation();
        that.changeHue(that.color.hue + 1);
    });
    this.keyshortcuts.addShortcut(Object.assign({altKey: false, keyCode: 37, repeatable: true}, config.keyModifiers), function () {//left
        // e.stopImmediatePropagation();
        that.changeAlpha(that.color.alpha - 0.01);
    });
    this.keyshortcuts.addShortcut(Object.assign({altKey: false, keyCode: 39, repeatable: true}, config.keyModifiers), function () {//right
        // e.stopImmediatePropagation();
        that.changeAlpha(that.color.alpha + 0.01);
    });

    this.keyshortcuts.addShortcut(Object.assign({altKey: true, keyCode: 38, repeatable: true}, config.keyModifiers), function () {//shift + up
        // e.stopImmediatePropagation();
        that.pickPalette(that.color.saturation, that.color.value - 1);
    });
    this.keyshortcuts.addShortcut(Object.assign({altKey: true, keyCode: 40, repeatable: true}, config.keyModifiers), function () {//shift + down
        // e.stopImmediatePropagation();
        that.pickPalette(that.color.saturation, that.color.value + 1);
    });
    this.keyshortcuts.addShortcut(Object.assign({altKey: true, keyCode: 37, repeatable: true}, config.keyModifiers), function () {//shift + left
        // e.stopImmediatePropagation();
        that.pickPalette(that.color.saturation - 1, that.color.value);
    });
    this.keyshortcuts.addShortcut(Object.assign({altKey: true, keyCode: 39, repeatable: true}, config.keyModifiers), function () {//shift + right
        // e.stopImmediatePropagation();
        that.pickPalette(that.color.saturation + 1, that.color.value);
    });


    return this;

}
Colorpalette.prototype = Object.create(Eventsmanager.prototype);

Object.assign(Colorpalette.prototype, {

    normalize: function normalize(v, min, max) {
        "use strict";
        if (v < min) {
            v = min;
        }
        if (v > max) {
            v = max;
        }
        return v;
    },
    pickPalette: function pickPalette(s, v) {
        "use strict";
        s = this.normalize(s, 0, 100);
        v = this.normalize(v, 0, 100);
        this.color.saturation = s;
        this.color.value = v;
        var rgb = this.HSVtoRGB(this.color.hue, this.color.saturation, this.color.value);
        this.setPalettePointer(this.color.saturation, this.color.value);
        var rgba = rgb;
        rgba.a = this.color.alpha;
        this.setColor(rgba);
    },
    changeHue: function changeHue(hue) {
        "use strict";
        hue = hue % 360;
        if (hue < 0) {
            hue += 360;
        }
        // console.log(hue);
        this.setHueSlider(hue);
        this.color.hue = hue;
        this.drawPalette(hue);

        var rgb = this.HSVtoRGB(hue, this.color.saturation, this.color.value);
        rgb.a = this.color.alpha;
        // if (rgb.r || rgb.g || rgb.b) {
        //     this.setColor(rgb);
        // }
        this.setColor(rgb);
        // this.color.red = rgb.r;
        // this.color.green = rgb.g;
        // this.color.blue = rgb.b;

        // this.redInput.value = rgb.r;
        // this.greenInput.value = rgb.g;
        // this.blueInput.value = rgb.b;

        // this.setHueSlider(hue);
        // this.darwAlpha(rgb);
        // this.setPalettePointer(this.color.saturation, this.color.value);

        // this.setColor({
        //     r: this.color.red,
        //     g: this.color.green,
        //     b: this.color.blue,
        //     a: this.color.alpha
        // });
        // var rgba = this.getColor();
        // this.colorEl.style.backgroundColor = "rgba(" + rgba.red + "," + rgba.green + "," + rgba.blue + "," + rgba.alpha + ")";

        // this.triggerUpdate();

        //that.setColor(rgb);
    },
    changeAlpha: function changeAlpha(alpha) {
        "use strict";
        alpha = this.normalize(alpha, 0, 1);
        this.color.alpha = alpha;
        this.setAlpha(alpha);
    },
    focus: function focus() {
        "use strict";
        this.isFocused = true;
    },
    blur: function blur() {
        "use strict";
        this.isFocused = false;
    },
    getColor: function getColor() {
        "use strict";
        var color = {
            red: parseInt(this.color.red, 10),
            green: parseInt(this.color.green, 10),
            blue: parseInt(this.color.blue, 10),
            alpha: parseFloat(this.color.alpha)
        };
        return color;
    },
    HSVtoRGB: function HSVtoRGB(hue, saturation, value) {
        "use strict";
        var sat = saturation / 100,
            V = value / 100,
            C = sat * V,
            H = hue / 60,
            X = C * (1 - Math.abs(H % 2 - 1)),
            m = V - C,
            precision = 255;

        C = (C + m) * precision;
        X = (X + m) * precision;
        m = m * precision;

        if (H >= 0 && H < 1) {
            return {r: C, g: X, b: m};
        }
        if (H >= 1 && H < 2) {
            return {r: X, g: C, b: m};
        }
        if (H >= 2 && H < 3) {
            return {r: m, g: C, b: X};
        }
        if (H >= 3 && H < 4) {
            return {r: m, g: X, b: C};
        }
        if (H >= 4 && H < 5) {
            return {r: X, g: m, b: C};
        }
        if (H >= 5 && H < 6) {
            return {r: C, g: m, b: X};
        }
        return {r: 0, g: 0, b: 0};
    },

    /**
     * [RGBtoHSV description]
     * @param {number} red   0-255
     * @param {number} green 0-255
     * @param {number} blue  0-255
     * @return {object} - {h: number, s: number, v: number}
     */
    RGBtoHSV: function RGBtoHSV(red, green, blue) {
        "use strict";
        var r = red / 255;
        var g = green / 255;
        var b = blue / 255;

        var cmax = Math.max(r, g, b);
        var cmin = Math.min(r, g, b);
        var delta = cmax - cmin;
        var h = 0;
        var s = 0;

        if (delta) {
            if (cmax === r) {
                h = ((g - b) / delta);
            }
            if (cmax === g) {
                h = 2 + (b - r) / delta;
            }
            if (cmax === b) {
                h = 4 + (r - g) / delta;
            }
            if (cmax) {
                s = delta / cmax;
            }
        }

        var hue,
            saturation,
            value;
        hue = 60 * h;
        if (hue < 0) {
            hue += 360;
        }
        saturation = (s * 100);
        value = (cmax * 100);
        return {
            h: hue,
            s: saturation,
            v: value
        };
    },

    putPixel: function (idata, x, y, pixel) {
        "use strict";
        var i = (x + y * idata.width) * 4;
        idata.data[i] = pixel.r;
        idata.data[i + 1] = pixel.g;
        idata.data[i + 2] = pixel.b;
        idata.data[i + 3] = pixel.a;
    },

    drawHue: function drawHue() {
        "use strict";
        var x,
            y,
            c;
        for (x = 0; x < this.hueCanvas.width; x += 1) {
            for (y = 0; y < this.hueCanvas.height; y += 1) {
                c = this.HSVtoRGB((y / this.hueCanvas.height) * 360, 100, 100);
                this.putPixel(this.hueIData, x, y, {
                    r: c.r,
                    g: c.g,
                    b: c.b,
                    a: 255
                });
            }
        }
        this.hueContext2d.putImageData(this.hueIData, 0, 0);
    },

    setAlphaSlider: function setAlphaSlider(alpha) {
        "use strict";
        // console.log("setAlphaSlider", alpha);
        this.alphaSliderEl.style.left = this.alphaCanvas.width * (alpha / 1) - this.width * 0.015 + "px";
    },

    setAlpha: function setAlpha(alpha) {
        "use strict";
        alpha = Math.round(alpha * 100) / 100;
        this.color.alpha = alpha;
        this.setColor({
            r: this.color.red,
            g: this.color.green,
            b: this.color.blue,
            a: this.color.alpha
        });
    },

    setHueSlider: function setHueSlider(hue) {
        "use strict";
        this.hueSliderEl.style.top = this.height * (1 / 11) + this.hueCanvas.height * (hue / 360) - this.height * 0.015 + "px";
    },

    setPalettePointer: function setPalettePointer(s, v) {
        "use strict";
        var x = this.paletteCanvas.width * (s / 100),
            y = this.paletteCanvas.height * (v / 100);
        this.palettePointerEl.style.left = -this.width * 0.03 + x + "px";
        this.palettePointerEl.style.top = -this.height * 0.03 + this.height * (1 / 10) + y + "px";
    },

    triggerUpdate: function triggerUpdate() {
        "use strict";
        var rgba = this.getColor();
        this.dispatch("change", {color: rgba});
    },
    updateFromInputs: function updateFromInputs() {
        "use strict";
        this.setColor({
            r: this.redInput.value,
            g: this.greenInput.value,
            b: this.blueInput.value,
            a: this.alphaInput.value
        });
        this.setAlpha(this.alphaInput.value);
    },

    setColor: function setColor(col, noPropagate) {
        "use strict";
        var HSV = {
            h: this.color.hue,
            s: this.color.saturation,
            v: this.color.value
        };
        if (col.r || col.g || col.b) {
            HSV = this.RGBtoHSV(col.r, col.g, col.b);
        }
        if (col.r === col.g && col.g === col.b) {
            HSV.h = this.color.hue;
        }
        // console.log("colorpalette.js:setColor", col);
        this.color.red = col.r;
        this.color.green = col.g;
        this.color.blue = col.b;
        this.color.alpha = col.a;
        this.color.hue = HSV.h;
        this.color.saturation = HSV.s;
        this.color.value = HSV.v;
        this.redInput.value = col.r;
        this.greenInput.value = col.g;
        this.blueInput.value = col.b;
        this.alphaInput.value = col.a;
        // console.log(JSON.stringify(this.color));
        // if (this.color.saturation || this.color.value) {
        this.setHueSlider(HSV.h);
        // }
        this.drawPalette(HSV.h);
        this.darwAlpha(col);
        this.setAlphaSlider(col.a);
        this.setPalettePointer(HSV.s, HSV.v);

        var rgba = this.getColor();
        this.colorEl.style.backgroundColor = "rgba(" + rgba.red + "," + rgba.green + "," + rgba.blue + "," + rgba.alpha + ")";
        // console.log("rgba(" + rgba.red + "," + rgba.green + "," + rgba.blue + "," + rgba.alpha + ")");
        if (!noPropagate) {
            this.triggerUpdate();
        }
    },


    drawPalette: function drawPalette(hue) {
        "use strict";
        var x,
            y,
            c;
        for (x = 0; x < this.paletteCanvas.width; x += 1) {
            for (y = 0; y < this.paletteCanvas.height; y += 1) {
                c = this.HSVtoRGB(hue, (x / this.paletteCanvas.width) * 100, (y / this.paletteCanvas.height) * 100);
                this.putPixel(this.paletteIData,
                        x,
                        y,
                        {
                    r: c.r,
                    g: c.g,
                    b: c.b,
                    a: 255
                });
            }
        }
        this.paletteContext2d.putImageData(this.paletteIData, 0, 0);
    },


    darwAlpha: function darwAlpha(col) {
        "use strict";
        var x,
            y;
        for (x = 0; x < this.alphaCanvas.width; x += 1) {
            for (y = 0; y < this.alphaCanvas.height; y += 1) {
                this.putPixel(this.alphaIData, x, y, {
                    r: col.r,
                    g: col.g,
                    b: col.b,
                    a: 255 * (x / this.alphaCanvas.width)
                });
            }
        }
        this.alphaContext2d.putImageData(this.alphaIData, 0, 0);
    }

});
window.Colorpalette = Colorpalette;
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/pixelpicker.js
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
function Pixelpicker(config) {
    "use strict";
    // Call parent constructor
    Eventsmanager.call(this, config);

    if (typeof config.keyModifiers !== "object") {
        config.keyModifiers = {};
    }
    var el = config.containerEl;
    this.containerEl = el;
    el.classList.add("Pixelpicker");

    var width = 200,
        height = 220;


    this.width = width;
    this.height = height;

    this.threshold = 0.15;
    this.x = 0;
    this.y = 0;

    this.color = {
        hue: 0,
        saturation: 0,
        value: 0,
        red: 0,
        green: 0,
        blue: 0,
        alpha: 1
    };
    // alert(1);
    el.style.position = "relative";
    el.style.width = width + "px";
    el.style.height = height + "px";//yeap
    el.style.display = "inline-block";

    this.colorBgEl = document.createElement("div");
    this.colorBgEl.style.backgroundImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAB3RJTUUH4AcGEAAdMvv9RwAAAFBJREFUWMPt18EJACAIhWGLNnJah3Im28B36CDE/66CfBCirYgoa5KZ9hJ3b+vbhgMAAICj5lzNsYrqzxMAAAAAAAAA8/eA2vf8CwAA+B5wAUhhDw4II7MzAAAAAElFTkSuQmCC')";
    this.colorBgEl.style.backgroundSize = "16px";
    this.colorBgEl.style.backgroundPosition = "50% 50%";
    this.colorBgEl.className = "color-bg";
    this.colorBgEl.style.width = width + "px";
    this.colorBgEl.style.height = Math.floor(height * (1 / 11)) + "px";
    this.colorBgEl.style.borderRadius = window.radius + "px " + window.radius + "px 0px 0px";
    this.colorBgEl.style.overflow = "hidden";

    this.colorEl = document.createElement("div");
    this.colorEl.className = "color";
    this.colorEl.style.width = "100%";
    this.colorEl.style.height = "100%";
    this.colorEl.style.cursor = "pointer";

    this.colorBgEl.appendChild(this.colorEl);
    this.colorBgEl.style.position = "absolute";
    this.colorBgEl.style.top = "0px";
    this.colorBgEl.style.left = "0px";




    this.paletteBgEl = document.createElement("div");
    this.paletteBgEl.className = "palette-bg";
    this.paletteBgEl.style.position = "absolute";
    this.paletteBgEl.style.backgroundImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAB3RJTUUH4AcGEAAdMvv9RwAAAFBJREFUWMPt18EJACAIhWGLNnJah3Im28B36CDE/66CfBCirYgoa5KZ9hJ3b+vbhgMAAICj5lzNsYrqzxMAAAAAAAAA8/eA2vf8CwAA+B5wAUhhDw4II7MzAAAAAElFTkSuQmCC')";
    this.paletteBgEl.style.backgroundSize = "16px";
    this.paletteBgEl.style.backgroundPosition = "50% 50%";
    this.paletteBgEl.style.width = width + "px";
    this.paletteBgEl.style.height = Math.floor(height * (10 / 11)) + "px";
    this.paletteBgEl.style.borderRadius = window.radius + "px " + window.radius + "px 0px 0px";
    this.paletteBgEl.style.overflow = "hidden";
    this.paletteBgEl.style.left = "0px";
    this.paletteBgEl.style.top = Math.floor(height * (1 / 11)) + "px";

    this.paletteCanvas = document.createElement("canvas");
    this.paletteCanvas.className = "palette";
    this.paletteCanvas.width = width;
    this.paletteCanvas.height = Math.floor(height * (10 / 11));
    this.paletteContext2d = this.paletteCanvas.getContext("2d");
    this.paletteIData = this.paletteContext2d.createImageData(this.paletteCanvas.width, this.paletteCanvas.height);
    this.paletteCanvas.style.cursor = "crosshair";
    this.paletteCanvas.style.position = "absolute";
    this.paletteCanvas.style.left = "0px";
    this.paletteCanvas.style.top = Math.floor(height * (1 / 11)) + "px";
    var that = this;

    var img = document.createElement("img");
    img.addEventListener("load", function () {
        // if (config.backgroundImage) {
        //     this.background = document.createElement("div");
        //     this.background.style = "width: 100%; height:100%; position: absolute;";
        //     this.background.style.backgroundImage = "url(" + config.backgroundImage.toString() + ")";
        //     this.background.style.width = img.width + "px";
        //     this.background.style.height = img.height + "px";
        //     el.appendChild(this.background);
        // }

        // var canvas = document.createElement('canvas');
        // canvas.width = img.width;
        // canvas.height = img.height;
        // el.style.width = img.width + "px";
        // el.style.height = img.height + "px";
        // canvas.style = "position: absolute;";
        that.paletteContext2d.drawImage(img, 0, 0, img.width, img.height, 0, 0, that.width, that.width * (img.height / img.width));
        // canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);

        // canvas.addEventListener("click", function (e) {
        //     var pixelData = canvas.getContext('2d').getImageData(e.offsetX, e.offsetY, 1, 1).data;
        //     pickCb(pixelData[0], pixelData[1], pixelData[2], pixelData[3] / 255);
        // });
        // el.appendChild(canvas);
    });
    img.src = config.imageSrc;

    this.palettePointerEl = document.createElement("div");
    this.palettePointerEl.className = "pointer palette-pointer";
    this.palettePointerEl.position = "absolute";
    this.palettePointerEl.style.width = width * 0.06 + "px";
    this.palettePointerEl.style.height = width * 0.06 + "px";
    this.palettePointerEl.style.backgroundColor = "transparent";
    this.palettePointerEl.style.position = "absolute";
    this.palettePointerEl.style.border = "1px solid white";
    this.palettePointerEl.style.borderRadius = "50%";
    this.palettePointerEl.style.cursor = "crosshair";
    this.palettePointerEl.style.boxShadow = "inset 0 0 2px #000";

    this.thresholdSliderEl = document.createElement("div");
    this.thresholdSliderEl.className = "slider alpha-slider";
    this.thresholdSliderEl.style.width = width * 0.03 + "px";
    this.thresholdSliderEl.style.height = height * 0.11 + "px";
    this.thresholdSliderEl.style.backgroundColor = "transparent";
    this.thresholdSliderEl.style.border = "1px solid white";
    this.thresholdSliderEl.style.position = "absolute";
    this.thresholdSliderEl.style.top = -height * 0.01 + "px";
    this.thresholdSliderEl.style.left = this.width - width * 0.015 + "px";
    this.thresholdSliderEl.style.cursor = "col-resize";
    this.thresholdSliderEl.style.boxShadow = "inset 0 0 2px #000";
    this.thresholdSliderEl.style.zIndex = 100;

    this.redInput = document.createElement("input");
    this.redInput.title = "R:";

    this.greenInput = document.createElement("input");
    this.greenInput.title = "G:";

    this.blueInput = document.createElement("input");
    this.blueInput.title = "B:";

    this.alphaInput = document.createElement("input");
    this.alphaInput.title = "A:";

    this.valuesEl = document.createElement("div");


    [this.redInput, this.greenInput, this.blueInput, this.alphaInput].forEach(function (inputEl) {
        var titleEl = document.createElement("span");
        titleEl.textContent = inputEl.title;
        that.valuesEl.appendChild(titleEl);
        that.valuesEl.appendChild(inputEl);
        inputEl.type = "number";
        inputEl.className = inputEl.title;
        if (inputEl === that.alphaInput) {
            inputEl.min = 0;
            inputEl.max = 1;
            inputEl.step = 0.01;
            inputEl.maxLength = 4;
        } else {
            inputEl.min = 0;
            inputEl.max = 255;
            inputEl.step = 1;
            inputEl.maxLength = 3;
        }
        inputEl.addEventListener("change", function () {
            that.updateFromInputs();
        });
    });

    el.appendChild(this.colorBgEl);
    el.appendChild(this.paletteBgEl);
    el.appendChild(this.paletteCanvas);

    el.appendChild(this.thresholdSliderEl);
    el.appendChild(this.palettePointerEl);
    // el.appendChild(this.valuesEl);



    function pickPaletteEvent(e) {
        var x = that.normalize(e.offsetX, 0, that.paletteCanvas.width);
        var y = that.normalize(e.offsetY, 0, that.paletteCanvas.height);
        that.pickPalette(x, y);
    }
    addEvent(this.paletteCanvas, "slide", pickPaletteEvent);


    function changeThresholdEvent(e) {
        var x = that.normalize(e.offsetX, 0, that.width);
        var threshold = (x / that.width) * 1;
        that.changeThreshold(threshold);
    }

    addEvent(this.colorEl, "slide", changeThresholdEvent);

    function thresholdWheel(e) {
        that.changeThreshold(that.threshold - (e.deltaX / 100) / 2);
        e.preventDefault();
    }
    this.colorEl.addEventListener("wheel", thresholdWheel);
    this.thresholdSliderEl.addEventListener("wheel", thresholdWheel);

    this.setThresholdSlider(0);
    if (config.color) {
        this.setColor(config.color);
    }

    function paletteWheel(e) {
        that.pickPalette(that.x - e.deltaX / 2, that.y - e.deltaY / 2);
        e.preventDefault();
    }
    this.paletteCanvas.addEventListener("wheel", paletteWheel);
    this.palettePointerEl.addEventListener("wheel", paletteWheel);

    this.keyshortcuts = new Keyshortcuts();
    this.keyshortcuts.disable();


    this.keyshortcuts.addShortcut(Object.assign({altKey: false, keyCode: 37, repeatable: true}, config.keyModifiers), function () {//left
        // e.stopImmediatePropagation();
        that.changeThreshold(that.threshold - 0.01);
    });
    this.keyshortcuts.addShortcut(Object.assign({altKey: false, keyCode: 39, repeatable: true}, config.keyModifiers), function () {//right
        // e.stopImmediatePropagation();
        that.changeThreshold(that.threshold + 0.01);
    });

    this.keyshortcuts.addShortcut(Object.assign({altKey: true, keyCode: 38, repeatable: true}, config.keyModifiers), function () {//shift + up
        // e.stopImmediatePropagation();
        that.pickPalette(that.color.saturation, that.color.value - 1);
    });
    this.keyshortcuts.addShortcut(Object.assign({altKey: true, keyCode: 40, repeatable: true}, config.keyModifiers), function () {//shift + down
        // e.stopImmediatePropagation();
        that.pickPalette(that.color.saturation, that.color.value + 1);
    });
    this.keyshortcuts.addShortcut(Object.assign({altKey: true, keyCode: 37, repeatable: true}, config.keyModifiers), function () {//shift + left
        // e.stopImmediatePropagation();
        that.pickPalette(that.color.saturation - 1, that.color.value);
    });
    this.keyshortcuts.addShortcut(Object.assign({altKey: true, keyCode: 39, repeatable: true}, config.keyModifiers), function () {//shift + right
        // e.stopImmediatePropagation();
        that.pickPalette(that.color.saturation + 1, that.color.value);
    });


    return this;

}
Pixelpicker.prototype = Object.create(Eventsmanager.prototype);

Object.assign(Pixelpicker.prototype, {

    normalize: function normalize(v, min, max) {
        "use strict";
        if (v < min) {
            v = min;
        }
        if (v > max) {
            v = max;
        }
        return v;
    },
    setPalettePointer: function setPalettePointer(x, y) {
        "use strict";
        this.x = x;
        this.y = y;
        this.palettePointerEl.style.left = -this.width * 0.03 + x + "px";
        this.palettePointerEl.style.top = -this.height * 0.03 + this.height * (1 / 10) + y + "px";
    },

    pickPalette: function pickPalette(x, y) {
        "use strict";
        console.log("pickPalette", x, y);
        x = this.normalize(x, 0, this.width);
        y = this.normalize(y, 0, this.height);

        var pixelData = this.paletteContext2d.getImageData(x, y, 1, 1).data;
        this.setPalettePointer(x, y);
        var rgba = {
            r: pixelData[0],
            g: pixelData[1],
            b: pixelData[2],
            a: pixelData[3] / 255
        };
        // pickCb(pixelData[0], pixelData[1], pixelData[2], pixelData[3] / 255);
        this.setColor(rgba);
        // s = this.normalize(s, 0, 100);
        // v = this.normalize(v, 0, 100);
        // this.color.saturation = s;
        // this.color.value = v;
        // var rgb = this.HSVtoRGB(this.color.hue, this.color.saturation, this.color.value);
        // this.setPalettePointer(this.color.saturation, this.color.value);
        // var rgba = rgb;
        // rgba.a = this.color.alpha;
        // this.setColor(rgba);
    },
    setThresholdSlider: function setThresholdSlider(threshold) {
        "use strict";
        this.thresholdSliderEl.style.left = this.width * (threshold) - this.width * 0.015 + "px";
    },

    setThreshold: function setThreshold(threshold) {
        "use strict";
        threshold = Math.round(threshold * 100) / 100;
        this.threshold = threshold;
        this.setThresholdSlider(threshold);
    },


    changeThreshold: function changeAlpha(threshold) {
        "use strict";
        threshold = this.normalize(threshold, 0, 1);
        this.threshold = threshold;
        this.setThreshold(threshold);
    },
    focus: function focus() {
        "use strict";
        this.isFocused = true;
    },
    blur: function blur() {
        "use strict";
        this.isFocused = false;
    },
    getColor: function getColor() {
        "use strict";
        var color = {
            red: parseInt(this.color.red, 10),
            green: parseInt(this.color.green, 10),
            blue: parseInt(this.color.blue, 10),
            alpha: parseFloat(this.color.alpha)
        };
        return color;
    },
    putPixel: function (idata, x, y, pixel) {
        "use strict";
        var i = (x + y * idata.width) * 4;
        idata.data[i] = pixel.r;
        idata.data[i + 1] = pixel.g;
        idata.data[i + 2] = pixel.b;
        idata.data[i + 3] = pixel.a;
    },


    triggerUpdate: function triggerUpdate() {
        "use strict";
        var rgba = this.getColor();
        this.dispatch("change", {color: rgba});
    },
    updateFromInputs: function updateFromInputs() {
        "use strict";
        this.setColor({
            r: this.redInput.value,
            g: this.greenInput.value,
            b: this.blueInput.value,
            a: this.alphaInput.value
        });
        this.setAlpha(this.alphaInput.value);
    },

    setColor: function setColor(col, noPropagate) {
        "use strict";
        this.color.red = col.r;
        this.color.green = col.g;
        this.color.blue = col.b;
        this.color.alpha = col.a;

        this.redInput.value = col.r;
        this.greenInput.value = col.g;
        this.blueInput.value = col.b;
        this.alphaInput.value = col.a;
        // this.setThresholdSlider(col.a);
        // this.setPalettePointer(HSV.s, HSV.v);

        var rgba = this.getColor();
        this.colorEl.style.backgroundColor = "rgba(" + rgba.red + "," + rgba.green + "," + rgba.blue + "," + rgba.alpha + ")";
        // console.log("rgba(" + rgba.red + "," + rgba.green + "," + rgba.blue + "," + rgba.alpha + ")");
        if (!noPropagate) {
            this.triggerUpdate();
        }
    }

});
window.Pixelpicker = Pixelpicker;
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

// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/sketchpad.input.js
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


/**
 *
 * Input stack for registering one drawing events path
 * ex. for one finger on touch devices
 * Input stack can by chuckend into smaller parts
 * used to draw current frame or be sended to server
 *
 * @class Input
 * @param {object} config {id, layers, tool, color, fillColor, size}
 */
function Input(config) {
    "use strict";
    // Object.getPrototypeOf(this).instance += 1;
    Input.prototype.instance += 1;
    this.timestamp = new Date().getTime();

    this.type = config.type || "draw";
    this.uid = config.uid;
    this.id = config.id;
    this.layers = config.layers;
    this.tool = config.tool;
    this.font = config.font;
    this.color = config.color;
    this.fillColor = config.fillColor;
    this.size = config.size;
    this.center = config.center;

    this.listT = [];
    this.listX = [];
    this.listY = [];
    this.listP = [];
    this.lastT = NaN;
    this.lastX = NaN;
    this.lastY = NaN;
    this.lastP = NaN;

    this.lastSendPointer = 0;
    this.lastDrawPointer = 0;

    this.sketchpad = config.sketchpad;
    this.viewportX = this.sketchpad.viewportX; //tofix: this same input fragment can have diffrent viewport than that was drawen
    this.viewportY = this.sketchpad.viewportY;
    this.scale = this.sketchpad.scale;
    this.rotation = this.sketchpad.rotation;
    this.width = this.sketchpad.width;
    this.height = this.sketchpad.height;
    this.UID = this.sketchpad.UID; //overwitten by server
    this.url = config.url;
    return this;
}


Input.prototype = {
    instance: 0,

    getConfig: function getConfig() {
        "use strict";
        return {
            lay: this.layers.slice(),
            siz: this.size,
            col: this.color,
            fcl: this.fillColor,
            txt: this.textContent,
            fnt: this.font,
            axs: this.axis,
            tst: 1,
            url: this.url,
            cen: this.center,
            mrh: this.mirrorH,
            mrv: this.mirrorV,
            mvh: this.mirrorVH,
            rbw: this.rainbow
        };
    },
    /**
     * Add point to input path
     * @param {timestamp} t - current timestamp of move
     * @param {integer} x - x coordinate
     * @param {integer} y - y coordinate
     */
    addPoint: function addPoint(t, x, y, force) {
        "use strict";
        if (this.sketchpad.readOnly) {
            return;
        }
        if ((x !== this.lastX) || (y !== this.lastY) || (force)) {
            this.lastT = t - this.timestamp;
            this.lastX = x;
            this.lastY = y;
            this.listT.push(t - this.timestamp);
            this.listX.push(x);
            this.listY.push(y);
        }
    },
    /**
     * Returns last point
     * @return {object} - ex. {x: 0, y: 0} or false
     */
    getLastPoint: function getLastPoint() {
        "use strict";
        if (this.listX.length) {
            return {
                x: this.listX[this.listX.length - 1],
                y: this.listY[this.listY.length - 1]
            };
        } else {
            return false;
        }

    },
    /**
     * Returns part of input stack that were not yet send
     * @return {object} - ex. {t: [0, 3, 6], x: [0, 1, 2], y: [3, 2, 1]}
     */
    getPointsToSend: function getPointsToSend() {
        "use strict";
        var i;
        if (this.lastSendPointer < this.listX.length - 1) {
            var t = this.listT[this.lastSendPointer];
            var dataT = this.listT.slice(this.lastSendPointer);
            var dataX = this.listX.slice(this.lastSendPointer);
            var dataY = this.listY.slice(this.lastSendPointer);
            this.lastSendPointer = this.listX.length - 1;
            for (i = 0; i < dataT.length; i += 1) {
                dataT[i] -= t;
            }
            var data = {
                t: dataT,//keep this
                x: dataX,
                y: dataY
            };
            return data;
        }
    },
    /**
     * Returns part of input stack that were not yet drawed
     * @return {object} - {t: [0, 3, 6], x: [0, 1, 2], y: [3, 2, 1]}
     */
    getPointsToDraw: function getPointsToDraw() {
        "use strict";
        if (this.lastDrawPointer < this.listX.length - 1) {
            var dataX = this.listX.slice(this.lastDrawPointer);
            var dataY = this.listY.slice(this.lastDrawPointer);
            var dataT = this.listT.slice(this.lastDrawPointer);
            this.lastDrawPointer = this.listX.length - 1;
            var data = {
                t: dataT,
                x: dataX,
                y: dataY
            };
            return data;
        }
    }
};

// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/sketchpad.tool.js
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


/*global NSSketchpad, Input, Tool, Sketchpad, Eventsmanager*/

/**
 * Default tool for drawing free lines
 * on layers.
 *
 * Use ``Tool`` class as base
 * for creating custom tools.
 *
 * @see {@link http://sketchpad.pro|Sketchpad.pro - drawing board sketch free}
 *
 * @class
 * @param {object} config - tool configuration ``{sketchpad: Sketchpad, toolId: string, lineWidth: number, layers: ["F", "B"], color: {r: number, g:number, b: number, a:number}}``
 * @example
 * {
 *   sketchpad: Sketchpad,
 *   toolId: string,
 *   lineWidth: number, //default 1
 *   layers: ["F", "B"], //default ["F", "B"]
 *   color: {r: number, g:number, b: number, a:number} //default {r: 0, g: 0, b: 0, a: 1}
 * }
 */
function Tool(config) {
    "use strict";
    Eventsmanager.call(this, config);
    // ↓ ToolChild.prototype = new Tool();
    if (!config) {
        return this;
    }

    if (!(config.sketchpad instanceof Sketchpad)) {
        console.warn("config.sketchpad must be instanceof Sketchpad");
        throw new Error("config.sketchpad must be instanceof Sketchpad");
    }

    this.sketchpad = config.sketchpad;
    if (config.toolId) {
        this.toolId = config.toolId;
    }
    if (config.lineWidth) {
        this.lineWidth = config.lineWidth;
    }
    if (config.layers) {
        this.layers = config.layers;
    }
    if (config.color) {
        this.color = config.color;
    }
}

Tool.prototype = Object.create(Eventsmanager.prototype);

Tool.prototype = Object.assign(Tool.prototype, {
    sketchpad: "error: undefined sketchpad object",
    layers: ["F"],
    toolLabel: "Default tool",
    toolId: "default_tool_class",
    lineWidth: 1,
    minSize: 0.1,
    maxSize: 100,
    maxLayers: 1,
    color: {
        r: 0,
        g: 0,
        b: 0,
        a: 1
    },


    getCursor: function getCursor() {
        "use strict";
        var size = parseInt(this.getSize() + 1, 10);

        var style = {
            pointer: "crosshair",
            // pointer: "none",
            marginLeft: -size / 2 + "px",
            marginTop: -size / 2 + "px",
            width: size + "px",
            height: size + "px",
            border: "1px solid black",
            boxSizing: "border-box",
            borderRadius: "50%",
            // border: "1px solid black";
            backgroundColor: "rgba(0,0,0,0)"
        };

        return style;

    },
    /**
     * Get tool configuration
     * @return {object} - tool configuration
     */
    getToolConfig: function getToolConfig() {
        "use strict";
        var config = {
            toolId: this.toolId,
            layers: this.layers,
            lineWidth: this.lineWidth,
            maxLayers: this.maxLayers,
            color: this.getColorStr()
        };
        return config;
    },

    /**
     * Sets configuration of tool
     * @param {config} config - tool configuration
     * @return {object} - this
     */
    setToolConfig: function setToolConfig(config) {
        "use strict";

        if (Array.isArray(config.layers)) {
            this.layers = config.layers;
        }
        var match, col;
        if (config.color) {
            switch (typeof config.color) {
            case "string":
                match = String(config.color).match(/([0-9]+),([0-9]+),([0-9]+),([0-9\.]+)/);
                col = {
                    r: parseInt(match && match[1]) || 0,
                    g: parseInt(match && match[2]) || 0,
                    b: parseInt(match && match[3]) || 0,
                    a: parseFloat(match && match[4]) || 0
                };
                this.setColor(col.r, col.g, col.b, col.a);
                // console.log("set color from string", JSON.parse(JSON.stringify(this.color)), col);
                break;
            case "object":
                // console.log("set color from object", config.color);
                this.setColor(config.color.r, config.color.g, config.color.b, config.color.a);
                break;
            }
        }

        if (parseFloat(config.lineWidth)) {
            this.setSize(parseFloat(config.lineWidth));
        }
        this.dispatch("changeParams");
        return this;
    },

    /**
     * Calculate distance between two points
     *
     * @memberof Tool#
     * @param  {number} x1          - start x
     * @param  {number} y1          - start y
     * @param  {number} x2          - end x
     * @param  {number} y2          - end y
     * @return {number} - distance
     */
    distance: function distance(x1, y1, x2, y2) {
        "use strict";
        return Math.sqrt(Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2));
    },

    /**
     * Rotate point over theta angle
     * @param  {float} theta - deg angle
     * @param  {object} p    - {x:.. ,y:..} point
     * @return {object}      - rotated point
     */
    rotate: function rotate(theta, p) {
        "use strict";

        theta = (Math.PI * 2) * (theta / 360);
        p = {
            x: Math.cos(theta) * (p.x) - Math.sin(theta) * (p.y),
            y: Math.sin(theta) * (p.x) + Math.cos(theta) * (p.y)
        };
        return p;
    },

    /**
     * Set tool color
     *
     * @param {byte} r 0-255
     * @param {byte} g 0-255
     * @param {byte} b 0-255
     * @param {number} a 0..1
     */
    setColor: function setColor(r, g, b, a) {
        "use strict";
        // console.log("setting color of tool", this, r, g, b, a);
        // debugger;
        if (a === undefined) {
            a = this.color.a;
        }
        this.color = {r: r, g: g, b: b, a: a};
        this.dispatch("changeParams");
        return this;
    },

    /**
     * Get current tool color
     *
     * @return {object} {r: byte, g: byte, b: byte, a: byte}
     */
    getColor: function getColor() {
        "use strict";
        return this.color;
    },

    /**
     * Get current tool color as "rgba(0,0,0,1)"" string
     *
     * @return {string}  - rgba() color string
     */
    getColorStr: function getColorStr() {
        "use strict";
        return "rgba(" + this.color.r + "," + this.color.g + "," + this.color.b + "," + this.color.a + ")";
    },

    /**
     * Set size
     * @param {integer} size - tool size
     */
    setSize: function setSize(size) {
        "use strict";
        this.lineWidth = parseFloat(size);
        this.dispatch("changeParams");
        return this;
    },

    /**
     * Get current size
     * @return {integer} number
     */
    getSize: function getSize() {
        "use strict";
        return this.lineWidth;
    },

    /** collecting events **/

    /**
     * Init new tool path (ex. one finger touch)
     *
     * @param  {string} id - unique id of path
     * @param  {int} x  - first x position
     * @param  {int} y  - first y position
     * @return {Input} - Input
     */
    startInput: function startPath(id, x, y, e) {
        "use strict";
        if (e && e.altKey) {
            x = Math.round(x / 10) * 10;
            y = Math.round(y / 10) * 10;
            // console.log(this.sketchpad.colorPicker(x, y));
            // return false;
        }

        var sketchpad = this.sketchpad;
        var input = new Input({
            sketchpad: sketchpad,
            id: id,
            tool: this.toolId,
            layers: this.layers,
            color: this.getColorStr(),
            size: this.lineWidth
        });
        input.addPoint(new Date().getTime(), x, y);
        input.addPoint(new Date().getTime(), x, y, "force"); // click = at least 1 dot//, x + 1, y
        return input;
    },

    /**
     * Record path movement
     *
     * @param  {Input} input - Input object initialised by Tool::startInput();
     * @param  {int} x - current x position
     * @param  {int} y - current y position
     */
    moveInput: function drawPath(input, x, y, e) {
        "use strict";
        if (e && e.altKey) {
            x = Math.round(x / 10) * 10;
            y = Math.round(y / 10) * 10;
        }

        if (e && e.shiftKey) {
            var lastPoint = input.getLastPoint();
            if (lastPoint) {
                if (Math.abs(lastPoint.x - x) < 10) {
                    x = lastPoint.x;
                }
                if (Math.abs(lastPoint.y - y) < 10) {
                    y = lastPoint.y;
                }
                if (lastPoint.x === x && lastPoint.y === y) {
                    return false;
                }
            }
        }

        input.addPoint(new Date().getTime(), x, y, e);
    },

    /**
     * Close tool path (ex. one finger touch)
     *
     * @param  {Input} input - Input object initialised by Tool::startInput();
     * @param  {int} x  - last x position
     * @param  {int} y  - last y position
     */
    finishInput: function endPath(input, x, y, e) {
        "use strict";
        if (e && e.altKey) {
            x = Math.round(x / 10) * 10;
            y = Math.round(y / 10) * 10;
        }

        input.addPoint(new Date().getTime(), x, y);
    },

    /** drawing events **/

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
            ll;

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
            context.rotate(sketchpad.rotation * Math.PI / 180);
            context.scale(sketchpad.scale, sketchpad.scale);
            context.translate(config.vpx, config.vpy);
            context.translate(-sketchpad.viewportX, -sketchpad.viewportY);
            context.scale(1 / config.scl, 1 / config.scl);
            context.rotate(-config.rot * Math.PI / 180);

            if (points && points.x && points.x.length > 1) {
                context.beginPath();
                context.lineCap = "round";
                context.lineJoin = "round";
                context.strokeStyle = toolConfig.col;
                context.lineWidth = toolConfig.siz;
                context.moveTo(points.x[0], points.y[0]);
                for (l = 1; l < points.x.length; l += 1) {
                    context.lineTo(points.x[l], points.y[l]);
                }
                context.stroke();
            }

            context.restore();

        }
    }

});
NSSketchpad.avaliableTools.push(Tool);
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/sketchpad.tool._fillable.js
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
 * @augments Tool
 * @param {object} config - tool config
 */
function ToolFillable(config) {
    "use strict";
    Tool.call(this, config);
}
ToolFillable.prototype = Object.create(Tool.prototype);

Object.assign(ToolFillable.prototype, {
    toolLabel: "_fillable class",
    toolId: "_fillable class",

    fillColor: {
        r: 128,
        g: 0,
        b: 128,
        a: 0.1
    },

    /**
     * Get tool configuration
     * @return {object} - tool configuration
     */
    getToolConfig: function getToolConfig() {
        "use strict";
        // alert("getToolConfig");
        var config = Tool.prototype.getToolConfig.call(this);
        return Object.assign(config, {
            fillColor: this.getFillColorStr()
        });
    },

    /**
     * Sets configuration of tool
     * @param {config} config - tool configuration
     * @return {object} - this
     */
    setToolConfig: function setToolConfig(config) {
        "use strict";
        // console.log("type set tool config");
        Tool.prototype.setToolConfig.call(this, config);
        var match, col;
        if (config.fillColor) {
            switch (typeof config.fillColor) {
            case "string":
                match = String(config.fillColor).match(/([0-9]+),([0-9]+),([0-9]+),([0-9\.]+)/);
                col = {
                    r: parseInt(match && match[1]) || 0,
                    g: parseInt(match && match[2]) || 0,
                    b: parseInt(match && match[3]) || 0,
                    a: parseFloat(match && match[4]) || 0
                };
                this.setFillColor(col.r, col.g, col.b, col.a);
                // console.log("set fill color from string", col);
                break;
            case "object":
                // console.log("set fill color from object", config.fillColor);
                this.setFillColor(config.fillColor.r, config.fillColor.g, config.fillColor.b, config.fillColor.a);
                break;
            }
        }

        this.dispatch("changeParams");

        return this;
    },

    /**
     * Sets color of fill
     * @memberof ToolFillable#
     * @param {byte} r Red
     * @param {byte} g Green
     * @param {byte} b Blue
     * @param {byte} a Alpha
     */
    setFillColor: function setFillColor(r, g, b, a) {
        "use strict";
        if (a === undefined) {
            a = this.fillColor.a;
        }
        this.fillColor = {
            r: r,
            g: g,
            b: b,
            a: a
        };
        this.dispatch("changeParams");

        return this;
    },

    /**
     * Get color of fill
     * @memberof ToolFillable#
     * @return {object} {r: byte, g: byte, b: byte, a: byte}
     */
    getFillColor: function getFillColor() {
        "use strict";
        return this.fillColor;
    },

    /**
     * Get color of fill as rgba string
     * @memberof ToolFillable#
     * @return {string} - rgba(r,g,b,a)
     */
    getFillColorStr: function getColorStr() {
        "use strict";
        return "rgba(" + this.fillColor.r + "," + this.fillColor.g + "," + this.fillColor.b + "," + this.fillColor.a + ")";
    }

});


// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/sketchpad.tool.circle.js
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



/*global NSSketchpad, Input, ToolFillable*/

/**
 * Tool for drawing circles and elipses
 * @class
 * @extends Tool
 * @param {object} config - tool config
 */
function ToolCirc(config) {
    "use strict";
    ToolFillable.call(this, config);
}

ToolCirc.prototype = Object.create(ToolFillable.prototype);

Object.assign(ToolCirc.prototype, {
    lineWidth: 1,
    toolLabel: "Circle",//◯
    layers: ["F"],
    toolId: "circle",
    keyCode: 67, //c
    color: {
        r: 0,
        g: 0,
        b: 0,
        a: 1
    },

    fillColor: {
        r: 255,
        g: 127,
        b: 0,
        a: 0
    },


    /**
     * [startInput description]
     * @memberof ToolCirc#
     * @param  {any} id - unique id in current moment
     * @param  {integer} x  - x coordinate
     * @param  {integer} y  - y coordinate
     * @return {Input} - returns new Input for current tool touch
     */
    startInput: function startPath(id, x, y, e) {
        "use strict";
        // console.log("Tool.startInput");
        if (e && e.altKey) {
            x = Math.round(x / 10) * 10;
            y = Math.round(y / 10) * 10;
        }

        var sketchpad = this.sketchpad;
        var input = new Input({
            sketchpad: sketchpad,
            id: id,
            tool: this.toolId,
            color: this.getColorStr(),
            fillColor: this.getFillColorStr(),
            size: this.lineWidth,
            layers: this.layers,
            uid: this.sketchpad.UID
        });
        // input.addPoint(new Date().getTime(), x, y);

        input.firstX = x;
        input.firstY = y;

        input.selectorDiv = document.createElement("div");
        input.selectorDiv.style.position = "absolute";
        input.selectorDiv.style.border = "1px solid white";
        input.selectorDiv.style.borderRadius = "50%";
        input.selectorDiv.style.display = "block";


        if (this.sketchpad.centerViewport) {
            input.selectorDiv.style.left = this.sketchpad.width / 2 + x - 1 + "px";
            input.selectorDiv.style.top = this.sketchpad.height / 2 + y - 1 + "px";
        } else {
            input.selectorDiv.style.left = x - 1 + "px";
            input.selectorDiv.style.top = y - 1 + "px";
        }


        input.selectorDiv.style.width = "1px";
        input.selectorDiv.style.height = "1px";

        input.selectorDiv2 = document.createElement("div");
        input.selectorDiv2.style.position = "absolute";
        input.selectorDiv2.style.border = "1px dashed black";
        input.selectorDiv2.style.borderRadius = "50%";
        input.selectorDiv2.style.display = "block";

        if (this.sketchpad.centerViewport) {
            input.selectorDiv2.style.left = this.sketchpad.width / 2 + x - 1 + "px";
            input.selectorDiv2.style.top = this.sketchpad.height / 2 + y - 1 + "px";
        } else {
            input.selectorDiv2.style.left = x - 1 + "px";
            input.selectorDiv2.style.top = y - 1 + "px";
        }

        input.selectorDiv2.style.width = "1px";
        input.selectorDiv2.style.height = "1px";

        sketchpad.containerEl.appendChild(input.selectorDiv);
        sketchpad.containerEl.appendChild(input.selectorDiv2);

        input.addPoint(new Date().getTime(), (x), (y));
        return input;
    },

    /**
     * [moveInput description]
     * @memberof ToolCirc#
     * @param  {Input} input - [description]
     * @param  {number} x -    [description]
     * @param  {number} y -   [description]
     * @param  {HTMLEvent} e -    [description]
     * @return {undefined}       [description]
     */
    moveInput: function drawPath(input, x, y, e) {
        "use strict";
        if (e && e.altKey) {
            x = Math.round(x / 10) * 10;
            y = Math.round(y / 10) * 10;
        }

        var fristX = input.firstX;
        var fristY = input.firstY;

        var w = Math.abs(x - fristX);
        var h = Math.abs(y - fristY);
        if (e.shiftKey) {
            w = h;
        }


        if (this.sketchpad.centerViewport) {
            input.selectorDiv.style.left = this.sketchpad.width / 2 + fristX - w + "px";
            input.selectorDiv.style.top = this.sketchpad.height / 2 + fristY - h + "px";
            input.selectorDiv2.style.left = this.sketchpad.width / 2 + fristX - w + "px";
            input.selectorDiv2.style.top = this.sketchpad.height / 2 + fristY - h + "px";

        } else {
            input.selectorDiv.style.left = fristX - w + "px";
            input.selectorDiv.style.top = fristY - h + "px";
            input.selectorDiv2.style.left = fristX - w + "px";
            input.selectorDiv2.style.top = fristY - h + "px";
        }


        input.selectorDiv.style.width = w * 2 + "px";
        input.selectorDiv.style.height = h * 2 + "px";

        input.selectorDiv2.style.width = w * 2 + "px";
        input.selectorDiv2.style.height = h * 2 + "px";
    },

    /**
     * [finishInput description]
     * @memberof ToolCirc#
     * @param  {Input} input - [description]
     * @param  {number} x -    [description]
     * @param  {number} y -   [description]
     * @param  {HTMLEvent} e -    [description]
     * @return {undefined}       [description]
     */
    finishInput: function endPath(input, x, y, e) {
        "use strict";
        if (e && e.altKey) {
            x = Math.round(x / 10) * 10;
            y = Math.round(y / 10) * 10;
        }

        var sketchpad = this.sketchpad;

        var firstX = input.firstX;
        var firstY = input.firstY;

        var h = Math.abs(y - firstY);
        if (e.shiftKey) {
            x = firstX + h;
        }

        input.addPoint(new Date().getTime(), (x), (y));
        sketchpad.containerEl.removeChild(input.selectorDiv);
        sketchpad.containerEl.removeChild(input.selectorDiv2);
    },


    /**
     * Recalulates scale
     * @param  {Object} config      - configuration of drawing client viewport
     * @param  {number} s           - scale
     * @return {number}             - recalculated scale
     */
    recalcS: function recalcS(config, s) {
        "use strict";
        var sketchpad = this.sketchpad;
        s *= (1 / config.scl);
        s *= sketchpad.scale;
        return s;
    },

    /**
     * Draw engine
     * @memberof ToolCirc#
     * @param  {object} config - Drawing parameters
     * @param  {object} points - List of points to draw
     * @return {undefined}
     */
    drawFramePath: function drawFramePath(config, points) {
        "use strict";
        var toolConfig = config.cnf;
        var sketchpad = this.sketchpad,
            ll,
            r,
            context;
        if (!toolConfig.lay || !toolConfig.lay.length) {
            console.warn("no layers to draw");
            return;
        }
        var p1, p2;
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

            context.rotate(sketchpad.rotation * Math.PI / 180);
            context.scale(sketchpad.scale, sketchpad.scale);


            context.translate(config.vpx, config.vpy);
            context.translate(-sketchpad.viewportX, -sketchpad.viewportY);

            context.scale(1 / config.scl, 1 / config.scl);
            context.rotate(-config.rot * Math.PI / 180);

            p1 = {x: points.x[0], y: points.y[0]};
            p2 = {x: points.x[1], y: points.y[1]};

            // set center of canvas to cener of drawing circle
            context.translate(p1.x, p1.y);
            context.beginPath();
            context.scale(1, Math.abs(p2.y - p1.y) / Math.abs(p2.x - p1.x));


            r = Math.abs(p2.x - p1.x);

            context.arc(0, 0, r, 0, Math.PI * 2, false); // Outer circle
            context.restore();
            context.strokeStyle = toolConfig.col;
            context.fillStyle = toolConfig.fcl;
            context.lineWidth = this.recalcS(config, toolConfig.siz);

            context.fill();
            context.stroke();
            context.restore();


        }


    }
});
NSSketchpad.avaliableTools.push(ToolCirc);

// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/sketchpad.tool.colorpicker.js
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


/*global NSSketchpad, Input, ToolFillable*/
/**
 * Tool for moving viewport
 *
 * @class
 * @extends ToolFillable
 * @param {object} config - tool config
 */
function ToolColorpicker(config) {
    "use strict";
    ToolFillable.call(this, config);
    this.toolId = config.toolId || "colorpicker";
    this.layers = [];
}
ToolColorpicker.prototype = Object.create(ToolFillable.prototype);

Object.assign(ToolColorpicker.prototype, {
    maxLayers: 0,
    keyCode: 73, //i
    toolLabel: "Colorpicker",
    toolId: "colorpicker",
    color: {
        r: 128,
        g: 128,
        b: 128,
        a: 0
    },
    getCursor: function getCursor() {
        "use strict";
        var size = 10;


        var style = {
            pointer: "none",
            marginLeft: -size / 2 + "px",
            marginTop: -size / 2 + "px",
            width: size + "px",
            height: size + "px",
            borderRadius: "50%",
            // border: "none",
            border: "1px solid black",
            backgroundColor: this.getColorStr()
        };

        return style;

    },
    /**
     * MouseDown/TouchStart
     *
     * @memberof ToolColorpicker#
     * @param  {any} id - unique id in current moment
     * @param  {integer} x  - x coordinate
     * @param  {integer} y  - y coordinate
     * @return {Input} - returns new Input for current tool touch
     */
    startInput: function startPath(id, x, y, e) {
        "use strict";
        var sketchpad = this.sketchpad;
        var input = new Input({
            sketchpad: sketchpad,
            id: id,
            tool: this.toolId
        });
        var color = this.sketchpad.colorPicker(x, y);
        if (e.shiftKey || e.button === 2) {
            this.fillColorChanged = true;
            this.setFillColor(color.r, color.g, color.b, color.a);
        } else {
            this.colorChanged = true;
            this.setColor(color.r, color.g, color.b, color.a);
        }
        input.tmpCursor = this.sketchpad.containerEl.style.cursor;
        sketchpad.containerEl.style.cursor = "crosshair";

        return input;
    },

    /**
     * MouseMove/TouchMove
     *
     * @memberof ToolColorpicker#
     * {@link http://sketchpad.pro|Sketchpad.pro - drawing board sketch free}
     *
     */
    moveInput: function moveInput(input, x, y, e) {
        "use strict";
        var color = this.sketchpad.colorPicker(x, y);
        if (e.button === 2) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (e.shiftKey || e.button === 2) {
            this.fillColorChanged = true;
            this.setFillColor(color.r, color.g, color.b, color.a);
        } else {
            this.colorChanged = true;
            this.setColor(color.r, color.g, color.b, color.a);
        }
        return input;
    },

    /**
     * MouseUp/TouchEnd
     *
     * @memberof ToolColorpicker#
     * {@link http://sketchpad.pro|Sketchpad.pro - drawing board sketch free}
     */
    finishInput: function finishInput(input, x, y, e) {
        "use strict";
        var color = this.sketchpad.colorPicker(x, y);
        if (e.button === 2) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (e.shiftKey || e.button === 2) {
            this.fillColorChanged = true;
            this.setFillColor(color.r, color.g, color.b, color.a);
        } else {
            this.colorChanged = true;
            this.setColor(color.r, color.g, color.b, color.a);
        }
        this.sketchpad.containerEl.style.cursor = input.tmpCursor;

        return input;

    },

    /**
     * Draw engine runs both for drawed and received paths
     * @memberof ToolColorpicker#
     * @param  {object} Drawing parameters
     * @param  {object} List of points to draw
     * @return {undefined}
     */
    drawFramePath: function drawFramePath() {
        "use strict";
        // DO NOTHING
        return;

    }
});
NSSketchpad.avaliableTools.push(ToolColorpicker);
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/sketchpad.tool.custom.js
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
 * @class Custom tool
 * @param {object} config - tool config
 */
function ToolCustom(config) {
    "use strict";
    Tool.call(this, config);
}

ToolCustom.prototype = Object.create(Tool.prototype);

Object.assign(ToolCustom.prototype, {
    toolId: "custom",
    lineWidth: 10,
    keyCode: 88, //x
    toolLabel: "Custom tool",

    /**
     * Draw part of tool path
     *
     * @memberof ToolRainbow#
     * @param  {object} config      - Drawing parameters
     * @param  {array} points       - List of points to draw
     */
    drawFramePath: function drawFramePath(config, points) {
        "use strict";
        var toolConfig = config.cnf;
        var sketchpad = this.sketchpad,
            l,
            ll,
            context;
        context = null;
        if (!toolConfig.lay || !toolConfig.lay.length) {
            console.warn("no layers to draw");
            return;
        }
        var p1, p2;
        // for each layer
        for (ll = 0; ll < toolConfig.lay.length; ll += 1) {
            // switch context...
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

            //navigate to drawer viewport position
            context.rotate(sketchpad.rotation * Math.PI / 180);
            context.scale(sketchpad.scale, sketchpad.scale);

            context.translate(config.vpx, config.vpy);
            context.translate(-sketchpad.viewportX, -sketchpad.viewportY);

            context.scale(1 / config.scl, 1 / config.scl);
            context.rotate(-config.rot * Math.PI / 180);

            //draw
            if (points && points.x && points.y && points.x.length > 1) {
                for (l = 1; l < points.x.length; l += 1) {

                    p1 = {x: points.x[l - 1], y: points.y[l - 1]};
                    p2 = {x: points.x[l], y: points.y[l]};
                    context.beginPath();
                    context.strokeStyle = this.getColorStr();
                    context.lineCap = "miter";
                    context.lineJoin = "miter";
                    context.lineWidth = toolConfig.siz + 100 / (10 + this.distance(p1.x, p1.y, p2.x, p2.y));

                    context.moveTo(p1.x, p1.y);
                    context.lineTo(p2.x, p2.y);
                    context.stroke();
                }
            }
            context.restore();

        }
    }

});
NSSketchpad.avaliableTools.push(ToolCustom);


// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/sketchpad.tool.cutout.js
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
 * @class Tool ToolCutout
 * @augments Tool
 * @param {object} config - tool config
 */
function ToolCutout(config) {
    "use strict";
    Tool.call(this, config);
    this.toolId = config.toolId || "cutout";
}

ToolCutout.prototype = Object.create(Tool.prototype);

Object.assign(ToolCutout.prototype, {
    maxLayers: "*",
    toolId: "cutout",
    layers: ["F", "B"],
    toolLabel: "Cut-out",//"✃"
    getCursor: function getCursor() {
        "use strict";

        var style = {
            pointer: "crosshair",
            borderRadius: 0,
            backgroundColor: "rgba(0,0,0,0)",
            border: "none"
        };

        return style;

    },
    /**
     * [startInput description]
     * @memberof ToolCutout#
     * @param  {any} id - unique id in current moment
     * @param  {integer} x  - x coordinate
     * @param  {integer} y  - y coordinate
     * @return {Input} - returns new Input for current tool touch
     */
    startInput: function startPath(id, x, y, e) {
        "use strict";
        if (e && e.altKey) {
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


        input.selectorDiv = document.createElement("div");
        input.selectorDiv.style.position = "absolute";
        input.selectorDiv.style.border = "1px solid #f00";
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
        input.selectorDiv.style.background = "#f88";
        input.selectorDiv.style.opacity = "0.3";
        sketchpad.containerEl.appendChild(input.selectorDiv);
        input.addPoint(new Date().getTime(), x, y);
        return input;
    },

    /**
     * [moveInput description]
     * @memberof ToolCutout#
     * @param  {Input} input - [description]
     * @param  {number} x -    [description]
     * @param  {number} y -   [description]
     * @param  {HTMLEvent} e -    [description]
     * @return {undefined}       [description]
     */
    moveInput: function drawPath(input, x, y, e) {
        "use strict";
        if (e && e.altKey) {
            x = Math.round(x / 10) * 10;
            y = Math.round(y / 10) * 10;
        }

        var fristX = input.listX[0];
        var fristY = input.listY[0];

        var sx = Math.min(fristX, x);
        var sy = Math.min(fristY, y);
        var ex = Math.max(fristX, x);
        var ey = Math.max(fristY, y);

        if (this.sketchpad.centerViewport) {
            input.selectorDiv.style.left = this.sketchpad.width / 2 + sx + "px";
            input.selectorDiv.style.top = this.sketchpad.height / 2 + sy + "px";
        } else {
            input.selectorDiv.style.left = sx + "px";
            input.selectorDiv.style.top = sy + "px";
        }
        input.selectorDiv.style.width = (ex - sx) + "px";
        input.selectorDiv.style.height = (ey - sy) + "px";
        //input.addPoint(new Date().getTime(), x, y);
    },

    /**
     * [finishInput description]
     * @memberof ToolCutout#
     * @param  {Input} input - [description]
     * @param  {number} x -    [description]
     * @param  {number} y -   [description]
     * @param  {HTMLEvent} e -    [description]
     * @return {undefined}       [description]
     */
    finishInput: function endPath(input, x, y, e) {
        "use strict";
        if (e && e.altKey) {
            x = Math.round(x / 10) * 10;
            y = Math.round(y / 10) * 10;
        }

        var sketchpad = this.sketchpad;
        input.addPoint(new Date().getTime(), x, y);
        sketchpad.containerEl.removeChild(input.selectorDiv);
    },

    /**
     * Draw engine
     * @memberof ToolCutout#
     * @param  {object} Drawing parameters
     * @param  {object} List of points to draw
     * @return {undefined}
     */
    drawFramePath: function drawFramePath(config, points) {
        "use strict";
        var toolConfig = config.cnf;
        var sketchpad = this.sketchpad,
            ll;

        if (!toolConfig.lay || !toolConfig.lay.length) {
            console.warn("no layers to draw");
            return;
        }
        var context;
        for (ll = 0; ll < toolConfig.lay.length; ll += 1) {
            switch (toolConfig.lay[ll]) {
            case sketchpad.LAYER_BACK:
                context = sketchpad.contextB2D;
                break;
            case sketchpad.LAYER_FRONT:
                context = sketchpad.context2D;
                break;
            }

            context.save();
            context.rotate(sketchpad.rotation * Math.PI / 180);
            context.scale(sketchpad.scale, sketchpad.scale);


            context.translate(config.vpx, config.vpy);
            context.translate(-sketchpad.viewportX, -sketchpad.viewportY);

            context.scale(1 / config.scl, 1 / config.scl);
            context.rotate(-config.rot * Math.PI / 180);
            context.clearRect(points.x[0], points.y[0], points.x[1] - points.x[0], points.y[1] - points.y[0]);
            context.restore();
        }


    }
});
NSSketchpad.avaliableTools.push(ToolCutout);




// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/sketchpad.tool.eraser.js
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
function ToolEraser(config) {
    "use strict";
    Tool.call(this, config);
}


ToolEraser.prototype = Object.create(Tool.prototype);

Object.assign(ToolEraser.prototype, {
    toolId: "eraser",
    maxLayers: "*",
    layers: ["F", "B"],
    lineWidth: 16,
    minSize: 2,
    maxSize: 200,
    // keyCode: 66, //b
    toolLabel: "Eraser",//•

    getCursor: function getCursor() {
        "use strict";
        var size = parseInt(this.getSize() + 1, 10);

        var style = {
            pointer: "crosshair",
            // pointer: "none",
            marginLeft: -size / 2 + "px",
            marginTop: -size / 2 + "px",
            width: size + "px",
            height: size + "px",
            border: "1px solid black",
            boxSizing: "border-box",
            borderRadius: "50%",
            // border: "1px solid black";
            backgroundColor: "rgba(255,255,255,.5)"
        };

        return style;

    },
    /**
     * Draw part of rainbow
     *
     * @memberof ToolRainbow#
     * @param  {object} config      - Drawing parameters
     * @param  {array} points       - List of points to draw
     */
    drawFramePath: function drawFramePath(config, points) {
        "use strict";
        var toolConfig = config.cnf;
        var sketchpad = this.sketchpad,
            l,
            ll,
            context;
        context = null;
        if (!toolConfig.lay || !toolConfig.lay.length) {
            console.warn("no layers to draw");
            return;
        }
        var p1, p2;
        // for each layer
        for (ll = 0; ll < toolConfig.lay.length; ll += 1) {
            // switch context...
            switch (toolConfig.lay[ll]) {
            case sketchpad.LAYER_BACK:
                context = sketchpad.contextB2D;
                break;
            case sketchpad.LAYER_FRONT:
                context = sketchpad.context2D;
                break;
            }
            context.save();
            context.globalCompositeOperation = "destination-out";
            context.rotate(sketchpad.rotation * Math.PI / 180);
            context.scale(sketchpad.scale, sketchpad.scale);


            context.translate(config.vpx, config.vpy);
            context.translate(-sketchpad.viewportX, -sketchpad.viewportY);

            context.scale(1 / config.scl, 1 / config.scl);
            context.rotate(-config.rot * Math.PI / 180);

            // if there are points to draw (should be)
            if (points && points.x && points.y && points.x.length > 1) {
                for (l = 1; l < points.x.length; l += 1) {
                    p1 = {x: points.x[l - 1], y: points.y[l - 1]};
                    p2 = {x: points.x[l], y: points.y[l]};
                    context.beginPath();
                    context.strokeStyle = this.getColorStr(p1.x, p1.y);
                    context.lineCap = 'miter';
                    context.lineJoin = 'miter';

                    context.lineWidth = toolConfig.siz;

                    context.moveTo(p1.x, p1.y);
                    context.lineTo(p2.x, p2.y);
                    context.stroke();
                }
            }
            context.restore();

        }
    }
});
NSSketchpad.avaliableTools.push(ToolEraser);



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
        // img.src = "data:image/gif;base64,R0lGODlhPQBEAPeoAJosM//AwO/AwHVYZ/z595kzAP/s7P+goOXMv8+fhw/v739/f+8PD98fH/8mJl+fn/9ZWb8/PzWlwv///6wWGbImAPgTEMImIN9gUFCEm/gDALULDN8PAD6atYdCTX9gUNKlj8wZAKUsAOzZz+UMAOsJAP/Z2ccMDA8PD/95eX5NWvsJCOVNQPtfX/8zM8+QePLl38MGBr8JCP+zs9myn/8GBqwpAP/GxgwJCPny78lzYLgjAJ8vAP9fX/+MjMUcAN8zM/9wcM8ZGcATEL+QePdZWf/29uc/P9cmJu9MTDImIN+/r7+/vz8/P8VNQGNugV8AAF9fX8swMNgTAFlDOICAgPNSUnNWSMQ5MBAQEJE3QPIGAM9AQMqGcG9vb6MhJsEdGM8vLx8fH98AANIWAMuQeL8fABkTEPPQ0OM5OSYdGFl5jo+Pj/+pqcsTE78wMFNGQLYmID4dGPvd3UBAQJmTkP+8vH9QUK+vr8ZWSHpzcJMmILdwcLOGcHRQUHxwcK9PT9DQ0O/v70w5MLypoG8wKOuwsP/g4P/Q0IcwKEswKMl8aJ9fX2xjdOtGRs/Pz+Dg4GImIP8gIH0sKEAwKKmTiKZ8aB/f39Wsl+LFt8dgUE9PT5x5aHBwcP+AgP+WltdgYMyZfyywz78AAAAAAAD///8AAP9mZv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAKgALAAAAAA9AEQAAAj/AFEJHEiwoMGDCBMqXMiwocAbBww4nEhxoYkUpzJGrMixogkfGUNqlNixJEIDB0SqHGmyJSojM1bKZOmyop0gM3Oe2liTISKMOoPy7GnwY9CjIYcSRYm0aVKSLmE6nfq05QycVLPuhDrxBlCtYJUqNAq2bNWEBj6ZXRuyxZyDRtqwnXvkhACDV+euTeJm1Ki7A73qNWtFiF+/gA95Gly2CJLDhwEHMOUAAuOpLYDEgBxZ4GRTlC1fDnpkM+fOqD6DDj1aZpITp0dtGCDhr+fVuCu3zlg49ijaokTZTo27uG7Gjn2P+hI8+PDPERoUB318bWbfAJ5sUNFcuGRTYUqV/3ogfXp1rWlMc6awJjiAAd2fm4ogXjz56aypOoIde4OE5u/F9x199dlXnnGiHZWEYbGpsAEA3QXYnHwEFliKAgswgJ8LPeiUXGwedCAKABACCN+EA1pYIIYaFlcDhytd51sGAJbo3onOpajiihlO92KHGaUXGwWjUBChjSPiWJuOO/LYIm4v1tXfE6J4gCSJEZ7YgRYUNrkji9P55sF/ogxw5ZkSqIDaZBV6aSGYq/lGZplndkckZ98xoICbTcIJGQAZcNmdmUc210hs35nCyJ58fgmIKX5RQGOZowxaZwYA+JaoKQwswGijBV4C6SiTUmpphMspJx9unX4KaimjDv9aaXOEBteBqmuuxgEHoLX6Kqx+yXqqBANsgCtit4FWQAEkrNbpq7HSOmtwag5w57GrmlJBASEU18ADjUYb3ADTinIttsgSB1oJFfA63bduimuqKB1keqwUhoCSK374wbujvOSu4QG6UvxBRydcpKsav++Ca6G8A6Pr1x2kVMyHwsVxUALDq/krnrhPSOzXG1lUTIoffqGR7Goi2MAxbv6O2kEG56I7CSlRsEFKFVyovDJoIRTg7sugNRDGqCJzJgcKE0ywc0ELm6KBCCJo8DIPFeCWNGcyqNFE06ToAfV0HBRgxsvLThHn1oddQMrXj5DyAQgjEHSAJMWZwS3HPxT/QMbabI/iBCliMLEJKX2EEkomBAUCxRi42VDADxyTYDVogV+wSChqmKxEKCDAYFDFj4OmwbY7bDGdBhtrnTQYOigeChUmc1K3QTnAUfEgGFgAWt88hKA6aCRIXhxnQ1yg3BCayK44EWdkUQcBByEQChFXfCB776aQsG0BIlQgQgE8qO26X1h8cEUep8ngRBnOy74E9QgRgEAC8SvOfQkh7FDBDmS43PmGoIiKUUEGkMEC/PJHgxw0xH74yx/3XnaYRJgMB8obxQW6kL9QYEJ0FIFgByfIL7/IQAlvQwEpnAC7DtLNJCKUoO/w45c44GwCXiAFB/OXAATQryUxdN4LfFiwgjCNYg+kYMIEFkCKDs6PKAIJouyGWMS1FSKJOMRB/BoIxYJIUXFUxNwoIkEKPAgCBZSQHQ1A2EWDfDEUVLyADj5AChSIQW6gu10bE/JG2VnCZGfo4R4d0sdQoBAHhPjhIB94v/wRoRKQWGRHgrhGSQJxCS+0pCZbEhAAOw==";
        // e.dataTransfer.setDragImage(img, 0, 0);
    });
    this.sketchpad.containerEl.addEventListener("dragenter", function (ignore) {
        if (that.disabled) {
            return;
        }
        // var img = document.createElement("img");
        // img.src = "data:image/gif;base64,R0lGODlhPQBEAPeoAJosM//AwO/AwHVYZ/z595kzAP/s7P+goOXMv8+fhw/v739/f+8PD98fH/8mJl+fn/9ZWb8/PzWlwv///6wWGbImAPgTEMImIN9gUFCEm/gDALULDN8PAD6atYdCTX9gUNKlj8wZAKUsAOzZz+UMAOsJAP/Z2ccMDA8PD/95eX5NWvsJCOVNQPtfX/8zM8+QePLl38MGBr8JCP+zs9myn/8GBqwpAP/GxgwJCPny78lzYLgjAJ8vAP9fX/+MjMUcAN8zM/9wcM8ZGcATEL+QePdZWf/29uc/P9cmJu9MTDImIN+/r7+/vz8/P8VNQGNugV8AAF9fX8swMNgTAFlDOICAgPNSUnNWSMQ5MBAQEJE3QPIGAM9AQMqGcG9vb6MhJsEdGM8vLx8fH98AANIWAMuQeL8fABkTEPPQ0OM5OSYdGFl5jo+Pj/+pqcsTE78wMFNGQLYmID4dGPvd3UBAQJmTkP+8vH9QUK+vr8ZWSHpzcJMmILdwcLOGcHRQUHxwcK9PT9DQ0O/v70w5MLypoG8wKOuwsP/g4P/Q0IcwKEswKMl8aJ9fX2xjdOtGRs/Pz+Dg4GImIP8gIH0sKEAwKKmTiKZ8aB/f39Wsl+LFt8dgUE9PT5x5aHBwcP+AgP+WltdgYMyZfyywz78AAAAAAAD///8AAP9mZv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAKgALAAAAAA9AEQAAAj/AFEJHEiwoMGDCBMqXMiwocAbBww4nEhxoYkUpzJGrMixogkfGUNqlNixJEIDB0SqHGmyJSojM1bKZOmyop0gM3Oe2liTISKMOoPy7GnwY9CjIYcSRYm0aVKSLmE6nfq05QycVLPuhDrxBlCtYJUqNAq2bNWEBj6ZXRuyxZyDRtqwnXvkhACDV+euTeJm1Ki7A73qNWtFiF+/gA95Gly2CJLDhwEHMOUAAuOpLYDEgBxZ4GRTlC1fDnpkM+fOqD6DDj1aZpITp0dtGCDhr+fVuCu3zlg49ijaokTZTo27uG7Gjn2P+hI8+PDPERoUB318bWbfAJ5sUNFcuGRTYUqV/3ogfXp1rWlMc6awJjiAAd2fm4ogXjz56aypOoIde4OE5u/F9x199dlXnnGiHZWEYbGpsAEA3QXYnHwEFliKAgswgJ8LPeiUXGwedCAKABACCN+EA1pYIIYaFlcDhytd51sGAJbo3onOpajiihlO92KHGaUXGwWjUBChjSPiWJuOO/LYIm4v1tXfE6J4gCSJEZ7YgRYUNrkji9P55sF/ogxw5ZkSqIDaZBV6aSGYq/lGZplndkckZ98xoICbTcIJGQAZcNmdmUc210hs35nCyJ58fgmIKX5RQGOZowxaZwYA+JaoKQwswGijBV4C6SiTUmpphMspJx9unX4KaimjDv9aaXOEBteBqmuuxgEHoLX6Kqx+yXqqBANsgCtit4FWQAEkrNbpq7HSOmtwag5w57GrmlJBASEU18ADjUYb3ADTinIttsgSB1oJFfA63bduimuqKB1keqwUhoCSK374wbujvOSu4QG6UvxBRydcpKsav++Ca6G8A6Pr1x2kVMyHwsVxUALDq/krnrhPSOzXG1lUTIoffqGR7Goi2MAxbv6O2kEG56I7CSlRsEFKFVyovDJoIRTg7sugNRDGqCJzJgcKE0ywc0ELm6KBCCJo8DIPFeCWNGcyqNFE06ToAfV0HBRgxsvLThHn1oddQMrXj5DyAQgjEHSAJMWZwS3HPxT/QMbabI/iBCliMLEJKX2EEkomBAUCxRi42VDADxyTYDVogV+wSChqmKxEKCDAYFDFj4OmwbY7bDGdBhtrnTQYOigeChUmc1K3QTnAUfEgGFgAWt88hKA6aCRIXhxnQ1yg3BCayK44EWdkUQcBByEQChFXfCB776aQsG0BIlQgQgE8qO26X1h8cEUep8ngRBnOy74E9QgRgEAC8SvOfQkh7FDBDmS43PmGoIiKUUEGkMEC/PJHgxw0xH74yx/3XnaYRJgMB8obxQW6kL9QYEJ0FIFgByfIL7/IQAlvQwEpnAC7DtLNJCKUoO/w45c44GwCXiAFB/OXAATQryUxdN4LfFiwgjCNYg+kYMIEFkCKDs6PKAIJouyGWMS1FSKJOMRB/BoIxYJIUXFUxNwoIkEKPAgCBZSQHQ1A2EWDfDEUVLyADj5AChSIQW6gu10bE/JG2VnCZGfo4R4d0sdQoBAHhPjhIB94v/wRoRKQWGRHgrhGSQJxCS+0pCZbEhAAOw==";
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

// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/sketchpad.tool.line.js
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

function ToolLine(config) {
    "use strict";
    Tool.call(this, config);
    this.toolId = config.toolId || "line";
    // console.log("new rect", this);
}

ToolLine.prototype = Object.create(Tool.prototype);

Object.assign(ToolLine.prototype, {
    color: {
        r: 0,
        g: 0,
        b: 0,
        a: 1
    },
    // toolLabel: "╱",
    toolLabel: "Line",
    toolKey: "l",
    toolId: "line",
    lineWidth: 1,
    keyCode: 76, //l

    /**
     * [startInput description]
     * @memberof ToolLine#
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
            color: this.getColorStr(),
            size: this.lineWidth,
            layers: this.layers
        });

        input.selectorDiv = document.createElement("div");
        input.selectorDiv.style.position = "absolute";
        input.selectorDiv.style.display = "block";
        input.selectorDiv.style.backgroundColor = this.getColorStr();
        if (this.sketchpad.centerViewport) {
            input.selectorDiv.style.left = this.sketchpad.width / 2 + x + "px";
            input.selectorDiv.style.top = this.sketchpad.height / 2 + y + "px";
        } else {
            input.selectorDiv.style.left = x + "px";
            input.selectorDiv.style.top = y + "px";
        }
        input.selectorDiv.style.width = "1px";
        var height = this.getSize();
        if (height < 1) {
            input.selectorDiv.style.borderTop = "1px dashed " + this.getColorStr();
        }
        input.selectorDiv.style.height = height + "px";
        // input.selectorDiv.style.lineHeight = "1px";
        input.startX = x;
        input.startY = y;
        sketchpad.containerEl.appendChild(input.selectorDiv);


        input.addPoint(new Date().getTime(), x, y);
        return input;
    },

    /**
     * Style div to connect two points
     * @memberof ToolLine#
     * @param  {HTMLElement} el        [description]
     * @param  {number} x1        [description]
     * @param  {number} y1        [description]
     * @param  {number} x2        [description]
     * @param  {number} y2        [description]
     * @param  {number} thickness [description]
     * @return {undefined}           [description]
     */
    connect: function connect(el, x1, y1, x2, y2, thickness) {
        "use strict";
        // distance
        var length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
        // center
        var cx = ((x1 + x2) / 2) - (length / 2);
        var cy = ((y1 + y2) / 2) - (thickness / 2);
        // angle
        var angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);
        // make hr
        if (this.sketchpad.centerViewport) {
            el.style.left = this.sketchpad.width / 2 + cx + "px";
            el.style.top = this.sketchpad.height / 2 + cy + "px";
        } else {
            el.style.left = cx + "px";
            el.style.top = cy + "px";
        }

        el.style.width = length + "px";
        el.style.transform = "rotate(" + angle + "deg)";
        el.style.webkitTransform = "rotate(" + angle + "deg)";
        el.style.MozTransform = "rotate(" + angle + "deg)";
        el.style.msTransform = "rotate(" + angle + "deg)";
        el.style.OTransform = "rotate(" + angle + "deg)";
    },

    /**
     * [moveInput description]
     * @memberof ToolLine#
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

        var firstX = input.startX;
        var firstY = input.startY;

        if (e.shiftKey) {
            var dx = x - firstX;
            var dy = y - firstY;
            var distance = this.distance(firstX, firstY, x, y);
            var angle = Math.round(Math.atan2(dx, dy) / (Math.PI / 4)) * (Math.PI / 4);
            x = firstX + distance * Math.sin(angle);
            y = firstY + distance * Math.cos(angle);
        }

        var sx = firstX;
        var sy = firstY;
        var ex = x;
        var ey = y;

        this.connect(input.selectorDiv, sx, sy, ex, ey, this.getSize());
    },

    /**
     * [finishInput description]
     * @memberof ToolLine#
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

        var firstX = input.startX;
        var firstY = input.startY;

        if (e.shiftKey) {
            var dx = x - firstX;
            var dy = y - firstY;
            var distance = this.distance(firstX, firstY, x, y);
            var angle = Math.round(Math.atan2(dx, dy) / (Math.PI / 4)) * (Math.PI / 4);
            x = firstX + distance * Math.sin(angle);
            y = firstY + distance * Math.cos(angle);
        }

        input.addPoint(new Date().getTime(), x, y);
        sketchpad.containerEl.removeChild(input.selectorDiv);
    },

    /**
     * Draw engine
     * @memberof ToolLine#
     * @param  {object} Drawing parameters
     * @param  {object} List of points to draw
     * @return {undefined}
     */
    drawFramePath: function drawFramePath(config, points) {
        "use strict";
        var toolConfig = config.cnf;
        var sketchpad = this.sketchpad,
            ll,
            context;


        if (!toolConfig.lay || !toolConfig.lay.length) {
            console.warn("no layers to draw");
            return;
        }
        // var p1, p2;
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
            context.rotate(sketchpad.rotation * Math.PI / 180);
            context.scale(sketchpad.scale, sketchpad.scale);
            context.translate(config.vpx, config.vpy);
            context.translate(-sketchpad.viewportX, -sketchpad.viewportY);
            context.scale(1 / config.scl, 1 / config.scl);
            context.rotate(-config.rot * Math.PI / 180);

            context.beginPath();
            context.lineCap = "butt";
            context.lineJoin = "round";
            context.strokeStyle = toolConfig.col;
            context.lineWidth = toolConfig.siz;
            context.moveTo(points.x[0], points.y[0]);
            context.lineTo(points.x[1], points.y[1]);
            context.stroke();
            context.restore();
        }


    }
});
NSSketchpad.avaliableTools.push(ToolLine);

// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/sketchpad.tool.mandala.js
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
function ToolMandala(config) {
    "use strict";
    Tool.call(this, config);
}


ToolMandala.prototype = Object.create(Tool.prototype);

Object.assign(ToolMandala.prototype, {
    layers: ["F"],
    axis: 7,
    color: {
        r: 0,
        g: 0,
        b: 0,
        a: 1
    },
    toolId: "mandala",
    toolLabel: "Mandala",
    lineWidth: 1,
    keyCode: 77, //m
    mirrorV: false,
    mirrorH: true,
    mirrorVH: false,
    rainbow: false,
    hideByDefault: false,

    // getCursor: function getCursor() {
    //     "use strict";
    //     var size = parseInt(this.getSize() + 1, 10);
    //     size = size / 2 + (size) / (size / 5 + 0);
    //     var style = {
    //         pointer: "crosshair",
    //         marginLeft: -size / 2 + "px",
    //         marginTop: -size / 2 + "px",
    //         width: size + "px",
    //         height: size + "px",
    //         border: "1px solid black",
    //         boxSizing: "border-box",
    //         borderRadius: "50%",
    //         // border: "1px solid black";
    //         backgroundColor: "rgba(0,0,0,0)"
    //     };

    //     return style;

    // },
    getToolConfig: function getToolConfig() {
        "use strict";
        var config = Tool.prototype.getToolConfig.call(this);
        return Object.assign(config, {
            axis: this.axis,
            mirrorV: this.mirrorV,
            mirrorH: this.mirrorH,
            mirrorVH: this.mirrorVH,
            rainbow: this.rainbow
        });
    },

    setToolConfig: function setToolConfig(config) {
        "use strict";
        Tool.prototype.setToolConfig.call(this, config);

        if (parseInt(config.axis, 10)) {
            this.axis = parseInt(config.axis, 10);
        }
        this.mirrorV = config.mirrorV;
        this.mirrorH = config.mirrorH;
        this.mirrorVH = config.mirrorVH;
        this.rainbow = config.rainbow;
        this.dispatch("changeParams");

        return this;
    },

    startInput: function startPath(id, x, y, e) {
        "use strict";
        if (e.altKey) {
            x = Math.round(x / 10) * 10;
            y = Math.round(y / 10) * 10;
        }

        var input = Tool.prototype.startInput.call(this, id, x, y);

        input.mirrorV = this.mirrorV; //flipv
        input.mirrorH = this.mirrorH; //fliph
        input.mirrorVH = this.mirrorVH; //yng-yang
        input.rainbow = this.rainbow; //
        input.axis = this.axis;

        return input;
    },


    /**
     * Get color based on x, y coordinates
     *
     * @memberof ToolRainbow#
     * @param  {number} x           - x
     * @param  {number} y           - y
     * @return {string} - color as "rgba(0,0,0,1) string
     */
    getRbwColorStr: function getRbwColorStr(x, y) {
        "use strict";
        var color = {
            r: 0,
            g: 0,
            b: 0,
            a: 1
        };
        color.r = Math.abs(Math.floor(Math.sin(x / 50) * 255)) % 255;
        color.g = Math.abs(Math.floor(Math.cos(y / 50) * 255)) % 255;
        color.b = Math.abs(Math.floor(Math.cos(x / 50) * 255)) % 255;
        // this.color.a = 1;
        return "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.a + ")";
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

        var toolConfig = config.cnf;

        var sketchpad = this.sketchpad,
            context,
            l,
            ll,
            k = toolConfig.axs,
            i,
            angle;

        if (!toolConfig.lay || !toolConfig.lay.length) {
            console.warn("no layers to draw");
            return;
        }
        function rotate(px, py, theta, n) {
            if ((n % 2) === 1) {
                n = 1;//trolololo
            }

            return {
                x: Math.cos(theta) * (px) - Math.sin(theta) * (py),
                y: Math.sin(theta) * (px) + Math.cos(theta) * (py)
            };
        }
        var p1,
            p2;

        var that = this;
        function line(context, p1, p2) {
            context.save();
            context.beginPath();

            context.rotate(sketchpad.rotation * Math.PI / 180);
            context.scale(sketchpad.scale, sketchpad.scale);


            context.translate(config.vpx, config.vpy);
            context.translate(-sketchpad.viewportX, -sketchpad.viewportY);

            context.scale(1 / config.scl, 1 / config.scl);
            context.rotate(-config.rot * Math.PI / 180);


            context.lineWidth = toolConfig.siz;// / 2 + (toolConfig.siz) / (toolConfig.siz / 5 + that.distance(p1.x, p1.y, p2.x, p2.y) / 10);
            if (toolConfig.rbw) {
                context.strokeStyle = that.getRbwColorStr(p1.x, p1.y);
            } else {
                context.strokeStyle = toolConfig.col;
            }

            context.moveTo(p1.x, p1.y);
            context.lineTo(p2.x, p2.y);
            context.stroke();
            context.restore();
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


            if (points && points.x && points.x.length > 1) {
                for (l = 1; l < points.x.length; l += 1) {
                    for (i = 0; i < k; i += 1) {
                        angle = i * 2 * Math.PI / k;

                        if (true) {
                            p1 = rotate(points.x[l - 1], points.y[l - 1], angle, i);
                            p2 = rotate(points.x[l], points.y[l], angle, i);
                            line(context, p1, p2);
                        }
                        if (toolConfig.mrh) {
                            p1 = rotate(points.x[l - 1], -points.y[l - 1], angle, i);
                            p2 = rotate(points.x[l], -points.y[l], angle, i);
                            line(context, p1, p2);
                        }
                        if (toolConfig.mrv) {
                            p1 = rotate(-points.x[l - 1], points.y[l - 1], angle, i);
                            p2 = rotate(-points.x[l], points.y[l], angle, i);
                            line(context, p1, p2);
                        }
                        if (toolConfig.mrvh) {
                            p1 = rotate(-points.x[l - 1], -points.y[l - 1], angle, i);
                            p2 = rotate(-points.x[l], -points.y[l], angle, i);
                            line(context, p1, p2);
                        }

                    }

                }
            }
        }
    }

});
NSSketchpad.avaliableTools.push(ToolMandala);



// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/sketchpad.tool.move-viewport.js
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
 * Tool for moving viewport
 *
 * @class
 * @extends Tool
 * @param {object} config - tool config
 */
function ToolMoveViewport(config) {
    "use strict";
    Tool.call(this, config);
    this.toolId = config.toolId || "move-viewport";
    this.layers = [];
}
ToolMoveViewport.prototype = Object.create(Tool.prototype);

Object.assign(ToolMoveViewport.prototype, {
    maxLayers: 0,
    keyCode: 32, //space
    toolLabel: "Move",//👋
    toolId: "move-viewport",

    getCursor: function getCursor() {
        "use strict";

        var style = {
            pointer: "move",
            border: "none",
            borderRadius: 0,
            backgroundColor: "rgba(0,0,0,0)"
        };

        return style;

    },
    /**
     * MouseDown/TouchStart
     *
     * @memberof ToolMoveViewport#
     * @param  {any} id - unique id in current moment
     * @param  {integer} x  - x coordinate
     * @param  {integer} y  - y coordinate
     * @return {Input} - returns new Input for current tool touch
     */
    startInput: function startPath(id, x, y, e) {
        "use strict";
        if (e && e.altKey) {
            x = Math.round(x / 10) * 10;
            y = Math.round(y / 10) * 10;
        }

        var sketchpad = this.sketchpad;
        var input = new Input({
            sketchpad: sketchpad,
            id: id,
            tool: this.toolId
        });

        input.tmpCursor = this.sketchpad.containerEl.style.cursor;
        input.startX = x;
        input.startY = y;

        input.viewportX = this.sketchpad.viewportX;
        input.viewportY = this.sketchpad.viewportY;
        sketchpad.containerEl.style.cursor = "move";

        sketchpad.hudsEl.style.opacity = 0;
        return input;
    },

    /**
     * MouseMove/TouchMove
     *
     * @memberof ToolMoveViewport#
     * {@link http://sketchpad.pro|Sketchpad.pro - drawing board sketch free}
     *
     */
    moveInput: function moveInput(input, x, y, e) {
        "use strict";
        if (e && e.altKey) {
            x = Math.round(x / 10) * 10;
            y = Math.round(y / 10) * 10;
        }
        var p = {
            x: (x - input.startX) * (1 / this.sketchpad.scale),
            y: (y - input.startY) * (1 / this.sketchpad.scale)
        };
        var sketchpad = this.sketchpad;
        p = this.rotate(-sketchpad.rotation, p);

        var newX = input.viewportX - p.x,
            newY = input.viewportY - p.y;

        if (e && e.shiftKey) {
            newX = Math.round(newX / 10) * 10;
            newY = Math.round(newY / 10) * 10;
        }
        this.sketchpad.setViewportPosition(newX, newY);
    },

    /**
     * MouseUp/TouchEnd
     *
     * @memberof ToolMoveViewport#
     * {@link http://sketchpad.pro|Sketchpad.pro - drawing board sketch free}
     */
    finishInput: function finishInput(input, x, y, e) {
        "use strict";
        if (e && e.altKey) {
            x = Math.round(x / 10) * 10;
            y = Math.round(y / 10) * 10;
        }

        this.moveInput(input, x, y, e);

        this.sketchpad.containerEl.style.cursor = input.tmpCursor;
        // sketchpad.hudsEl.style.display = "block";
        this.sketchpad.hudsEl.style.opacity = 1;

    },

    /**
     * Draw engine runs both for drawed and received paths
     * @memberof ToolMoveViewport#
     * @param  {object} Drawing parameters
     * @param  {object} List of points to draw
     * @return {undefined}
     */
    drawFramePath: function drawFramePath() {
        "use strict";
        // DO NOTHING
        return;

    }
});
NSSketchpad.avaliableTools.push(ToolMoveViewport);
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/sketchpad.tool.null.js
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
 * Tool for moving viewport
 *
 * @class
 * @extends Tool
 * @param {object} config - tool config
 */
function ToolNull(config) {
    "use strict";
    Tool.call(this, config);
    this.toolId = config.toolId || "null";
    this.layers = [];
}
ToolNull.prototype = Object.create(Tool.prototype);

Object.assign(ToolNull.prototype, {
    maxLayers: 0,
    keyCode: 27,
    toolLabel: "Null",//👋
    toolId: "null",

    /**
     * MouseDown/TouchStart
     *
     * @memberof ToolNull#
     * @return {Input} - returns new Input for current tool touch
     */
    startInput: function startPath(id) {
        "use strict";
        var sketchpad = this.sketchpad;
        var input = new Input({
            sketchpad: sketchpad,
            id: id,
            tool: this.toolId
        });
        input.tmpCursor = this.sketchpad.containerEl.style.cursor;
        sketchpad.containerEl.style.cursor = "none";
        return input;
    },

    /**
     * MouseMove/TouchMove
     *
     * @memberof ToolNull#
     * {@link http://sketchpad.pro|Sketchpad.pro - drawing board sketch free}
     *
     */
    moveInput: function moveInput() {
        "use strict";
        return;
    },

    /**
     * MouseUp/TouchEnd
     *
     * @memberof ToolNull#
     * {@link http://sketchpad.pro|Sketchpad.pro - drawing board sketch free}
     */
    finishInput: function finishInput(input) {
        "use strict";
        this.sketchpad.containerEl.style.cursor = input.tmpCursor;
        return;
    },

    /**
     * Draw engine runs both for drawed and received paths
     * @memberof ToolNull#
     * @param  {object} Drawing parameters
     * @param  {object} List of points to draw
     * @return {undefined}
     */
    drawFramePath: function drawFramePath() {
        "use strict";
        // DO NOTHING
        return;
    }
});
NSSketchpad.avaliableTools.push(ToolNull);

// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/sketchpad.tool.pen.js
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
function ToolPen(config) {
    "use strict";
    Tool.call(this, config);
}


ToolPen.prototype = Object.create(Tool.prototype);

Object.assign(ToolPen.prototype, {
    color: {
        r: 0,
        g: 0,
        b: 0,
        a: 1
    },
    lineWidth: 1,
    layers: ["F"],
    keyCode: 80, //p
    toolId: "pen",//"✎"
    toolLabel: "Pen"
});
NSSketchpad.avaliableTools.push(ToolPen);
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/sketchpad.tool.rainbow.js
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
 * @class
 * @version 0.5.1
 * @tutorial solver
 * @tutorial tutorial-1
 * @tutorial tutorial-2
 * @extends Tool
 * CONNECT
 * @throws {InvalidArgumentException}
 * @param {object} config - tool config
 */
function ToolRainbow(config) {
    "use strict";
    Tool.call(this, config);
}

ToolRainbow.prototype = Object.create(Tool.prototype);

Object.assign(ToolRainbow.prototype, {
    toolId: "rainbow",

    lineWidth: 1,
    keyCode: 66, //b
    toolLabel: "Rainbow",//🌈
    hideByDefault: false,

    getCursor: function getCursor() {
        "use strict";
        var size = parseInt(this.getSize() + 1, 10);
        size = size + 10;
        var style = {
            pointer: "crosshair",
            marginLeft: -size / 2 + "px",
            marginTop: -size / 2 + "px",
            width: size + "px",
            height: size + "px",
            border: "1px solid black",
            boxSizing: "border-box",
            borderRadius: "50%",
            // border: "1px solid black";
            backgroundColor: "rgba(0,0,0,0)"
        };
        return style;
    },

    /**
     * Get color based on x, y coordinates
     *
     * @memberof ToolRainbow#
     * @param  {number} x           - x
     * @param  {number} y           - y
     * @return {string} - color as "rgba(0,0,0,1)"" string
     */
    getColorStr: function getColorStr(x, y) {
        "use strict";
        this.color.r = Math.floor(Math.sin(x / 50) * 256);
        this.color.g = Math.floor(Math.cos(y / 50) * 256);
        this.color.b = Math.floor(Math.cos(x / 50) * 256);
        this.color.a = 1;
        return "rgba(" + this.color.r + "," + this.color.g + "," + this.color.b + "," + this.color.a + ")";
    },

    /**
     * Draw part of rainbow
     *
     * @memberof ToolRainbow#
     * @param  {object} config      - Drawing parameters
     * @param  {array} points       - List of points to draw
     */
    drawFramePath: function drawFramePath(config, points) {
        "use strict";
        var toolConfig = config.cnf;
        var sketchpad = this.sketchpad,
            l,
            ll,
            context;
        context = null;
        if (!toolConfig.lay || !toolConfig.lay.length) {
            console.warn("no layers to draw");
            return;
        }
        var p1, p2;
        // for each layer
        for (ll = 0; ll < toolConfig.lay.length; ll += 1) {
            // switch context...
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

            context.rotate(sketchpad.rotation * Math.PI / 180);
            context.scale(sketchpad.scale, sketchpad.scale);


            context.translate(config.vpx, config.vpy);
            context.translate(-sketchpad.viewportX, -sketchpad.viewportY);

            context.scale(1 / config.scl, 1 / config.scl);
            context.rotate(-config.rot * Math.PI / 180);

            // if there are points to draw (should be)
            if (points && points.x && points.y && points.x.length > 1) {
                for (l = 1; l < points.x.length; l += 1) {

                    p1 = {x: points.x[l - 1], y: points.y[l - 1]};
                    p2 = {x: points.x[l], y: points.y[l]};
                    context.beginPath();
                    context.strokeStyle = this.getColorStr(p1.x, p1.y);
                    context.lineCap = 'miter';
                    context.lineJoin = 'miter';
                    // console.log(config.siz);
                    context.lineWidth = toolConfig.siz + 100 / (10 + this.distance(p1.x, p1.y, p2.x, p2.y));

                    context.moveTo(p1.x, p1.y);
                    context.lineTo(p2.x, p2.y);
                    context.stroke();
                }
            }
            context.restore();

        }
    }

});
NSSketchpad.avaliableTools.push(ToolRainbow);

// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/sketchpad.tool.rectangle.js
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


/*global NSSketchpad, Input, ToolFillable*/
/**
 * @constructor
 * @augments Tool
 * @param {object} config - tool config
 */
function ToolRect(config) {
    "use strict";
    ToolFillable.call(this, config);
}
ToolRect.prototype = Object.create(ToolFillable.prototype);

Object.assign(ToolRect.prototype, {
    layers: ["F"],
    toolLabel: "Rectangle",//□
    toolId: "rectangle",
    keyCode: 82, //r
    lineWidth: 1,
    color: {
        r: 0,
        g: 0,
        b: 0,
        a: 1
    },

    fillColor: {
        r: 255,
        g: 80,
        b: 0,
        a: 0
    },


    /**
     * [startInput description]
     * @memberof ToolRect#
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
            color: this.getColorStr(),
            fillColor: this.getFillColorStr(),
            size: this.lineWidth,
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

        input.addPoint(new Date().getTime(), x, y);
        return input;
    },

    /**
     * [moveInput description]
     * @memberof ToolRect#
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
     * @memberof ToolRect#
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

        var h = Math.abs(y - firstY);
        if (e.shiftKey) {
            if (x < firstX) {
                x = firstX - h;
            } else {
                x = firstX + h;
            }
        }

        input.addPoint(new Date().getTime(), x, y);
        sketchpad.containerEl.removeChild(input.selectorDiv);
    },


    /**
     * Draw engine
     * @memberof ToolRect#
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

        if (!toolConfig.lay || !toolConfig.lay.length) {
            console.warn("no layers to draw");
            return;
        }
        var p1, p2;

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
            context.strokeStyle = toolConfig.col;
            context.fillStyle = toolConfig.fcl;
            context.lineWidth = toolConfig.siz;

            context.rotate(sketchpad.rotation * Math.PI / 180);
            context.scale(sketchpad.scale, sketchpad.scale);


            context.translate(config.vpx, config.vpy);
            context.translate(-sketchpad.viewportX, -sketchpad.viewportY);

            context.scale(1 / config.scl, 1 / config.scl);
            context.rotate(-config.rot * Math.PI / 180);


            p1 = {x: points.x[0], y: points.y[0]};
            p2 = {x: points.x[1], y: points.y[1]};
            context.rect(
                p1.x,
                p1.y,
                p2.x - p1.x,
                p2.y - p1.y
            );
            context.fill();
            context.stroke();
            context.restore();

        }


    }
});
NSSketchpad.avaliableTools.push(ToolRect);

// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/sketchpad.tool.rotate-viewport.js
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
 * Tool for moving viewport
 *
 * @class
 * @extends Tool
 * @param {object} config - tool config
 */
function ToolRotateViewport(config) {
    "use strict";
    Tool.call(this, config);
    this.toolId = config.toolId || "rotate-viewport";
    this.layers = [];
}
ToolRotateViewport.prototype = Object.create(Tool.prototype);

Object.assign(ToolRotateViewport.prototype, {
    maxLayers: 0,
    keyCode: 32, //space
    toolLabel: "Rotate",//👋
    toolId: "rotate-viewport",
    getCursor: function getCursor() {
        "use strict";

        var style = {
            pointer: "default",
            border: "none",
            borderRadius: "50%",
            backgroundColor: "rgba(0,0,0,0)"
        };

        return style;

    },

    /**
     * MouseDown/TouchStart
     *
     * @memberof ToolRotateViewport#
     * @param  {any} id - unique id in current moment
     * @param  {integer} x  - x coordinate
     * @param  {integer} y  - y coordinate
     * @return {Input} - returns new Input for current tool touch
     */
    startInput: function startPath(id, x, y) {
        "use strict";
        var sketchpad = this.sketchpad;
        var input = new Input({
            sketchpad: sketchpad,
            id: id,
            tool: this.toolId
        });
        // input.tmpCursor = this.sketchpad.containerEl.style.cursor;
        input.startRotation = sketchpad.rotation;
        input.startX = x;
        input.startY = y;
        input.viewportX = this.sketchpad.viewportX;
        input.viewportY = this.sketchpad.viewportY;
        // sketchpad.containerEl.style.cursor = "hand";

        //sketchpad.hudsEl.style.display = "none";
        sketchpad.hudsEl.style.opacity = 0;
        return input;
    },

    /**
     * MouseMove/TouchMove
     *
     * @memberof ToolRotateViewport#
     * {@link http://sketchpad.pro|Sketchpad.pro - drawing board sketch free}
     *
     */
    moveInput: function moveInput(input, x, y, e) {
        "use strict";
        var theta = (Math.atan2(x, y) * 180) / Math.PI - (Math.atan2(input.startX, input.startY) * 180) / Math.PI;
        if (e.shiftKey) {
            theta = Math.round(theta / 15) * 15;
        }

        this.sketchpad.setRotation((-theta + input.startRotation) % 360);

    },

    /**
     * MouseUp/TouchEnd
     *
     * @memberof ToolRotateViewport#
     * {@link http://sketchpad.pro|Sketchpad.pro - drawing board sketch free}
     */
    finishInput: function finishInput(ignore) {
        "use strict";
        // this.sketchpad.containerEl.style.cursor = input.tmpCursor;
        // sketchpad.hudsEl.style.display = "block";
        this.sketchpad.hudsEl.style.opacity = 1;

    },

    /**
     * Draw engine runs both for drawed and received paths
     * @memberof ToolRotateViewport#
     * @param  {object} Drawing parameters
     * @param  {object} List of points to draw
     * @return {undefined}
     */
    drawFramePath: function drawFramePath() {
        "use strict";
        // DO NOTHING
        return;

    }
});
NSSketchpad.avaliableTools.push(ToolRotateViewport);

// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/sketchpad.tool.type.js
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
 * @class
 * Tool type
 *
 * @extends Tool
 * @implements Tool
 *
 * @param {object} config - tool config {fontSize:20,color: "black"}
 */
function ToolType(config) {
    "use strict";
    Tool.call(this, config);
    // this.setSize(32);
    this.toolId = config.toolId || "type";
}

ToolType.prototype = Object.create(Tool.prototype);

Object.assign(ToolType.prototype, {
    toolLabel: "Text",//"T"
    toolId: "type",
    font: "Arial",
    keyCode: 84, //t
    color: {
        r: 0,
        g: 0,
        b: 0,
        a: 1
    },
    size: 14,

    getToolConfig: function getToolConfig() {
        "use strict";
        var config = Tool.prototype.getToolConfig.call(this);
        return Object.assign(config, {
            font: this.getFont(),
            size: this.getSize()
        });
    },

    setToolConfig: function setToolConfig(config) {
        "use strict";
        Tool.prototype.setToolConfig.call(this, config);

        if (parseFloat(config.size)) {
            this.setSize(parseFloat(config.size));
        }

        if (config.font) {
            // console.log("setFont", config.font);
            this.setFont(config.font);
        }
        this.dispatch("changeParams");
        return this;
    },
    /**
     * Set size
     * @param {integer} size - tool size
     */
    setSize: function setSize(size) {
        "use strict";
        // alert("SetSize:" + size);
        this.size = parseFloat(size);
        this.dispatch("changeParams");
        return this;
    },

    /**
     * Get current size
     * @return {integer} number
     */
    getSize: function getSize() {
        "use strict";
        return this.size;
    },


    /**
     * Sets font
     * @memberof ToolType#
     * @param {string} font - font name
     */
    setFont: function setFont(font) {
        "use strict";
        this.font = font;
        this.dispatch("changeParams");
        return this;
    },

    /**
     * Returns current font
     * @memberof ToolType#
     */
    getFont: function getFont() {
        "use strict";
        return this.font;
    },

    /**
     * On click
     *
     * @memberof ToolType#
     *
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
            color: this.getColorStr(),
            // fillColor: this.getFillColorStr(),
            font: this.getFont(),
            size: this.getSize(),
            layers: this.layers
        });

        var inputWidth = 10000;

        input.typeInput = document.createElement("input");
        input.typeInput.value = "enter text here";
        input.typeInput.placeholder = "enter text here";
        input.typeInput.style.border = 0;
        input.typeInput.style.boxShadow = "none";
        input.typeInput.style.position = "absolute";
        input.typeInput.style.outline = "0";
        input.typeInput.style.overflow = "hidden";
        input.typeInput.style.padding = 0;
        input.typeInput.style.margin = 0;
        input.typeInput.style.fontFamily = this.getFont();
        input.typeInput.style.fontSize = this.getSize() + "px";
        input.typeInput.style.display = "inline-block";
        input.typeInput.style.color = this.getColorStr();
        input.typeInput.style.backgroundColor = "rgba(255,255,255,0)";
        if (this.sketchpad.centerViewport) {
            input.typeInput.style.left = this.sketchpad.width / 2 + x - 1 + "px";
            input.typeInput.style.top = this.sketchpad.height / 2 + y - this.getSize() / 2 + "px";
        } else {
            input.typeInput.style.left = x - 1 + "px";
            input.typeInput.style.top = y - this.getSize() / 2 + "px";
        }
        input.typeInput.style.width = inputWidth + "px";

        input.typeInput.style.height = this.getSize() + "px";
        input.typeInput.style.lineHeight = this.getSize() + "px";

        function write() {

            if (input.typeInput.written) {
                return false;
            }
            input.typeInput.written = true;
            input.addPoint(new Date().getTime(), input.x - 1, input.y);
            input.addPoint(new Date().getTime(), input.x, input.y);
            input.textContent = input.typeInput.value;

            sketchpad.inputs[667] = input;
            sketchpad.sendInputs();
            sketchpad.drawInputs();

            delete sketchpad.inputs[667];
            sketchpad.containerEl.removeChild(input.typeInput);
            /** rethink **/
            // sketchpad.containerEl.scrollLeft = 0;
            // sketchpad.containerEl.scrollTop = 0;
        }

        input.typeInput.addEventListener("blur", write);
        input.typeInput.addEventListener("change", write);
        input.typeInput.addEventListener("keyup", function (e) {
            if (e.keyCode === 13) {
                write();
            }
            if (e.keyCode === 27) {
                input.typeInput.value = "";
                write();
            }
        });
        // this.write = write;
        // input.typeInputContainer.appendChild(input.typeInput);
        sketchpad.containerEl.appendChild(input.typeInput);

        return input;
    },

    /**
     * [moveInput description]
     * @memberof ToolType#
     * @param  {Input} input - [description]
     * @param  {number} x -    [description]
     * @param  {number} y -   [description]
     * @param  {HTMLEvent} e -    [description]
     * @return {undefined}       [description]
     */
    moveInput: function moveInput(input, x, y, e) {
        "use strict";
        if (e.altKey) {
            x = Math.round(x / 10) * 10;
            y = Math.round(y / 10) * 10;
        }

        y -= this.getSize() / 2;
        // input.typeInput.style.position = "absolute";
        if (this.sketchpad.centerViewport) {
            input.typeInput.style.left = this.sketchpad.width / 2 + x + "px";
            input.typeInput.style.top = this.sketchpad.height / 2 + y + "px";
        } else {
            input.typeInput.style.left = x + "px";
            input.typeInput.style.top = y + "px";
        }

    },

    /**
     * [finishInput description]
     * @memberof ToolType#
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

        input.x = x;
        input.y = y;
        input.typeInput.value = "";
        input.typeInput.focus();
        input.typeInput.select();
    },

    /**
     * Draw engine
     * @memberof ToolType#
     * @param  {object} Drawing parameters
     * @param  {object} List of points to draw
     * @return {undefined}
     */
    drawFramePath: function drawFramePath(config, points) {
        "use strict";
        var toolConfig = config.cnf;
        var sketchpad = this.sketchpad,
            ll,
            context;

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

            context.rotate(sketchpad.rotation * Math.PI / 180);
            context.scale(sketchpad.scale, sketchpad.scale);


            context.translate(config.vpx, config.vpy);
            context.translate(-sketchpad.viewportX, -sketchpad.viewportY);

            context.scale(1 / config.scl, 1 / config.scl);
            context.rotate(-config.rot * Math.PI / 180);


            context.font = toolConfig.siz + "px " + toolConfig.fnt;
            context.fillStyle = toolConfig.col;
            context.textAlign = "left";
            context.textBaseline = "middle";

            context.fillText(toolConfig.txt, points.x[0], points.y[0]);
            context.restore();
        }


    }
});

NSSketchpad.avaliableTools.push(ToolType);

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
