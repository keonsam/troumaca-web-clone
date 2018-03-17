import Rx from "rxjs";
import validator from 'validator';
import libphonenumberjs from 'libphonenumber-js';
import passwordValidator from 'password-validator';
import {generateUUID} from "../../uuid.generator";
import {Credential} from "./credential";
import {Observable} from "rxjs/Observable";
import {Observer, Observer} from "rxjs/Observer";
import {CredentialStatus} from "./credential.status"
import {credentials} from "../../db";
import {RepositoryKind} from "../../repository.kind";
import {CredentialRepository} from "./credential.repository";

class CredentialDBRepository implements CredentialRepository {

  isValidUsername(credential:Credential):Observable<Credential> {
    let username:string = credential.username;
    if (!username) {
      return Rx.Observable.of(false);
    }


    // the user name is valid if:
    let validUsername:boolean = false;
    // 1. is username and email
    let validEmail:boolean = validator.isEmail(username);

    if (validEmail) {
      validUsername = true;
    } else {
      let parsedObj:any = libphonenumberjs.parse(username, 'US');
      if (parsedObj && parsedObj.phone) {
        // 2. or username is a phone number
        validUsername = libphonenumberjs.isValidNumber(parsedObj);
      }
    }

    if (!validUsername) {
      // 3. and is not taken
      return Rx.Observable.of(false);
    } else {
      return this.getCredentialByUsername(username)
        .map(credential => {
          if (!credential) {
            return true;
          } else if (!credential.username) {
            return true;
          } else {
            return false;
          }
        });
    }
  };

  isValidPassword(credential:Credential):Observable<Credential> {
    let password = credential.password;

    if (!password) {

      return Rx.Observable.of(false);

    } else {
      // Create a schema
      let schema:any = new passwordValidator();

      // Add properties to it
      schema
        .is().min(8)                                    // Minimum length 8
        .is().max(100)                                  // Maximum length 100
        .has().uppercase()                              // Must have uppercase letters
        .has().lowercase()                              // Must have lowercase letters
        .has().digits()                                 // Must have digits
        .has().not().spaces()                           // Should not have spaces
        .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

      return Rx.Observable.of(schema.validate(password));
    }

  };

  getCredentialByUsername(username:string):Observable<Credential> {
    return Rx.Observable.create(function (observer:Observer<Credential>) {
      let query = {
        "username":username
      };

      credentials.findOne(query, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  getCredentialByCredentialId(credentialId:string):Observable<Credential> {
    return Rx.Observable.create(function (observer:Observer<Credential>) {
      let query = {
        "credentialId":credentialId
      };

      credentials.findOne(query, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };


  checkUsernameValid(partyId, username):Observable<Credential> {
    return Rx.Observable.create(function (observer:Observer<Credential>) {
      let query1 = {
        "partyId":partyId
      };

      let query2 = {
        "username":username
      };


      credentials.findOne({$and : [query1,query2]}, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  addCredential(credential:Credential):Observable<Credential> {
    credential.credentialId = generateUUID();
    credential.status = CredentialStatus.NEW;
    return Rx.Observable.create(function (observer:Observer<Credential>) {
      credentials.insert(credential, function (err:any, doc:any) {
        if (!err) {
          observer.next(credential);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  authenticateCredential(credential):Observable<Credential> {
    return Rx.Observable.create(function (observer:Observer<Credential>) {
      let query1 = {
        "username":credential.username
      };
      let query2 = {
        "password":credential.password
      };


      credentials.findOne({$and : [query1, query2]}, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  updateCredentialStatusById(credentialId, status):Observable<Credential> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "credentialId":credentialId
      };

      credentials.update(query, {$set: {status}}, {}, function (err:any, numReplaced:number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  updateCredentialPartyId(partyId: string, credentialId: string): Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {};
      query["credentialId"] = credentialId;
      db.credentials.update(query, {$set : {partyId}}, {}, function (err, numReplaced) {
        if (!err) {
          observer.next(numReplaced);
        }else{
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

}

class CredentialRestRepository implements CredentialRepository {

  addCredential(credential): Observable<> {
    return undefined;
  }

  authenticateCredential(credential): Observable<> {
    return undefined;
  }

  checkUsernameValid(partyId: string, username: string): Observable<> {
    return undefined;
  }

  getCredentialByCredentialId(credentialId: string): Observable<> {
    return undefined;
  }

  getCredentialByUsername(username: string): Observable<> {
    return undefined;
  }

  isValidPassword(credential): Observable<boolean> {
    return undefined;
  }

  isValidUsername(credential): Observable<boolean> {
    return undefined;
  }

  updateCredentialStatusById(credentialId: string, status: string): Observable<number> {
    return undefined;
  }

  updateCredentialPartyId(partyId: string, credentialId: string): Observable<number> {
    return undefined;
  }
}

export function createCredentialRepositoryFactory(kind?:RepositoryKind):CredentialRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new CredentialDBRepository();
    case RepositoryKind.Rest:
      return new CredentialRestRepository();
    default:
      return new CredentialDBRepository();
  }
}
