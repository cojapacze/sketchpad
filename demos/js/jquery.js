/*global $, window, WebSocket*/
$(document).ready(function () {
    "use strict";
    // var wsServerAddres = "ws://" + window.location.hostname + ":8067/";
    // window.addEventListener("hashchange", function () {
    //     window.location.reload();//reconnect
    // });

    $("#sketchpad").sketchpad({
        // token: window.location.hash || "#simple",
        // ws: new WebSocket(wsServerAddres)
        createPageConfig: {}
    }).hide().show("slow");

    var toolId = "custom";
    var tool = $("#sketchpad").sketchpad().get(0).sketchpadModule.setTool(toolId).getCurrentTool();

    $("#colorpalette").colorpalette().get(0).colorpaletteModule.on("change", function (e) {
        $("#sketchpad").sketchpad().get(0).sketchpadModule.setTool(toolId).getCurrentTool().setColor(e.color.red, e.color.green, e.color.blue, e.color.alpha);
    }).setColor(tool.setColor(32, 128, 64, 1).getColor());

    $("#size").change(function (e) {
        $("#sketchpad").sketchpad().get(0).sketchpadModule.getCurrentTool().setSize($(e.target).val());
    });
    $("#size").val($("#sketchpad").sketchpad().get(0).sketchpadModule.getCurrentTool().getSize());

    $("#eraser").click(function () {
        $("#sketchpad").sketchpad().get(0).sketchpadModule.setTool("eraser");
    });
});
