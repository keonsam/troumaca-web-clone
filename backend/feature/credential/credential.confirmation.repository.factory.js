let DatabaseCredentialConfirmationRepository = require("./credential.confirmation.database.repository");
let CredentialConfirmationRestClientRepository = require("./credential.confirmation.rest.client.repository");

let useDatabase2 = true;

const CredentialConfirmationRepositoryFactory = new function () {
  this.createRepository = function (options) {
    if (options && options.useDatabase) {
      useDatabase2 = options.useDatabase;
    }

    if (useDatabase2) {
      return new DatabaseCredentialConfirmationRepository();
    } else {
       return new CredentialConfirmationRestClientRepository();
    }

  }
};

module.exports = {
  CredentialConfirmationRepositoryFactory
};