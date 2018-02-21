let DatabaseCredentialRepository = require("./database.repository");
let RestClientRepository = require("./rest.client.repository");

let useDatabase = true;

let CredentialRepositoryFactory = function (options) {

  if (options) {
    useDatabase = options.useDatabase;
  }

  return {
    createCredentiaRepository: function () {
      if (useDatabase) {
        return new DatabaseCredentialRepository();
      } else {
        return new RestClientRepository();
      }
    }
  }
};

let useDatabase2 = true;

const CredentialRepositoryFactory2 = new function () {
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
  CredentialRepositoryFactory,
  CredentialRepositoryFactory2,
};