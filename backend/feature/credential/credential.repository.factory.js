let DatabaseCredentialRepository = require("./credential.database.repository");
let RestClientRepository = require("./credential.rest.client.repository");

let useDatabase2 = true;

const CredentialRepositoryFactory = new function () {
  this.createRepository = function (options) {
    if (options && options.useDatabase) {
      useDatabase2 = options.useDatabase;
    }

    if (useDatabase2) {
      return new DatabaseCredentialRepository();
    } else {
      return new RestClientRepository();
    }

  }
};

module.exports = {
  CredentialRepositoryFactory
};