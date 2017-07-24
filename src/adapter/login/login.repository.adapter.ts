import {LoginRepository} from "../../login/login.repository";
import {LoginClient} from "../../client/login/login.client";

export class LoginRepositoryAdapter extends LoginRepository {

  constructor(private loginClient: LoginClient) {
    super();
  }

}