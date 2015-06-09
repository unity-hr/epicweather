var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var browserSync = require('browser-sync');

gulp.task('connect:cbt', function (done) {
  browserSync({
    ghostMode: false,
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    },
    ui: false,
  }, done);
});
