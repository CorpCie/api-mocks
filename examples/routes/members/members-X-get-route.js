const Route = require('api-mocks').Route;

const memberDefinition = require('./member-definition');

class MembersXGetRoute extends Route {
  constructor() {
    super(memberDefinition.getMock(), 200);
  }
}

module.exports = MembersXGetRoute;
