import Rx from "rxjs";
import validator from 'validator';
import {CredentialStatus} from './credential.status';
// import credentialRepositoryFactory from './credential.repository.factory').CredentialRepositoryFactory;
// import credentialRepository = credentialRepositoryFactory.createRepository(:
// import credentialConfirmationRepositoryFactory from './credential.confirmation.repository.factory').CredentialConfirmationRepositoryFactory;
// import credentialConfirmationRepository = credentialConfirmationRepositoryFactory.createRepository(:
// import sessionRepositoryFactory from '../session/session.repository.factory').SessionRepositoryFactory;
// import sessionRepository = sessionRepositoryFactory.createRepository(:

import {shapePasswordValidResponse, shapeUsernameValidResponse} from "./credential.response.shaper";
import {Credential} from "./credential";
import {createCredentialRepositoryFactory} from "./credential.repository.factory";
import {CredentialRepository} from "./credential.repository";
import {Result} from "../../result.success";
import {Observable} from "rxjs/Observable";

export class CredentialOrchestrator {

  private credentialRepositoryFactory:CredentialRepository;

  constructor() {
    this.credentialRepositoryFactory = createCredentialRepositoryFactory();
  }

  isValidUsername(credential:Credential):Observable<Result<any>> {
    return this.credentialRepositoryFactory
    .isValidUsername(credential)
    .map(valid => {
      let shapeUsernameValidResp = shapeUsernameValidResponse(valid);
      return new Result(false, "", shapeUsernameValidResp);
    });
  };

  isValidPassword(credential:Credential):Observable<Result<any>> {
    return this.credentialRepositoryFactory
    .isValidPassword(credential)
    .map(valid => {
      let shapePasswordValidResp = shapePasswordValidResponse(valid);
      return new Result(false, "", shapePasswordValidResp);
    });
  };

  forgotPassword(username:string):Observable<Result<any>> {
    return this.credentialRepositoryFactory
    .getCredentialByUsername(username)
    .map(credential => {
      if(!credential) {
        let failUsernameValidResp = shapeUsernameValidResponse(false); // exist of value fasley
        return new Result(false, "", failUsernameValidResp);
      }
      // use here to send text or email with password to user/party.
      let successUsernameValidResp = shapeUsernameValidResponse(true);
      return new Result(false, "", successUsernameValidResp);
    });
  };


  addCredential(credential:Credential):Observable<Credential> {
    return this.credentialRepositoryFactory
      .addCredential(credential)
      .switchMap(credential => {

        let credentialConfirmation = {
          "credentialId":credential.credentialId,
          "createdOn":new Date().getTime(),
          "modifiedOn":new Date().getTime()
        };

        return credentialConfirmationRepository
          .addCredentialConfirmation(credentialConfirmation);

      });
  };

  authenticate(credential:Credential) {
    // A person can access the application under the following conditions:
    // 1. He/she provides a valid set of credentials
    // 2. He/she has confirmed their username (email, or phone)
    // 3. He/she has completed the quick profile, person, account type, and possible organization name.

    return this.credentialRepositoryFactory
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

  verifyCredentialConfirmation(credentialConfirmation) {
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
          return this.credentialRepositoryFactory
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

  saniticeCredentail(readCredential) {
    let readCredentialCopy = readCredential;
    delete readCredentialCopy['password'];
    return readCredential;
  }

  createNotFoundError(name) {
    return new Error(JSON.stringify({
      "statusCode":404,
      "message": name + " not found."
    }));
  }

  confirmationCodeTimeHasExpired(credentialConfirmation) {
    // 1 second * 60 = 1 minute * 20 = 20 minutes
    return credentialConfirmation.createdOn + (20 * 60 * 1000) <= new Date().getTime();
  }

  sendPhoneVerificationCode(credentialConfirmationId) {
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

  sendEmailVerificationCode(credentialConfirmationId) {
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
