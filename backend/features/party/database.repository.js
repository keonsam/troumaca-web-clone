let uuidv5 = require('uuid/v5');
let Datastore = require('nedb');
let Rx = require("rxjs");
let path = require('path');
let UUIDGenerator = require("../uuid.generator");
let DbUtil = require("../db.util");
let db = require("../db.js")
let hostname = 'troumaca.com';
var generatePassword = require('password-generator');

let newUuidGenerator = new UUIDGenerator();
let dbUtil = new DbUtil();

module.exports =  function DatabasePartyRepository() {

  let defaultPageSize = 10;

  this.getPersons = function (pageNumber, pageSize, order) {
    return Rx.Observable.create(function (observer) {
      let skip = dbUtil.calcSkip(pageNumber, pageSize, defaultPageSize);
      db.persons.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getPersonCount = function () {
    return Rx.Observable.create(function (observer) {
      db.persons.count({}, function (err, count) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getPerson = function(partyId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["partyId"] = partyId;
      db.persons.findOne(query, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.addPerson = function (person) {
    person.partyId = newUuidGenerator.generateUUID();
    return Rx.Observable.create(function (observer) {
      db.persons.insert(person, function (err, doc) {
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
    credential.password = generatePassword();
    return Rx.Observable.create(function (observer) {
      db.credentials.insert(credential, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });

  };

  this.deletePerson= function(partyId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["partyId"] = partyId;
      db.persons.remove(query, {}, function (err, numRemoved) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
 };

 this.deleteCredential= function(partyId) {
   return Rx.Observable.create(function (observer) {
     let query = {};
     query["partyId"] = partyId;
     db.credentials.remove(query, {}, function (err, numRemoved) {
       if (!err) {
         observer.next(numRemoved);
       } else {
         observer.error(err);
       }
       observer.complete();
     })
   });
};

  this.updatePerson = function(partyId, person) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["partyId"] = partyId;
      db.persons.update(query, person, {}, function (err, numReplaced) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  };

  this.updateCredential = function(partyId, credential) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["partyId"] = partyId;
      db.credentials.update(query, {$set : credential}, {}, function (err, numReplaced) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  };

  this.updateUserPhoto = function(partyId, imageStr) {
    return Rx.Observable.create(function (observer) {

      let query = {};
      let photo = {};
      query["partyId"] = partyId;
      photo["partyId"] = partyId;
      photo["imageStr"] = imageStr;
      console.log(photo);
      db.usersPhotos.update(query, photo, {}, function (err, numReplaced) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  };


}
