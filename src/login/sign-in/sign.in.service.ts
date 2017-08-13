import {SignInRepository} from "./sign.in.repository";
import {SignIn} from "./sign.in";
import {SignInModel} from "./sign.in.model";
import {Session} from "./session";
import {Observable} from "rxjs/Observable";
import {Cookie} from 'ng2-cookies/ng2-cookies';

export class SignInService {

  private sessionIdName:string = "troumaca-session-id";
  private rememberMeName:string = "troumaca-remember-me";

  constructor(private loginRepository: SignInRepository) {
  }

  public isEmailOrPassword(emailOrPassword:string) {
    let loginModel:SignInModel = new SignInModel(emailOrPassword);

    let login:SignIn = new SignIn(loginModel);

    return login.isEmailOrPhone();
  }

  public authenticate(loginModel:SignInModel):Observable<Session> {
    let that = this;
    return this
      .loginRepository
      .authenticate(loginModel)
      .map((session) => {

        Cookie.set(that.sessionIdName, session.sessionId);

        if (loginModel.rememberMe) {
          Cookie.set(this.rememberMeName, String(loginModel.rememberMe));
        }

        return session;
      });
  }

}