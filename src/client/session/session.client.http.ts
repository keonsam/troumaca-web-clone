import {SessionClient} from "./session.client";
import {UUIDGenerator} from "../../uuid.generator";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SessionState} from "./session.state";
import {EventService} from "../../event/event.service";
import {EventName} from "../../event/event.name";
import {Event} from "../../authentication/event";

export class SessionClientHttp extends SessionClient {

  private sessionState:SessionState;
  private sessionStateCachedDate:number;
  private readonly duration:number;
  private logInState: boolean = false;

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort:string,
              private eventService: EventService) {
    super();
    this.duration = 1000 * 60 * 20;
  }

  createEventModel() {
    let event:Event = new Event();
    event.partyId = "123";
    event.timestamp = new Date().getTime();
    event.source = "session.client.http";
    event.name = "session expired";

    return event;
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
      //withCredentials: true,
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
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient
      .get<boolean>(url, httpOptions)
      .map(data => {
        return data;
      });
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

  get partyIdExist():Observable<boolean> {
    const url = `${this.hostPort}/partyId`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient
      .get<boolean>(url, httpOptions)
      .map(data => {
        if (data) {
          return true;
        } else {
          return false;
        }
      });
  }

}
