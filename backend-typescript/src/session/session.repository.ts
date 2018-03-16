import {Observable} from "rxjs/Observable";
import {Session} from "./session";

export interface SessionRepository {

  getSessionById(sessionId:string):Observable<Session> ;

  getSessionByCredentialId(credentialId):Observable<Session>;

  getSessionByPartyId(partyId):Observable<Session>;

  addSession(session):Observable<Session>;

  updateSession(sessionId, session):Observable<number>;

  isValidSession(sessionId):Observable<boolean>;

}
