let Rx = require("rxjs");

module.exports =  function DatabaseAssetRepository() {

  this.saveAsset = function (asset) {
    return Rx.Observable.of({
      assetId:"1231"
    });
  }
};