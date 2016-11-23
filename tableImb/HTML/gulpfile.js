/*==================================================
=            npm install gulp --sav-dev            =
==================================================*/
// to disable>dest path replace fs
/*----------  dependance  > package.json > node_modules  ----------*/
var gulp     = require('gulp'),
browserSync  = require('browser-sync'),
slim         = require("gulp-slim"),
sass         = require('gulp-sass'),
plumber      = require('gulp-plumber'),
premailer    = require('gulp-premailer'),
autoprefixer = require('gulp-autoprefixer'),
rename       = require('gulp-rename'),
using        = require('gulp-using'),
rm           = require('gulp-rimraf'),
rimraf       = require('rimraf'),
prettify     = require('gulp-html-prettify'),
foreach      = require("gulp-foreach"),
changed      = require('gulp-changed');
// imgmin    = require('gulp-imagemin'),

// src & output
var  src = 'src/';
/*=================================
=            task init            =
=================================*/
// browser-sync task !attention il faut un index.html obligatoire
gulp.task('browserSync',function () {
  browserSync({
    // browser: 'google chrome',
    // browser: [ 'google chrome','firefox' ],
    browser: 'firefox',
    server: {
      baseDir: 'render/FR'
    }
  })
})


// cp img folder
gulp.task('img', function() {
  return gulp.src([src+'**/images/*.{png,jpg,gif}'])
  // .pipe(npm()) // img optimize
  .pipe(changed('src/**/images/'))
  .pipe(gulp.dest('render'))
  .on('end',function () {
    // start slim to render
    gulp.start('slim');
  })
})

// sass task
gulp.task('sass', function() {
  return gulp.src(src+'**/scss/*.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(sass({errLogToConsole: true}))
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
  .pipe(rename(function(path) {
    path.dirname += "/../css";
  }))
  .pipe(changed('render/**/css/'))
  .pipe(gulp.dest('render'))
  .pipe(using())
  .pipe(browserSync.reload({stream: true }));
})

// slim task
gulp.task('slim', function () {
  var slimEnd = false;
  return gulp.src([src+'**/slim/*.slim'])
  .pipe(plumber())
  .pipe(slim( {pretty: true, indent: '2' })) // cb // {read:false},
  .pipe(using())
  // .pipe(changed('render/**/slim/'))
  // .pipe(changed('src/**/slim/*.slim'))
  .pipe(gulp.dest('render')) // slim folder
  .pipe(rename(function(path) {
    path.dirname += "/../";
  }))
  .pipe(foreach(function(stream, file) {
      var fileName = file.path.substr(file.path.lastIndexOf("\\")-2);
      // var myregex = /(.+?)\\/;
      var myregex = fileName.replace(/(.+?)\\.+/,"$1");
      console.log('myregex ' + myregex + '\n fileName ' + fileName + '\n file.path ' + file.path)
      return stream
      .pipe(browserSync.stream())
        // .pipe(browserSync.reload({
        //   stream: true
        // }))
    }))
  .pipe(gulp.dest('render')) // html folder
  // .pipe(browserSync.reload({
  //   stream: true
  // }))
  .on('end',function () {
    slimEnd = true;
    premailergo(slimEnd);
  })
});
// premailer task // si erreur sass > rendu incomplet à gérer
gulp.task('premailer', function () {
  var premailEnd = false;
  gulp.src('render/**/*.html')
  .pipe(plumber())
  .pipe(premailer()) //,{read:false}
  .pipe(prettify({indent_car:'', indent_size: 2}))
  .pipe(gulp.dest('render'))
  .on('end',function () {
    premailEnd = true;
    console.log('premailerOK: '+premailEnd+' rm render/slim folder ');
    gulp.start('rmRenderSlimFolder');
    gulp.start('rmRenderCssFolder');
  })
});
gulp.task('rmRenderSlimFolder', function (cb) {
  rimraf('./render/**/slim',function (err) {
    console.log("all done del slim");
    return cb(null);
  });
});
gulp.task('rmRenderCssFolder', function (cb) {
  rimraf('./render/**/css',function (err) {
    console.log("all done del css");
    return cb(null);
  });
});

function premailergo (slimEnd) {
  console.log('slim complete: '+slimEnd);
  if(slimEnd=true){
    gulp.start(['premailer']);
  }else{
    console.log('slim pas prêt.......')
  }
};
// 
gulp.task('one',function () {
  gulp.start(['img','slim','sass']);
});
//
// lancement > fonction watch
gulp.task('dev',['browserSync','img','slim','sass'], function() {
  gulp.watch([src+'**/images/*.{png,jpg,gif}'],['img']);
  gulp.watch([src+'**/slim/*.slim',src+'**/**/*.slim'],['slim','img']);
  gulp.watch(src+'**/scss/*.scss',['sass','slim']);
});

gulp.task('default',['rmRenderSlimFolder'])
