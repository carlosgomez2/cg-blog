// Gulp 4 syntax migration

// Dependencies
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var pug         = require('gulp-pug');

// Message
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

// Paths
var paths = {
  html: {
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

// Compile Pug|Jade files into .html
gulp.task('pug', function() {
  return gulp.src(paths.html.src)
    .pipe(pug())
    .pipe(gulp.dest(paths.html.dest));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src(paths.styles.src)
    .pipe(sass())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
});

// Watch changes on files Sass, html
gulp.task('watch', function() {
  gulp.watch(paths.styles.src, gulp.series('sass'));
  gulp.watch(paths.html.dest).on('change', browserSync.reload);
});

// Static Server
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: '_site'
    },
    notify: false
  });
});

// Main task
gulp.task('default', gulp.series('serve', gulp.parallel('sass', 'pug', 'watch')));
