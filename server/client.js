/**
 * @file Client connection
 *
 * Client of sketchpad
 *
 */

require("colors");
Object.prototype.assign = require('object-assign');
var roomLib = require("./room.js");

/**
 * Sketchpad client methods
 * @class
 */
var Client = {
    /**
     * Receive command message from this client
     * @param  {string} message - JSON encoded message
     */
    onMessage: function onMessage(message) {
        "use strict";
        if (!this.user) {
            console.log(String("client.js:").white, "[client error] No user in clientOnMessage");
            this.close();
            return false;
        }
        var data = message,
            obj;

        try {
            obj = JSON.parse(data);
        } catch (e) {
            obj = {
                cmd: "input_error"
            };
            console.log(String("client.js:").white, "Input error", obj, e);
        }

        // anti spoofing
        obj.uid = this.user.user_id;

        switch (obj.cmd) {
        case "inputs":
            this.room.sketch.addPaths(this, obj);
            break;
        case "undo":
            this.room.sketch.undo(this, obj.uid, obj.sid);
            break;
        case "update-viewport":
        case "pointer-move":
            //ignore
            break;
        default:
            this.sendMsg("Unknown command: " + obj.cmd);
            console.log(String("client.js:").white, String("UNKNOWN MESSAGE FROM CLIENT:").yellow, obj);
            break;

        }

    },

    /**
     * Sends message command to this client
     *
     * @param  {string} msg - Text message
     */
    sendMsg: function sendMsg(msg) {
        "use strict";
        var data = {
            cmd: 'msg',
            message: msg
        };

        var obj = JSON.stringify(data);
        this.sendUTF(obj);
    },

    /**
     * Send custom object message to this client
     * @param  {object} obj - Object message
     */
    sendObj: function sendObj(obj) {
        "use strict";
        this.sendUTF(JSON.stringify(obj));
    },

    /**
     * Clear all client data from the server session.
     * The Client must be initialised.
     */
    onClose: function onClose() {
        "use strict";
        this.room.removeUser(this);
        console.log(String("client.js:").white, "Terminated connection [", this.cc, "] from ", this.remoteAddress, String("☠").yellow);
    }
};


/**
 * A method that handles the first message from the client.
 * Responsible for authentication.
 * Next decorates this connection object with all methods of a client and puts him into a room.
 *
 * @param  {string} - JSON encoded message
 */
exports.loginHandler = function loginHandler(data) {
    "use strict";
    /**
     * raw ws client connection object
     * @type {connection}
     */
    var client = this;

    if (data.length > 1024 * 10) {
        client.sendUTF("login message too big.");
        client.close();
        return false;
    }

    /**
     * timestamp of established connection
     * @type {Date}
     */
    client.loginTime = new Date().getTime();

    /**
     * Handle primar functionality
     * data === "ping"
     * @return {string} ``pong`` and terminate connection
     */
    if (data === "ping") {
        client.sendUTF("pong");
        client.close();
        return false;
    }

    /**
     * Validate JSON string
     */
    var obj;
    try {
        obj = JSON.parse(data);
    } catch (ignore) {
        obj = {
            command: "input_error"
        };
        client.sendUTF(JSON.stringify(obj));
        client.close();
        return false;
    }

    /**
     *
     * Decorate client with full functionality
     *
     */
    Object.assign(client, Client);

    /**
     * User information
     * @type {object}
     */
    client.user = {
        room_token: obj.room_token || String(console.log(String("client.js:").white, "Generated room token", String("G-" + client.uniqueId).yellow)).substr(0, 0) + "G-" + client.uniqueId,
        user_id: client.uniqueId
    };

    console.log(String("client.js:").white, String("⇒").green, "Passing connection [" + this.cc.toString().green + "] from:  " + this.remoteAddress.toString().blue, "room_token:", client.user.room_token.toString().red, "user_id:", String(client.user.user_id).yellow);

    /**
     * Join to a room
     */
    client.room = roomLib.getRoom(client.user.room_token, client);
    client.on("close", client.onClose);
    client.on("message", client.onMessage);
    client.room.addUser(client);

};
