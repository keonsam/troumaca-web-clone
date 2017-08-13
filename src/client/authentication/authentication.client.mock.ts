import {AuthenticationClient} from "./authentication.client";
import {Observable} from "rxjs/Observable";
import {AuthenticationSessionState} from "./authentication.session.state";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import {UUIDGenerator} from "../../uuid.generator";

export class AuthenticationClientMock extends AuthenticationClient {

  constructor(private uuidGenerator: UUIDGenerator) {
    super();
  }

  authenticate(emailOrPhone: string, password: string): Observable<AuthenticationSessionState> {
    let username:string = "mfwilliams@gmail.com";
    let pWord:string = "password";
    return Observable
      .of(emailOrPhone && emailOrPhone == username && password && password == pWord)
      .map(value => {

        if (!value) {
          return Observable.throw(new Error('Invalid credentials'));
        }

        let sessionState:AuthenticationSessionState = new AuthenticationSessionState();
        sessionState.sessionId = this.uuidGenerator.generateUUID();
        sessionState.created = new Date();
        sessionState.modified = new Date();
        sessionState.partyId = this.uuidGenerator.generateUUID();
        sessionState.data = new Map<string, Object>();
        return sessionState;
      });

  }


  sendForgotPasswordMessage(emailOrPhone: string): Observable<boolean> {
    let number = Math.random() % 2;
    number = number > 0.5 ? 1 : 0;
    return (number == 0 ? Observable.of(true) : Observable.of(false));
  }

}