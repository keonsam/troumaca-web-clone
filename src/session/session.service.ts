import {SessionRepository} from './session.repository';
import {Observable} from 'rxjs/Observable';

export class SessionService {

  constructor(private sessionRepository: SessionRepository) {
  }

  activeSessionExists(): Observable<boolean> {
    return this.sessionRepository.activeSessionExists();
  }

}
