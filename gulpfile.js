const {series,parallel} = require('gulp');
const {src,dest} = require('gulp');
var gulp = require ('gulp');
var csso = require ('gulp-csso');
var uglify = require ('gulp-uglify');
var rename = require ('gulp-rename');
var watch = require('gulp-watch');
var sass = require('gulp-sass');

sass.compiler = require('node-sass');

var _self = this;
function cssMinify(cb) {
  // body omitted
  gulp.src('./src/css/main.scss').
  pipe(sass()).
  pipe(csso()).
  pipe(rename({suffix:'.min'})).
  pipe(gulp.dest('./dist/css'));
  cb();
}

function jsMinify(cb) {
  // body omitted
  gulp.src('./src/js/main.js').
  pipe(uglify().on('error',function(e){
  	console.log(e);
  })).
  pipe(rename({suffix:'.min'})).
  pipe(dest('./dist/script'));
  cb();
}

function defaultTask(cb) {
  // place code for your default task here
  cb();
}

 //exports.default = series(cssMinify,jsMinify,defaultTask);
 exports.default = function(){
  gulp.watch('src/css/main.scss',cssMinify);
  gulp.watch('src/js/main.js',jsMinify);
 }