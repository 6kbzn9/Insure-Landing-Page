const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browsersync = require("browser-sync").create();

// Sass Task
function scssTask() {
  return src("scss/main.scss", { sourcemaps: true })
    .pipe(sass())
    .pipe(dest("css", { sourcemaps: "." }))
    .pipe(browsersync.stream());
}

// Browsersync Tasks
function browsersyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: ".",
    },
  });
  cb();
}

function browsersyncReload() {
  browsersync.reload();
}

// Watch Task
function watchTask() {
  watch("./scss/**/*.scss", scssTask);
  watch("./**/*.html").on("change", browsersyncReload);
  watch("./js/**/*.js").on("change", browsersyncReload);
}

// Default Gulp task
exports.default = series(scssTask, browsersyncServe, watchTask);
