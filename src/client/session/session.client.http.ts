import {SessionClient} from './session.client';
import {UUIDGenerator} from '../../uuid.generator';
import {Observable, of } from 'rxjs';
import { map } from "rxjs/operators";

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SessionState} from './session.state';
import {EventService} from '../../event/event.service';
import {Event} from '../../authentication/event';

export class SessionClientHttp extends SessionClient {

  private sessionState: SessionState;
  private sessionStateCachedDate: number;
  private readonly duration: number;
  private logInState = false;

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort: string,
              private eventService: EventService) {
    super();
    this.duration = 1000 * 60 * 20;
  }

  createEventModel() {
    const event: Event = new Event();
    event.partyId = '123';
    event.timestamp = new Date().getTime();
    event.source = 'session.client.http';
    event.name = 'session expired';

    return event;
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

  public jsonHttpHeaders(): HttpHeaders {
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
