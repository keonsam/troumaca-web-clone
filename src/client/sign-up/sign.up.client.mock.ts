import {SignUpClient} from './sign.up.client';
import {SignUpState} from './sign.up.state';
import {Observable, of} from 'rxjs';

export class SignUpClientMock extends SignUpClient {
  registerPerson(signUpState: SignUpState): Observable<boolean> {
    let number = Math.random() % 2;
    number = number > 0.5 ? 1 : 0;
    return (number === 0 ? of(true) : of(false));
  }
}
