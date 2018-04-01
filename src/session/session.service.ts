import {SessionRepository} from "./session.repository";
import {Observable} from "rxjs/Observable";

export class SessionService {

  constructor(private sessionRepository:SessionRepository) {
  }

  public activeSessionExists():Observable<boolean> {
    return this.sessionRepository.activeSessionExists();
  }

}