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
  private logInState: boolean;

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort:string) {
    super();
    this.logInState = false;
    this.duration = 1000 * 60 * 20;
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

    let expiredDate = new Date(sessionState.expirationTime).getTime();
    let now = new Date().getTime();
    return expiredDate > now;
  }

  getRemoteSession(): Observable<SessionState> {
    let url = `${this.hostPort}/sessions/current-user-session`;

    const httpOptions = {
      withCredentials: true,
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
    if(this.logInState === true) {
      return Observable.of(true);
    }
    return this.getRemoteSession()
      .map(session => {
        if(session.sessionId && this.isNotExpiredSession(session)) {
          this.logInState= true;
          let calculatedExpiredTime = new Date(session.expirationTime).getTime() - new Date().getTime();
          console.log(calculatedExpiredTime);
          setTimeout( () => {
            this.logInState = false;
          }, calculatedExpiredTime);
          return true;
        }else {
          this.logInState= false;
          return false;
        }
      });
  }

  get isLoggedIn(): Observable<boolean> {
    //this to increase performance
    return this.activeSessionExists();
  }

}
