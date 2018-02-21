import {Session} from "./session";
import {Credential} from "./credential";
import {Observable} from "rxjs/Observable";

export abstract class AuthenticationRepository {
  abstract authenticate(credential:Credential):Observable<Session>;
  abstract forgotPassword(username: string):Observable<boolean>;
  abstract isValidUsername(username: string):Observable<boolean>;
  abstract isValidPassword(password: string):Observable<boolean>;
  abstract addCredential(credential:Credential):Observable<Credential>;
}