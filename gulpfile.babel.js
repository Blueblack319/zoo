import gulp from "gulp";
import del from "del";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import minify from "gulp-csso";
sass.compiler = require("node-sass");

const routes = {
  style: {
    src: "src/scss/style.scss",
    dist: "dist",
    watch: "src/scss/*.scss",
  },
};

const clean = () => del(["dist"]);

const style = () =>
  gulp
    .src(routes.style.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        flexbox: true,
        grid: "autoplace",
      })
    )
    .pipe(minify())
    .pipe(gulp.dest(routes.style.dist));

const watch = () => {
  gulp.watch(routes.style.watch, style);
};

const prepare = gulp.series([clean]);
const assets = gulp.series([style]);
const live = gulp.series([watch]);

export const dev = gulp.series([prepare, assets, live]);
