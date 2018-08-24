// Gulp 4 syntax migration & Refactor

// Global Dependencies
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var cp          = require('child_process');
var rename      = require('gulp-rename');
// HTML Dependencies
var pug         = require('gulp-pug');
// Css Dependencies
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var minifycss   = require('gulp-minify-css');
var bourbon     = require('bourbon').includePaths;
// JS Dependencies
var jshint      = require('gulp-jshint');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');

// Message
var messages = {
    jekyllBuild: '<span style="color: white">Running:</span> $ jekyll build'
};

// Paths
var paths = {
  html: {
    src: ['*.html', '_layouts/*.html', '_posts/*', '_includes/*'],
    dest: '_includes'
  },
  pugFiles: {
    src: '_jadefiles/*.jade',
    dest: '_includes'
  },
  styles: {
    all: 'assets/css/**',
    src: 'assets/css/main.scss',
    dest: ['assets/css', '_site/assets/css'],
    others: ['assets/others/**/*.css', 'assets/post-assets/**/*.css']
  },
  scripts: {
    all:  'assets/js/**/*.js',
    src:  'assets/js/common.js',
    dest: '_site/assets/js'
  }
}

// Build Jekyll
gulp.task('jekyll-build', function (done) {
  return cp.spawn("bundle", ["exec", "jekyll", "build"], { stdio: "inherit" });
});

// Rebuild Jekyll site
gulp.task('jekyll-rebuild',
  gulp.series('jekyll-build', function (done) {
    browserSync.reload();
    done();
  })
);

// Static Server
gulp.task('serve', function(done) {
  browserSync.init({
    server: {
      baseDir: '_site'
    }
  });
  done();
});

// Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
gulp.task('sass', function(done) {
  return gulp.src(paths.styles.src)
    .pipe(sass({
        includePaths: [bourbon],
        onError: browserSync.notify
      }).on('error', sass.logError))

    .pipe(prefix({
        browsers: ['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
        cascade: true
      }))

    .pipe(rename({suffix: '.min', prefix : ''}))
    .pipe(minifycss())

    .pipe(gulp.dest(paths.styles.dest[0]))
    .pipe(gulp.dest(paths.styles.dest[1]));
    // .pipe(browserSync.reload({
    //   stream: true
    // }));
    done();
});

// Compile Pug|Jade files into .html
gulp.task('pug', function() {
  return gulp.src(paths.pugFiles.src)
    .pipe(pug())
    .pipe(gulp.dest(paths.pugFiles.dest));
});

// JS task
gulp.task('js', function() {
  return gulp.src(paths.scripts.src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('common.js'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest));
});

// Watch changes on files
gulp.task('watch', function() {
  gulp.watch(paths.scripts.all, gulp.series('js')).on('change', browserSync.reload);
  gulp.watch(paths.styles.all, gulp.series('sass')).on('change', browserSync.reload);
  gulp.watch(paths.styles.others[0], gulp.series('jekyll-rebuild')).on('change', browserSync.reload);
  gulp.watch(paths.styles.others[1], gulp.series('jekyll-rebuild')).on('change', browserSync.reload);
  gulp.watch(paths.html.src, gulp.series('jekyll-rebuild'));
  gulp.watch(paths.pugFiles.src, gulp.series('pug')).on('change', browserSync.reload);
});

// Main task
gulp.task('default', gulp.series('serve', gulp.parallel('watch')));
