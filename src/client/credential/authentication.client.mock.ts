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
    var that = this;
    return Observable.create(function(observer) {

        if (!(emailOrPhone && emailOrPhone == username && password && password == pWord)) {
          observer.error('Invalid credentials');
        } else {
          let sessionState:AuthenticationSessionState = new AuthenticationSessionState();
          sessionState.sessionId = that.uuidGenerator.generateUUID();
          sessionState.created = new Date();
          sessionState.modified = new Date();
          sessionState.partyId = that.uuidGenerator.generateUUID();
          sessionState.data = new Map<string, Object>();
          observer.next(sessionState);
        }
      });

  }


  sendForgotPasswordMessage(emailOrPhone: string): Observable<boolean> {
    let number = Math.random() % 2;
    number = number > 0.5 ? 1 : 0;
    return (number == 0 ? Observable.of(true) : Observable.of(false));
  }

}