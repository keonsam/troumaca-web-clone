const Rx = require("rxjs");
const UUIDGenerator = require("../uuid.generator");
const phoneToken = require('generate-sms-verification-code');
const db = require("../db.js");

let newUuidGenerator = new UUIDGenerator();

module.exports =  function DatabaseCredentialRepository() {

  this.addCredentialConfirmation = function (credentialConfirmation) {
    credentialConfirmation["credentialConfirmationId"] = newUuidGenerator.generateUUID();
    credentialConfirmation["confirmationCode"] = phoneToken(6, {type: 'string'});
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

};