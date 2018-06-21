
import {SignUpModel} from './sign.up.model';

export abstract class SignUpRepository {
  abstract registerPerson(signInModel: SignUpModel)
}
