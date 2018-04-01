import {createSessionRepositoryFactory} from "./session.repository.factory";
import {SessionRepository} from "./session.repository";
import {Observable} from "rxjs/Observable";

export class SessionOrchestrator {

  private sessionRepository:SessionRepository;

  constructor() {
    this.sessionRepository = createSessionRepositoryFactory();
  }

  isValidSession(sessionId:string):Observable<boolean> {
    return this.sessionRepository.isValidSession(sessionId)
    .map(valid => {
      return valid;
    });
  }

  getSimpleSession(sessionId:string) {
    // Todo: Need to verify.
    return this.sessionRepository.getSessionById(sessionId)
    .map(session => {
      return session;
    });
  }

}