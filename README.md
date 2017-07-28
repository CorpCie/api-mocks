# Api Mocks

Api-mocks is a simple and full customizable mock server from your API specifications. It's based on [json-schema-faker](https://github.com/json-schema-faker/json-schema-faker) to provide consistent and meaningful fake data to generate all sorts of payloads.


# Usage

Api-mocks is based on two parts, routes definitions and server rendering. You can find server and definitions examples in [/examples](./examples) folder.

## Api Specifications

**[Create](./examples/routes/routes-mapping.js)**

Create a new set of mocks with [ApiMock instance](./src/api-mock-model.js)

```javascript
let routes = {
  '/members/X': {
    GET: membersXGetRoute
  },
  '/visits': {
    GET: visitsGetRoute
  },
  '/visits/X': {
    GET: visitGetRoute
  }
};

new ApiMocks({
  name: 'myapi', // optionnal name of your set
  routes, // list of routes
  patterns // optionnal rewrite patterns
});
```

**Routes**

A route is a name/verb object pattern defined by a [Route instance](./src/route-model.js)

```javascript
let routes = {
  '/members/X': { // root path is removed
    GET: membersXGetRoute,
    PUT: membersXPutRoute
  }
};
```

In this example membersXGetRoute is the combination of a content _memberDefinition_ and a http satus code

```javascript
const Route = require('api-mocks').Route;

const memberDefinition = require('./member-definition');

class MembersXGetRoute extends Route {
  constructor() {
    super(memberDefinition.getMock(), 200);
  }
}

module.exports = MembersXGetRoute;
```

**[Definitions](./src/definition-model.js)**

Definition is a json-schema-faker mock schema, you can find fake data generators [here](http://json-schema-faker.js.org/#gist/eb11f16c9edccf040c028dc8bd2b1756). Examples show you a [JSONapi](http://jsonapi.org/) payload schema.

**[Patterns](./src/route-pattern-model.js)**

You can rewrite some url with regexp pattern, it's usefull for url with resource id in there that are hard to mock otherwise.
By default numbers in url are replace by a **X**.

This example create a set of patterns...

```javacript
const Pattern = require('api-mocks').Pattern;

module.exports = [
  new Pattern({
    regexp: /\/visits\/last/,
    methods: ['GET'],
    path: url => url.replace(/last$/, 'X')
  })
];
```

...to use _visits/X_ route definition for _visits/last_

```javascript
let routes = {
  '/visits/X': {
    GET: visitGetRoute
  }
};
```
## Servers

Api-mocks provides two examples of gulp server middleware (manipulate request and response data) implementations: [browser-sync](https://www.npmjs.com/package/browser-sync) and [gulp-connect](https://www.npmjs.com/package/gulp-connect)

**[browser-sync](./examples/browser-sync/connect.js)**
```javascript
const serve = require('browser-sync');
serve({
  port: 3000,
  ...
  middleware: [
    {
      route: '/myapi', // api routes start for all your uris
      handle: routesMapping.middleware // API specifications (created by ApiMocks instance)
    }
  ]
});
```

**[gulp-connect](./examples/gulp-connect/connect.js)**
```javascript
const server = require('gulp-connect');

server.server({
  port: 3000,
  ...
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
````

# Demo

In order to display demo  run

```sh
npm install
```

them you can run
```sh
gulp connect-browser-sync
```

or

```sh
gulp connect-gulp
```

Once the server is running you can type any of routes mapping url in the browser [(http://localhost:3000/myapi/members/1736876)](http://localhost:3000/myapi/members/1736876) or use javascript in console debugger with fetch api.  
