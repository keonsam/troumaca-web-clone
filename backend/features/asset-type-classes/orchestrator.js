let assetTypeClassesRepositoryFactory = require('./repository.factory')();
let assetTypeClassesRepository = assetTypeClassesRepositoryFactory.createAssetRepository();

module.exports = function AssetTypeClassesOrchestrator() {

  let that = this;
  this.saveAssetTypeClass = function (assetTypeClass) {
    return assetTypeClassesRepository.saveAssetTypeClass(assetTypeClass);
  };

  this.getAssetTypeClasses = function (pagination) {
   return assetTypeClassesRepository.getAssetTypeClasses(pagination);
  };

  this.deleteAssetTypeClass = function (id) {
    return assetTypeClassesRepository.deleteAssetTypeClass(id);
  }
};
