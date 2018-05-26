import Rx from "rxjs";
import {ConfirmationRepository} from "./confirmation.repository";
import {generateUUID} from "../../../uuid.generator";
import phoneToken from "generate-sms-verification-code";
import {credentialConfirmations} from "../../../db";
import {CredentialStatus} from '../credential.status';
import {Observable} from "rxjs/Observable";
import {CredentialConfirmation} from "./credential.confirmation";
import {Observer} from "rxjs/Observer";
import {RepositoryKind} from "../../../repository.kind";
import {classToPlain, plainToClass} from "class-transformer";

class ConfirmationDBRepository implements ConfirmationRepository {

  addCredentialConfirmation(credentialConfirmation:CredentialConfirmation):Observable<CredentialConfirmation> {
    credentialConfirmation.credentialConfirmationId = generateUUID();
    credentialConfirmation.confirmationCode = phoneToken(6, {type: 'string'});
    credentialConfirmation.credentialStatus = CredentialStatus.NEW;
    credentialConfirmation.createdOn = new Date();
    credentialConfirmation.modifiedOn = new Date();
    return Rx.Observable.create(function (observer:Observer<CredentialConfirmation>) {
      credentialConfirmations.insert(classToPlain(credentialConfirmation), function (err:any, doc:any) {
        if (!err) {
          delete doc._id;
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  getCredentialConfirmationByCode(credentialConfirmationId:string, confirmationCode:string):Observable<CredentialConfirmation> {
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

  getCredentialConfirmationById(credentialConfirmationId:string):Observable<CredentialConfirmation> {
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

  updateCredentialConfirmation(credentialConfirmation:CredentialConfirmation):Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "credentialConfirmationId":credentialConfirmation.credentialConfirmationId
      };

      credentialConfirmation.modifiedOn = new Date();
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

  getCredentialConfirmationByCredentialId(credentialId:string):Observable<CredentialConfirmation> {
    return Rx.Observable.create(function (observer:Observer<CredentialConfirmation>) {
      let query = {
        "credentialId":credentialId
      };

      credentialConfirmations
        .find(query)
        .sort({ status: 'NEW'})
        .exec(function (err:any, doc:any) {
        if (!err) {
          observer.next(doc[0]);
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

export function createCredentialConfirmationRepositoryFactory(kind?:RepositoryKind):ConfirmationRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new ConfirmationDBRepository();
    case RepositoryKind.Rest:
      return new ConfirmationRestRepository();
    default:
      return new ConfirmationDBRepository();
  }
}
