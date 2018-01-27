let assetTypeClassesRepositoryFactory = require('./repository.factory')();
let assetTypeClassesRepository = assetTypeClassesRepositoryFactory.createAssetRepository();

module.exports = function AssetTypeClassesOrchestrator() {

  let that = this;

  this.saveAssetTypeClass = function (assetTypeClass) {
    return assetTypeClassesRepository.saveAssetTypeClass(assetTypeClass);
  };

  this.getAssetTypeClass = function (assetTypeClassId) {
    return assetTypeClassesRepository.getAssetTypeClass(assetTypeClassId);
  };

  this.getAssetTypeClasses = function (pagination) {
   return assetTypeClassesRepository.getAssetTypeClasses(pagination);
  };

  this.deleteAssetTypeClass = function (assetTypeClassId) {
    return assetTypeClassesRepository.deleteAssetTypeClass(assetTypeClassId);
  };
  
};
