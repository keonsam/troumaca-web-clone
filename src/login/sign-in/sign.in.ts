import {SignInModel} from "./sign.in.model";
import isEmail from 'validator/lib/isEmail';
import isNumeric from 'validator/lib/isNumeric';
import {parse, format, asYouType, isValidNumber, CountryCode} from 'libphonenumber-js'

export class SignIn {

  private countryCode:CountryCode = null;

  constructor(private loginModel:SignInModel) {
  }

  public isEmailOrPhone():boolean {
    let emailOrPhone = this.loginModel.emailOrPhone;

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

    return  isValidNumber(parse(emailOrPhone));
  }

}