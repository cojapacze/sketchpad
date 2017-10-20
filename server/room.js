/**
 * @file Room
 * Room
 *
 */
require("colors");
Object.prototype.assign = require('object-assign');

/**
 * List of active rooms
 * @type {Array}
 */
var rooms = [];

exports.rooms = rooms;

var sketch = require('./sketch.js');

/**
 * Room object
 * @class
 * @param  {string} room_token - unique string/hash for room
 * @param  {Client} client - client who is openning room
 * @param  {function} onOpen - callback when room is ready
 */
function Room(room_token, client, onOpen) {
    "use strict";

    /**
     * room token
     * @type {string}
     */
    this.room_token = room_token;

    console.log(String("room.js").white, String("Start: Creating new Room").yellow, this.room_token);

    /**
     * List of clients in room
     * @type {Clients[]}
     */
    this.clients = [];

    /**
     * Active sketch in room
     * @type {sketch}
     */
    this.sketch = new sketch.Sketch(room_token, this, client, onOpen);

    return this;
}

Room.prototype = {
    /**
     * Sends text message to all clients in room
     * @param  {string} msg  - text message
     */
    sendBroadcastRAW: function sendBroadcastRAW(msg) {
        "use strict";
        this.clients.forEach(function (client) {
            client.sendUTF(msg);
        });
    },

    /**
     * Sends object as JSON to all clients in room
     * @param  {object} obj  - object message
     */
    sendBroadcastObj: function sendBroadcastObj(obj) {
        "use strict";
        var msg = JSON.stringify(obj);
        this.sendBroadcastRAW(msg);
    },

    /**
     * Sends text message to all clients in room exept excluded client
     * @param {string} msg  - text message
     * @param {Client} clientExcluded - client that will be excluded
     */
    sendBroadcastRAWExclude: function sendBroadcastRAWExclude(msg, clientExcluded) {
        "use strict";
        this.clients.forEach(function (client) {
            if (client !== clientExcluded) {
                client.sendUTF(msg);
            }
        });
    },

    /**
     * Sends object as JSON to all clients in room exept excluded client
     * @param  {string} msg  - text message
     * @param  {Client} clientExcluded - client that will be excluded
     */
    sendBroadcastObjExclude: function sendBroadcastObjExclude(obj, user_id) {
        "use strict";
        var msg = JSON.stringify(obj);
        this.sendBroadcastRAWExclude(msg, user_id);
    },

    /**
     * Removes client from room
     * @param  {Client} client - A client that will be removed from the room
     */
    removeUser: function removeUser(client) {
        "use strict";
        var index = this.clients.indexOf(client);
        this.clients.splice(index, 1);
        console.log(String("room.js").white, String("🚪").red, "user", client.user.user_id, "has left the room");
        // remove room if is empty
        if (!this.clients.length) {
            this.destructor();
        }
    },

    /**
     * Add client to room
     * @param  {Client} client - A client that will be added to the room
     */
    addUser: function addUser(client) {
        "use strict";
        var i = 0;
        client.sendObj({cmd: "history-begin"});
        for (i = 0; i < this.sketch.messages.length; i += 1) {
            client.sendObj(this.sketch.messages[i]);
        }
        client.sendObj({cmd: "history-end"});
        this.clients.push(client);
    },

    /**
     * Room destructor that will be called when all clients leave the room
     */
    destructor: function destructor() {
        "use strict";
        this.sketch.destructor();
        var i = rooms.indexOf(this);
        rooms.splice(i, 1);
    }
};


/**
 * Creates and returns new room if room identified by room_token does not exist else returns existed room
 *
 * @param  {string} room_token - Room token
 * @param  {Client} client - Client who is opening room
 * @return {Room} - Room identified by room_token
 */
exports.getRoom = function getRoom(room_token, client) {
    "use strict";
    console.log(String("room.js").white, "getRoom", room_token);
    //******** find existing room ***********
    var i;
    //serach for existed room
    for (i = 0; i < rooms.length; i += 1) {
        if (rooms[i].room_token === room_token) {
            return rooms[i];//return existed room
        }
    }
    //******** create new room ***********
    var room = new Room(room_token, client, function () {
        console.log(String("room.js").white, "new room", room_token);
    });
    rooms.push(room);
    return room;
};

