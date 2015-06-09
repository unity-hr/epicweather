var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('connect', ['scripts', 'styles'], function (done) {
  browserSync({
    ghostMode: false,
    notify: false,
    port: 9000,
    open: false,
    server: {
      baseDir: ['.tmp', 'app']
    }
  }, done);
});

gulp.task('watch', ['connect'], function () {
  gulp.watch([
    'app/**/*.html',
    'app/images/**/*'
  ]).on('change', browserSync.reload);

  gulp.watch('app/styles/**/*.scss', ['styles']);
});

gulp.task('serve', ['connect', 'watch']);
