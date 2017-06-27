const jsf = require('json-schema-faker');

class Definition {
  constructor(schema = {}, schemasDependencies = []) {
    this.schema = schema;
    this.schemasDependencies = schemasDependencies;
  }

  getMock() {
    return jsf(this.schema, this.schemasDependencies);
  }
}

module.exports = Definition;
