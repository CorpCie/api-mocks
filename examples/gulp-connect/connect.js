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
        let apiTest = /^\/myapi/; // api routes start for all your uris
        let isApiUrl = apiTest.test(request.url); // check request url
        request.url = request.url.replace(apiTest, ''); // replace root url pattern
        // if api match use mocked API
        return isApiUrl && routesMapping.middleware(request, response, next) || next();
      };

      return [mockMiddleware];
    }
  });
});
