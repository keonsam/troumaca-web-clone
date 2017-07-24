import {SignUpRepository} from "../../sign-up/sign.up.repository";
import {SignUpClient} from "../../client/sign-up/sign.up.client";

export class SignUpRepositoryAdapter extends SignUpRepository {

  constructor(private signUpClient: SignUpClient) {
    super();
  }

}