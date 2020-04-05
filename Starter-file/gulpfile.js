// Require plugins
var gulp = require('gulp');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
const autoprefixer = require('autoprefixer');
const { series } = require('gulp');
var concat = require('gulp-concat');
var postcss = require('gulp-postcss');
var wring = require('csswring');
var connect = require('gulp-connect');

gulp.task('connect',function(){

return connect.server({

    root:'app',
    port : 8181,
    livereload:true
})

})


gulp.task('prefix',function(){

    var process = [
      autoprefixer({
        browsers: 'last 3 version'
      }),
      wring
    ];
   return gulp.src("app/css/*.css")
   .pipe(postcss(process))
   .pipe(gulp.dest('./app/css/'))
    
    
    })

   


// Live Server
gulp.task('browserSync', function() {
    browserSync.init({
      server: {
        baseDir: 'app'
      },
    })
  })

// Compilation SASS 
gulp.task('sass', function() {
    return gulp.src('app/css/*.scss') // Gets all files ending with .scss in app/scss
      .pipe(sass())
      .pipe(gulp.dest('app/css'))
     
  });

// Watch
gulp.task('watch', function(){
   return gulp.watch('app/scss/**/*.scss', gulp.series('sass','connect'))
    
})

gulp.task('useref', function(){
    return gulp.src('app/*.html')
      .pipe(useref())
      // Minifies only if it's a JavaScript file
      .pipe(gulpIf('*.js', uglify()))
      // Minifies only if it's a CSS file
      .pipe(gulpIf('*.css', cssnano()))
      .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});
 //concat
 gulp.task('scripts', function() {
  return gulp.src(['./app/*.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});


//Build Prod
exports.build = series('sass', 'images', 'prefix', 'useref');// Require plugins
