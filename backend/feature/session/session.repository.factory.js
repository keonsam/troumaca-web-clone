let DatabaseSessionRepository = require("./session.database.repository");
let SessionRestClientRepository = require("./session.rest.client.repository");

let useDatabase = true;

const SessionRepositoryFactory = new function () {
  this.createRepository = function (options) {
    if (options && options.useDatabase) {
      useDatabase = options.useDatabase;
    }

    if (useDatabase) {
      return new DatabaseSessionRepository();
    } else {
      return new SessionRestClientRepository();
    }

  }
};

module.exports = {
  SessionRepositoryFactory
};