// /*global window, Sketchpad, WebSocket, WebSocketProxy*/

// function initSketchpad() {
//     "use strict";
//     //var ws = lcproxyClient;
//     var wsServerAddres = "ws://" + window.location.hostname + ":8066/";

//     var ws = new WebSocket(wsServerAddres);


//     var room_token = window.location.hash || "#webcomponent";
//     window.addEventListener("hashchange", function () {
//         window.location.reload();//reconnect
//     });

//     var sketchpadEl = document.createElement("div");
//     sketchpadEl.className = "sketchpad";

//     var sketchpad = new Sketchpad({
//         containerEl: sketchpadEl,
//         token: room_token,
//         ws: ws
//     });

//     var widgetEl = document.createElement("div");
//     widgetEl.className = "widget";

//     var toolsEl = document.createElement("div");
//     toolsEl.className = "tools";

//     var colouringColors = [[128, 128, 128, 1], [180, 205, 88, 1], [255, 128, 128, 1], [250, 179, 73, 1]];
//     var i,
//         toolEl;
//     function getToolCb(tool, r, g, b, a) {
//         return function () {
//             sketchpad.setTool(tool);
//             sketchpad.getCurrentTool().setColor(r, g, b, a);
//         };
//     }

//     for (i = 0; i < colouringColors.length; i += 1) {
//         toolEl = document.createElement("div");
//         toolEl.className = "button colouring";
//         toolEl.style.backgroundColor = "rgba(" + colouringColors[i][0] + ", " + colouringColors[i][1] + ", " + colouringColors[i][2] + ", " + colouringColors[i][3] + ")";
//         toolEl.addEventListener("click", getToolCb("colouring", colouringColors[i][0], colouringColors[i][1], colouringColors[i][2], colouringColors[i][3]));
//         toolsEl.appendChild(toolEl);
//     }

//     toolEl = document.createElement("div");
//     toolEl.textContent = "␡";
//     toolEl.className = "button rubber";

//     toolEl.addEventListener("click", function () {
//         window.sketchpad.setTool("eraser");
//     });
//     toolsEl.appendChild(toolEl);

//     var drawColors = [[0, 0, 0, 1], [162, 191, 47, 1], [0, 0, 255, 1], [255, 200, 0, 1]];
//     for (i = 0; i < drawColors.length; i += 1) {
//         toolEl = document.createElement("div");
//         toolEl.className = "button draw";
//         toolEl.style.backgroundColor = "rgba(" + drawColors[i][0] + ", " + drawColors[i][1] + ", " + drawColors[i][2] + ", " + drawColors[i][3] + ")";
//         toolEl.addEventListener("click", getToolCb("pen", drawColors[i][0], drawColors[i][1], drawColors[i][2], drawColors[i][3]));
//         toolsEl.appendChild(toolEl);
//     }


//     sketchpad.setTool("pen");
//     window.sketchpad = sketchpad;

//     widgetEl.appendChild(toolsEl);
//     widgetEl.appendChild(sketchpadEl);
//     document.body.appendChild(widgetEl);

// }
// initSketchpad();
