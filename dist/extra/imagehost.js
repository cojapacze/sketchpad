/*global NSSketchpad*/
/*global window, alert, Eventsmanager, Progressbar*/
/*global atob, File*/
function Imagehost(config) {
    "use strict";
    // Call parent constructor
    Eventsmanager.call(this, config);

    this.File = undefined;
    this.config = config;

    this.postPdfUrl = (NSSketchpad && NSSketchpad.postPdfUrl) || "https://uploader.imagehost.pro:3443/upload";
    this.postImageUrl = (NSSketchpad && NSSketchpad.postImageUrl) || "https://uploader.imagehost.pro:3443/upload";
    this.postWebshotUrl = (NSSketchpad && NSSketchpad.postWebshotUrl) || "https://uploader.imagehost.pro:3443/webshot?site=";
    this.proxyImageUrl = (NSSketchpad && NSSketchpad.proxyImageUrl) || "https://imagehost.pro/proxy";
    this.proxyExcludedDomain = (NSSketchpad && NSSketchpad.proxyExcludedDomain) || "imagehost.pro";

    if (config.file) {
        this.uploadFile(config.file);
    }
    if (config.url) {
        if (this.isDataURL(config.url)) {
            config.file = this.dataURItoFile(config.url);
            if (config.file) {
                this.uploadFile(config.file);
            } else {
                console.error("Error - wrong data url", config.url);
                return this;
            }
        } else {
            this.proxyUrl(config.url);
        }
    }
    this.progressbar = new Progressbar({
        name: config.url,
        progressParentEl: config.progressParentEl || window.document.body,
        style: {
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 200,
            height: "2px",
            width: "2px",
            backgroundColor: "rgba(155, 0, 0, 0.5)"
        }
    });
    // this.prepareLoadingElements();
    return this;
}

Imagehost.prototype = Object.create(Eventsmanager.prototype);

Object.assign(Imagehost.prototype, {
    // prepareLoadingElements: function () {
    //     "use strict";
    //     // alert("prepare elements");
    //     this.loadingBarEl = document.createElement("div");
    //     Object.assign(this.loadingBarEl.style, {
    //         position: "absolute",
    //         top: 0,
    //         left: 0,
    //         zIndex: 200,
    //         height: "2px",
    //         width: "2px",
    //         backgroundColor: "rgba(155, 0, 0, 0.9)"
    //     });
    //     var progressParentEl = this.config.progressParentEl || window.document.body;
    //     // console.log("!!!", progressParentEl, this.config);
    //     progressParentEl.appendChild(this.loadingBarEl);
    // },
    // fileSelected: function fileSelected() {
    //     "use strict";
    //     var file = document.getElementById('fileToUpload').files[0];
    //     if (file) {
    //         var fileSize = 0;
    //         if (file.size > 1024 * 1024) {
    //             fileSize = String(Math.round(file.size * 100 / (1024 * 1024)) / 100) + 'MB';
    //         } else {
    //             fileSize = String(Math.round(file.size * 100 / 1024) / 100) + 'KB';
    //         }

    //         document.getElementById('fileName').innerHTML = 'Name: ' + file.name;
    //         document.getElementById('fileSize').innerHTML = 'Size: ' + fileSize;
    //         document.getElementById('fileType').innerHTML = 'Type: ' + file.type;
    //     }
    // },
    isDataURL: function isDataURL(s) {
        "use strict";
        return !!s.match(/^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i);
    },

    dataURItoFile: function dataURItoFile(dataURI) {
        "use strict";
        if (typeof dataURI !== 'string') {
            this.dispatch("error", {type: "upload", message: "dataURI must be a string."});
            return;
        }
        dataURI = dataURI.split(',');
        var type = dataURI[0].split(':')[1].split(';')[0],
            byteString = atob(dataURI[1]),
            byteStringLength = byteString.length,
            arrayBuffer = new ArrayBuffer(byteStringLength),
            intArray = new Uint8Array(arrayBuffer);
        var i;
        for (i = 0; i < byteStringLength; i += 1) {
            intArray[i] = byteString.charCodeAt(i);
        }

        return new File([intArray], "file", {
            type: type
        });
    },
    proxyUrl: function proxyUrl(url) {
        "use strict";
        var parser = document.createElement('a');
        parser.href = url;
        var that = this;

        function dispatchSuccess(newUrl) {
            //make free one event loop for subscibers
            setTimeout(function () {
                that.dispatch("success", {
                    status: "ok",
                    url: newUrl
                });
            }, 0);
        }

        if (String(parser.hostname).indexOf(this.proxyExcludedDomain) !== -1) {
            dispatchSuccess(url);
        } else {
            dispatchSuccess(this.proxyImageUrl + "?url=" + encodeURIComponent(url));
        }
    },

    uploadProgress: function uploadProgress(e) {
        "use strict";

        this.dispatch("progress", e.loaded / e.total);
        // this.loadingBarEl.style.width = parseInt(e.loaded / e.total * 100, 10) + "%";
    },

    /**
     * Uploads file
     * @param  {File} File  - file
     */
    uploadFile: function uploadFile(File) {
        "use strict";
        this.File = File;
        // console.log("UPLOAD FILE", File);
        var fd = new FormData();
        fd.append("fileToUpload", File);
        var xhr = new XMLHttpRequest();
        var that = this;
        xhr.upload.addEventListener("progress", function (e) {
            // console.log("uploading progress", e);
            that.uploadProgress(e);
            that.progressbar.uploadProgress(e);
        }, false);

        // xhr.upload.onprogress = function (e) {
        //     // console.log("uploading progress", that.id);
        //     // that.uploadProgress(e);
        // };

        xhr.addEventListener("load", function (e) {
            console.log("uploading load", e);
            that.uploadComplete(e);
            that.progressbar.uploadComplete(e);
        }, false);

        xhr.addEventListener("error", function (e) {
            console.log("uploading error", e);
            that.uploadFailed(e);
            that.progressbar.uploadFailed(e);
        }, false);

        xhr.addEventListener("abort", function (e) {
            that.uploadCanceled(e);
            that.progressbar.uploadCanceled(e);
        }, false);
        // this.uploadProgress(0);


        var postUrl;
        // alert("!!!" + this.postPdfUrl);
        switch (String(File.type)) {
        case "application/pdf":
            postUrl = this.postPdfUrl;
            break;
        default:
            postUrl = this.postImageUrl;
        }
        // alert(File.type + "|" + postUrl);
        xhr.open("POST", postUrl);
        xhr.setRequestHeader("Content-Type", File.type);
        xhr.setRequestHeader("Content-Name", encodeURI(File.name));
        xhr.setRequestHeader("Content-Size", File.size);
        xhr.setRequestHeader("Content-LastModified", File.lastModified);
        xhr.send(File);
        this.dispatch("upload", xhr);

    },

    uploadComplete: function uploadComplete(e) {
        "use strict";
        // this.loadingBarEl.parentElement.removeChild(this.loadingBarEl);
        // this.uploadProgress(1);
        var response = {};
        try {
            response = JSON.parse(e.target.response);
        } catch (err) {
            this.dispatch("error", {type: "parse", title: "Upload fail", message: "Uknown response from server.", err: err});
        }
        if (response && response.status === "ok") {
            this.dispatch("success", response);
        } else {
            this.dispatch("error", {type: "response", title: "Upload fail", message: (response && response.message) || "Your upload was rejected by server.", response: response});
        }
    },

    uploadFailed: function uploadFailed(e) {
        "use strict";
        // this.loadingBarEl.parentElement.removeChild(this.loadingBarEl);
        console.error("uploadFailed", e);
        this.dispatch("error", {type: "fail", title: "Upload fail", message: "There was an error attempting to upload the file.", e: e});
    },

    uploadCanceled: function uploadCanceled(e) {
        "use strict";
        // this.loadingBarEl.parentElement.removeChild(this.loadingBarEl);
        this.dispatch("error", {type: "cancelled", title: "Upload cancelled", message: "The upload has been canceled by the user or the browser dropped the connection.", e: e});
    }
});

window.Imagehost = Imagehost;

