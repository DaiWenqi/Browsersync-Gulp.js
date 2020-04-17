var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var reload = browserSync.reload;
var rename = require("gulp-rename");

// 静态服务器 + 监听 less/html 文件
gulp.task('serve', ['less'], function() {

    browserSync.init({
        files: [
            'src/style/**/*.less',
            'dist/asset/js/**/*.js',
            'dist/view/**/*.html'
        ],
        server: "./dist",
        browser: "chrome"
    });

    gulp.watch("src/style/**/*.less", ['less']);
    gulp.watch("dist/asset/js/**/*.js").on('change', reload);
    gulp.watch("dist/view/**/*.html").on('change', reload);

});

// less编译后的css将注入到浏览器里实现更新
gulp.task('less', function() {
    return gulp.src("src/style/**/*.main.less")
        .pipe(less())
        // rename
        .pipe(rename((filepath) => {
            filepath.basename = filepath.basename.replace(/\.(pre|dev|test|prod|main)$/, '');
        }))
        .on('error', function(e) {
            console.log(e);
            this.end();
        })
        .pipe(gulp.dest("dist/asset/style"))
        .pipe(reload({ stream: true }));
});

gulp.task('default', ['serve']);

gulp.task('build', ['serve']);