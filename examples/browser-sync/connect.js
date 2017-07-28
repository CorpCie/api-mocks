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
        route: '/myapi', // api routes start for all your uris
        handle: routesMapping.middleware // API specifications (created by ApiMocks instance)
      }
    ]
  });
});
