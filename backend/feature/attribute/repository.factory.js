let DatabaseAttributeRepository = require("./database.repository");
let RestClientRepository = require("./rest.client.repository");

var useDatabase = true;

function AttributeRepositoryFactory(options) {

  if (options) {
    useDatabase = options.useDatabase;
  }

  return {
    createAttributeRepository: function () {
      if (useDatabase) {
        return new DatabaseAttributeRepository();
      } else {
        return new RestClientRepository();
      }
    }
  }
}

module.exports = AttributeRepositoryFactory;
