import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import runSequence from 'run-sequence';

// Set NODE_ENV to 'development'
gulp.task('env:dev', () => {
  process.env.NODE_ENV = 'development';
});

// Nodemon task
gulp.task('nodemon', () => nodemon({
  script: 'server.js',
  nodeArgs: ['--debug'],
  ext: 'js,html',
}));

// Run the project in development mode
gulp.task('default', (done) => {
  runSequence('env:dev', 'nodemon', done);
});
