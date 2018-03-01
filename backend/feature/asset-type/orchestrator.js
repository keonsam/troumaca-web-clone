let assetTypesRepositoryFactory = require('./repository.factory')();
let assetTypesRepository = assetTypesRepositoryFactory.createAssetTypesRepository();
let responseShaper = require("./response.shaper")();

module.exports = function AssetTypesOrchestrator() {

  let that = this;

  this.getAssetTypes = function (number, size, field, direction) {
    let sort = getSortOrderOrDefault(field, direction);
    return assetTypesRepository
    .getAssetTypes(number, size, sort)
    .flatMap(value => {
      return assetTypesRepository
        .getAssetTypeCount()
        .map(count => {
          return responseShaper.shapeAssetTypesResponse(value, number, size, value.length, count, sort);
        });
    });
  };

  this.getAttributes = function(assetTypeClassId) {
    return assetTypesRepository
    .getAssignedAttributes(assetTypeClassId)
    .flatMap(value => {
      return assetTypesRepository
      .getAttributes(value)
      .map(value2 => {
        return responseShaper.shapeAssetTypesResponse2("attributes", value2);
      });
    });
  }

  this.getAssetTypeClassId = function(searchStr, pageSize) {
    return assetTypesRepository
    .getAssetTypeClassId(searchStr, pageSize)
    .map(value => {
      return responseShaper.shapeAssetTypesResponse2("assetTypeClasses", value);
    });
  }

  this.getValues = function(assetTypeId) {
    return assetTypesRepository
    .getValues(assetTypeId)
    .map(value => {
      return responseShaper.shapeAssetTypesResponse2("values", value);
    });
  }

  this.getAssetTypeClass = function (assetTypeClassId) {
    return assetTypesRepository.getAssetTypeClass(assetTypeClassId);
  };

  this.getAssetType = function (assetTypeId) {
    return assetTypesRepository.getAssetType(assetTypeId);
  };

  this.saveAssetType = function (assetType) {
    return assetTypesRepository.saveAssetType(assetType);
  };

  this.saveValue = function (value) {
    return assetTypesRepository.saveValue(value);
  };

  this.deleteAssetType = function (assetTypeId) {
    return assetTypesRepository
    .deleteAssetType(assetTypeId)
    .flatMap(value => {
      return assetTypesRepository.deleteValues(assetTypeId);
    });
  };

  this.deleteValue = function (valueId) {
    return assetTypesRepository.deleteValue(valueId);
  };

  this.updateAssetType = function (assetTypeId, assetType) {
    return assetTypesRepository.updateAssetType(assetTypeId, assetType);
  }

  this.updateValue = function (valueId, value) {
    return assetTypesRepository.updateValue(valueId, value);
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

};
