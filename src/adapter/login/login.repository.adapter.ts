import {LoginRepository} from "../../login/login.repository";
import {LoginModel} from "../../login/login.model";
import {Observable} from "rxjs/Observable";
import {Session} from "../../login/session";
import "rxjs/add/operator/map";
import {mapObjectProps} from "../../mapper/object.property.mapper";
import {AuthenticationClient} from "../../client/credential/authentication.client";

export class LoginRepositoryAdapter extends LoginRepository {

  constructor(private authenticationClient: AuthenticationClient) {
    super();
  }

  authenticate(loginModel: LoginModel): Observable<Session> {
    // return this.loginClient
    //   .authenticate(loginModel.username, loginModel.password)
    //   .map(value => {
    //     return mapObjectProps(value, new Session());
    //   });
    throw new Error("Not Implemented.")
  }

}