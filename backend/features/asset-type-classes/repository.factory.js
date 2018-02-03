let DatabaseAssetRepository = require("./database.repository");
let RestClientRepository = require("./rest.client.repository");

var useDatabase = true;

function assetTypeClassesRepositoryFactory(options) {

  if (options) {
    useDatabase = options.useDatabase;
  }

  return {
    createAssetRepository: function (assetTypeClass) {
      if (useDatabase) {
        return new DatabaseAssetRepository();
      } else {
        return new RestClientRepository();
      }
    }
  }
}

module.exports = assetTypeClassesRepositoryFactory;
