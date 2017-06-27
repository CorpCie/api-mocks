const gulp = require('gulp');

module.exports = gulp.task('connect-browser-sync', () => {
  // Init mock Api
  const routesMapping = require('../routes/routes-mapping');

  const serve = require('browser-sync');

  serve({
    port: 3000,
    open: false,
    notify: false,
    ui: false,
    server: true,
    ghostMode: false,
    middleware: [
      {
        route: '/myapi',
        handle: routesMapping.middleware
      }
    ]
  });
});
