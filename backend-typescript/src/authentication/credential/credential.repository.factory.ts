import Rx from "rxjs";
import validator from 'validator';
import libphonenumberjs from 'libphonenumber-js';
import PasswordValidator from 'password-validator';
import {generateUUID} from "../../uuid.generator";
import {Credential} from "./credential";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {CredentialStatus} from "./credential.status"
import {credentials} from "../../db";
import {RepositoryKind} from "../../repository.kind";
import {CredentialRepository} from "./credential.repository";
import {Result} from "../../result.success";
import request from "request";
import {classToPlain, plainToClass} from "class-transformer";
import {strMapToJson} from "../../map.helpers";
import {jsonRequestHeaderMap, postJsonOptions} from "../../request.helpers";
import {properties} from "../../properties.helpers";

class CredentialDBRepository implements CredentialRepository {

  isValidUsername(username:string):Observable<boolean> {
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
          } else {
            return !credential.username;
          }
        });
    }
  };

  isValidEditUsername(partyId: string,username:string):Observable<boolean> {
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
      return this.checkUsernameValid(partyId, username)
        .switchMap(value => {
          if (value) {
            return Rx.Observable.of(true);
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
        });
    }
  };

  isValidPassword(password:string):Observable<boolean> {
    if (!password) {

      return Rx.Observable.of(false);

    } else {
      // Create a schema
      let schema:any = new PasswordValidator();

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

  getSanitizeCredentialByUsername(username:string):Observable<Credential> {
    return Rx.Observable.create(function (observer:Observer<Credential>) {
      let query = {
        "username":username
      };

      credentials.findOne(query, function (err:any, doc:any) {
        if (!err) {
          delete doc.password;
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  authenticate(credential: Credential): Observable<Result<Credential>> {
    return this.getCredentialByUsername(credential.username)
      .map((resultCred:Credential) => {
        if (!resultCred) {
          return new Result(false, );
        } else if (resultCred.password === credential.password) {
          return new Result(false, "", resultCred);
        } else {
          return new Result(true, "", resultCred);
        }
      });
  }

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


  checkUsernameValid(partyId:string, username:string):Observable<Credential> {
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
    credential.credentialStatus = CredentialStatus.NEW;
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

  authenticateCredential(credential:Credential):Observable<Credential> {
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

  updateCredential(partyId: string, credential: Credential): Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "partyId":partyId
      };

      credentials.update(query, {$set : credential}, {}, function (err, numReplaced) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  }


  updateCredentialStatusById(credentialId:string, status:string):Observable<number> {
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

  updateCredentialPartyId(credentialId: string, partyId: string): Observable<Credential> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "credentialId":credentialId
      };
      credentials.update(query, {$set : {partyId}}, {}, function (err:any, numReplaced:number) {
        if (!err) {
          credentials.findOne(query, function (err:any, doc:any) {
            if (!err) {
              observer.next(doc);
            } else {
              observer.error(err);
            }
            observer.complete();
          });
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

}

// Request Example 1: Post
// var request = require('request');
// request.post({
//   headers: {'content-type' : 'application/x-www-form-urlencoded'},
//   url:     'http://localhost/test2.php',
//   body:    "mes=heydude"
// }, function(error, response, body){
//   console.log(body);
// });

// Request Example 1: Post
// var request = require('request');
// var options = {
//   uri: 'https://www.googleapis.com/urlshortener/v1/url',
//   method: 'POST',
//   json: {
//     "longUrl": "http://www.google.com/"
//   }
// };
// request(options, function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log(body.id) // Print the shortened url.
//   }
// });

class CredentialRestRepository implements CredentialRepository {

  constructor() {
  }

  addCredential(credential:Credential, options?:any): Observable<Credential> {
    let uri:string = properties.get("credential.hos.port") as string;

    let headerMap = jsonRequestHeaderMap(options ? options : {});
    let headers:any = strMapToJson(headerMap);

    let credentialJson = classToPlain(credential);

    let requestOptions:any = postJsonOptions(uri, headers, credentialJson);

    return Rx.Observable.create(function (observer:Observer<number>) {
      request(requestOptions, function (error:any, response:any, body:any) {
        if (error) {
          observer.error(error);
        } else {
          // let credentialObj = plainToClass(Credential, body);
          let credentialObject = plainToClass(Credential, body as Object);
          observer.error(credentialObject);
        }
        observer.complete();
      });
    });

  }

  authenticateCredential(credential:Credential): Observable<Credential> {
    return undefined;
  }

  checkUsernameValid(partyId: string, username: string): Observable<Credential> {
    return undefined;
  }

  getCredentialByCredentialId(credentialId: string): Observable<Credential> {
    return undefined;
  }

  getCredentialByUsername(username: string): Observable<Credential> {
    return undefined;
  }

  isValidPassword(password:string): Observable<boolean> {
    return undefined;
  }

  isValidUsername(username:string): Observable<boolean> {
    return undefined;
  }

  isValidEditUsername(partyId: string, username:string): Observable<boolean> {
    return undefined;
  }

  updateCredential(partyId: string, credential: Credential): Observable<number> {
    return null;
  }

  updateCredentialStatusById(credentialId: string, status: string): Observable<number> {
    return undefined;
  }

  updateCredentialPartyId(credentialId: string, partyId: string): Observable<Credential> {
    return undefined;
  }

  getSanitizeCredentialByUsername(credentialId: string): Observable<Credential> {
    return undefined;
  }

  authenticate(credential: Credential): Observable<Result<Credential>> {
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
