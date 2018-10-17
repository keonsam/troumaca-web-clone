import { AuthGuardService} from '../../auth-guard/auth.guard.service';
import { SessionClient } from '../../client/session/session.client';
import { Observable } from 'rxjs';
import {ValidSession} from '../../session/valid.session';

export class AuthGuardRepositoryAdapter extends AuthGuardService {

  constructor(private sessionClient: SessionClient) {
    super();
  }

  isValidSession(): Observable<ValidSession> {
    return this.sessionClient.isValidSession();
  }
  
}
