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

  this.authenticateSMSCode = function (phoneUUID,smsCode) {
    return credentialRepository
    .getSMSCode(phoneUUID,smsCode)
    .switchMap(doc => {
      if(doc) {
        return credentialRepository.deleteSMSCode(phoneUUID)
        .map(numRemoved =>{
          if(numRemoved){
            credentialRepository.generateConfirmedCredential(doc.credentialId);
            return true;
          }else {
            return false;
          }
        });
      }else{
        return Rx.Observable.of(false);
      }
    });
  };

  this.authenticateEmailCode = function (emailUUID,emailCode) {
    return credentialRepository
    .getEmailCode(emailUUID,emailCode)
    .switchMap(doc => {
      if(doc) {
        return credentialRepository.deleteEmailCode(emailUUID)
        .map(numRemoved => {
          if(numRemoved){
            credentialRepository.generateConfirmedCredential(doc.credentialId);
            return true;
          }else {
            return false;
          }
        });
      }else{
        return Rx.Observable.of(false);
      }
    });
  };

  this.generateEmailUUID = function (credentialId) {
    return credentialRepository.generateEmailUUID(credentialId);
  };

  this.generatePhoneUUID = function (credentialId) {
    return credentialRepository.generatePhoneUUID(credentialId);
  };

  this.sendPhoneCode = function (phoneUUID) {
    return credentialRepository.updatePhoneUUID(phoneUUID);
  };

  this.sendEmailCode = function (emailUUID) {
    return credentialRepository.updateEmailUUID(emailUUID);
  };

  this.newPhoneUUID = function (phoneNumber) {
    return credentialRepository
    .getCredentialByUsername(phoneNumber)
    .switchMap(doc => {
      if(doc) {
        return credentialRepository.generatePhoneUUID(doc.credentialId);
      }else{
        return Rx.Observable.of(false);
      }
    });
  }

  this.newEmailUUID = function (emailAddress) {
    return credentialRepository
    .getCredentialByUsername(emailAddress)
    .switchMap(doc => {
      if(doc) {
        return credentialRepository.generateEmailUUID(doc.credentialId);
      }else{
        return Rx.Observable.of(false);
      }
    });
  }


};

module.exports = CredentialOrchestrator;
