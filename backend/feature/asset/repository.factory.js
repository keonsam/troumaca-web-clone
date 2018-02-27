let DatabaseAssetRepository = require("./database.repository");
let RestClientRepository = require("./rest.client.repository");

var useDatabase = false;

function assetRepositoryFactory(options) {

  if (options) {
    useDatabase = options.useDatabase;
  }

  return {
    createAssetRepository: function () {
      if (useDatabase) {
        return new DatabaseAssetRepository();
      } else {
        return new RestClientRepository();
      }
    }
  }
}

module.exports = assetRepositoryFactory;
