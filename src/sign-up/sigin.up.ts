import {SignUpModel} from "./sign.up.model";
import isEmail from 'validator/lib/isEmail';
import isNumeric from 'validator/lib/isNumeric';
import { parse, format, asYouType, isValidNumber } from 'libphonenumber-js'

export class SignUp {
  private country:string = "US";

  constructor(private signUpModel:SignUpModel) {
  }

  public isEmailOrPhone():boolean {
    let emailOrPhone = this.signUpModel.username;

    if (!emailOrPhone) {
      return false
    }

    let validEmail:boolean = isEmail(emailOrPhone);

    if (validEmail) {
      return validEmail;
    }

    let validNumber = isNumeric(emailOrPhone);

    if (!validNumber) {
      return validNumber;
    }

    return  isValidNumber(emailOrPhone, this.country);
  }
}