'use strict'

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var buffer = require('gulp-buffer');
var uglify = require('gulp-uglify');
var tap = require('gulp-tap');
var browserSync = require('browser-sync').create()

gulp.task('sass', function () {
    return gulp.src('./app/sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('browserify', function () {
    return gulp.src('app/js/app.js')
        .pipe(tap(function(file) {
            file.contents = browserify(file.path, {debug: true}).bundle()
        }))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream());
})

gulp.task('watch', function () {
    gulp.watch('./app/sass/**/*.scss', ['sass']);
    gulp.watch('./app/js/**/*.js', [`browserify`]);
    gulp.watch('./app/**/*.html').on('change', browserSync.reload)
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    })
});

gulp.task('default', ['sass', 'browserify', 'watch', 'browser-sync'])