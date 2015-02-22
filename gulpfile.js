var dev         = "app_dev",
    prod        = "app_prod";

var gulp        = require('gulp'),
    compass     = require('gulp-for-compass'),
    useref      = require('gulp-useref'),
    clean       = require('gulp-clean');


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


// Move files to prod without changing them
gulp.task('moveViews', ['cleanViews'], function () {
  return gulp.src(dev +"/libraries/views/**/*")
    .pipe(gulp.dest(prod +'/libraries/views'));
});


// Clean directories
gulp.task('cleanViews', function () {
  return gulp.src(prod +"/libraries/views")
    .pipe(clean());
});


// Move files to prod without changing them
gulp.task('moveImages', ['cleanImages'], function () {
  return gulp.src(dev +"/resources/images/**/*")
    .pipe(gulp.dest(prod +'/resources/images'));
});


// Clean directories
gulp.task('cleanImages', function () {
  return gulp.src(prod +"/resources/images")
    .pipe(clean());
});


// Production task
gulp.task('prod', ['compass', 'compile', 'moveViews', 'moveImages'], function () {});


// Watch task
gulp.task('watch', function () {
    // Listen SASS Files
    gulp.watch(dev +'/sass/*.scss', ['compass']);

    // Listen JS & HTML Files
    gulp.watch([dev +'/*.html', dev +'/libraries/**/*'], ['compile']);
});