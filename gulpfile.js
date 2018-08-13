/* 
1. Less 编译 压缩 合并
2. JS合并 压缩 混淆
3. img 赋值
4. html 压缩
 */

// 在gulpfile中先载入gulp包，因为这个包提供了一些API
let gulp = require('gulp');
let less = require('gulp-less');
let csso = require('gulp-csso');
let browserSync = require('browser-sync');
var reload = browserSync.reload;


// 1. Less 编译 压缩 --合并没有必要，一般预处理css都可以导包
gulp.task('style', () => {
    // 这里是在执行style任务时自动执行的
    gulp.src(['src/styles/*.less','!src/styles/_*.less'])
        .pipe(less())
        .pipe(csso())
        .pipe(gulp.dest('dist/styles'))
        .pipe(reload({
            stream: true
        }));
});

let concat = require('gulp-concat');
let uglify = require('gulp-uglify');

// 2. JS合并 压缩 混淆
gulp.task('script', () => {
    gulp.src('src/scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(reload({
            stream: true
        }));
});

// 3. 图片复制
gulp.task('image', () => {
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(reload({
            stream: true
        }));
});

let htmlmin = require('gulp-htmlmin');

// 4. html压缩
gulp.task('html', () => {
    gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
            ,removeComments: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(reload({
            stream: true
        }));
});


gulp.task('serve',  ['style', 'script', 'image', 'html'], () => {
    browserSync({
        server: {
            baseDir: ['dist']
        }
    }, (err, bs) => {
        console.log(bs.options.getIn(["urls", "local"]));
    });

    gulp.watch('src/styles/*.less', ['style']);
  gulp.watch('src/scripts/*.js', ['script']);
  gulp.watch('src/images/*.*', ['image']);
  gulp.watch('src/*.html', ['html']);
});