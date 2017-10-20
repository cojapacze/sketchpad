// /*global window, Sketchpad, WebSocket*/

// function windowOnLoad() {
//     "use strict";
//     var wsServerAddres = "ws://" + window.location.hostname + ":8066/";

//     var ws = new WebSocket(wsServerAddres);
//     var sketchpadEl = document.getElementById("sketchpad");

//     var room_token = window.location.hash || "#inline";

//     window.addEventListener("hashchange", function () {
//         window.location.reload();//reconnect
//     });

//     var sketchpad = new Sketchpad({
//         containerEl: sketchpadEl,
//         token: room_token,
//         // backgroundImage: "images/bg.png",
//         ws: ws
//     });
//     sketchpad.setTool("pen");

//     //pen
//     document.getElementById('p-k').addEventListener("click", function () {
//         sketchpad.setTool("pen");
//         sketchpad.getCurrentTool().setColor(0, 0, 0, 1);
//     });

//     document.getElementById('p-g').addEventListener("click", function () {
//         sketchpad.setTool("pen");
//         sketchpad.getCurrentTool().setColor(162, 191, 47, 1);
//     });

//     document.getElementById('p-b').addEventListener("click", function () {
//         sketchpad.setTool("pen");
//         sketchpad.getCurrentTool().setColor(0, 0, 255, 1);
//     });

//     document.getElementById('p-r').addEventListener("click", function () {
//         sketchpad.setTool("pen");
//         sketchpad.getCurrentTool().setColor(255, 0, 0, 1);
//     });

//     document.getElementById('p-y').addEventListener("click", function () {
//         sketchpad.setTool("pen");
//         sketchpad.getCurrentTool().setColor(255, 200, 0, 1);
//     });

//     // marker
//     document.getElementById('m-k').addEventListener("click", function () {
//         sketchpad.setTool("colouring");
//         sketchpad.getCurrentTool().setColor(128, 128, 128, 1);
//     });

//     document.getElementById('m-g').addEventListener("click", function () {
//         sketchpad.setTool("colouring");
//         sketchpad.getCurrentTool().setColor(180, 205, 88, 1);
//     });

//     document.getElementById('m-b').addEventListener("click", function () {
//         sketchpad.setTool("colouring");
//         // sketchpad;
//     });

//     document.getElementById('m-r').addEventListener("click", function () {
//         sketchpad.setTool("colouring");
//         sketchpad.getCurrentTool().setColor(255, 128, 128, 1);
//     });

//     document.getElementById('m-y').addEventListener("click", function () {
//         sketchpad.setTool("colouring");
//         sketchpad.getCurrentTool().setColor(250, 179, 73, 1);
//     });

//     //rubber
//     document.getElementById('rubber').addEventListener("click", function () {
//         sketchpad.setTool("eraser");
//     });

//     document.getElementById('rect').addEventListener("click", function () {
//         sketchpad.setTool("rect");
//         sketchpad.getCurrentTool().setColor(0, 0, 0, 1);
//     });

//     document.getElementById('line').addEventListener("click", function () {
//         sketchpad.setTool("line");
//         sketchpad.getCurrentTool().setColor(0, 0, 0, 1);
//     });

//     document.getElementById('circ').addEventListener("click", function () {
//         sketchpad.setTool("circ");
//         sketchpad.getCurrentTool().setColor(0, 0, 0, 1);
//     });

//     document.getElementById('rbw').addEventListener("click", function () {
//         sketchpad.setTool("rbw");
//         sketchpad.getCurrentTool().setColor(0, 0, 0, 1);
//     });

//     document.getElementById('reset').addEventListener("click", function () {
//         sketchpad.reset();
//     });

// }


// window.addEventListener("load", windowOnLoad);
