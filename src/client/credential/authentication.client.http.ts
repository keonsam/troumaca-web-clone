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

  authenticateSMSCode(credentialConformationId: string, smsCode: string): Observable<boolean> {
    let url = `${this.hostPort}/credentials/authenticate-sms-code/${credentialConformationId}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'correlationId': this.uuidGenerator.generateUUID()
      })
    };

    //string not getting sent
    return this.httpClient
      .post<boolean>(url, {smsCode}, httpOptions)
      .map(data => {
        return data;
      });
  }

  authenticateEmailCode(emailUUID: string, emailCode: string): Observable<boolean> {
    let url = `${this.hostPort}/credentials/authenticate-email-code/${emailUUID}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'correlationId': this.uuidGenerator.generateUUID()
      })
    };

    //string is not getting sent
    return this.httpClient
      .post<boolean>(url, {emailCode}, httpOptions)
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

  sendPhoneCode(phoneUUID: string): Observable<number> {
    let url = `${this.hostPort}/credentials/send-phone-code/${phoneUUID}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'text/plain',
        'correlationId': this.uuidGenerator.generateUUID()
      })
    };

    return this.httpClient
      .get<number>(url, httpOptions)
      .map(data => {
        return data;
      });
  }

  newPhoneUUID(phoneNumber: string): Observable<string> {
    let url = `${this.hostPort}/credentials/new-phone-uuid/${phoneNumber}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'text/plain',
        'correlationId': this.uuidGenerator.generateUUID()
      })
    };

    return this.httpClient
      .get<string>(url, httpOptions)
      .map(data => {
        return data;
      });
  }

  sendEmailCode(emailUUID: string): Observable<number> {
    let url = `${this.hostPort}/credentials/send-email-code/${emailUUID}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'text/plain',
        'correlationId': this.uuidGenerator.generateUUID()
      })
    };

    return this.httpClient
      .get<number>(url, httpOptions)
      .map(data => {
        return data;
      });
  }

  newEmailUUID(emailAddress: string): Observable<string> {
    let url = `${this.hostPort}/credentials/new-email-uuid/${emailAddress}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'text/plain',
        'correlationId': this.uuidGenerator.generateUUID()
      })
    };

    return this.httpClient
      .get<string>(url, httpOptions)
      .map(data => {
        return data;
      });
  }

}
