const Route = require('api-mocks').Route;

const visitDefinition = require('./visit-definition');

class VisitsGetRoute extends Route {
  constructor() {
    super(visitDefinition.getMock(), 200);
  }
}

module.exports = VisitsGetRoute;
