let validator = require('validator');
let libphonenumberjs = require('libphonenumber-js');
var passwordValidator = require('password-validator');

let Datastore = require('nedb');
let Rx = require("rxjs");
let path = require('path');
let UUIDGenerator = require("../uuid.generator");
let DbUtil = require("../db.util");

let credentialDb = path.resolve(__dirname, '..','..',) + '/nedb/credentials.db';

let db = {};
db.credentials = new Datastore(credentialDb);
db.credentials.loadDatabase(function (err) { console.log(err); });

let newUuidGenerator = new UUIDGenerator();

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
  }

};