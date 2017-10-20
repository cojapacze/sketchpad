/*global window*/
function WebSocketJsonWrapper() {
    "use strict";
    var data = [];

    var events = {
        message: []
    };

    function addEventListener(name, fn) {
        if (typeof fn !== "function") {
            throw new Error("WebSocketJsonWrapper.addEventListener(name, fn): second argument must be a function");
        }
        if (!events[name]) {
            events[name] = [];
        }
        events[name].push(fn);
    }

    function fireEvent(type, e) {
        if (events[type]) {
            var i;
            for (i = 0; i < events[type].length; i += 1) {
                events[type][i](e);
            }
        } else {
            throw new Error("WebSocketJsonWrapper.fireEvent(type, e): unknow event type:" + type);
        }
    }

    function emitMessage(message) {
        fireEvent("message", message);
    }

    function reciveMessage(message) {
        emitMessage(message);
    }

    function send(msg) {
        data.push(msg);
    }

    function readTextFile(file, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4 && rawFile.status === 200) {
                callback(rawFile.responseText);
            }
        };
        rawFile.send(null);
    }

    function emitArray(array) {
        if (Array.isArray(array) && array.length) {
            var i;
            for (i = 0; i < array.length; i += 1) {
                reciveMessage({data: JSON.stringify(array[i])});
            }
        }
    }

    function emitFile(filename) {
        readTextFile(filename, function success(data) {
            var emitData = [];
            try {
                emitData = JSON.parse(data);
            } catch (e) {
                throw new Error("WebSocketJsonWrapper.emitFile: error parsing json file:", filename, e);
            }
            var i;
            for (i = 0; i < emitData.length; i += 1) {
                reciveMessage({data: JSON.stringify(emitData[i])});
            }
        });
    }

    //window.addEventListener('message', reciveMessage);

    return {
        addEventListener: addEventListener,
        send: send,
        emitArray: emitArray,
        emitFile: emitFile
    };

}

window.WebSocketJsonWrapper = WebSocketJsonWrapper;