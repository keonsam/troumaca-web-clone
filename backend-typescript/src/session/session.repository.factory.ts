import Rx from "rxjs";
import {generateUUID} from "../uuid.generator";
import {sessions} from "../db";

import {SessionRepository} from "./session.repository";
import {Observable} from "rxjs/Observable";
import {Session} from "./session";
import {Observer} from "rxjs/Observer";
import {RepositoryKind} from "../repository.kind";

export class SessionDBRepository implements SessionRepository {

  getSessionById(sessionId:string):Observable<Session> {
    return Rx.Observable.create(function (observer:Observer<Session>) {
      let query = {
        "sessionId":sessionId
      };

      sessions.findOne(query, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  getSessionByCredentialId(credentialId:string):Observable<Session> {
    return Rx.Observable.create(function (observer:Observer<Session>) {
      let query = {
        "credentialId":credentialId
      };

      sessions.findOne(query, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  getSessionByPartyId(partyId:string):Observable<Session> {
    return Rx.Observable.create(function (observer:Observer<Session>) {
      let query = {
        "partyId":partyId
      };

      sessions.findOne(query, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  addSession(session:Session):Observable<Session> {

    session.sessionId = generateUUID();
    session.expirationDate = new Date().getTime();
    session.createdOn = new Date().getTime();
    session.modifiedOn = new Date().getTime();
    session.data = {};

    return Rx.Observable.create(function (observer:Observer<Session>) {
      sessions.insert(session, function (err:any, doc:any) {
        if (!err) {
          observer.next(session);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  updateSession(sessionId:string, session:Session):Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "sessionId":sessionId
      };
      sessions.update(query, session, {}, function (err:any, numReplaced:number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  isValidSession(sessionId:string):Observable<Session> {
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
    })
  }
}

class SessionRestRepository implements SessionRepository {
  addSession(session): Observable<Session> {
    return undefined;
  }

  getSessionByCredentialId(credentialId): Observable<Session> {
    return undefined;
  }

  getSessionById(sessionId: string): Observable<Session> {
    return undefined;
  }

  getSessionByPartyId(partyId): Observable<Session> {
    return undefined;
  }

  isValidSession(sessionId): Observable<boolean> {
    return undefined;
  }

  updateSession(sessionId, session): Observable<number> {
    return undefined;
  }

}

export function createSessionRepositoryFactory(kind?:RepositoryKind) {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new SessionDBRepository();
    case RepositoryKind.Rest:
      return new SessionRestRepository();
    default:
      return new SessionDBRepository();
  }
}