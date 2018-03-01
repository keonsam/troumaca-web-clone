let validator = require('validator');
let libphonenumberjs = require('libphonenumber-js');
let Rx = require("rxjs");
let credentialRepositoryFactory = require('./repository.factory').CredentialRepositoryFactory2;
let credentialRepository = credentialRepositoryFactory.createRepository();
let responseShaper = require("./response.shaper")();

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
    return credentialRepository.authenticate(credential);
  };

};

module.exports = CredentialOrchestrator;
