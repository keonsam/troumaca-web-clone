let Rx = require("rxjs");
let credentialRepositoryFactory = require('./credential.repository.factory').CredentialRepositoryFactory;
let credentialRepository = credentialRepositoryFactory.createRepository();
let sessionRepositoryFactory = require('../session/session.repository.factory').SessionRepositoryFactory;
let sessionRepository = sessionRepositoryFactory.createRepository();
let responseShaper = require("./credential.response.shaper")();

let CredentialOrchestrator = new function() {


  this.isValidUsername = function (usernameObj) {
    return credentialRepository
    .isValidUsername(usernameObj)
    .map(valid => {
      return responseShaper.shapeUsernameValidResponse(valid)
    });
  };

  this.isValidEditUsername = function (partyId,usernameObj) {
    return credentialRepository
    .isValidEditUsername(partyId,usernameObj)
    .map(valid => {
      return responseShaper.shapeUsernameValidResponse(valid)
    });
  };

  this.isValidCurrentPassword = function (passwordObj) {
    return credentialRepository
    .isValidCurrentPassword(passwordObj)
    .map(valid => {
      return responseShaper.shapePasswordValidResponse(valid)
    });
  };

  this.isValidPassword = function (passwordObj) {
    return credentialRepository
    .isValidPassword(passwordObj)
    .map(valid => {
      return responseShaper.shapePasswordValidResponse(valid)
    });
  };

  this.addCredential = function (credential) {
    return credentialRepository.addCredential(credential);
  };

  this.authenticate = function (credential) {
    return credentialRepository
      .authenticateForCredential(credential)
      .switchMap(readCredential => {
        if (readCredential.credentialId) {
          let session = {};
          session["credentialId"] = readCredential.credentialId;
          return sessionRepository.addSession(session);
        } else {
          return Rx.Observable.of(readCredential);
        }
      });
  };

};

module.exports = CredentialOrchestrator;
