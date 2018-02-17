let DatabaseShipmentRepository = require("./database.repository");
let RestClientRepository = require("./rest.client.repository");

var useDatabase = true;

function ShipmentRepositoryFactory(options) {

  if (options) {
    useDatabase = options.useDatabase;
  }

  return {
    createShipmentRepository: function () {
      if (useDatabase) {
        return new DatabaseShipmentRepository();
      } else {
        return new RestClientRepository();
      }
    }
  }
}

module.exports = ShipmentRepositoryFactory;
