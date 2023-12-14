//Author: Robert A Howell, April 2023
//Source: https://www.typescriptlang.org/
//TypeScript: Documentation - Gulp. [online]. Available at: https://www.typescriptlang.org/docs/handbook/gulp.html.
var gulp = require("gulp"); // Package manager
var browserify = require("browserify"); // JS bundler tool
var source = require("vinyl-source-stream"); // Gulp pipeline dependency with browserify
var watchify = require("watchify"); // Recompile the browser components on save
var tsify = require("tsify"); // Browser plugin for compiling TypeScript
var fancy_log = require("fancy-log"); // Gulp terminal extension
var watchedBrowserify = watchify(
  browserify({
    basedir: ".",
    debug: true,
    entries: ["src/main.ts"],
    cache: {},
    packageCache: {},
  }).plugin(tsify)
);
function bundle() {
  return watchedBrowserify
  .bundle()
    .on("error", fancy_log)
    .pipe(source("typescript.js"))
    .pipe(gulp.dest("dist"));
}
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", fancy_log);

var watchedBrowserifyTwo = watchify(
  browserify({
    basedir: ".",
    debug: true,
    entries: ["src/pagesComponents.ts"],
    cache: {},
    packageCache: {},
  }).plugin(tsify)
);
function bundletwo() {
  return watchedBrowserifyTwo
  .bundle()
    .on("error", fancy_log)
    .pipe(source("pagesComponents.js"))
    .pipe(gulp.dest("dist"));
}
watchedBrowserifyTwo.on("update", bundletwo);
watchedBrowserifyTwo.on("log", fancy_log);

var watchedBrowserifyThree = watchify(
  browserify({
    basedir: ".",
    debug: true,
    entries: ["src/guidesComponents.ts"],
    cache: {},
    packageCache: {},
  }).plugin(tsify)
);
function bundlethree() {
  return watchedBrowserifyThree
  .bundle()
    .on("error", fancy_log)
    .pipe(source("guidesComponents.js"))
    .pipe(gulp.dest("dist"));
}
watchedBrowserifyThree.on("update", bundlethree);
watchedBrowserifyThree.on("log", fancy_log);

var watchedBrowserifyFour = watchify(
  browserify({
    basedir: ".",
    debug: true,
    entries: ["src/cardsComponents.ts"],
    cache: {},
    packageCache: {},
  }).plugin(tsify)
);
function bundlefour() {
  return watchedBrowserifyFour
  .bundle()
    .on("error", fancy_log)
    .pipe(source("cardsComponents.js"))
    .pipe(gulp.dest("dist"));
}
watchedBrowserifyThree.on("update", bundlefour);
watchedBrowserifyThree.on("log", fancy_log);

var paths = {
  imports: [
    "src/*.html",
    "src/pages/*.html",
    "src/guides/*.html",
    "src/guides/devtools/*.html",
    "src/explore/*.html",
    "src/_headers",
    "src/css/*.css",
    "src/css/fonts/*.ttf",
    "src/css/fonts/*.txt",
    "src/img/*",
    "src/img/favicon/*",
    "src/library/*",
  ],
};
gulp.task("copy-html", function () {
  return gulp.src(paths.imports, { base: "./src/" }).pipe(gulp.dest("dist"));
});
gulp.task("default", gulp.series(gulp.parallel("copy-html"), bundle, bundletwo, bundlethree, bundlefour));