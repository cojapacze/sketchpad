/*global window, Sketchpad, Colorpalette*/

function initSketchpad() {
    "use strict";
    //create sketchpad on #sketchpad element
    var sketchpad = new Sketchpad({
        containerEl: document.getElementById("sketchpad"),
        createPageConfig: {no: 1}
    });
    // avaliable tools `src/sketchpad.tool.*.js`, ex. "pen", "colouring", "line", "rect", "circ"...
    var toolId = "pen";
    var tool = sketchpad.setTool(toolId).getCurrentTool();

    //create colorpalette on #colorpalette element
    var colorpalette = new Colorpalette({
        containerEl: document.getElementById("colorpalette")
    }).on("change", function (e) { //bind on change event
        sketchpad.setTool(toolId).getCurrentTool().setColor(e.color.red, e.color.green, e.color.blue, e.color.alpha);
    }).setColor(tool.setColor(0, 121, 255, 1).getColor()); //set default color

    // bind on change size event
    document.getElementById("size").addEventListener("change", function (e) {
        sketchpad.getCurrentTool().setSize(e.target.value);
    });
    document.getElementById("size").value = tool.setSize(2).getSize();//set default size

    // bind eraser button
    document.getElementById('eraser').addEventListener("click", function () {
        sketchpad.setTool("eraser");
    });

    //make objects below visible in global scope
    window.sketchpad = sketchpad;
    window.colorpalette = colorpalette;
    window.tool = tool;
}
initSketchpad();


