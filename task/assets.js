var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var browserSync = require('browser-sync');
var processors = [
  require('autoprefixer-core')
];

var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var b = browserify({
  entries: ['./app/scripts/app.js'],
  debug: true
}, watchify.args);

if (process.env.GULP_ENV !== 'production') {
  b = watchify(b);
}

var bundle = function () {
  return b.bundle()
    .on('error', function (msg) {
      delete msg.stream;
      $.util.log(msg);
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(browserSync.stream({once: true}));
};

gulp.task('scripts', bundle);
b.on('update', bundle);
b.on('log', $.util.log);

gulp.task('jshint', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

var processors = [
  require('autoprefixer-core')
];

gulp.task('styles', function () {
  gulp.src('app/styles/**/*.scss')
    .pipe($.sass.sync()).on('error', $.sass.logError)
    .pipe($.postcss(processors))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(browserSync.stream());
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{cleanupIDs: false}]
    })))
    .pipe(gulp.dest('dist/images'));
});
