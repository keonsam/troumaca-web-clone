import Rx from "rxjs";
import {createCredentialConfirmationRepositoryFactory} from "./confirmation.repository.factory";
import {ConfirmationRepository} from "./confirmation.repository";
import {Observable} from "rxjs/Observable";
import {createCredentialRepositoryFactory} from "../credential.repository.factory";
import {CredentialRepository} from "../credential.repository";
import {CredentialConfirmation} from "./credential.confirmation";
import {CredentialStatus} from "../credential.status";
import {Result} from "../../../result.success";

export class ConfirmationOrchestrator {

  private confirmationRepository:ConfirmationRepository;
  private credentialRepository:CredentialRepository;

  constructor() {
    this.confirmationRepository = createCredentialConfirmationRepositoryFactory();
    this.credentialRepository = createCredentialRepositoryFactory();
  }


  verifyCredentialConfirmation(credentialConfirmation:CredentialConfirmation):Observable<Result<CredentialConfirmation>> {
    let credentialConfirmationId = credentialConfirmation.credentialConfirmationId;
    let confirmationCode = credentialConfirmation.confirmationCode;

    return this.confirmationRepository
      .getCredentialConfirmationByCode(credentialConfirmationId, confirmationCode)
      .switchMap((credentialConfirmation:CredentialConfirmation) => {

        if (!credentialConfirmation) {
          // return an error if the credential confirmation is not found.
          return Rx.Observable.throw(this.createNotFoundError("CredentialConfirmation"));
        }

        // we have a credential confirmation so let's get the status as it will be used multiple times.
        let credentialConfirmationStatus = credentialConfirmation.credentialStatus;

        // if the credential is confirmed
        if (credentialConfirmationStatus === CredentialStatus.CONFIRMED) {
          return Rx.Observable.of(new Result<CredentialConfirmation>(true, "Already Confirmed.", credentialConfirmation));
        }

        // if the credential confirmation is expired then return the credential confirmation
        if (credentialConfirmationStatus === CredentialStatus.EXPIRED) {
          return Rx.Observable.of(new Result<CredentialConfirmation>(true, "Expired", credentialConfirmation));
        }

        // if the confirmation time has expired
        if (this.confirmationCodeTimeHasExpired(credentialConfirmation)) {
          credentialConfirmation.credentialStatus = CredentialStatus.EXPIRED;

          // update the credential confirmation status to expired
          return this.confirmationRepository
            .updateCredentialConfirmation(credentialConfirmation)
            .map(numReplaced => {
              if (numReplaced > 0) {
                return new Result<CredentialConfirmation>(true, "Expired", credentialConfirmation);
              } else {
                return Rx.Observable.throw(this.createNotFoundError("CredentialConfirmation"));
              }
            });
        }

        return this.credentialRepository
          .updateCredentialStatusById(credentialConfirmation.credentialId, CredentialStatus.ACTIVE)
          .switchMap(numReplaced => {
            if (numReplaced > 0) {
              credentialConfirmation.credentialStatus = CredentialStatus.CONFIRMED;
              return this.confirmationRepository
                .updateCredentialConfirmation(credentialConfirmation)
                .map(numReplaced => {
                  if(numReplaced > 0) {
                    return new Result<CredentialConfirmation>(false, "Confirmed", credentialConfirmation);
                  } else {
                    return new Result<CredentialConfirmation>(true, "Confirmation update failed.", credentialConfirmation);
                  }
                });
            } else {
              return Observable.of(new Result<CredentialConfirmation>(true, "Credential update failed.", credentialConfirmation));
            }
          });

      });
  };

  confirmationCodeTimeHasExpired(credentialConfirmation:CredentialConfirmation):boolean {
    // 1 second * 60 = 1 minute * 20 = 20 minutes
    let createdOnTime:number = 0;

    if (credentialConfirmation.createdOn) {
      createdOnTime = credentialConfirmation.createdOn.getTime();
    }

    return createdOnTime + (20 * 60 * 1000) <= new Date().getTime();
  }

  sendPhoneVerificationCode(credentialConfirmationId:string):Observable<Result<CredentialConfirmation>> {
    return this.confirmationRepository
      .getCredentialConfirmationById(credentialConfirmationId)
      .switchMap((credentialConfirmation:CredentialConfirmation) => {
        if (credentialConfirmation && credentialConfirmation.credentialStatus === CredentialStatus.CONFIRMED) {
          return Rx.Observable.of(new Result<CredentialConfirmation>(false, "Confirmed previously", credentialConfirmation));
        } else if (this.confirmationCodeTimeHasExpired(credentialConfirmation)) {
          credentialConfirmation.credentialStatus = CredentialStatus.EXPIRED;
          return this.confirmationRepository
            .updateCredentialConfirmation(credentialConfirmation)
            .switchMap(numReplaced => { //this is so to make the old links still work.
              if(numReplaced > 0) {
                credentialConfirmation.createdOn = new Date();
                credentialConfirmation.modifiedOn = new Date();
                return this.confirmationRepository
                  .addCredentialConfirmation(credentialConfirmation)
                  .map((credentialConfirmation:CredentialConfirmation) => {
                    return new Result<CredentialConfirmation>(false, "Updated", credentialConfirmation);
                  });
              } else {
                return Rx.Observable.of(new Result<CredentialConfirmation>(true, "Failed update", credentialConfirmation));
              }
            });
        } else {
          return Rx.Observable.of(new Result<CredentialConfirmation>(true, "Invalid Status", credentialConfirmation));
        }
      });
  }

  sendEmailVerificationCode(credentialConfirmationId:string):Observable<Result<CredentialConfirmation>> {
    return this.confirmationRepository
      .getCredentialConfirmationById(credentialConfirmationId)
      .switchMap((credentialConfirmation:CredentialConfirmation) => {
        if (credentialConfirmation) {
          if (credentialConfirmation.credentialStatus === CredentialStatus.CONFIRMED) {
            return Rx.Observable.of(new Result<CredentialConfirmation>(false, "Confirmed previously", credentialConfirmation));
          } else if(this.confirmationCodeTimeHasExpired(credentialConfirmation)) {
            credentialConfirmation.credentialStatus = CredentialStatus.EXPIRED;
            return this.confirmationRepository
              .updateCredentialConfirmation(credentialConfirmation)
              .switchMap((numReplaced:number) => { //this is so to make the old links still work.
                if (numReplaced > 0) {
                  credentialConfirmation.createdOn = new Date();
                  credentialConfirmation.modifiedOn = new Date();
                  return this.confirmationRepository
                    .addCredentialConfirmation(credentialConfirmation)
                    .map((credentialConfirmation:CredentialConfirmation) => {
                      return new Result<CredentialConfirmation>(false, "Updated", credentialConfirmation);
                    });
                } else {
                  return Rx.Observable.of(new Result<CredentialConfirmation>(true, "Failed update", credentialConfirmation));
                }
              });
          } else {
            return Rx.Observable.of(new Result<CredentialConfirmation>(true, "Invalid Status", credentialConfirmation));
          }
        } else {
          return Rx.Observable.of(new Result<CredentialConfirmation>(true, "Unknown confirmation", credentialConfirmation));
        }
      });
  };

  createNotFoundError(name:string):Error {
    return new Error(JSON.stringify({
      "statusCode":404,
      "message": name + " not found."
    }));
  }
}