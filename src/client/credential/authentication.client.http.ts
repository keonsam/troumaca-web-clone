import {AuthenticationClient} from "./authentication.client";
import {UUIDGenerator} from "../../uuid.generator";
import 'rxjs/add/operator/catch';
import {Observable} from "rxjs/Observable";
//import {AuthenticationSessionState} from "./authentication.session.state";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CredentialState} from "./credential.state";
import {SessionState} from "./session.state";

export class AuthenticationClientHttp extends AuthenticationClient {

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort:string) {
    super();
  }

  authenticate(credentialState:CredentialState): Observable<SessionState> {
    let url = `${this.hostPort}/credentials/authenticate`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'correlationId': this.uuidGenerator.generateUUID()
      })
    };

    let query = {
      username: credentialState.username,
      password: credentialState.password,
      rememberMe: credentialState.rememberMe
    };

    return this.httpClient
      .post<SessionState>(url, query, httpOptions)
      .map(data => {
        return data;
      });

  }


  forgotPassword(emailOrPhone: string): Observable<boolean> {
    return null;
  }

  isValidCurrentPassword(password: string): Observable<boolean> {
    let url = `${this.hostPort}/credentials/validate-current-password`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'correlationId': this.uuidGenerator.generateUUID()
      })
    };

    let query = {password:password};

    return this.httpClient
      .post<boolean>(url, query, httpOptions)
      .map(data => {
        return data;
      });
  }

  isValidPassword(password: string): Observable<boolean> {
    let url = `${this.hostPort}/credentials/validate-password`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'correlationId': this.uuidGenerator.generateUUID()
      })
    };

    let query = {password:password};

    return this.httpClient
      .post<boolean>(url, query, httpOptions)
      .map(data => {
        return data;
      });
  }

  isValidUsername(username: string): Observable<boolean> {
    let url = `${this.hostPort}/credentials/validate-username`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'correlationId': this.uuidGenerator.generateUUID()
      })
    };

    let query = {username:username};

    return this.httpClient
    .post<boolean>(url, query, httpOptions)
    .map(data => {
      return data;
    });
  }

  addCredential(credentialState:CredentialState):Observable<CredentialState> {
    let url = `${this.hostPort}/credentials`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'correlationId': this.uuidGenerator.generateUUID()
      })
    };

    return this.httpClient
      .post<CredentialState>(url, credentialState.toJson(), httpOptions)
      .map(data => {
        return data;
      });
  }

}
