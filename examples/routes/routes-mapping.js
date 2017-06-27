const ApiMocks = require('api-mocks').ApiMocks;
const membersXGetRoute = require('./members/members-X-get-route');

let routes = {
  '/members/X': {
    GET: membersXGetRoute
  }
};

module.exports = new ApiMocks({
  name: 'myApi',
  routes
});
