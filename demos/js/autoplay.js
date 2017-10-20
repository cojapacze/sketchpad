/*global window, Sketchpad, WebSocket, Colorpalette, WebSocketJsonWrapper*/

function initSketchpad() {
    "use strict";

    // websocket wrapper
    var ws = new WebSocketJsonWrapper();

    window.addEventListener("hashchange", function () {
        window.location.reload();//reconnect on room name in hash change
    });

    var sketchpad = new Sketchpad({
        containerEl: document.getElementById("sketchpad"),
        token: window.location.hash || "#simple",
        ws: ws,
        createPageConfig: {sid: "autoplay", no: 1}
    });

    // avaliable tools `src/sketchpad.tool.*.js`, ex. "pen", "colouring", "line", "rect", "circ"...
    var toolId = "mandala";
    var tool = sketchpad.setTool(toolId).getCurrentTool();

    //draw from background
    tool.layers = ["B"];
    tool.axis = 16;
    tool.mirrorV = false;

    console.log("Selected tool:", tool);

    //color
    var colorpalette = new Colorpalette({
        containerEl: document.getElementById("colorpalette")
    }).on("change", function (e) {
        sketchpad.setTool(toolId).getCurrentTool().setColor(e.color.red, e.color.green, e.color.blue, e.color.alpha);
    }).setColor(tool.setColor(0, 255, 255, 1).getColor());

    //size
    document.getElementById("size").addEventListener("change", function (e) {
        sketchpad.getCurrentTool().setSize(e.target.value);
    });
    document.getElementById("size").value = tool.setSize(2).getSize();

    //rubber
    document.getElementById("eraser").addEventListener("click", function () {
        sketchpad.setTool("eraser");
    });

    //objects visible in developer console
    window.sketchpad = sketchpad;
    window.colorpalette = colorpalette;
    window.tool = tool;
    sketchpad.setScale(0.5);
    sketchpad.on("initialised", function () {
        ws.emitFile("https://developers.sketchpad.pro/example.sketchpad.json");
    });

}
initSketchpad();

