/*global window, Sketchpad, WebSocket, Colorpalette*/

function initSketchpad() {
    "use strict";


    var sketchpad = new Sketchpad({
        containerEl: document.getElementById("sketchpad"),
        createPageConfig: {
            no: 1,
            backgroundImage: "https://developers.sketchpad.pro/images/background.jpg",
            foregroundImage: "https://developers.sketchpad.pro/images/foreground.png"
        }
    });

    // avaliable tools `src/sketchpad.tool.*.js`, ex. "pen", "colouring", "line", "rect", "circ"...
    var toolId = "custom";
    var tool = sketchpad.setTool(toolId).getCurrentTool();
    console.log("Selected tool:", tool);

    //color
    var colorpalette = new Colorpalette({
        containerEl: document.getElementById("colorpalette")
    }).on("change", function (e) {
        sketchpad.setTool(toolId).getCurrentTool().setColor(e.color.red, e.color.green, e.color.blue, e.color.alpha);
    }).setColor(tool.setColor(30, 30, 30, 1).getColor());

    //size
    document.getElementById("size").addEventListener("change", function (e) {
        sketchpad.getCurrentTool().setSize(e.target.value);
    });
    document.getElementById("size").value = tool.setSize(20).getSize();

    //rubber
    document.getElementById('eraser').addEventListener("click", function () {
        sketchpad.setTool("eraser");
    });

    //objects visible in developer console
    window.sketchpad = sketchpad;
    window.colorpalette = colorpalette;
    window.tool = tool;

}
initSketchpad();


