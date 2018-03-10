import {AuthenticationClient} from "./authentication.client";
import {UUIDGenerator} from "../../uuid.generator";
import 'rxjs/add/operator/catch';
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CredentialState} from "./credential.state";
import {SessionState} from "./session.state";
import {CredentialConfirmationState} from "./credential.confirmation.state";

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

  isValidEditUsername(partyId: string, username: string): Observable<boolean> {
    let url = `${this.hostPort}/credentials/validate-edit-username/${partyId}`;

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

  addCredential(credentialState:CredentialState):Observable<CredentialConfirmationState> {
    let url = `${this.hostPort}/credentials`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'correlationId': this.uuidGenerator.generateUUID()
      })
    };

    return this.httpClient
      .post<CredentialConfirmationState>(url, credentialState.toJson(), httpOptions)
      .map(data => {
        return data;
      });
  }

  verifyCredentialConfirmationState(credentialConfirmationState: CredentialConfirmationState): Observable<CredentialConfirmationState> {
    let url = `${this.hostPort}/credentials/verify-credentials-confirmations`;
    console.log(credentialConfirmationState);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'correlationId': this.uuidGenerator.generateUUID()
      })
    };

    return this.httpClient
      .post<CredentialConfirmationState>(url, credentialConfirmationState.toJson(), httpOptions)
      .map(data => {
        return data;
      });
  }

  sendConfirmationCode(credentialConfirmationId: string, type: string): Observable<CredentialConfirmationState> {
    let url = `${this.hostPort}/send-confirmation-codes/${type}/${credentialConfirmationId}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'correlationId': this.uuidGenerator.generateUUID()
      })
    };

    return this.httpClient
      .get<CredentialConfirmationState>(url, httpOptions)
      .map(data => {
        return data;
      });
  }

}
