const urlUtils = require('url');
const qs = require('qs');
const _ = require('lodash');

class Middleware {
  constructor({
    routes = {},
    patterns = []
  } = {}) {
    this.patterns = patterns;
    this.routes = routes;

    this.handle = (request, response, next) => {
      let apimockRequest = this.buildApimockRequest(request);

      request.setEncoding('utf8');
      request.on('data', data => {
        apimockRequest.data = qs.parse(data);
      });

      request.on('end', () => {
        let MockRoute = _.get(this.routes, `${apimockRequest.url}.${apimockRequest.method}`);

        if (!MockRoute) {
          this.mockNotFound(response, apimockRequest.url);
          next();
          return;
        }

        this.addControlAllowOriginHeaders(response);

        // create mock with request for better mock response consistency
        let mock = new MockRoute(apimockRequest);
        response.statusCode = mock.statusCode;

        // return generated mock response
        response.end(JSON.stringify(mock.content));

        next();
      });
    };
  }

  addControlAllowOriginHeaders(response) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
    response.setHeader('Access-Control-Allow-Headers', 'accept, origin, authorization, content-type');
    response.setHeader('Content-Type', 'application/json');
  }

  matchPatterns(url, method) {
    let match = url;
    this.patterns.forEach(pattern => {
      if (!pattern.regexp.test(url) || !pattern.path || (pattern.methods && pattern.methods.indexOf(method) < 0)) {
        return;
      }

      match = pattern.path(url);
    });

    return match;
  }

  buildApimockRequest(request) {
    let requestedUrl = urlUtils.parse(request.url, true);
    return {
      url: this.matchPatterns(requestedUrl.href, request.method),
      query: requestedUrl.query,
      method: request.method
    };
  }

  mockNotFound(response, url) {
    response.statusCode = 404;
    return response.end(JSON.stringify({
      apimock: 'Warning: Mock not found ' + url
    }));
  }
}

module.exports = Middleware;
