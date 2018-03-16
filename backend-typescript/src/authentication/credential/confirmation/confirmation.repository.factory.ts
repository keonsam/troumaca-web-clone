import Rx from "rxjs";
import {ConfirmationRepository} from "./confirmation.repository";
import {generateUUID} from "../../../uuid.generator";
import phoneToken from 'generate-sms-verification-code';
import {credentialConfirmations, credentials} from "../../db";
import {CredentialStatus} from '../credential.status';
import {Observable} from "rxjs/Observable";
import {CredentialConfirmation} from "./credential.confirmation";
import {Observer} from "rxjs/Observer";
import {RepositoryKind} from "../../../repository.kind";

class ConfirmationDBRepository implements ConfirmationRepository {

  addCredentialConfirmation(credentialConfirmation:CredentialConfirmation):Observer<CredentialConfirmation> {
    credentialConfirmation["credentialConfirmationId"] = generateUUID();
    credentialConfirmation["confirmationCode"] = phoneToken(6, {type: 'string'});
    credentialConfirmation["status"] = CredentialStatus.NEW;

    return Rx.Observable.create(function (observer:Observer<CredentialConfirmation>) {
      credentialConfirmations.insert(credentialConfirmation, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  getCredentialConfirmationByCode(credentialConfirmationId:string, confirmationCode:string):Observer<CredentialConfirmation> {
    return Rx.Observable.create(function (observer:Observer<CredentialConfirmation>) {
      let query1 = {
        "credentialConfirmationId":credentialConfirmationId
      };

      let query2 = {
        "confirmationCode":confirmationCode
      };

      credentialConfirmations.findOne({$and : [query1,query2]}, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  getCredentialConfirmationById(credentialConfirmationId:string):Observer<CredentialConfirmation> {
    return Rx.Observable.create(function (observer:Observer<CredentialConfirmation>) {
      let query = {
        "credentialConfirmationId":credentialConfirmationId
      };

      credentialConfirmations.findOne(query, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  updateCredentialConfirmation(credentialConfirmation:CredentialConfirmation):Observer<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "credentialConfirmationId":credentialConfirmation.credentialConfirmationId
      };

      credentialConfirmation.modifiedOn = new Date().getTime();
      credentialConfirmations.update(query, credentialConfirmation, {}, function (err:any, numReplaced:number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  getCredentialConfirmationByCredentialId(credentialId:string):Observer<CredentialConfirmation> {
    return Rx.Observable.create(function (observer:Observer<CredentialConfirmation>) {
      let query = {
        "credentialId":credentialId
      };

      credentialConfirmations.findOne(query).sort({ status: CredentialStatus.NEW}).exec(function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

}

class ConfirmationRestRepository implements ConfirmationRepository {
  addCredentialConfirmation(credentialConfirmation:CredentialConfirmation): Observable<CredentialConfirmation> {
    return undefined;
  }

  getCredentialConfirmationByCode(credentialConfirmationId:string, confirmationCode:string): Observable<CredentialConfirmation> {
    return undefined;
  }

  getCredentialConfirmationByCredentialId(credentialId:string): Observable<CredentialConfirmation> {
    return undefined;
  }

  getCredentialConfirmationById(credentialConfirmationId:string): Observable<CredentialConfirmation> {
    return undefined;
  }

  updateCredentialConfirmation(credentialConfirmation:CredentialConfirmation): Observable<number> {
    return undefined;
  }
}

export function createCredentialConfirmationRepositoryFactory(kind?:RepositoryKind) {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new ConfirmationDBRepository();
    case RepositoryKind.Rest:
      return new ConfirmationRestRepository();
    default:
      return new ConfirmationDBRepository();
  }
}