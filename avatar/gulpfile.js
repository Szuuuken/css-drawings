var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var sourcemaps = require('gulp-sourcemaps');
var bom = require('gulp-bom');

gulp.task('sass', function () {
  return gulp.src('./app/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/'))
    .pipe(reload({stream: true}));
});

gulp.task('templates', function () {
  return gulp.src('./app/*.jade')
    .pipe(jade())
    .pipe(bom())
    .pipe(gulp.dest('./dist/'))
    .pipe(reload({stream: true}));
});

gulp.task('jade-watch', ['templates']);

gulp.task('build', ['sass', 'templates']);

gulp.task('default', ['build'], function () {
  browserSync.init({server: './dist/'});
  gulp.watch('./app/*.jade', ['jade-watch']);
  gulp.watch('./app/*.sass', ['sass']);
});
