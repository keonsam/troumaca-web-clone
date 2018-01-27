let assetRepositoryFactory = require('./repository.factory')();
let assetRepository = assetRepositoryFactory.createAssetRepository();

module.exports = function AssetOrchestrator() {

  let that = this;
  this.saveAssetTypeClass = function (assetTypeClass) {
    return assetRepository.saveAssetTypeClass(assetTypeClass);
  };

  this.getAssetTypeClasses = function (pagination) {
   return assetRepository.getAssetTypeClasses(pagination);
  };

};
