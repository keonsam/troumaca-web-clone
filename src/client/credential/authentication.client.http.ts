import {AuthenticationClient} from './authentication.client';
import {UUIDGenerator} from '../../uuid.generator';

import {Observable} from 'rxjs';
import { map } from "rxjs/operators";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CredentialState} from './credential.state';
import {ValidResp} from "../../authentication/resp.valid";
import {ConfirmationState} from "./confirmation.state";
import {AuthenticatedCredentialState} from "./authenticated.credential.state";

export class AuthenticationClientHttp extends AuthenticationClient {

  // private fingerPrint:string = "";

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort: string) {
    super();
    // let that = this;
    // new Fingerprint2().get(function(result, components) {
      // a hash, representing your device fingerprint
      // console.log(result);
      // that.fingerPrint = result;
      // an array of FP components
      // console.log(components)
    // });
  }

  authenticate(credentialState: CredentialState): Observable<AuthenticatedCredentialState> {
    const url = `${this.hostPort}/authenticate`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    const query = {
      username: credentialState.username,
      password: credentialState.password,
      rememberMe: credentialState.rememberMe
    };
    return this.httpClient
      .post<AuthenticatedCredentialState>(url, query, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  forgotPassword(username: string): Observable<boolean> {
    const url = `${this.hostPort}/forgot-password`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient
      .post<boolean>(url, {username}, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  isValidPassword(password: string): Observable<ValidResp> {
    const url = `${this.hostPort}/validate-password`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    const query = {password: password};

    return this.httpClient
      .post<ValidResp>(url, query, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  isValidUsername(username: string, partyId?: string): Observable<ValidResp> {
    const url = `${this.hostPort}/validate-username`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    const query = {
      username: username,
      partyId: partyId
    };
    return this.httpClient
    .post<ValidResp>(url, query, httpOptions)
    .pipe(map(data => {
      return data;
    }));
  }

  addCredential(credentialState: CredentialState): Observable<ConfirmationState> {
    const url = `${this.hostPort}/authentication/credentials`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient
      .post<ConfirmationState>(url, credentialState.toJson(), httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  verifyConfirmationState(confirmationState: ConfirmationState): Observable<ConfirmationState> {
    const url = `${this.hostPort}/verify-credentials-confirmations`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient
      .post<ConfirmationState>(url, confirmationState.toJson(), httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  resendConfirmationCode(confirmationId: string, credentialId: string): Observable<ConfirmationState> {
    const url = `${this.hostPort}/send-confirmation-codes/${credentialId}/${confirmationId}`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient
      .get<ConfirmationState>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  getConfirmationsUsername(confirmationId: string): Observable<string> {
    const url = `${this.hostPort}confirmation-username/${confirmationId}`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient
      .get<string>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }


  jsonHttpHeaders(): HttpHeaders {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
      'correlationId': this.uuidGenerator.generateUUID()
    });

    return httpHeaders;
  }

}
