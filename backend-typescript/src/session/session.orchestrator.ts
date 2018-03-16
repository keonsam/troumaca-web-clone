import {createSessionRepositoryFactory} from "./session.repository.factory";
import {shapeSessionResponse} from "./session.response.shaper";
import {SessionRepository} from "./session.repository";

export class SessionOrchestrator {

  private sessionRepositoryFactory:SessionRepository;

  constructor() {
    this.sessionRepositoryFactory = createSessionRepositoryFactory();
  }


  isValidSession(sessionId) {
    return sessionRepository
    .isValidSession(sessionId)
    .map(valid => {
      return shapeSessionResponse(valid)
    });
  }

  getSimpleSession(sessionId) {
    // Todo: Need to verify.
    return sessionRepository
    .getSessionById(sessionId)
    .map(valid => {
      return shapeSessionResponse(valid)
    });
  }

}