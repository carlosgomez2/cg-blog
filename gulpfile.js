// Gulp 4 syntax migration & Refactor

// Global Dependencies
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var cp          = require('child_process');
var rename      = require('gulp-rename'); // no
// HTML Dependencies
var pug         = require('gulp-pug'); // no
// Css Dependencies
var sass        = require('gulp-sass');
sass.compiler   = require('node-sass');
var prefix      = require('gulp-autoprefixer');
// var minifycss   = require('gulp-minify-css'); // no
var cssnano     = require('gulp-cssnano')
var bourbon     = require('bourbon').includePaths; // no
// JS Dependencies
var jshint      = require('gulp-jshint'); // no
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');

// Paths
var paths = {
  html: {
    src: ['*.html', '_layouts/*.html', '_posts/*', '_includes/*'],
    dest: '_includes'
  },
  pugFiles: {
    src: '_pugfiles/*.pug',
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

// Environments
var messages = {
  jekyllDev: 'Running: $ jekyll build for dev',
  jekyllProd: 'Running: $ jekyll build for prod'
};

// Jekyll development
gulp.task('jekyllDev', function (done) {
  browserSync.notify(messages.jekyllDev);
  cp.spawn("bundle", ["exec", "jekyll", "build", "--watch", "--drafts", "--config", "_config_dev.yml"], { stdio: "inherit" });
  cp.spawn("bundle", ["exec", "jekyll", "s", "--livereload", "--livereload-port 8080", "--port 4001"], { stdio: "inherit" });
  done();
});

// Rebuild Jekyll site
gulp.task('jekyll-rebuild', gulp.series('jekyllDev'), async function () {
  browserSync.reload({ stream: true });
});

// Sass Development
gulp.task('sass', async function() {
  return gulp.src(paths.styles.src) //'assets/css/main.sass'
    .pipe(sass({
        includePaths: [bourbon],
        outputStyle: 'compressed'
      }).on('error', sass.logError))
    // .pipe(sass().on('error', sass.logError))

    .pipe(prefix({
        browsers: ['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
        cascade: true
      }))

    .pipe(rename({suffix: '.min', prefix : ''}))
    .pipe(cssnano())

    .pipe(gulp.dest('assets/css/'))
    .pipe(gulp.dest('_site/assets/css/'))
    .pipe(browserSync.reload({ stream: true }))
});

// Compile Pug|Jade files into .html
gulp.task('pug', async function() {
  return gulp.src(paths.pugFiles.src)
    .pipe(pug())
    .pipe(gulp.dest(paths.pugFiles.dest))
    .pipe(browserSync.reload({ stream: true }))
});

// JS task
gulp.task('js', async function() {
  return gulp.src(paths.scripts.src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('common.js'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.reload({ stream: true }))
});

// Watch changes on files
gulp.task('watch', function(done) {
  // Scripts
  gulp.watch(paths.scripts.all, gulp.series('js')).on('change', browserSync.reload);
  // Styles
  // gulp.watch(paths.styles.all, gulp.series('sass')).on('change', browserSync.reload); // loop main.min.sass
  gulp.watch(paths.styles.others[1], gulp.series('jekyll-rebuild')).on('change', browserSync.reload);
  // gulp.watch(paths.styles.others[0], gulp.series('jekyll-rebuild')).on('change', browserSync.reload);
  // HTML
  gulp.watch(paths.html.src, gulp.series('jekyll-rebuild'));
  gulp.watch(paths.pugFiles.src, gulp.series('pug')).on('change', browserSync.reload);
  done();
});

// Production
gulp.task('jekyllProd', function (done) {
  browserSync.notify(messages.jekyllProd);
  return cp.spawn("bundle", ["exec", "jekyll", "build", "--config", "_config.yml", "JEKYLL_ENV=production", "--verbose", "--trace"], { stdio: "inherit" }).on('close', done);
});

// Sass Production
gulp.task('sassProd', async function() {
  return gulp.src(paths.styles.src) //'assets/css/main.sass'
    .pipe(sass({
        includePaths: [bourbon],
        outputStyle: 'compressed'
      }).on('error', sass.logError))
    // .pipe(sass().on('error', sass.logError))

    .pipe(prefix({
        browsers: ['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
        cascade: true
      }))

    .pipe(rename({suffix: '.min', prefix : ''}))
    .pipe(cssnano())

    .pipe(gulp.dest('assets/css/'))
    .pipe(gulp.dest('_site/assets/css/'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('jsProd', async function() {
  return gulp.src(paths.scripts.src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('common.js'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest))
});

// Serve
gulp.task('browser-sync', gulp.series('sass', 'pug', 'js', 'watch', 'jekyllDev'), function(done) {
  browserSync.init({
    server: "_site",
    // proxy: 'http://127.0.0.1:4000/cg-blog/'
    proxy: 'localhost:3002/cg-blog/'
  });
  browserSync.notify("Compiling <span color='green'>development</span> wait, Ra's Al...");
  done();
});

// Build for production
gulp.task('build', gulp.series('jsProd', 'sassProd', 'jekyllProd'), function(done) {
  done();
});

// Main task
// gulp.task('default', gulp.series('serve', gulp.parallel('watch')));
gulp.task('default', gulp.series('browser-sync', gulp.parallel('watch')), function(done) {
  done();
});
