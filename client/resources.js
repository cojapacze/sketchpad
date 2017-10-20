/*global window, alert*/
/*global HTMLElement*/
/*global Progressbar*/

/**
 * Resources manager
 * @param {object} config - 
 */
function Resources(config) {
    "use strict";
    this.images = [];
    this.config = config;
    this.sketchpad = config.sketchpad;
    return this;
}

Object.assign(Resources.prototype, {


    getImage: function getImage(url, callback, onError) {
        "use strict";
        var record,
            i;

        var that = this;
        function onImageLoaded(ignore) {
            callback(record);
            that.sketchpad.planRefreshWindow(0, "resources.js:getImage:onImageLoadedOnce");//to optimize: refres only if there are new frames
        }
        function onImageLoadedOnce(e) {
            record.loaded = true;
            record.success = true;
            console.log("on image loaded");
            record.loadEvent = e;
            record.progressbar.uploadComplete();
            onImageLoaded(e);
        }

        function onImageFail(e) {
            record.loaded = true;
            record.success = false;
            record.loadEvent = e;
            record.progressbar.cancel();
            if (typeof onError === "function") {
                return onError(record);
                // record.img.addEventListener("abort", onError);
            }
        }

        for (i = 0; i < this.images.length; i += 1) {
            record = this.images[i];
            if (record.url === url) {
                if (record.loaded) {
                    if (record.success) {
                        callback(record);
                    } else {
                        if (typeof onError === "function") {
                            return onError(record);
                        }
                    }
                } else {
                    // we need this image again even when is loading
                    record.img.addEventListener("load", onImageLoaded);
                    // if (typeof onError === "function") {
                    //     record.img.addEventListener("error", onError);
                    //     // record.img.addEventListener("abort", onError);
                    // }
                }
                return;
            }
        }
        var img = new Image();
        img.crossOrigin = "anonymous";//cross orgin fix
        var progressbar = new Progressbar({
            progressParentEl: this.sketchpad.progressParentEl
        });
        progressbar.startFakeProgress();
        record = {
            url: url,
            loaded: false,
            progressbar: progressbar,
            img: img
        };
        img.src = url;
        img.addEventListener("load", onImageLoadedOnce);
        img.addEventListener("error", onImageFail);
        this.images.push(record);
    }
});



window.Resources = Resources;

