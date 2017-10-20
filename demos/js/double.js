// /*global window, Sketchpad, WebSocket */


// window.onload = function windowOnLoad() {
//     "use strict";
//     var wsServerAddres = "ws://" + window.location.hostname + ":8066/";

//     var wsA = new WebSocket(wsServerAddres);
//     var wsB = new WebSocket(wsServerAddres);
//     var room_token = window.location.hash || "#double";
//     window.addEventListener("hashchange", function () {
//         window.location.reload();//reconnect
//     });

//     var sketchpadA = new Sketchpad({
//         containerEl: document.getElementById("sketchpadA"),
//         token: room_token,
//         ws: wsA
//     });
//     sketchpadA.setTool("colouring");
//     sketchpadA.getCurrentTool().setColor(255, 0, 0, 1);

//     var sketchpadB = new Sketchpad({
//         containerEl: document.getElementById("sketchpadB"),
//         token: room_token,
//         ws: wsB
//     });
//     sketchpadB.setTool("pen");
//     sketchpadB.getCurrentTool().setColor(0, 0, 255, 1);

// };


