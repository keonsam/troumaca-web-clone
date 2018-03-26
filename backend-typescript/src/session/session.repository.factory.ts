import Rx from "rxjs";
import {generateUUID} from "../uuid.generator";
import {credentials, sessions} from "../db";

import {SessionRepository} from "./session.repository";
import {Observable} from "rxjs/Observable";
import {Session} from "./session";
import {Observer} from "rxjs/Observer";
import {RepositoryKind} from "../repository.kind";

class SessionDBRepository implements SessionRepository {

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
    session.expirationTime = new Date(new Date().getTime() + (20 * 60 * 1000));
    session.createdOn = new Date();
    session.modifiedOn = new Date();
    if (!session.data) {
      session.data = new Map();
    }

    return Rx.Observable.create(function (observer:Observer<Session>) {
      sessions.insert(session.toJson(), function (err:any, doc:any) {
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
  }

  updateSessionPartyId(sessionId:string, partyId:string): Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        sessionId
      };
      sessions.update(query, {$set : {partyId}}, {}, function (err:any, numReplaced:number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  isValidSession(sessionId:string):Observable<boolean> {
    if(!sessionId) {
      return Observable.of(false);
    }
    return this.getSessionById(sessionId).map(session => {
      let readSessionId = session.sessionId;
      if (!readSessionId) {
        return false;
      }

      let readExpirationDate = session.expirationTime;
      console.log(readExpirationDate);
      if (!readExpirationDate) {
        return false;
      }

      let now = new Date();
      console.log(now);

      return readExpirationDate  > now;
    })
  }
}

class SessionRestRepository implements SessionRepository {
  addSession(session:Session): Observable<Session> {
    return undefined;
  }

  getSessionByCredentialId(credentialId:string): Observable<Session> {
    return undefined;
  }

  getSessionById(sessionId: string): Observable<Session> {
    return undefined;
  }

  getSessionByPartyId(partyId:string): Observable<Session> {
    return undefined;
  }

  isValidSession(sessionId:string): Observable<boolean> {
    return undefined;
  }

  updateSession(sessionId:string, session:Session): Observable<number> {
    return undefined;
  }

  updateSessionPartyId(sessionId:string, partyId:string): Observable<number> {
    return undefined;
  }

}

export function createSessionRepositoryFactory(kind?:RepositoryKind):SessionRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new SessionDBRepository();
    case RepositoryKind.Rest:
      return new SessionRestRepository();
    default:
      return new SessionDBRepository();
  }
}
