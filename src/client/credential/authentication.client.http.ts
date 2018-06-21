import {AuthenticationClient} from './authentication.client';
import {UUIDGenerator} from '../../uuid.generator';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CredentialState} from './credential.state';
import {CredentialConfirmationState} from './credential.confirmation.state';
import {Result} from '../../result/result.success';
//import {AuthenticateResponseState} from "./authenticate.response.state";
import {AuthenticateResponse} from '../../authentication/authenticate.response';

export class AuthenticationClientHttp extends AuthenticationClient {

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort: string) {
    super();
  }

  authenticate(credentialState: CredentialState): Observable<AuthenticateResponse> {
    const url = `${this.hostPort}/authenticate`;

    //withCredentials: true,

    const httpOptions = {
      //withCredentials: true,
      headers: this.jsonHttpHeaders()
    };

    const query = {
      username: credentialState.username,
      password: credentialState.password,
      rememberMe: credentialState.rememberMe
    };
    return this.httpClient
      .post<AuthenticateResponse>(url, query, httpOptions)
      .map(data => {
        console.log(data);
        return data;
      });
  }

  forgotPassword(username: string): Observable<boolean> {
    const url = `${this.hostPort}/forgot-password`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient
      .post<boolean>(url, {username}, httpOptions)
      .map(data => {
        return data;
      });
  }

  isValidPassword(password: string): Observable<boolean> {
    const url = `${this.hostPort}/validate-password`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    const query = {password: password};

    return this.httpClient
      .post<boolean>(url, query, httpOptions)
      .map(data => {
        return data;
      });
  }

  isValidUsername(username: string): Observable<boolean> {
    const url = `${this.hostPort}/validate-username`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    const query = {username: username};
    return this.httpClient
    .post<boolean>(url, query, httpOptions)
    .map(data => {
      return data;
    });
  }

  addCredential(credentialState: CredentialState): Observable<CredentialConfirmationState> {
    const url = `${this.hostPort}/credentials`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient
      .post<CredentialConfirmationState>(url, credentialState.toJson(), httpOptions)
      .map(data => {
        return data;
      });
  }

  verifyCredentialConfirmationState(credentialConfirmationState: CredentialConfirmationState): Observable<Result<CredentialConfirmationState>> {
    const url = `${this.hostPort}/verify-credentials-confirmations`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient
      .post<Result<CredentialConfirmationState>>(url, credentialConfirmationState.toJson(), httpOptions)
      .map(data => {
        return data;
      });
  }

  sendConfirmationCode(credentialConfirmationId: string): Observable<Result<CredentialConfirmationState>> {
    const url = `${this.hostPort}/send-confirmation-codes/${credentialConfirmationId}`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient
      .get<Result<CredentialConfirmationState>>(url, httpOptions)
      .map(data => {
        return data;
      });
  }

  getConfirmationsUsername(credentialConfirmationId: string): Observable<string> {
    const url = `${this.hostPort}/get-confirmations-username/${credentialConfirmationId}`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient
      .get<string>(url, httpOptions)
      .map(data => {
        return data;
      });
  }


  jsonHttpHeaders(): HttpHeaders {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
      'correlationId': this.uuidGenerator.generateUUID()
    });

    return httpHeaders;
  }

}
