const RoutePattern = require('./route-pattern-model');
const Middleware = require('./middleware-model');

class ApiMock {
  constructor({
    name = 'apiMock',
    routes = {},
    patterns = []
  } = {}) {
    this.name = name;
    this.routes = routes;
    this.patterns = [new RoutePattern()].concat(patterns);

    let middleware = new Middleware({routes: this.routes, patterns: this.patterns});
    this.middleware = middleware.handle;
  }
}

module.exports = ApiMock;
