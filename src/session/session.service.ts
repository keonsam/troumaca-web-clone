import {SessionRepository} from './session.repository';
import {BehaviorSubject, Observable} from 'rxjs';

export class SessionService {

  loginEvent = new BehaviorSubject<boolean>(false);
  logoutEvent = new BehaviorSubject<boolean>(false);

  constructor(private sessionRepository: SessionRepository) {
  }

  logout(): Observable<boolean> {
    return this.sessionRepository.logout();
  }

  activeSessionExists(): Observable<boolean> {
    return this.sessionRepository.activeSessionExists();
  }

}
