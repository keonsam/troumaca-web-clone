const Rx = require("rxjs");
const UUIDGenerator = require("../uuid.generator");
const phoneToken = require('generate-sms-verification-code');
const db = require("../db.js");

let newUuidGenerator = new UUIDGenerator();

module.exports =  function DatabaseCredentialRepository() {

  this.addCredentialConfirmation = function (credentialConfirmation) {
    credentialConfirmation["credentialConfirmationId"] = newUuidGenerator.generateUUID();
    credentialConfirmation["confirmationCode"] = phoneToken(6, {type: 'string'});
    credentialConfirmation["status"] = "new";
    return Rx.Observable.create(function (observer) {
      db.credentialConfirmations.insert(credentialConfirmation, function (err, doc) {
        if (!err) {
          observer.next(credentialConfirmation);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getCredentialConfirmationByCode = function (credentialConfirmationId, confirmationCode) {
    return Rx.Observable.create(function (observer) {
      let query1 = {};
      let query2 = {};
      query1["credentialConfirmationId"] = credentialConfirmationId;
      query2["confirmationCode"] = confirmationCode;
      db.credentialConfirmations.findOne({$and : [query1,query2]}, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getCredentialConfirmationById = function (credentialConfirmationId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["credentialConfirmationId"] = credentialConfirmationId;
      db.credentialConfirmations.findOne(query, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.updateCredentialConfirmation = function (credentialConfirmation) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["credentialConfirmationId"] = credentialConfirmation.credentialConfirmationId;
      db.credentialConfirmations.update(query, credentialConfirmation, {}, function (err, numReplaced) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getCredentialConfirmationByCredentialId = function (credentialId) {
    let query = {};
    query["credentialId"] = credentialId;
    return Rx.Observable.create(function (observer) {
      db.credentialConfirmations.find(query).sort({ createdOn: new Date().getTime()}).exec(function (err, docs) {
        if (!err) {
          observer.next(docs[1]);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

};
