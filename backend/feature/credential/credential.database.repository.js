let validator = require('validator');
let libphonenumberjs = require('libphonenumber-js');
var passwordValidator = require('password-validator');

let Datastore = require('nedb');
let Rx = require("rxjs");
let path = require('path');
let UUIDGenerator = require("../uuid.generator");
let DbUtil = require("../db.util");
let db = require("../db.js")
let newUuidGenerator = new UUIDGenerator();

const phoneToken = require('generate-sms-verification-code');

module.exports =  function DatabaseCredentialRepository() {


  this.isValidUsername = function (usernameObj) {
    let username = usernameObj.username;
    if (!username) {
      return Rx.Observable.of(false);
    }


    // the user name is valid if:
    let validUsername = false;
    // 1. is username and email
    let validEmail = validator.isEmail(username);

    if (validEmail) {
      validUsername = true;
    } else {
      let parsedObj = libphonenumberjs.parse(username, 'US');
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

  this.isValidEditUsername = function (partyId,usernameObj) {

    let username = usernameObj.username;
    if (!username) {
      return Rx.Observable.of(false);
    }


    // the user name is valid if:
    let validUsername = false;
    // 1. is username and email
    let validEmail = validator.isEmail(username);

    if (validEmail) {
      validUsername = true;
    } else {
      let parsedObj = libphonenumberjs.parse(username, 'US');
      if (parsedObj && parsedObj.phone) {
        // 2. or username is a phone number
        validUsername = libphonenumberjs.isValidNumber(parsedObj);
      }
    }

    if (!validUsername) {
      // 3. and is not taken
      return Rx.Observable.of(false);
    }
      return this.checkUsernameValid(partyId,username)
      .switchMap(value => {
        if(value) {
          return Rx.Observable.of(true);
        }else {
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
  };

  this.isValidCurrentPassword = function (passwordObj) {
    let password = passwordObj.password;

    return this.validateCurrentPassword(password)
    .map(password => {
      if (password) {
        return true;
      } else {
        return false;
      }
    });
  };

  this.isValidPassword = function (passwordObj) {
    let password = passwordObj.password;

    if (!password) {

      return Rx.Observable.of(false);

    } else {
      // Create a schema
      let schema = new passwordValidator();

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

  this.getCredentialByUsername = function (username) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["username"] = username;
      db.credentials.findOne(query, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getCredentialByCredentialId = function (credentialId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["credentialId"] = credentialId;
      db.credentials.findOne(query, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.checkUsernameValid = function (partyId, username) {
    return Rx.Observable.create(function (observer) {
      let query1 = {};
      let query2 = {};
      query1["partyId"] = partyId;
      query2["username"] = username;
      db.credentials.findOne({$and : [query1,query2]}, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.validateCurrentPassword = function(password) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["password"] = password;
      db.credentials.findOne(query, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  this.addCredential = function (credential) {
    credential.credentialId = newUuidGenerator.generateUUID();
    return Rx.Observable.create(function (observer) {
      db.credentials.insert(credential, function (err, doc) {
        if (!err) {
          observer.next(credential);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.authenticate = function (credential) {
    return this.getCredentialByUsername(credential.username)
    .map(readCredential => {
      if (!readCredential) {
        return false;
      } else {
        return credential.password === readCredential.password;
      }
    });
  };

  this.authenticateForCredential = function (credential) {
    return this.getCredentialByUsername(credential.username)
    .map(readCredential => {
      if (readCredential && credential && credential.password === readCredential.password) {
        return readCredential;
      } else {
        return {};
      }
    });
  };

  this.getSMSCode = function (phoneUUID,smsCode) {
    return Rx.Observable.create(function (observer) {
      let query1 = {};
      let query2 = {};
      query1["phoneUUID"] = phoneUUID;
      query2["smsCode"] = smsCode;
      db.phoneUuids.findOne({$and : [query1,query2]}, function (err, doc) {
        if (!err) {
          
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getEmailCode = function (emailUUID,emailCode) {
    return Rx.Observable.create(function (observer) {
      let query1 = {};
      let query2 = {};
      query1["emailUUID"] = emailUUID;
      query2["emailCode"] = emailCode;
      db.emailUuids.findOne({$and : [query1,query2]}, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.deleteSMSCode = function (phoneUUID) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["phoneUUID"] = phoneUUID;
      db.phoneUuids.remove(query, {}, function (err, numRemoved) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.deleteEmailCode = function (emailUUID) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["emailUUID"] = emailUUID;
      db.emailUuids.remove(query, {}, function (err, numRemoved) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };


  this.generateEmailUUID = function (credentialId) {
    return Rx.Observable.create(function (observer) {
      let doc = {
        emailUUID: newUuidGenerator.generateUUID(),
        emailCode: newUuidGenerator.generateUUID(),
        credentialId
      };

      db.emailUuids.insert(doc, function (err, newDoc) {
        if (!err) {
          observer.next(newDoc.emailUUID);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.generatePhoneUUID = function (credentialId) {
    return Rx.Observable.create(function (observer) {
      let doc = {
        phoneUUID: newUuidGenerator.generateUUID(),
        smsCode:   phoneToken(6, {type: 'string'}),
        credentialId
      };

      db.phoneUuids.insert(doc, function (err, newDoc) {
        if (!err) {
          observer.next(newDoc.phoneUUID);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.updatePhoneUUID = function (phoneUUID) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["phoneUUID"] = phoneUUID;
      let updateDoc = { smsCode:   phoneToken(6, {type: 'string'}) };

      db.phoneUuids.update(query,{$set : updateDoc }, function (err, numReplaced) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.updateEmailUUID = function (emailUUID) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["emailUUID"] = emailUUID;
      let updateDoc = { emailCode: newUuidGenerator.generateUUID() };

      db.emailUuids.update(query,{$set : updateDoc }, function (err, numReplaced) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.generateConfirmedCredential = function (credentialId) {
    this.getCredentialByCredentialId(credentialId)
    .subscribe(doc => {
      db.confirmedCredentials.insert(doc,function (err, newDoc) {
        // do Errors
      });
    });
  }

};
