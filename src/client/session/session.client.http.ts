import {SessionClient} from './session.client';
import {UUIDGenerator} from '../../uuid.generator';
import {Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ValidSession} from '../../session/valid.session';

export class SessionClientHttp extends SessionClient {


  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort: string) {
    super();
  }

  logout(): Observable<boolean> {
    const url = `${this.hostPort}/sessions/logout`;

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
    return this.isValidSession()
      .pipe(map( value => value.valid));
  }

}
