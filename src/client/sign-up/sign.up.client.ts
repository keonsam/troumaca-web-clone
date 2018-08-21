import {SignUpState} from './sign.up.state';
import {Observable} from 'rxjs';

export abstract class SignUpClient {
  abstract registerPerson(signUpState: SignUpState): Observable<boolean>;
}
