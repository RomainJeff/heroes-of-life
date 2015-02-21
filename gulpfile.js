var dev         = "app_dev",
    prod        = "app_prod";

var gulp        = require('gulp'),
    compass     = require('gulp-for-compass'),
    useref      = require('gulp-useref');


// Compile SASS
gulp.task('compass', function () {
    return gulp.src(dev +'/sass/*.scss')
      .pipe(compass({
        sassDir: dev +'/sass',
        cssDir: prod +'/styles',
        outputStyle: 'compressed'
      }));
});


// Compile JS from HTML tags
gulp.task('compile', function () {
    var assets = useref.assets();

    return gulp.src(dev +'/*.html')
      .pipe(assets)
      .pipe(assets.restore())
      .pipe(useref())
      .pipe(gulp.dest(prod));
});


// Production task
gulp.task('prod', ['compass', 'compile'], function () {});


// Watch task
gulp.task('watch', function () {
    // Listen SASS Files
    gulp.watch(dev +'/sass/*.scss', ['compass']);

    // Listen JS & HTML Files
    gulp.watch([dev +'/*.html', dev +'/libraries/**/*'], ['compile']);
});