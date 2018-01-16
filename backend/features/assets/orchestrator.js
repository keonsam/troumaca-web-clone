let assetRepositoryFactory = require('./repository.factory')();
let assetRepository = assetRepositoryFactory.createAssetRepository();

module.exports = function AssetOrchestrator() {

  var that = this;
  this.saveAsset = function (asset) {
    return assetRepository.saveAsset();
  };

  this.getAssets = function () {

  };

};