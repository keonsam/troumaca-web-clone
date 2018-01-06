import {Observable} from "rxjs/Observable";
import {AuthenticationSessionState} from "./authentication.session.state";

export abstract class AuthenticationClient {
  abstract authenticate(emailOrPhone: string, password: string):Observable<AuthenticationSessionState>;
  abstract sendForgotPasswordMessage(emailOrPhone: string):Observable<boolean>;
}