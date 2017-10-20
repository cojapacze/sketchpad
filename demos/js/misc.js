/*global window, URL, FileReader, Blob, escape, prompt*/
function bytesToSize(bytes) {
    "use strict";
    bytes = parseInt(bytes, 10);
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) {
        return "0 Byte";
    }
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
}
window.bytesToSize = bytesToSize;

/**
 * Load data from file
 * @param  {string}   accept   - accepted files
 * @param  {function} callback - on load callback
 */
function loadFile(accept, callback) {
    "use strict";
    function loadSubfile(file) {
        var reader = new FileReader();
        reader.onloadend = function (evt) {
            if (evt.target.readyState === FileReader.DONE) { // DONE == 2
                callback(evt.target.result, file);
            }
        };
        reader.readAsBinaryString(file);
    }
    function inputChange(evt) {
        var files = evt.target.files;
        var i;
        for (i = 0; i < files.length; i += 1) {
            loadSubfile(files[i]);
        }
    }
    var fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = accept;
    fileInput.addEventListener("change", inputChange, false);
    fileInput.click();
}

window.loadFile = loadFile;
/**
 * Save data as file
 *
 * @param  {string} data - data
 * @param  {string} filename - filename
 * @param  {string} type - mimetype
 * @return {[type]}
 */
function saveFile(data, filename, type) {
    "use strict";
    var filesize = data.toString().length;
    filename = prompt("Size of sketch is " + bytesToSize(filesize) + ", save?", filename);
    if (!filename) {
        return;
    }
    var a = document.createElement("a"),
        file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) {// IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    } else { // Others
        var url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}
window.saveFile = saveFile;

