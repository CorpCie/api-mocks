const gulp = require('gulp');

module.exports = gulp.task('connect-gulp', () => {
  // Init mock Api
  const routesMapping = require('../routes/routes-mapping');

  const server = require('gulp-connect');

  server.server({
    port: 3000,
    open: false,
    middleware() {
      let mockMiddleware = (request, response, next) => {
        let apiTest = /^\/myapi/;
        let isApiUrl = apiTest.test(request.url);
        request.url = request.url.replace(apiTest, '');
        return isApiUrl && routesMapping.middleware(request, response, next) || next();
      };

      return [mockMiddleware];
    }
  });
});
