##gulp-remap
Gulp task to map files and export a content of the buffer in json.only usein ttpai-feteam.
usage
``
var gulp = require('gulp');
var remap = require('gulp-remap');
var cssmin = require('gulp-minify-css');
var less = require('gulp-less');
var uglify = require('gulp-uglify');

gulp.task('less', function () {
	return gulp.src(['less/*.less'])
		.pipe(less())
		.pipe(cssmin())
		.pipe(remap('./css.json'))
		.pipe(gulp.dest('css/'));
});
``
