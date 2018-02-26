import isEmail from 'validator/lib/isEmail';
import isNumeric from 'validator/lib/isNumeric';
import {parse, format, isValidNumber, CountryCode} from 'libphonenumber-js'
import {Credential} from "./credential";

export class Login {

  private countryCode:CountryCode = null;

  constructor(private credential:Credential) {
  }

  public isEmailOrPhone():boolean {
    let username = this.credential.username;

    if (!username) {
      return false
    }

    let validEmail:boolean = isEmail(username);

    if (validEmail) {
      return validEmail;
    }

    let validNumber = isNumeric(username);

    if (!validNumber) {
      return validNumber;
    }

    return  isValidNumber(parse(username));
  }

}