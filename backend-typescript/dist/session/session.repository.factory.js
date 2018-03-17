"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = __importDefault(require("rxjs"));
const uuid_generator_1 = require("../uuid.generator");
const db_1 = require("../db");
const repository_kind_1 = require("../repository.kind");
class SessionDBRepository {
    getSessionById(sessionId) {
        return rxjs_1.default.Observable.create(function (observer) {
            let query = {
                "sessionId": sessionId
            };
            db_1.sessions.findOne(query, function (err, doc) {
                if (!err) {
                    observer.next(doc);
                }
                else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }
    ;
    getSessionByCredentialId(credentialId) {
        return rxjs_1.default.Observable.create(function (observer) {
            let query = {
                "credentialId": credentialId
            };
            db_1.sessions.findOne(query, function (err, doc) {
                if (!err) {
                    observer.next(doc);
                }
                else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }
    ;
    getSessionByPartyId(partyId) {
        return rxjs_1.default.Observable.create(function (observer) {
            let query = {
                "partyId": partyId
            };
            db_1.sessions.findOne(query, function (err, doc) {
                if (!err) {
                    observer.next(doc);
                }
                else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }
    ;
    addSession(session) {
        session.sessionId = uuid_generator_1.generateUUID();
        session.expirationDate = new Date().getTime();
        session.createdOn = new Date().getTime();
        session.modifiedOn = new Date().getTime();
        session.data = {};
        return rxjs_1.default.Observable.create(function (observer) {
            db_1.sessions.insert(session, function (err, doc) {
                if (!err) {
                    observer.next(session);
                }
                else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }
    ;
    updateSession(sessionId, session) {
        return rxjs_1.default.Observable.create(function (observer) {
            let query = {
                "sessionId": sessionId
            };
            db_1.sessions.update(query, session, {}, function (err, numReplaced) {
                if (!err) {
                    observer.next(numReplaced);
                }
                else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }
    ;
    isValidSession(sessionId) {
        return this.getSessionById(sessionId).map(session => {
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
        });
    }
}
exports.SessionDBRepository = SessionDBRepository;
class SessionRestRepository {
    addSession(session) {
        return undefined;
    }
    getSessionByCredentialId(credentialId) {
        return undefined;
    }
    getSessionById(sessionId) {
        return undefined;
    }
    getSessionByPartyId(partyId) {
        return undefined;
    }
    isValidSession(sessionId) {
        return undefined;
    }
    updateSession(sessionId, session) {
        return undefined;
    }
}
function createSessionRepositoryFactory(kind) {
    switch (kind) {
        case repository_kind_1.RepositoryKind.Nedb:
            return new SessionDBRepository();
        case repository_kind_1.RepositoryKind.Rest:
            return new SessionRestRepository();
        default:
            return new SessionDBRepository();
    }
}
exports.createSessionRepositoryFactory = createSessionRepositoryFactory;
//# sourceMappingURL=session.repository.factory.js.map