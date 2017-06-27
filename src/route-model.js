class Route {
  constructor(content, statusCode = 200) {
    this.content = content;
    this.statusCode = statusCode;
  }
}

module.exports = Route;
