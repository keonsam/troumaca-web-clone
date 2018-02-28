let DatabasePartyRepository = require("./database.repository");
let RestClientRepository = require("./rest.client.repository");

var useDatabase = true;

function PartyRepositoryFactory(options) {

  if (options) {
    useDatabase = options.useDatabase;
  }

  return {
    createPartyRepository: function () {
      if (useDatabase) {
        return new DatabasePartyRepository();
      } else {
        return new RestClientRepository();
      }
    }
  }
}

module.exports = PartyRepositoryFactory;
