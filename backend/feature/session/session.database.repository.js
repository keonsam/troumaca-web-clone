let Rx = require("rxjs");
let UUIDGenerator = require("../uuid.generator");
let db = require("../db.js");

let newUuidGenerator = new UUIDGenerator();

module.exports =  function DatabaseSessionRepository() {

  this.getSessionById = function (sessionId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["sessionId"] = sessionId;
      db.sessions.findOne(query, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getSessionByCredentialId = function (credentialId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["credentialId"] = credentialId;
      db.sessions.findOne(query, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.getSessionByPartyId = function (partyId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["partyId"] = partyId;
      db.sessions.findOne(query, function (err, doc) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.addSession = function (session) {
    
    session["sessionId"] = newUuidGenerator.generateUUID();
    session["expirationDate"] = new Date().getTime();
    session["createdOn"] = new Date().getTime();
    session["modifiedOn"] = new Date().getTime();
    session["data"] = {};
    return Rx.Observable.create(function (observer) {
      db.sessions.insert(session, function (err, doc) {
        if (!err) {
          observer.next(session);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  this.updateSession = function (sessionId, session) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["sessionId"] = sessionId;
      db.sessions.update(query, session, {}, function (err, numReplaced) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  /*this.getAndUpdateSessionById = function (sessionId) {
    return Rx.Observable.create(function (observer) {
      let query = {};
      query["sessionId"] = sessionId;
      db.sessions.findOne(query, function (err, doc) {
        if (!err) {
          doc["partyId"] = newUuidGenerator.generateUUID();
          db.sessions.update(query, doc, {}, function (err, numReplaced) {
            if(numReplaced) {
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
  }*/

  this.isValidSession = function (sessionId) {
    this.getSessionById(sessionId)
      .map(session => {

        let readSessionId = session.sessionId;
        if (!readSessionId) {
          return false;
        }

        let readExpirationDate = session.expirationDate;
        if (!readExpirationDate) {
          return false;
        }

        let now = new Date();

        return readExpirationDate > now;

    })
  }
};
