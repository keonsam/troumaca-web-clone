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

  this.getAssetType = function (assetTypeId) {
    return assetTypesRepository.getAssetType(assetTypeId);
  };

  this.saveAssetType = function (assetType) {
    return assetTypesRepository.saveAssetType(assetType);
  };

  this.deleteAssetType = function (assetTypeId) {
    return assetTypesRepository.deleteAssetType(assetTypeId);
  };

  this.updateAssetType = function (assetTypeId, assetType) {
    return assetTypesRepository.updateAssetType(assetTypeId, assetType);
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
