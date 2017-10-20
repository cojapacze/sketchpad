/**
 * @file Main server file
 *
 * Simple Sketchpad.pro server
 */

require("colors");

var crypto = require('crypto');
var port = 8067;
console.log(String("=================").yellow, String("✍").green, String("Welcome").rainbow.underline, String("⚑").green, "to", String("SketchpadJS by positivestudio.co -- AGPL --").inverse, String("✐").red, String("=================").yellow);

console.log("[", String("notice").green, "] Starting 'sketchpad' server on port", port, "...");

console.log("[", String("notice").green, "] loading client...");
var clientLib = require('./client.js');

/**
 * counter of connection that was ever made to this server session
 * @type {Number}
 */
var connectionCounter = 0;

console.log("server.js:[", String("notice").green, "] setting WebSocket server...");
var app = require("http").createServer().listen(port);
var WebSocketServer = require("ws").Server;
var wss = new WebSocketServer({server: app});



/**
 *
 * Decorate WebSocket client connection and
 * use it as client of application.
 *
 * @param  {ws} conn        - WebSocket client connection
 */
function newConnection(conn) {
    "use strict";
    connectionCounter += 1;
    conn.headers = conn.upgradeReq.headers;
    conn.rawHeaders = conn.upgradeReq.rawHeaders;
    conn.cc = connectionCounter;
    conn.remoteAddress = conn.upgradeReq.connection.remoteAddress;
    conn.uniqueId = crypto.createHash("md5").update(conn.remoteAddress + Math.random()).digest("hex");

    conn.on("error", function (reason, code) {
        console.log(String("server.js").white, "socket error: reason " + reason + ", code " + code);
    });

    conn.sendUTF = function sendUTF(msg) {
        try {
            this.send(msg, function sendError(e) {
                if (e) {
                    console.error("[server.js:", String("#ERRORSEND#").red, "]", e, String("sending message:").yellow, msg);
                }
            });
        } catch (e) {
            console.error("[server.js:", String("error").red, "]", e, String("sending message:").yellow, msg);
        }
    };

    console.log(String("•").blue, "server.js:Initialising connection [" + String(conn.cc).green + "] from " + String(conn.remoteAddress).yellow);
    conn.once("message", clientLib.loginHandler);
}

console.log("server.js:[", String("notice").green, "] decorating server by client handler for new connections.");
wss.on("connection", newConnection);

function exitHandler(options, err) {
    "use strict";
    console.log(String("•").blue, "server.js:EXIT HANDLER");
    if (options.cleanup) {
        console.log('clean');
    }
    if (err) {
        console.log(err.stack);
    }
    if (options.exit) {
        process.exit();
    }

}

//do something when app is closing
process.on('exit', exitHandler.bind(null, {cleanup: true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit: true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit: true}));
