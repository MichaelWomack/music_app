'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('browser-sync', () => {
   browserSync.init({
      server: {
          baseDir: "./server/app.js"
      }
   });
});

gulp.task('default', ['browser-sync']);