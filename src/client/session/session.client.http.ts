import {SessionClient} from './session.client';
import {UUIDGenerator} from '../../uuid.generator';
import {Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SessionState} from './session.state';
import {ValidSession} from '../../session/valid.session';

export class SessionClientHttp extends SessionClient {

  private sessionState: SessionState;
  private sessionStateCachedDate: number;
  private readonly duration: number;
  private logInState = false;

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort: string) {
    super();
    this.duration = 1000 * 60 * 20;
  }

  getSession(): Observable<SessionState> {
    if (this.isNotExpiredSession(this.sessionState)) {
      return of(this.sessionState);
    } else {
      const that = this;
      return this.getRemoteSession()
        .pipe(map(value => {
          that.sessionState = value;
          that.sessionStateCachedDate = new Date().getTime();
          return value;
        }));
    }
  }

  isNotExpiredSession(sessionState: SessionState): boolean {
    if (!sessionState) {
      return false;
    }

    const expiredDate = new Date(sessionState.expirationTime).getTime();
    const now = new Date().getTime();
    return expiredDate > now;
  }

  getRemoteSession(): Observable<SessionState> {
    const url = `${this.hostPort}/sessions/current-user-session`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'correlationId': this.uuidGenerator.generateUUID()
      })
    };

    return this.httpClient
      .get<SessionState>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  activeSessionExists(): Observable<boolean> {
    const url = `${this.hostPort}/sessions/is-valid-session`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient
      .get<boolean>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  isValidSession(): Observable<ValidSession> {
    const url = `${this.hostPort}/sessions/is-valid-session`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient
      .get<ValidSession>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  private jsonHttpHeaders(): HttpHeaders {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
      'correlationId': this.uuidGenerator.generateUUID()
    });
    return httpHeaders;
  }

  get isLoggedIn(): Observable<boolean> {
    return this.activeSessionExists();
  }

  get partyIdExist(): Observable<boolean> {
    const url = `${this.hostPort}/partyId`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient
      .get<boolean>(url, httpOptions)
      .pipe(map(data => {
        if (data) {
          return true;
        } else {
          return false;
        }
      }));
  }

}
