/*global NSSketchpad*/
/*global window, alert, Eventsmanager*/
/*global atob, File*/

/**
 * Progressbar component
 *
 * @param {object} config - config.progressParentEl contain parent element where progress bar will be attached, if null then document.body will be parent element;
 *                          config.style contains styles for progressbar
 *
 */
function Progressbar(config) {
    "use strict";
    // Call parent constructor
    Eventsmanager.call(this, config);
    this.config = Object.assign({}, config);
    this.prepareLoadingElements();
    return this;
}

Progressbar.prototype = Object.create(Eventsmanager.prototype);

Object.assign(Progressbar.prototype, {

    /**
     * Creates HTML Elements of component
     */
    prepareLoadingElements: function () {
        "use strict";
        this.id = parseInt(Math.random() * 1000, 10);//"rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
        // console.log("CONSTRUCTOR ProgressBar", this.id);
        // alert("prepare elements");

        this.loadingBarEl = document.createElement("div");
        var style = Object.assign({
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 200,
            height: "2px",
            width: "2px",
            backgroundColor: "rgba(0, 0, 155, 0.5)",
            transition: "width 0.4s ease-in-out",
            webkitTransition: "width 0.4s ease-in-out",
            MozTransition: "width 0.5s ease-in-out",
            msTransition: "width 0.5s ease-in-out",
            OTransition: "width 0.5s ease-in-out"
        }, this.config.style);
        Object.assign(this.loadingBarEl.style, style);
        // console.log("PREPARE NEW PROGRESS BAR", style);
        if (!this.config.progressParentEl) {
            this.config.progressParentEl = window.document.body;
        }
        var progressParentEl = this.config.progressParentEl;
        progressParentEl.appendChild(this.loadingBarEl);
    },

    /**
     * Event handler for progress
     * @param  {object} e - ex. ``{total: 100, loaded: 50}``
     */
    uploadProgress: function uploadProgress(e) {
        "use strict";
        // console.log("upload", this.id);
        this.dispatch("progress", e.loaded / e.total);
        this.loadingBarEl.style.width = parseInt(e.loaded / e.total * 100, 10) + "%";
    },

    /**
     * Removes HTML Elements of component
     */
    uploadCompleteDestructor: function uploadCompleteDestructor() {
        "use strict";
        // debugger;
        var progressParentEl = this.config.progressParentEl;
        // console.log("UPLOAD COMPLETTE", "LB:", this.loadingBarEl, "PE:", progressParentEl, "CF:", this.config);
        // console.log("DESTRUCTOR ProgressBar", this.id, this.loadingBarEl);
        progressParentEl.removeChild(this.loadingBarEl);
    },

    /**
     * Event handler for complete
     */
    uploadComplete: function uploadComplete() {
        "use strict";
        if (this.completed) {
            console.log("%cDOUBLED COMPLETE", "background-color:orange", this.id);
            return;
        }
        this.completed = true;
        this.uploadProgress({
            loaded: 1,
            total: 1
        });
        clearInterval(this.fakeProgressTo);
        setTimeout(this.uploadCompleteDestructor.bind(this), 500);
    },

    /**
     * Starts fake, never ending progress (better spinner)
     */
    startFakeProgress: function fakeProgress() {
        "use strict";
        var that = this;
        that.fakeProgress = 0;
        that.fakeTotal = 100;
        this.fakeProgressTo = setInterval(function () {
            // console.log("ProgressBar - interval", that.id, that.fakeProgress);
            that.fakeProgress += (that.fakeTotal - that.fakeProgress) * 0.01;
            // if (that.fakeProgress >= that.fakeTotal) {
            //     that.fakeTotal *= 2;
            // }
            that.uploadProgress({
                loaded: that.fakeProgress,
                total: that.fakeTotal
            });
        }, 100);

    },

    /**
     * Cancel progres bar and remove it as soon as possible
     */
    cancel: function cancel(e) {
        "use strict";
        if (this.completed) {
            console.log("%DOUBLED CANCEL", "background-color:orange", this.id);
            return;
        }
        console.log("%cCANCEL", "background-color:orange", this.id, e);
        clearInterval(this.fakeProgressTo);
        this.config.progressParentEl.removeChild(this.loadingBarEl);
        this.completed = true;
        // this.uploadComplete();
    },
    uploadCanceled: function uploadCanceled(e) {
        "use strict";
        this.cancel(e);
    },
    uploadFailed: function uploadFailed(e) {
        "use strict";
        this.cancel(e);
    }

});

window.Progressbar = Progressbar;

