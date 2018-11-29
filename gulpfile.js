var gulp = require('gulp'),
    watch = require('gulp-watch'),
    jsdoc = require('gulp-jsdoc3'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    fileInsert = require('gulp-file-insert'),
    rename = require('gulp-rename'),
    header = require('gulp-header'),
    clean = require('gulp-clean'),
    packageJson = require('./package.json');

gulp.task("clean", function () {
    "use strict";
    gulp.src([
        "dist",
        "demos/libs",
        "docs"
    ], {read: false})
        .pipe(clean());
});


gulp.task("doc-client", function (cb) {
    "use strict";
    var config = require('./jsdoc-client.json');
    gulp.src(["package.json", "README.md", "client/*.js"], {read: false})
        .pipe(jsdoc(config, cb));
});

gulp.task("doc-server", function (cb) {
    "use strict";
    var config = require('./jsdoc-server.json');
    gulp.src(["package.json", "README.md", "server/*.js"], {read: false})
        .pipe(jsdoc(config, cb));
});

gulp.task("sketchpad-vanilla", function () {
    "use strict";
    return gulp.src([
        "client/_eventsmanager.js",
        "client/colorpalette.js",
        "client/events.js",
        "client/fontpalette.js",
        "client/formpalette.js",
        "client/imagehost.js",
        "client/keyshortcuts.js",
        "client/misc.js",
        "client/NSSketchpad-agpl.js",
        "client/pixelpicker.js",
        "client/polyfill.js",
        "client/progressbar.js",
        "client/resources.js",
        "client/sketchpad.input.js",
        "client/sketchpad.js",
        "client/sketchpad.room.js",
        "client/sketchpad.sketch.js",
        "client/sketchpad.tool.js",
        "client/sketchpad.tool.*.js",
        "client/thickness.js"
    ])
        .pipe(concat("sketchpad.js"))
        .pipe(gulp.dest("dist/"))
        .pipe(gulp.dest("demos/libs/"))
        .pipe(uglify())
        .pipe(header("/*sketchpad.pro - free online drawing*/"))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("dist/"))
        .pipe(gulp.dest("demos/libs/"));
});

gulp.task("sketchpad-jquery", ["sketchpad-vanilla"], function () {
    "use strict";

    return gulp.src(["client/jquery.sketchpad-template.js"])
        .pipe(fileInsert({
            "/* file: sketchpad.js */": "dist/sketchpad.js"
        }))
        .pipe(rename({
            basename: "jquery.sketchpad"
        }))
        .pipe(uglify())
        .pipe(header("/*sketchpad.pro - free online drawing*/"))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("dist/"))
        .pipe(gulp.dest("demos/libs/"));
});

// Manage CSS dependencies
gulp.task("dependencies-css-bootstrap", function () {
    "use strict";
    return gulp.src([
        "node_modules/bootstrap/dist/css/bootstrap.min.css",
        "node_modules/bootstrap/dist/css/bootstrap.min.css.map"
    ])
        .pipe(gulp.dest("demos/libs/"));
});

gulp.task("dependencies-css-fontawesome", function () {
    "use strict";
    return gulp.src("node_modules/@fortawesome/fontawesome-free/css/all.min.css")
        .pipe(rename('fontawesome.min.css'))
        .pipe(gulp.dest("demos/libs/"));
});

gulp.task("dependencies-css", function () {
    "use strict";
    return gulp.start("dependencies-css-bootstrap", "dependencies-css-fontawesome");
});

// Manage Font Dependencies
gulp.task("dependencies-font-fontawesome", function () {
    "use strict";
    return gulp.src("node_modules/@fortawesome/fontawesome-free/webfonts/*")
        .pipe(gulp.dest("demos/webfonts/"));
});

gulp.task("dependencies-font", function () {
    "use strict";
    return gulp.start("dependencies-font-fontawesome");
});

// Manage JS Dependencies
gulp.task("dependencies-js-fontawesome", function () {
    "use strict";
    return gulp.src([
        "node_modules/@fortawesome/fontawesome-free/js/all.min.js"
    ])
        .pipe(rename('fontawesome.min.js'))
        .pipe(gulp.dest("demos/libs/"));
});

gulp.task("dependencies-js-bootstrap", function () {
    "use strict";
    return gulp.src([
        "node_modules/bootstrap/dist/js/bootstrap.min.js",
        "node_modules/bootstrap/dist/js/bootstrap.min.js.map",
        "node_modules/popper.js/dist/popper.min.js",
        "node_modules/popper.js/dist/popper.min.js.map"
    ])
        .pipe(gulp.dest("demos/libs/"));
});

gulp.task("dependencies-js-jquery", function () {
    "use strict";
    return gulp.src([
        "node_modules/jquery/dist/jquery.min.js",
        "node_modules/jquery/dist/jquery.min.map"
    ])
        .pipe(gulp.dest("demos/libs/"));
});

gulp.task("dependencies-js", function () {
    "use strict";
    return gulp.start("dependencies-js-bootstrap", "dependencies-js-jquery", "dependencies-js-fontawesome");
});


// define tasks here
gulp.task("default", function () {
    "use strict";
    console.log("Building", packageJson.name, packageJson.version);
    gulp.start("doc-client", "doc-server", "sketchpad-vanilla", "sketchpad-jquery", "dependencies-css", "dependencies-font", "dependencies-js");
});


gulp.task("watch", function () {
    "use strict";
    watch(["README.md", "*.js", "*.json", "client/*.js", "server/*.js"], function () {
        gulp.start("default");
    });
});

