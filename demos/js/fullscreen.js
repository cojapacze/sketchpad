// /*global Sketchpad, window, WebSocket*/
// var sketchpad;

// window.addEventListener("load", function windowOnLoad() {
//     "use strict";
//     var wsServerAddres = "ws://" + window.location.hostname + ":8066/";

//     var ws = new WebSocket(wsServerAddres);
//     var room_token = window.location.hash || "#fullscreen";
//     window.addEventListener("hashchange", function () {
//         window.location.reload();//reconnect
//     });

//     sketchpad = new Sketchpad({
//         ws: ws,
//         token: room_token
//     });
//     sketchpad.setTool("pen");

// });


