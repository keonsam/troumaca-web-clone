module.exports =  function RestClientAssetRepository() {
  this.saveAsset = function (assetTypeClass) {
    throw new Error('Options.db is required');
  }
};
