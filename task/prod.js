var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var browserSync = require('browser-sync');
var shell = require('shelljs');

var revAll = new $.revAll({
  dontRenameFile: [/^\/favicon.ico$/g, '.html']
});

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

gulp.task('rev', ['html', 'images'], function () {
  return gulp.src('dist/**/*')
    .pipe(revAll.revision())
    .pipe(gulp.dest('dist'))
    .pipe($.revNapkin());
});

gulp.task('extras', ['rev'], function () {
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

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('build', ['jshint', 'html', 'rev', 'extras'], function () {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', showFiles: true, gzip: true}));
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});

gulp.task('deploy', function () {
  shell.exec('echo "Deploying..."');
});
