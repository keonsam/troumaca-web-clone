let DatabaseAssetTypesRepository = require("./database.repository");
let RestClientRepository = require("./rest.client.repository");

var useDatabase = true;

function AssetTypesRepositoryFactory(options) {

  if (options) {
    useDatabase = options.useDatabase;
  }

  return {
    createAssetTypesRepository: function () {
      if (useDatabase) {
        return new DatabaseAssetTypesRepository();
      } else {
        return new RestClientRepository();
      }
    }
  }
}

module.exports = AssetTypesRepositoryFactory;
