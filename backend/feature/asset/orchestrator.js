let assetRepositoryFactory = require('./repository.factory')();
let assetRepository = assetRepositoryFactory.createAssetRepository();
let responseShaper = require("./response.shaper")();


module.exports = function AssetOrchestrator() {

  let that = this;
  this.saveAsset = function (asset) {
    return assetRepository.saveAsset(asset);
  };

  this.getAssets = function (number, size, field, direction) {
    let sort = getSortOrderOrDefault(field, direction);
    return assetRepository
    .getAssets(number, size, sort)
    .flatMap(value => {
      return assetRepository
        .getAssetCount()
        .map(count => {
          return responseShaper.shapeAssetsResponse(value, number, size, value.length, count, sort);
        });
    });
  };

  this.getAssetKinds = function() {
    return assetRepository
    .getAssetKinds()
    .map(value => {
      return responseShaper.shapeAssetsResponse2("assetKinds", value);
    });
  }

  this.getAssetTypes = function(searchStr, pageSize) {
    return assetRepository
    .getAssetTypes(searchStr, pageSize)
    .map(value => {
      return responseShaper.shapeAssetsResponse2("assetTypes", value);
    });
  }

  this.getUnionOfPhysicalSites = function(searchStr, pageSize) {
    return assetRepository
    .getUnionOfPhysicalSites(searchStr, pageSize)
    .map(value => {
      return responseShaper.shapeAssetsResponse2("unionOfPhysicalSites", value);
    });
  }

  this.getUnitOfMeasures = function(searchStr, pageSize) {
    return assetRepository
    .getUnitOfMeasures(searchStr, pageSize)
    .map(value => {
      return responseShaper.shapeAssetsResponse2("unitOfMeasures", value);
    });
  }

  this.getPersons = function(searchStr, pageSize) {
    return assetRepository
    .getPersons(searchStr, pageSize)
    .map(value => {
      return responseShaper.shapeAssetsResponse2("persons", value);
    });
  }

  this.getAssetById = function (assetId) {
    return assetRepository.getAssetById(assetId);
  }

  this.updateAsset = function (assetId, asset) {
    return assetRepository.updateAsset(assetId, asset);
  }

  this.deleteAsset = function (assetId) {
    return assetRepository.deleteAsset(assetId);
  };

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
