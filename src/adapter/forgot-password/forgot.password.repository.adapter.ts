import "rxjs/add/operator/map";
import {ForgotPasswordRepository} from "../../login/forgot-password/forgot.password.repository";
import {Observable} from "rxjs/Observable";
import {AuthenticationClient} from "../../client/authentication/authentication.client";

export class ForgotPasswordRepositoryAdapter extends ForgotPasswordRepository {

  constructor(private loginClient:AuthenticationClient) {
    super();
  }

  createForgotPasswordMessage(username: string): Observable<boolean> {
    return this.loginClient.sendForgotPasswordMessage(username);
  }

}