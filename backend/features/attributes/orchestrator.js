let AttributeRepositoryFactory = require('./repository.factory')();
let attributeRepository = AttributeRepositoryFactory.createAttributeRepository();
//let responseShaper = require("./response.shaper")();


module.exports = function AttributeOrchestrator() {

  this.saveAttribute = function (attribute) {
    return attributeRepository.saveAttribute(attribute);
  }

}
