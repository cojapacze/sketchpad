/*global window, Sketchpad, WebSocket, Colorpalette, alert*/
var primaryServer = "ws://" + (window.location.hostname || "localhost") + ":8067/",
    secondaryServer = "wss://public.server.sketchpad.pro:8067/";

function splitScreen(wsA, wsB) {
    "use strict";
    console.log("Inintializing splitScreen", wsA, wsB);


    var sketchpadA = new Sketchpad({
        containerEl: document.getElementById("sketchpadA"),
        token: window.location.hash || "#multiplayer",
        ws: wsA,
        createPageConfig: {sid: "#1page_token"}
    });
    sketchpadA.setTool("pen");

    var sketchpadB = new Sketchpad({
        containerEl: document.getElementById("sketchpadB"),
        token: window.location.hash || "#multiplayer",
        ws: wsB,
        createPageConfig: {sid: "#1page_token"}
    });
    sketchpadB.setTool("highlighter");

    //objects visible in developer console
    window.sketchpadA = sketchpadA;
    window.sketchpadB = sketchpadB;

}
function connectToServer(wsServerAddress, onSuccessCallback, onErrorCallback) {
    "use strict";
    var wsA = new WebSocket(wsServerAddress);
    var wsB = new WebSocket(wsServerAddress);
    function onError(e) {
        wsA.removeEventListener("error", onError);
        wsB.removeEventListener("error", onError);
        onErrorCallback(e);
    }

    function onOpen() {
        if (wsA.readyState === 1 && wsB.readyState === 1) {
            wsA.removeEventListener("error", onError);
            wsB.removeEventListener("error", onError);
            onSuccessCallback(wsA, wsB);
        }
    }
    wsA.addEventListener("open", onOpen);
    wsB.addEventListener("open", onOpen);
    wsA.addEventListener("error", onError);
    wsB.addEventListener("error", onError);
}

function initSketchpad() {
    "use strict";

    connectToServer(primaryServer, splitScreen, function () {
        console.log("Primary server fail, trying secondary server...", secondaryServer);
        connectToServer(secondaryServer, splitScreen, function () {
            alert("Connection fail.\n\nFollow instructions from: \nhttp://developers.sketchpad.pro\n \nto setup your own sketchpad server.");
        });
    });

    window.addEventListener("hashchange", function () {
        window.location.reload();//reconnect on room name in hash change
    });

}
initSketchpad();


