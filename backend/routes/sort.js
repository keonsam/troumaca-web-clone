var Attribute = require('./attribute');

class Sort {
  constructor(direction, attributes) {
    this.direction = direction;
    this.attributes = attributes;
  }
}

module.exports = Sort;