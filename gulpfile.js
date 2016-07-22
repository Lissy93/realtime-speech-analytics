
/* Require dev dependencies for bui;ding project */
var gulp    = require('gulp');                  // Main gulp module
var uglify  = require('gulp-uglify');           // To minify JavaScript
var coffee  = require('gulp-coffee');           // To compile CoffeeScript to JS
var cofLint = require('gulp-coffeelint');       // To check CoffeeScript is cool
var jade    = require('gulp-jade');             // Compiles Jade into HTML
var source  = require('vinyl-source-stream');   // For using text streams
var less    = require('gulp-less');             // Compile Less into CSS
var footer  = require('gulp-footer');           // Add a footer to done files
var gutil   = require('gulp-util');             // For gulp logging to console
var del     = require('del');                   // Used to clean production dir
var browserify  = require('browserify');        // Creates client-side js bundle
var coffeeify   = require('coffeeify');         // CoffeeScript for Browserify
var debowerify  = require('debowerify');        // Use Bower  witch Browserify
var runSequence = require('run-sequence');      // Specify the order tasks run

footerText = "\n\/* (C) Alicia Sykes <aliciasykes.com> MIT License. *\/";


/* Compile CoffeeScript for the www-side into JavaScript */
gulp.task('scripts',  function(){
    gulp.src('./source/server-side-scripts/**/*.coffee')
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(cofLint())
        .pipe(uglify())
        .pipe(footer(footerText))
        .pipe(gulp.dest('./production/server'));
});


/* Browserify all client-side client-side-scripts */
gulp.task('browserify', function () {
    browserify('./source/client-side-scripts/main.coffee')
        .transform(coffeeify)
        .transform(debowerify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./production/javascripts/'))
        .on('error', gutil.log);
    });


/* Compile SASS into CSS */
gulp.task('styles', function(){
    gulp.src('./source/styles/*.less')
        .pipe(less().on('error', gutil.log))
        .pipe(footer(footerText))
        .pipe(gulp.dest('./production/stylesheets'));
});


/* Compile Jade into HTML for offline version */
gulp.task('views', function() {
    locals = require('./source/views/locals.json');
    gulp.src('./source/views/index.jade')
        .pipe(jade({locals: locals}))
        .pipe(gulp.dest('./production/'));
    gulp.src('./source/views/locals.json').
        pipe(gulp.dest('./production/'));
});


/* Format (if necessary) and pipe assets to production */
gulp.task('assets', function(){
   gulp.src('./source/images/**').pipe(gulp.dest('./production/images/'));
});


/* Delete Old Built Files */
gulp.task('clean', function() {
    return del([
        'production/images',
        'production/javascripts',
        'production/server',
        'production/stylesheets'
    ]);
});


/* Clean followed by a full project build */
gulp.task('build',  function (cb) {
    runSequence('clean',
        ['scripts', 'browserify', 'styles', 'views', 'assets'],
        cb);
});


/* Watch files for changes, and run appropriate tasks */
gulp.task('watch', function(){
    gulp.watch('./source/client-side-scripts/**/*.coffee', ['browserify']);
    gulp.watch('./source/server-side-scripts/**/*.coffee', ['scripts']);
    gulp.watch('./source/images/**/*.coffee', ['assets']);
    gulp.watch('./source/styles/**/*.less', ['styles']);
    gulp.watch('./source/views/**/*.jade', ['views']);
});