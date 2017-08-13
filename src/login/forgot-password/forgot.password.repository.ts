import {Observable} from "rxjs/Observable";

export abstract class ForgotPasswordRepository {
  abstract createForgotPasswordMessage(username: string):Observable<boolean>
}