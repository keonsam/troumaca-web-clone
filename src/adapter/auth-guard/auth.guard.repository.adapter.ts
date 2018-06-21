import 'rxjs/add/operator/map';
import {AuthGuardService} from '../../auth-guard/auth.guard.service';
import {SessionClient} from '../../client/session/session.client';
import {Observable} from 'rxjs/Observable';

export class AuthGuardRepositoryAdapter extends AuthGuardService {

  private _redirectUrl: string;

  constructor(private sessionClient: SessionClient) {
    super();
  }

  get isLoggedIn(): Observable<boolean> {
    return this.sessionClient.isLoggedIn;
  }

  get partyIdExist(): Observable<boolean> {
    return this.sessionClient.partyIdExist;
  }

  get redirectUrl(): string {
    return this._redirectUrl;
  }

  set redirectUrl(value: string) {
    this._redirectUrl = value;
  }

}
