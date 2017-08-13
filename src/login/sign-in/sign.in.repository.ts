import {Session} from "./session";
import {SignInModel} from "./sign.in.model";
import {Observable} from "rxjs/Observable";

export abstract class SignInRepository {
  abstract authenticate(signInModel:SignInModel):Observable<Session>;
}