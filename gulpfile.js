'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserify = require('browserify');
const buffer = require('gulp-buffer');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-minify');
const tap = require('gulp-tap');
const browserSync = require('browser-sync').create()

gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('browserify', function () {
    return gulp.src('./src/js/app.js')
        .pipe(tap(function(file) {
            file.contents = browserify(file.path, {debug: true}).bundle()
        }))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('minify', function () {
    return gulp.src('./src/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream())
});

gulp.task('watch', function () {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch('./src/js/**/*.js', ['browserify']);
    gulp.watch('./src/**/*.html', ['minify']);
});

gulp.task('sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    })
});

gulp.task('build', ['sass', 'browserify', 'minify']);
gulp.task('dev', ['build', 'watch', 'sync']);