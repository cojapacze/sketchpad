/*global window, Sketchpad, WebSocket, WebSocketProxy, Pixelpicker*/

function initSketchpad() {
    "use strict";
    var wsServerAddres = "ws://" + window.location.hostname + ":8066/";

    var ws = new WebSocket(wsServerAddres);
    var sketchpadEl = document.getElementById("sketchpad");

    var room_token = window.location.hash || "#background";
    window.addEventListener("hashchange", function () {
        window.location.reload();//reconnect
    });

    var sketchpad = new Sketchpad({
        containerEl: sketchpadEl,
        token: room_token,
        backgroundImage: "images/VanGogh-StarryNight-809x640.jpg",
        ws: ws
    });
    sketchpad.setTool("colouring");
    sketchpad.getCurrentTool().setColor(0, 0, 0, 0.3);
    window.pixelpicker = new Pixelpicker({
        containerEl: document.getElementById("pixelpicker"),
        backgroundImage: "images/transparency.png",
        imageSrc: "images/pal02b.png",
        pick: function pick(r, g, b, a) {
            console.log(r, g, b, a);
            sketchpad.setTool("colouring");
            sketchpad.getCurrentTool().setColor(r, g, b, a);
        }
    });
    window.sketchpad = sketchpad;
}
initSketchpad();
