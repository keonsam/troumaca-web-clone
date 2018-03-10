let sessionRepositoryFactory = require('./session.repository.factory').SessionRepositoryFactory;
let sessionRepository = sessionRepositoryFactory.createRepository();
let responseShaper = require("./session.response.shaper")();

let SessionOrchestrator = new function() {

  this.isValidSession = function (sessionId) {
    return sessionRepository
    .isValidSession(sessionId)
    .map(valid => {
      return responseShaper.shapeSessionResponse(valid)
    });
  };

  this.getSimpleSession = function (sessionId) {
    // Todo: Need to verify.
    return sessionRepository
    .getSessionById(sessionId)
    .map(valid => {
      return responseShaper.shapeSessionResponse(valid)
    });
  }

};

module.exports = SessionOrchestrator;