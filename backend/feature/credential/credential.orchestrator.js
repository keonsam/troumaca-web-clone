let Rx = require("rxjs");
let validator = require('validator');
let status = require('./credential.status');
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

  this.isValidPassword = function (passwordObj) {
    return credentialRepository
    .isValidPassword(passwordObj)
    .map(valid => {
      return responseShaper.shapePasswordValidResponse(valid)
    });
  };

  this.forgotPassword = function (username) {
    return credentialRepository
    .getCredentialByUsername(username)
    .map(credential => {
      if(!credential) {
        return responseShaper.shapeUsernameValidResponse(false); // exist of value fasley
      }
      // use here to send text or email with password to user/party.
      return responseShaper.shapeUsernameValidResponse(true);
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
    // A person can access the application under the following conditions:
    // 1. He/she provides a valid set of credentials
    // 2. He/she has confirmed their username (email, or phone)
    // 3. He/she has completed the quick profile, person, account type, and possible organization name.

    return credentialRepository
      .getCredentialByUsername(credential.username)
      .switchMap(readCredential => {

        // unable to find the credential specified
        if (!readCredential) {
          return Rx.Observable.throw(createNotFoundError("Credential"));
        }

        let readCredentialStatus = readCredential["status"];

        // do not continue if the status is not active
        if (readCredentialStatus === status.DISABLED) {
          return Rx.Observable.of(saniticeCredentail(readCredential));
        }

        let session = {};
        session["credentialId"] = readCredential.credentialId;
        session["partyId"] = readCredential.partyId ? readCredential.partyId : "";
        session["accountStatus"] = readCredential.status;

        if (!validator.isEmail(readCredential.username)) {
          session["phone"] = readCredential.username;
        }

        if (session.partyId || session.accountStatus === status.ACTIVE) {
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
    let credentialConfirmationId = credentialConfirmation.credentialConfirmationId;
    let confirmationCode = credentialConfirmation.confirmationCode;

    return credentialConfirmationRepository
      .getCredentialConfirmationByCode(credentialConfirmationId, confirmationCode)
      .switchMap(credentialConfirmation => {

        if (!credentialConfirmation) {
          // return an error if the credential confirmation is not found.
          return Rx.Observable.throw(createNotFoundError("CredentialConfirmation"));
        }

        // we have a credential confirmation so let's get the status as it will be used multiple times.
        let credentialConfirmationStatus = credentialConfirmation["status"];

        // if the credential is confirmed
        if (credentialConfirmationStatus === status.CONFIRMED) {
          return Rx.Observable.of(credentialConfirmation);
        }

        // if the credential confirmation is expired then return the credential confirmation
        if (credentialConfirmationStatus === status.EXPIRED) {
          return Rx.Observable.of(credentialConfirmation);
        }

        // if the confirmation time has expired
        if (confirmationCodeTimeHasExpired(credentialConfirmation)) {
          credentialConfirmation["status"] = status.EXPIRED;

          // update the credential confirmation status to expired
          return credentialConfirmationRepository
          .updateCredentialConfirmation(credentialConfirmation)
          .map(numReplaced => {
            if (numReplaced > 0) {
              return credentialConfirmation;
            } else {
              return Rx.Observable.throw(createNotFoundError("CredentialConfirmation"));
            }
          });
        }

        if (credentialConfirmationStatus === status.NEW) {
          return credentialRepository
          .updateCredentialStatusById(credentialConfirmation.credentialId, status.ACTIVE)
          .switchMap(numReplaced => {
            if(numReplaced) {
              credentialConfirmation["status"] = status.CONFIRMED;
              return credentialConfirmationRepository
              .updateCredentialConfirmation(credentialConfirmation)
              .map(numReplaced => {
                if(numReplaced) {
                  return credentialConfirmation
                }else {
                  return Rx.Observable.of(numReplaced)
                }
              });
            }else {
              return Rx.Observable.of(numReplaced);
            }
          });
        } else {
          // handles the very remote case where the credential confirmation has not status
          return handleCredentialConfirmationUnknownStatus(credentialConfirmation);
        }

    });
  };

  function saniticeCredentail(readCredential) {
    let readCredentialCopy = readCredential;
    delete readCredentialCopy['password'];
    return readCredential;
  }

  function createNotFoundError(name) {
    return new Error(JSON.stringify({
      "statusCode":404,
      "message": name + " not found."
    }));
  }

  function confirmationCodeTimeHasExpired(credentialConfirmation) {
    // 1 second * 60 = 1 minute * 20 = 20 minutes
    return credentialConfirmation.createdOn + (20 * 60 * 1000) <= new Date().getTime();
  }

  this.sendPhoneVerificationCode = function (credentialConfirmationId) {
    return credentialConfirmationRepository
    .getCredentialConfirmationById(credentialConfirmationId)
    .switchMap(credentialConfirmation => {
      if(credentialConfirmation) {
        if (credentialConfirmation.status === status.CONFIRMED) {
          return Rx.Observable.of(credentialConfirmation);
        }else if(confirmationCodeTimeHasExpired(credentialConfirmation)) {
          credentialConfirmation["status"] = status.EXPIRED;
          return credentialConfirmationRepository
          .updateCredentialConfirmation(credentialConfirmation)
          .switchMap(numReplaced => { //this is so to make the old links still work.
            if(numReplaced){
              credentialConfirmation["createdOn"] = new Date().getTime();
              credentialConfirmation["modifiedOn"] = new Date().getTime();
              delete credentialConfirmation["_id"];
              return credentialConfirmationRepository.addCredentialConfirmation(credentialConfirmation);
            }
            return Rx.Observable.of(numReplaced);
          });
        }else {
          return Rx.Observable.of(credentialConfirmation);
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
        if(credentialConfirmation.status === status.CONFIRMED) {
          return Rx.Observable.of(credentialConfirmation);
        }else if(confirmationCodeTimeHasExpired(credentialConfirmation)) {
          credentialConfirmation["status"] = status.EXPIRED;
          return credentialConfirmationRepository
          .updateCredentialConfirmation(credentialConfirmation)
          .switchMap(numReplaced => { //this is so to make the old links still work.
            if(numReplaced){
              credentialConfirmation["createdOn"] = new Date().getTime();
              credentialConfirmation["modifiedOn"] = new Date().getTime();
              delete credentialConfirmation["_id"];
              return credentialConfirmationRepository.addCredentialConfirmation(credentialConfirmation);
            }
            return Rx.Observable.of(numReplaced);
          });
        }else {
          return Rx.Observable.of(credentialConfirmation);
        }
      }else {
        return Rx.Observable.of(credentialConfirmation);
      }
    });
  };
};

module.exports = CredentialOrchestrator;
