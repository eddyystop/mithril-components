// Minor modifications to https://github.com/insin/msx/gulpfile.js
'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')(); // checks package.json

var msx = require('./msx-main');
var through = require('through2');

var jsxSrc= './componentsJsx/**/*.js';
var jsxDestBase = './dist/componentsJsx';

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
  return gulp.src(jsxDestBase, {read: false})
    .pipe(plugins.clean());
});

gulp.task('jsx', ['clean'], function() {
  return gulp.src(jsxSrc)
    .pipe(plugins.plumber())
    .pipe(plugins.includeJs({ext:'html', cache:true, showFiles:'Building'}))
    .pipe(msxTransform())
    .on('error', function(e) {
      console.error(e.message + '\n  in ' + e.fileName);
    })
    .pipe(gulp.dest(jsxDestBase));
});

gulp.task('watch', function() {
  gulp.watch([jsxGlob], ['jsx']);
});

gulp.task('default', ['watch', 'jsx']);
