// INCOMPLETE
// Obviously you need gulp to run gulp
var gulp = require('gulp');
// Sass Compiler
var sass = require('gulp-sass');
// Template Engine
var nunjucksRender = require('gulp-nunjucks-render');
// Starts realtime server that reloads when files are changed
var browserSync = require('browser-sync');
// Optimize CSS and JS
var useref = require('gulp-useref');
// Minify JS
var uglify = require('gulp-uglify');
// Differentiate between CSS and JS for optimization/minification
var gulpIf = require('gulp-if');
// Minify CSS
var cssnano = require('gulp-cssnano');
// Optimize images
var imagemin = require('gulp-imagemin');
// Cache optimized images or other large files
var cache = require('gulp-cache');
// Delete directories/files when necessary
var del = require('del');
// Run tasks in order; starts next task only when previous task is complete
var runSequence = require('run-sequence');

// INCOMPLETE

// Basic Gulp task syntax
gulp.task('hello', function() {
  console.log('Hello Developer!');
})

// Development Tasks
// -----------------

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'src'
    }
  })
})

// Sass Compiling
gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss') // Gets all files ending with .scss in src/scss and children dirs
    .pipe(sass()) // Passes it through a gulp-sass
    .pipe(gulp.dest('src/css')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
})

// Template Engine
gulp.task('nunjucks', function() {
  // Gets .html and .njk (nunjucks) files in pages
 return gulp.src('src/pages/**/*.+(html|njk)')
 // Renders template with nunjucks
 .pipe(nunjucksRender({
     path: ['src/templates']
   }))
 // output files in src folder (moved to dist folder for production)
 .pipe(gulp.dest('src'))
});

// Watchers (watch for changes to files with following extensions; run task in [] or reload browserSync server)
gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/**/*.html', ['nunjucks']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/js/**/*.js', browserSync.reload);
})

// Optimization Tasks
// ------------------

// Optimizing CSS and JavaScript
gulp.task('useref', function() {

  return gulp.src('src/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

// Optimizing Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('dist/images'))
});

// Copying fonts
gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
})

// Cleaning
gulp.task('clean', function() {
  return del.sync('dist').then(function(cb) {
    return cache.clearAll(cb);
  });
})

gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

// Build Sequences
// ---------------

gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync', 'watch'],
    callback
  )
})

gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    ['sass', 'nunjucks', 'useref', 'images', 'fonts'],
    callback
  )
})
