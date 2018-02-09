import {AuthenticationClient} from "./authentication.client";
import {UUIDGenerator} from "../../uuid.generator";
import {Observable} from "rxjs/Observable";
import {AuthenticationSessionState} from "./authentication.session.state";

export class AuthenticationClientHttp extends AuthenticationClient {

  constructor(private uuidGenerator: UUIDGenerator) {
    super();
  }

  authenticate(emailOrPhone: string, password: string): Observable<AuthenticationSessionState> {
    return undefined;
  }


  sendForgotPasswordMessage(emailOrPhone: string): Observable<boolean> {
    return null;
  }

}