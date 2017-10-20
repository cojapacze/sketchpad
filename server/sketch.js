/**
 * @file Sketch
 *
 * Sketch class
 *
 */
require("colors");
Object.prototype.assign = require('object-assign');


var sizeof = require('object-sizeof');

var MAX_PATH_CONFIG_SIZE = 1024;
var MAX_PATHS_IN_FRAME = 64;
var MAX_POINTS_IN_PATH = 512;
var MAX_MESSAGES_LENGTH = 1024 * 1024;

/**
 * Sketch
 * @class
 */
function Sketch(sketch_token, room) {
    "use strict";
    /**
     * How log history queue should be (counted in "moves")
     * @type {Number}
     */
    this.maxMessagesLength = MAX_MESSAGES_LENGTH;

    this.sketch_token = sketch_token;

    console.log(String("sketch.js").white, String("🆕").green, "Constructor sketch:", String(sketch_token).blue);

    this.messages = [];
    this.room = room;

    return this;
}

Sketch.prototype = {

    /**
     * Undo the last frame identified by uid and sid
     *
     * @param  {string} uid - author (user_id) of frame to undo
     * @param  {string} sid - sketch page id (sid)
     */
    undo: function undo(client, uid, sid) {
        "use strict";
        var last = this.messages.length;
        var objUndo = {
            cmd: "undo",
            uid: uid,
            sid: sid
        };
        for (last = last - 1; last > -1; last -= 1) {
            if (this.messages[last].sid === sid && this.messages[last].uid === uid) {
                this.messages.splice(last, 1);
                this.room.sendBroadcastObjExclude(objUndo, client);
                return; // undo one frame of history
            }
        }
    },

    /**
     * Validate paths if contains only permitted moves
     *
     * @param  {Paths[]} paths      - list of paths to validate
     * @return {Paths[]}            - list of valid paths
     */
    validatePaths: function validatePaths(paths) {
        "use strict";
        var pathsOK = [],
            i,
            ii,
            obj;
        if (!paths) {
            return;
        }
        if (paths.length > MAX_PATHS_IN_FRAME) {
            console.error(String("dropping").red, " too many paths.length=", paths.length);
            return;
        }
        // for all paths
        for (i = 0; i < paths.length; i += 1) {
            if (paths[i].pts.x.length < MAX_POINTS_IN_PATH && paths[i].pts.x.length === paths[i].pts.y.length && paths[i].pts.y.length === paths[i].pts.t.length) {
                for (ii = 0; ii < paths[i].pts.x.length; ii += 1) {
                    paths[i].pts.x[ii] = parseInt(paths[i].pts.x[ii], 10);
                    paths[i].pts.y[ii] = parseInt(paths[i].pts.y[ii], 10);
                    paths[i].pts.t[ii] = parseInt(paths[i].pts.t[ii], 10);
                }
            } else {
                console.error(String("dropping").red, " too long paths[i].pts.x.length=", paths[i].pts.x.length);
                paths[i].pts = undefined;
            }

            if (sizeof(paths[i].cnf) > MAX_PATH_CONFIG_SIZE) {
                console.error(String("dropping").red, " too long sizeof(paths[i].cnf)=", sizeof(paths[i].cnf));
                paths[i].cnf = undefined;
            }

            obj = {
                vpx: parseFloat(paths[i].vpx), //viewportX
                vpy: parseFloat(paths[i].vpy), //viewportY
                scl: parseFloat(paths[i].scl), //scale
                rot: parseFloat(paths[i].rot), //rotation
                tol: String(paths[i].tol), //tool
                wdh: parseInt(paths[i].wdh, 10), //width
                hgt: parseInt(paths[i].hgt, 10), //height
                cnf: paths[i].cnf, // tool config
                pts: paths[i].pts //list of validated points
            };
            pathsOK.push(obj);

        }
        return pathsOK;
    },

    /**
     * Draw paths by client
     *
     * @param {Client} client   - Author of the paths
     * @param {Paths[]} obj     - List of drawen paths parts - bulk netframe
     */
    addPaths: function addPaths(client, obj) {
        "use strict";
        var objOK = {
            cmd: obj.cmd,
            uid: obj.uid,
            sid: obj.sid,
            ts: obj.ts,
            evs: this.validatePaths(obj.evs)
        };
        // add validated netframe to list
        this.messages.push(objOK);

        // avoid list overflow by removing too long tail
        if (this.messages.length > this.maxMessagesLength) {
            this.messages.splice(0, this.messages.length - this.maxMessagesLength);
        }

        // rebrodcast validated netframe
        this.room.sendBroadcastObjExclude(objOK, client);
    },

    /**
     * Destructor of Sketch - when sketch is closed
     * Saves Sketch on disk
     */
    destructor: function desctructor() {
        "use strict";
        console.log(String("sketch.js").white, "Sketch", String(this.sketch_token).yellow, "closed.");
    }

};
exports.Sketch = Sketch;