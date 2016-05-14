var gulp    = require('gulp');

var uglify  = require('gulp-uglify');
var coffee  = require('gulp-coffee');
var cofLint = require('gulp-coffeelint');

var less    = require('gulp-less');

var footer  = require('gulp-footer');
var gutil   = require('gulp-util');

footerText = "\n\/* (C) Alicia Sykes <aliciasykes.com> MIT License. *\/";

/* Scripts */
gulp.task('scripts',  function(){
    gulp.src('./client_side_source/scripts/*.coffee')
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(cofLint())
        .pipe(uglify())
        .pipe(footer(footerText))
        .pipe(gulp.dest('./client_side_production/javascripts'));
});

/* Styles */
gulp.task('styles', function(){
    gulp.src('./client_side_source/styles/*.less')
        //.pipe(minCss({compatibility: 'ie8'}))
        .pipe(less().on('error', gutil.log))
        .pipe(footer(footerText))
        .pipe(gulp.dest('./client_side_production/stylesheets'));
});

/* Watch */
gulp.task('watch', function(){
    gulp.watch('./client_side_source/scripts/**/*.coffee', ['scripts']);
    gulp.watch('./client_side_source/styles/**/*.less', ['styles']);
});