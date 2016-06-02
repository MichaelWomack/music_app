'use strict';

import gulp from 'gulp';
import browserify from 'browserify';
import source from 'vinyl-source-stream';

gulp.task('default', ['watch']);

gulp.task('transpile', () => {
  let files = ['src/app.js']
  return browserify(['src/app.js', 'src/controllers/artist-controller.js'])
    .transform('babelify')
    .bundle()
    .on('error', function(error) {
      console.log(`\nError: ${error.message}\n`);
      this.emit('end');
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['transpile'], () => {
  gulp.watch('src/**/*', ['transpile']);
});
