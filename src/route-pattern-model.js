const urlNumberRegexp = /[0-9]+/g;

class RoutePattern {
  constructor({
    regexp = urlNumberRegexp,
    methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    path = url => url.replace(urlNumberRegexp, 'X')
  } = {}) {
    this.regexp = regexp;
    this.methods = methods;
    this.path = path;
  }
}

module.exports = RoutePattern;
