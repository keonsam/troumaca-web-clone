import "rxjs/add/operator/map";
import {AuthenticationClient} from "../../client/authentication/authentication.client";
import {ChangePasswordRepository} from "../../security/change-password/change.password.repository";

export class ChangePasswordRepositoryAdapter extends ChangePasswordRepository {

  constructor(private authenticationClient: AuthenticationClient) {
    super();
  }

}