import {SessionClient} from "./session.client";
import {UUIDGenerator} from "../../uuid.generator";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SessionState} from "./session.state";

export class SessionClientHttp extends SessionClient {

  private sessionState:SessionState;
  private sessionStateCachedDate:number;
  private readonly duration:number;

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort:string) {
    super();
    this.duration = 1000 * 10;
  }

  getSession():Observable<SessionState> {
    if (this.isNotExpiredSession(this.sessionState)) {
      return Observable.of(this.sessionState);
    } else {
      var that = this;
      return this.getRemoteSession()
        .map(value => {
          that.sessionState = value;
          that.sessionStateCachedDate = new Date().getTime();
          return value;
        });
    }
  }

  isNotExpiredSession(sessionState:SessionState) : boolean {
    if (!sessionState) {
      return false;
    }

    if (!this.sessionStateCachedDate) {
      return false;
    }

    let expiredDate = this.sessionStateCachedDate + this.duration;
    let now = new Date().getTime();

    return expiredDate > now;
  }

  getRemoteSession(): Observable<SessionState> {
    let url = `${this.hostPort}/sessions/current-user-session`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'correlationId': this.uuidGenerator.generateUUID()
      })
    };

    return this.httpClient
      .get<SessionState>(url, httpOptions)
      .map(data => {
        return data;
      });
  }

  activeSessionExists(): Observable<boolean> {
    let url = `${this.hostPort}/sessions/is-valid-session`;

    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'correlationId': this.uuidGenerator.generateUUID()
      })
    };

    return this.httpClient
      .get<boolean>(url, httpOptions)
      .map(data => {
        return data;
      });
  }

  get isLoggedIn(): Observable<boolean> {

    let url = `${this.hostPort}/sessions/is-valid-session`;

    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'correlationId': this.uuidGenerator.generateUUID()
      })
    };

    return this.httpClient
      .get<boolean>(url, httpOptions)
      .map(data => {
        return data;
      });
  }

}
