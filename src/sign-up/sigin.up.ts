import {SignUpModel} from './sign.up.model';
import isEmail from 'validator/lib/isEmail';
import isNumeric from 'validator/lib/isNumeric';
import { parse, format, isValidNumber } from 'libphonenumber-js'

export class SignUp {

  constructor(private signUpModel: SignUpModel) {
  }

  public isEmailOrPhone(): boolean {
    const username = this.signUpModel.username;

    if (!username) {
      return false
    }

    const validEmail: boolean = isEmail(username);

    if (validEmail) {
      return validEmail;
    }

    const validNumber = isNumeric(username);

    if (!validNumber) {
      return validNumber;
    }

    return  isValidNumber(parse(username));
  }
}
