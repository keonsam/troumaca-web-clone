import {Session} from "./session";
import {LoginModel} from "./login.model";
import {Observable} from "rxjs/Observable";

export abstract class LoginRepository {
  abstract authenticate(loginModel:LoginModel):Observable<Session>;
}