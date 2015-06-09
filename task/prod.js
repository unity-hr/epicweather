var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var browserSync = require('browser-sync');
var shell = require('shelljs');

gulp.task('html', ['scripts', 'styles'], function () {
  gulp.src([
    'app/**/*.html',
    'app/scripts/vendor/modernizr*.js'
  ], {base: 'app'})
    .pipe(gulp.dest('dist'));

  return gulp.src([
    '.tmp/scripts/**/*.js',
    '.tmp/styles/**/*.css'
  ], {base: '.tmp'})
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.minifyCss()))
    .pipe(gulp.dest('dist'));
});

gulp.task('extras', function () {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {dot: true})
    .pipe(gulp.dest('dist'));
});

gulp.task('connect:dist', function (done) {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    },
    ui: false,
  }, done);
});

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

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('build', ['jshint', 'html', 'images', 'extras'], function () {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', showFiles: true, gzip: true}));
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});

gulp.task('deploy', function () {
  shell.exec('echo "Deploying..."');
});
