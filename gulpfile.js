var gulp = require("gulp"), // 引入 gulp 模块
minifycss = require("gulp-clean-css"), // 引入 gulp-clean-css 模块
sass = require("gulp-sass"),
livereload = require("gulp-livereload");
// 定义压缩CSS任务
gulp.task("css", function(){
gulp.src("css/*.css")
    .pipe(minifycss())
    .pipe(gulp.dest("dist/css"));
});
// 定义编译SASS任务
gulp.task("sass", function(){
gulp.src("sass/*.scss")
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest("dist/css"))
    .pipe(livereload()); // 浏览器刷新
});

