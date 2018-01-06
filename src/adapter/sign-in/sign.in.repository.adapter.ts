import {SignInRepository} from "../../login/sign-in/sign.in.repository";
import {SignInModel} from "../../login/sign-in/sign.in.model";
import {Observable} from "rxjs/Observable";
import {Session} from "../../login/sign-in/session";
import "rxjs/add/operator/map";
import {mapObjectProps} from "../../mapper/object.property.mapper";
import {AuthenticationClient} from "../../client/credentials/authentication.client";

export class SignInRepositoryAdapter extends SignInRepository {

  constructor(private loginClient: AuthenticationClient) {
    super();
  }

  authenticate(loginModel: SignInModel): Observable<Session> {
    return this.loginClient
      .authenticate(loginModel.emailOrPhone, loginModel.password)
      .map(value => {
        return mapObjectProps(value, new Session());
      });
  }

}