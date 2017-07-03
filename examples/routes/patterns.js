const Pattern = require('api-mocks').Pattern;

module.exports = [
  new Pattern({
    regexp: /\/visits\/last/,
    methods: ['GET'],
    path: url => url.replace(/last$/, 'X')
  })
];
