const ApiMocks = require('api-mocks').ApiMocks;
const membersXGetRoute = require('./members/members-X-get-route');
const membersXPutRoute = require('./members/members-X-put-route');
const visitsGetRoute = require('./visits/visits-get-route');
const visitGetRoute = require('./visits/visit-get-route');
const patterns = require('./patterns');

let routes = {
  '/members/X': {
    GET: membersXGetRoute,
    PUT: membersXPutRoute
  },
  '/visits': {
    GET: visitsGetRoute
  },
  '/visits/X': {
    GET: visitGetRoute
  }
};

module.exports = new ApiMocks({
  name: 'myapi', // optionnal name of your set
  routes, // list of routes
  patterns // optionnal rewrite patterns
});
