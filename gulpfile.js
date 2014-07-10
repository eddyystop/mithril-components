// Minor modifications to https://github.com/insin/msx/gulpfile.js
'use strict';

var gulp = require('gulp');

var msx = require('./msx-main');
var through = require('through2');

var plumber = require('gulp-plumber');
var gutil = require('gulp-util');

var jsxGlob = './components/**/*.jsx';
var dest = './dist/components';

function msxTransform(name) {
  return through.obj(function (file, enc, cb) {
    console.log(file.path, enc);
    try {
      file.contents = new Buffer(msx.transform(file.contents.toString()));
      file.path = gutil.replaceExtension(file.path, '.js');
    }
    catch (err) {
      err.fileName = file.path;
      this.emit('error', new gutil.PluginError('msx', err));
    }
    this.push(file);
    cb();
  });
}

gulp.task('msx', function() {
  return gulp.src(jsxGlob)
    .pipe(plumber())
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
