import {SignUpRepository} from "../../sign-up/sign.up.repository";
import {SignUpClient} from "../../client/sign-up/sign.up.client";
import {mapObjectProps} from "../../mapper/object.property.mapper";
import {SignUpState} from "../../client/sign-up/sign.up.state";
import {SignUpModel} from "../../sign-up/sign.up.model";

export class SignUpRepositoryAdapter extends SignUpRepository {

  constructor(private signUpClient: SignUpClient) {
    super();
  }

  registerPerson(signInModel: SignUpModel) {
    return this.signUpClient
      .registerPerson(mapObjectProps(signInModel, new SignUpState()));
  }

}