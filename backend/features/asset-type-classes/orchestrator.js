let assetTypeClassesRepositoryFactory = require('./repository.factory')();
let assetTypeClassesRepository = assetTypeClassesRepositoryFactory.createAssetRepository();
let responseShaper = require("./response.shaper")();

module.exports = function AssetTypeClassesOrchestrator() {

  let that = this;

  this.getAssetTypeClasses = function (number, size, field, direction) {
    let sort = getSortOrderOrDefault(field, direction);
    return assetTypeClassesRepository
    .getAssetTypeClasses(number, size, sort)
    .flatMap(value => {
      return assetTypeClassesRepository
        .getAssetTypeClassCount()
        .map(count => {
          return responseShaper.shapeAssetTypeClasssResponse(value, number, size, value.length, count, sort);
        });
    });
  };

  this.getAssetTypeClass = function (assetTypeClassId) {
    return assetTypeClassesRepository.getAssetTypeClass(assetTypeClassId);
  };

  this.saveAssetTypeClass = function (assetTypeClass) {
    return assetTypeClassesRepository.saveAssetTypeClass(assetTypeClass);
  };

  this.deleteAssetTypeClass = function (assetTypeClassId) {
    return assetTypeClassesRepository.deleteAssetTypeClass(assetTypeClassId);
  };

  this.updateAssetTypeClass = function (assetTypeClassId, assetTypeClass) {
    return assetTypeClassesRepository.updateAssetTypeClass(assetTypeClassId, assetTypeClass);
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
