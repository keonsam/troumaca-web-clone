import Rx from "rxjs";
import validator from 'validator';
import {CredentialStatus} from './credential.status';

import {shapePasswordValidResponse, shapeUsernameValidResponse} from "./credential.response.shaper";
import {Credential} from "./credential";
import {createCredentialRepositoryFactory} from "./credential.repository.factory";
import {CredentialRepository} from "./credential.repository";
import {Result} from "../../result.success";
import {Observable} from "rxjs/Observable";
import {Session} from '../../session/session';
import {createSessionRepositoryFactory} from "../../session/session.repository.factory";
import {SessionRepository} from "../session/session.repository";

export class CredentialOrchestrator {

  private credentialRepository:CredentialRepository;
  private sessionRepository:SessionRepository;

  constructor() {
    this.sessionRepository = createSessionRepositoryFactory();
    this.credentialRepository = createCredentialRepositoryFactory();
  }

  isValidUsername(credential:Credential):Observable<Result<any>> {
    return this.credentialRepository
    .isValidUsername(credential)
    .map(valid => {
      let shapeUsernameValidResp = shapeUsernameValidResponse(valid);
      return new Result(false, "", shapeUsernameValidResp);
    });
  };

  isValidPassword(credential:Credential):Observable<Result<any>> {
    return this.credentialRepository
    .isValidPassword(credential)
    .map(valid => {
      let shapePasswordValidResp = shapePasswordValidResponse(valid);
      return new Result(false, "", shapePasswordValidResp);
    });
  };

  forgotPassword(username:string):Observable<Result<any>> {
    return this.credentialRepository
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
    return this.credentialRepository
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

  authenticate(credential:Credential):Observable<Session> {
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
        if (readCredentialStatus === CredentialStatus.DISABLED) {
          return Rx.Observable.of(readCredential);
        }

        let session:Session = new Session();

        session.partyId = readCredential.partyId ? readCredential.partyId : "";
        session.data.set("credentialId", readCredential.credentialId);
        session.data.set("accountStatus", readCredential.credentialStatus);

        if (!validator.isEmail(readCredential.username)) {
          session.data.set("phone", readCredential.username);
        }

        if (session.partyId || session.accountStatus === CredentialStatus.ACTIVE) {
          return sessionRepository.addSession(session);
        }

        return credentialConfirmationRepository
        .getCredentialConfirmationByCredentialId(readCredential.credentialId)
        .switchMap(credentialConfirmation => {
          // TODO: needs to account for more than one value
          if (credentialConfirmation && credentialConfirmation.credentialConfirmationId) {
            session.data.set("credentialConfirmationId", credentialConfirmation.credentialConfirmationId)
          }

          return sessionRepository.addSession(session);
        });
      });
  };

  createNotFoundError(name) {
    return new Error(JSON.stringify({
      "statusCode":404,
      "message": name + " not found."
    }));
  }

}