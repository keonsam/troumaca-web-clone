let assetRepositoryFactory = require('./repository.factory')();
let assetRepository = assetRepositoryFactory.createAssetRepository();

module.exports = function AssetOrchestrator() {

  let that = this;
  this.saveAsset = function (asset) {
    return assetRepository.saveAsset(asset);
  };

  this.getAssets = function (pagination) {
   return assetRepository.getAssets(pagination);
  };

};
