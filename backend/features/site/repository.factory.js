let DatabaseSiteRepository = require("./database.repository");
let RestClientRepository = require("./rest.client.repository");

var useDatabase;

function SiteRepositoryFactory(options) {

  if (options) {
    useDatabase = options.useDatabase;
  }

  return {
    createSiteRepository: function (Site) {
      if (useDatabase) {
        return new DatabaseSiteRepository();
      } else {
        return new RestClientRepository();
      }
    }
  }
}

module.exports = SiteRepositoryFactory;
