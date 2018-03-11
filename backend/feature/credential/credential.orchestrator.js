let Rx = require("rxjs");
let validator = require('validator');
let credentialRepositoryFactory = require('./credential.repository.factory').CredentialRepositoryFactory;
let credentialRepository = credentialRepositoryFactory.createRepository();
let credentialConfirmationRepositoryFactory = require('./credential.confirmation.repository.factory').CredentialConfirmationRepositoryFactory;
let credentialConfirmationRepository = credentialConfirmationRepositoryFactory.createRepository();
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
    return credentialRepository
      .addCredential(credential)
      .switchMap(credential => {
        let credentialConfirmation = {};
        credentialConfirmation["credentialId"] = credential.credentialId;
        credentialConfirmation["createdOn"] = new Date().getTime();
        credentialConfirmation["modifiedOn"] = new Date().getTime();
        return credentialConfirmationRepository
          .addCredentialConfirmation(credentialConfirmation);
      });
  };

  this.authenticate = function (credential) {
    return credentialRepository
      .authenticateCredential(credential)
      .switchMap(readCredential => {
        if (!readCredential) {
          return Rx.Observable.of(readCredential);
        }

        let session = {};
        session["credentialId"] = readCredential.credentialId;
        session["partyId"] = readCredential.partyId ? readCredential.partyId : "";
        session["accountStatus"] = readCredential.status;

        if (!validator.isEmail(readCredential.username)) {
          session["phone"] = readCredential.username;
        }

        if (session.partyId || session.accountStatus === "confirmed") {
          return sessionRepository.addSession(session);
        }

        return credentialConfirmationRepository
        .getCredentialConfirmationByCredentialId(readCredential.credentialId)
        .switchMap(credentialConfirmation => {
          // TODO: needs to account for more than one value
          if (credentialConfirmation && credentialConfirmation.credentialConfirmationId) {
            session["credentialConfirmationId"] = credentialConfirmation.credentialConfirmationId;
          }

          return sessionRepository.addSession(session);
        });
      });
  };

  this.verifyCredentialConfirmation = function (credentialConfirmation) {
    console.log(credentialConfirmation);
    let credentialConfirmationId = credentialConfirmation["credentialConfirmationId"];
    let confirmationCode = credentialConfirmation["confirmationCode"];
    return credentialConfirmationRepository
      .getCredentialConfirmationByCode(credentialConfirmationId, confirmationCode)
      .switchMap(credentialConfirmation => {

        if (!credentialConfirmation) {
          credentialConfirmation = {};
          return Rx.Observable.of(credentialConfirmation);
        }

        console.log(credentialConfirmation);

        let credentialConfirmationStatus = credentialConfirmation["status"];

        if (credentialConfirmationStatus === "confirmed" ||
            credentialConfirmationStatus === "expired") {

          return Rx.Observable.of(credentialConfirmation);

        } else if (this.hasNotExpired(credentialConfirmation)) {

          credentialConfirmation["status"] = "expired";
          credentialConfirmation["expirationDate"] = new Date().getTime();

          return credentialConfirmationRepository
          .updateCredentialConfirmation(credentialConfirmation)
          .map(numReplaced => {
            if (numReplaced){
              return credentialConfirmation;
            }

            return numReplaced;
          });

        } else {

          credentialConfirmation["status"] = "confirmed";
          credentialConfirmation["expirationDate"] = new Date().getTime();

          let credentialId = credentialConfirmation["credentialId"];

          return credentialRepository
          .updateCredentialStatusById(credentialId, "confirmed")
          .switchMap(credential => {

            if (!credential) {
              return Rx.Observable.of(credential);
            }

            return credentialConfirmationRepository
            .updateCredentialConfirmation(credentialConfirmation)
            .map(numReplaced => {
              if (numReplaced){
                return credentialConfirmation;
              }
              return numReplaced;
            });

          });
        }

      });
  };

  this.hasNotExpired = function (credentialConfirmation) {
    // 1 second * 60 = 1 minute * 20 = 20 minutes
    return credentialConfirmation.createdOn + (20 * 60 * 1000) <= new Date().getTime();
  };

  this.sendPhoneVerificationCode = function (credentialConfirmationId) {
    return credentialConfirmationRepository
    .getCredentialConfirmationById(credentialConfirmationId)
    .switchMap(credentialConfirmation => {
      if(credentialConfirmation) {
        if (credentialConfirmation.status === "confirmed") {
          return Rx.Observable.of(credentialConfirmation);
        }else if(credentialConfirmation.createdOn + (20 * 60 * 1000) >= new Date().getTime()) {
          credentialConfirmation["status"] = "expired";
          return credentialConfirmationRepository
          .updateCredentialConfirmation(credentialConfirmation)
          .switchMap(numReplaced => { //this is so to make the old links still work.
            if(numReplaced){
              credentialConfirmation["createdOn"] = new Date().getTime();
              credentialConfirmation["modifiedOn"] = new Date().getTime();
              return credentialConfirmationRepository.addCredentialConfirmation(credentialConfirmation);
            }
            return Rx.Observable.of(numReplaced);
          });
        }
      }else {
        return Rx.Observable.of(credentialConfirmation);
      }
    });
  };

  this.sendEmailVerificationCode = function (credentialConfirmationId) {
    return credentialConfirmationRepository
    .getCredentialConfirmationById(credentialConfirmationId)
    .switchMap(credentialConfirmation => {
      if(credentialConfirmation) {
        if(credentialConfirmation.status === "confirmed") {
          return Rx.Observable.of(credentialConfirmation);
        }else if(credentialConfirmation.createdOn + (20 * 60 * 1000) >= new Date().getTime()) {
          credentialConfirmation["status"] = "expired";
          return credentialConfirmationRepository
          .updateCredentialConfirmationStatus(credentialConfirmation)
          .switchMap(numReplaced => { //this is so to make the old links still work.
            if(numReplaced){
              credentialConfirmation["createdOn"] = new Date().getTime();
              credentialConfirmation["modifiedOn"] = new Date().getTime();
              return credentialConfirmationRepository.addCredentialConfirmation(credentialConfirmation);
            }
            return Rx.Observable.of(numReplaced);
          });
        }
      }else {
        return Rx.Observable.of(credentialConfirmation);
      }
    });
  };

};

module.exports = CredentialOrchestrator;
