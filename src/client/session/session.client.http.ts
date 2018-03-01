import {SessionClient} from "./session.client";
import {UUIDGenerator} from "../../uuid.generator";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SessionState} from "./session.state";

export class SessionClientHttp extends SessionClient {

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort:string) {
    super();
  }

  getSession(): Observable<SessionState> {
    return Observable.of(new SessionState());
  }

  activeSessionExists(): Observable<boolean> {
    let url = `${this.hostPort}/sessions/exists`;

    const httpOptions = {
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
    return Observable.of(true);
  }

}