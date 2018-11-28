"use strict";

var primaryServer = "ws://" + (window.location.hostname || "localhost") + ":8067/"

function initTools(sketchpad) {

}

function startSketchpad(ws) {
    var sketchpad = new Sketchpad({
        containerEl: document.getElementById("sketchpad"),
        token: window.location.hash || "#default",
        ws: ws,
        features: {
            displayCrosshair: true
        },
        createPageConfig: {sid: "#1page_token"}
    });

    sketchpad.setTool("pen");
    window.sketchpad = sketchpad;

    initTools(sketchpad);
}

function initSketchpad() {
    if ( window.location.hash == "" ) {
        generateHash()
    }
    
    var ws = new WebSocket(primaryServer);
    function onError(e) {
        ws.removeEventListener("error", onError);
    }
    function onOpen() {
        if (ws.readyState === 1 ) {
            ws.removeEventListener("error", onError);
            startSketchpad(ws);
        }
    }
    ws.addEventListener("open", onOpen);
    ws.addEventListener("error", onError);

    window.addEventListener("hashchange", function () {
        window.location.reload();
    });
}

function generateHash() {
    var hash = '#' + Math.random().toString(36).substring(2, 8);
    if(history.pushState) {
        history.pushState(null, null, hash);
    } else {
        window.location.hash = hash;
    }
}

initSketchpad();


