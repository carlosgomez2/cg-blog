var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var minifycss   = require('gulp-minify-css');
var jshint      = require('gulp-jshint');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var cp          = require('child_process');
var jade        = require('gulp-jade');
var bourbon     = require('bourbon').includePaths;

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

var paths = {
  htmlJade: {
    src: '_jadefiles/*.jade',
    dest: '_includes'
  },
  styles: {
    src: 'assets/css/main.scss',
    dest: ['assets/css', '_site/assets/css']
  },
  scripts: {
    src: 'assets/js/common.js',
    dest: ['js', '_site/assets/js']
  }
}

// redo of sass
// Compile Sass assets from development (_scss), for live injecting (_site/assets/css) and jekill build deploy (assets/css)
gulp.task('sass', function () {
  return gulp.src(paths.styles.src)
    .pipe(sass({
      includePaths: [bourbon],
      onError: browserSync.notify
    }).on('error', sass.logError))
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(minifycss())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.reload({stream:true}));
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
// gulp.task('sass', function () {
//   return gulp.src('assets/css/main.scss')
//     .pipe(sass({
//       includePaths: [bourbon],
//       onError: browserSync.notify
//     }).on('error', sass.logError))
//     .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
//     .pipe(rename({suffix: '.min', prefix : ''}))
// 	.pipe(minifycss())
//     .pipe(gulp.dest('assets/css'))
//     .pipe(gulp.dest('_site/assets/css'))
//     .pipe(browserSync.reload({stream:true}));
// });


/**
 * Compile jade
 */
gulp.task('jade', function() {
  return gulp.src('_jadefiles/*.jade')
  .pipe(jade())
  .pipe(gulp.dest('_includes'));
});


/*
** JS Task
*/
gulp.task('js', function() {
  return gulp.src('assets/js/common.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('common.js'))
    .pipe(gulp.dest('js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('js'))
    .pipe(gulp.dest('_site/assets/js'));
});


/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
  gulp.watch(['assets/js/**/*.js', 'js/*.js']).on("change", browserSync.reload);
  gulp.watch('assets/css/**', ['sass']);
  gulp.watch(['*.html', '_layouts/*.html', '_posts/*', '_includes/*'], ['jekyll-rebuild']);
  gulp.watch('_jadefiles/*.jade', ['jade']);
});


/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', gulp.series('browser-sync', 'watch'));


/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    var pl = process.platform === "win32" ? "jekyll.bat" : "jekyll";
    return cp.spawn(pl, ['build'], {stdio: 'inherit'})
        .on('close', done);
});


/**
 * Rebuild Jekyll & do page reload
 */
gulp.task(
  'jekyll-rebuild',
  gulp.series('jekyll-build', function () {
    browserSync.reload();
  })
);


/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task(
  'browser-sync',
  gulp.series('sass', 'js', 'jekyll-build', function() {
    browserSync({
        server: {
          baseDir: '_site'
        },
        notify: false
    });
  })
);
