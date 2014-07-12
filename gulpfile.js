// Minor modifications to https://github.com/insin/msx/gulpfile.js
'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')(); // checks package.json

var msx = require('./msx-main');
var through = require('through2');

var jsxGlob = './componentsMsx/**/*.js';
var dest = './dist/componentsMsx';
var jsxGlob1 = './componentsMsx/**/*.js';
var dest1 = './dist1/componentsMsx';

var log = plugins.util.log;

function msxTransform(name) {
  return through.obj(function (file, enc, cb) {
    console.log(file.path, enc);
    try {
      file.contents = new Buffer(msx.transform(file.contents.toString()));
      file.path = plugins.util.replaceExtension(file.path, '.js');
    }
    catch (err) {
      err.fileName = file.path;
      this.emit('error', new plugins.util.PluginError('msx', err));
    }
    this.push(file);
    cb();
  });
}

gulp.task('clean', function () {
  return gulp.src(dest, {read: false})
    .pipe(plugins.clean());
});

gulp.task('include', function(cb) {
  gulp.src(jsxGlob1)
    .pipe(plugins.plumber())
    .pipe(plugins.includeJs({ext:'js', cache:true, showFiles:'Building'}))
    // .pipe(plugins.size({showFiles: true}))
    .pipe(gulp.dest(dest1))
    .on('end', cb || function(){})
    .on('error', log);
});

gulp.task('msx', ['clean'], function() {
  return gulp.src(jsxGlob)
    .pipe(plugins.plumber())
    .pipe(msxTransform())
    .on('error', function(e) {
      console.error(e.message + '\n  in ' + e.fileName);
    })
    .pipe(gulp.dest(dest));
});

gulp.task('watch', function() {
  gulp.watch([jsxGlob], ['msx']);
});

gulp.task('default', ['watch', 'msx']);
