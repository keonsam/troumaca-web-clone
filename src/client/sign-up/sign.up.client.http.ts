import {SignUpClient} from './sign.up.client';
import {UUIDGenerator} from '../../uuid.generator';
import {SignUpState} from './sign.up.state';
import {Observable} from 'rxjs/Observable';

export class SignUpClientHttp extends SignUpClient {

  constructor(private uuidGenerator: UUIDGenerator) {
    super();
  }

  registerPerson(signUpState: SignUpState): Observable<boolean> {
    return null;
  }
}
