var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('scripts', function() {
  gulp.src(['js/libs/three.min.js', 'js/libs/Matrix.js', 'js/shaders/fragmentShader.js', 'js/shaders/vertexShader.js', 'js/app.js'])
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
});

gulp.task('default', ['scripts']);