import {AuthenticationClient} from './authentication.client';
import {UUIDGenerator} from '../../uuid.generator';

import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Credential } from '../../authentication/credential';
import { ValidResponse } from '../../authentication/valid.response';
import { Confirmation } from '../../authentication/confirmation';
import { AuthenticatedCredential } from '../../authentication/authenticated.credential';
import { User } from '../../parties/user';
import {ChangePassword} from "../../authentication/change.password";
import {ChangeResponse} from "../../authentication/change.response";
import {environment} from '../../environments/environment';

export class AuthenticationClientHttp extends AuthenticationClient {

  // private fingerPrint:string = '';

  hostPort = environment.hostPort;
  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient) {
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

  authenticate(credentialState: Credential): Observable<AuthenticatedCredential> {
    const url = `${this.hostPort}/authentication/authenticate`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    const query = {
      username: credentialState.username,
      password: credentialState.password,
      rememberMe: credentialState.rememberMe
    };
    return this.httpClient
      .post<AuthenticatedCredential>(url, query, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  forgotPassword(credential: Credential): Observable<Confirmation> {
    const url = `${this.hostPort}/authentication/confirmations/resend-by-username`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient
      .post<Confirmation>(url, credential, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  isValidPassword(password: string): Observable<ValidResponse> {
    const url = `${this.hostPort}/authentication/validate-password`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    const query = {password: password};

    return this.httpClient
      .post<ValidResponse>(url, query, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  isValidUsername(username: string, partyId?: string): Observable<ValidResponse> {
    const url = `${this.hostPort}/authentication/validate-username`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    const query = {
      username: username,
      partyId: partyId
    };
    return this.httpClient
    .post<ValidResponse>(url, query, httpOptions)
    .pipe(map(data => {
      return data;
    }));
  }

  addCredential(credentialState: Credential, userState: User): Observable<Confirmation> {
    const url = `${this.hostPort}/authentication/credentials`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    const body = {
      credential: credentialState,
      user: userState
    };

    return this.httpClient
      .post<Confirmation>(url, body, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  verifyConfirmationState(confirmationState: Confirmation): Observable<Confirmation> {
    const url = `${this.hostPort}/authentication/confirmations/verify`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient
      .post<Confirmation>(url, confirmationState, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  resendConfirmationCode(confirmationId: string, credentialId: string): Observable<Confirmation> {
    const url = `${this.hostPort}/authentication/confirmations/resend`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    const body = {
      confirmationId: confirmationId,
      credentialId: credentialId
    };

    return this.httpClient
      .post<Confirmation>(url, body, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  changePassword(changePassword: ChangePassword): Observable<ChangeResponse> {
    const url = `${this.hostPort}/authentication/change-password`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };


    return this.httpClient
      .post<ChangeResponse>(url, changePassword, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  private jsonHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type':  'application/json',
      'Correlation-Id': this.uuidGenerator.generateUUID()
    });
  }

}
