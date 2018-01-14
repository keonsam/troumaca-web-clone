module.exports =  function RestClientAssetRepository() {
  this.saveAsset = function (asset) {
    throw new Error('Options.db is required');
  }
};