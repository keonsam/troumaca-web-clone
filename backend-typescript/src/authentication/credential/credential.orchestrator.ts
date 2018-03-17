import Rx from "rxjs";
import validator from 'validator';
import {CredentialStatus} from './credential.status';
import {ValidateResponse} from "./validate.response";

import {Credential} from "./credential";
import {createCredentialRepositoryFactory} from "./credential.repository.factory";
import {CredentialRepository} from "./credential.repository";
import {Observable} from "rxjs/Observable";
import {Session} from "../../session/session";
import {createSessionRepositoryFactory} from "../../session/session.repository.factory";
import {createCredentialConfirmationRepositoryFactory} from "./confirmation/confirmation.repository.factory";
import {SessionRepository} from "../../session/session.repository";
import {ConfirmationRepository} from "./confirmation/confirmation.repository";
import {CredentialConfirmation} from "./confirmation/credential.confirmation";
import {AuthenticateResponse} from "./authenticate.response";

export class CredentialOrchestrator {

  private credentialRepository:CredentialRepository;
  private sessionRepository:SessionRepository;
  private confirmationRepository:ConfirmationRepository;

  constructor() {
    this.sessionRepository = createSessionRepositoryFactory();
    this.credentialRepository = createCredentialRepositoryFactory();
    this.confirmationRepository = createCredentialConfirmationRepositoryFactory();
  }

  isValidUsername(credential:Credential):Observable<ValidateResponse> {
    return this.credentialRepository
    .isValidUsername(credential)
    .map(valid => {
      return new ValidateResponse(valid);
    });
  };

  isValidPassword(credential:Credential):Observable<ValidateResponse> {
    return this.credentialRepository
    .isValidPassword(credential)
    .map(valid => {
      return new ValidateResponse(valid);
    });
  };

  forgotPassword(username:string):Observable<ValidateResponse> {
    return this.credentialRepository
    .getCredentialByUsername(username)
    .map(credential => {
      if(!credential) {
        return new ValidateResponse(false);
      } else {
        return new ValidateResponse(true);
      }
    });
  };


  addCredential(credential:Credential):Observable<CredentialConfirmation> {
    return this.credentialRepository
      .addCredential(credential)
      .switchMap(credential => {

        let credentialConfirmation:CredentialConfirmation = new CredentialConfirmation();

        credentialConfirmation.credentialId = credential.credentialId;
        credentialConfirmation.createdOn = new Date();
        credentialConfirmation.modifiedOn = new Date();

        return this.confirmationRepository
          .addCredentialConfirmation(credentialConfirmation);

      });
  };

  authenticate(credential:Credential):Observable<AuthenticateResponse> {
    // A person can access the application under the following conditions:
    // 1. He/she provides a valid set of credentials
    // 2. He/she has confirmed their username (email, or phone)
    // 3. He/she has completed the quick profile, person, account type, and possible organization name.

    return this.credentialRepository
      .getSanitizeCredentialByUsername(credential.username)
      .switchMap((readCredential:Credential) => {

        // unable to find the credential specified
        if (!readCredential) {
          return Rx.Observable.throw(this.createNotFoundError("Credential"));
        }

        let readCredentialStatus = readCredential.credentialStatus;

        // do not continue if the status is not active
        if (readCredentialStatus !== CredentialStatus.ACTIVE) {
          return Rx.Observable.of(new AuthenticateResponse(false, false, readCredential));
        }

        if (!readCredential.partyId) {
          return Rx.Observable.of(new AuthenticateResponse(false, readCredential));
        }

        let session:Session = new Session();

        session.partyId = readCredential.partyId ? readCredential.partyId : null;
        session.data.set("credentialId", readCredential.credentialId);
        session.data.set("credentialStatus", readCredential.credentialStatus);

        if (!validator.isEmail(readCredential.username)) {
          session.data.set("phone", readCredential.username);
        }

        if (readCredential.partyId || readCredential.credentialStatus === CredentialStatus.ACTIVE) {
          return this.sessionRepository
            .addSession(session)
            .map(value => {
              return new AuthenticateResponse(false, readCredential, value);
            });
        }

      });
  };

  createNotFoundError(name) {
    return new Error(JSON.stringify({
      "statusCode":404,
      "message": name + " not found."
    }));
  }

}