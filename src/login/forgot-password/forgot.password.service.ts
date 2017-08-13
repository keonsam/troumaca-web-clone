import {ForgotPasswordRepository} from "./forgot.password.repository";
import {Observable} from "rxjs/Observable";

export class ForgotPasswordService {

  constructor(private forgotPasswordRepository: ForgotPasswordRepository) {
  }


  sendForgotPasswordMessage(username: string):Observable<boolean> {
    return this.forgotPasswordRepository.createForgotPasswordMessage(username);
  }
}