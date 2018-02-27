let AttributeRepositoryFactory = require('./repository.factory')();
let attributeRepository = AttributeRepositoryFactory.createAttributeRepository();
let responseShaper = require("./response.shaper")();


module.exports = function AttributeOrchestrator() {

  this.getAttributes = function (number, size, field, direction) {
    let sort = getSortOrderOrDefault(field, direction);
    return attributeRepository
    .getAttributes(number, size, sort)
    .flatMap(value => {
      return attributeRepository
        .getAttributeCount()
        .map(count => {
          return responseShaper.shapeAttributesResponse(value, number, size, value.length, count, sort);
        });
    });

  }

  this.getDataTypes = function () {
    return attributeRepository.getDataTypes();
  }

  this.getAttributeById = function (attributeId) {
    return attributeRepository.getAttributeById(attributeId);
  }

  this.addAttribute = function (attribute) {
    return attributeRepository.addAttribute(attribute);
  }

  this.updateAttribute = function(attributeId, attribute) {
    return attributeRepository.updateAttribute(attributeId, attribute);
  }

  this.deleteAttribute = function(attributeId) {
    return attributeRepository.deleteAttribute(attributeId);
  }

  function getSortOrderOrDefault(field, direction) {
    let sort = {};
    if (field && direction) {
      sort[field] = direction;
      return sort;
    } else {
      return sort;
    }
  }

}
