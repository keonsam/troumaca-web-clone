let assetTypeClassesRepositoryFactory = require('./repository.factory')();
let assetTypeClassesRepository = assetTypeClassesRepositoryFactory.createAssetRepository();
let responseShaper = require("./response.shaper")();

module.exports = function AssetTypeClassesOrchestrator() {

  let that = this;

  this.getDataTypes = function () {
    return assetTypeClassesRepository.getDataTypes();
  }

  this.getAssetTypeClasses = function (number, size, field, direction) {
    let sort = getSortOrderOrDefault(field, direction);
    return assetTypeClassesRepository
    .getAssetTypeClasses(number, size, sort)
    .flatMap(value => {
      return assetTypeClassesRepository
        .getAssetTypeClassCount()
        .map(count => {
          return responseShaper.shapeAssetTypeClasssResponse("assetTypeClasses",value, number, size, value.length, count, sort);
        });
    });
  };

  this.getAvailableAttributes = function (number, size, field, direction, assignedArray) {
    let sort = getSortOrderOrDefault(field, direction);
    return assetTypeClassesRepository
    .getAvailableAttributes(number, size, sort, assignedArray)
    .flatMap(value => {
      return assetTypeClassesRepository
        .getAvailableAttributeCount()
        .map(count => {
          return responseShaper.shapeAssetTypeClasssResponse("attributes",value, number, size, value.length, count, sort);
        });
    });
  };

  this.getAssignedAttributes = function (number, size, field, direction, assignedArray) {
    let sort = getSortOrderOrDefault(field, direction);
    return assetTypeClassesRepository
    .getAssignAttributes(number, size, sort, assignedArray)
    .flatMap(value => {
      return assetTypeClassesRepository
        .getAvailableAttributeCount()
        .map(count => {
          return responseShaper.shapeAssetTypeClasssResponse("attributes",value, number, size, value.length, count, sort);
        });
    });
  };

  this.getAssetTypeClass = function (assetTypeClassId) {
    return assetTypeClassesRepository.getAssetTypeClass(assetTypeClassId);
  };

  this.getAvailableAttribute = function (attributeId) {
    return assetTypeClassesRepository.getAttribute(attributeId);
  };

  this.saveAssetTypeClass = function (assetTypeClass) {
    return assetTypeClassesRepository.saveAssetTypeClass(assetTypeClass);
  };

  this.saveAvailableAttribute = function (availableAttribute) {
    return assetTypeClassesRepository.saveAvailableAttribute(availableAttribute);
  };

  this.deleteAssetTypeClass = function (assetTypeClassId) {
    return assetTypeClassesRepository.deleteAssetTypeClass(assetTypeClassId);
  };

  this.deleteAvailableAttribute = function (attributeId) {
    return assetTypeClassesRepository.deleteAttribute(attributeId);
  };

  this.updateAssetTypeClass = function (assetTypeClassId, assetTypeClass) {
    return assetTypeClassesRepository.updateAssetTypeClass(assetTypeClassId, assetTypeClass);
  };

  this.updateAvailableAttribute = function (attributeId, attribute) {
    return assetTypeClassesRepository.updateAttribute(attributeId, attribute);
  };

  function getSortOrderOrDefault(field, direction) {
    let sort = {};
    if (field && direction) {
      sort[field] = direction;
      return sort;
    } else {
      return sort;
    }
  }

};
