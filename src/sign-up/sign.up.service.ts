import {SignUpRepository} from './sign.up.repository';
import {SignUpModel} from './sign.up.model';
import {SignUp} from './sigin.up';
import {Observable} from 'rxjs/Observable';

export class SignUpService {

  constructor(private signUpRepository: SignUpRepository) {
  }
  public isEmailOrPassword(emailOrPassword: string) {
    const signUpModel: SignUpModel = new SignUpModel(emailOrPassword);

    const signUp: SignUp = new SignUp(signUpModel);

    return signUp.isEmailOrPhone();
  }

  registerPerson(signInModel: SignUpModel): Observable<boolean> {
    return this.signUpRepository.registerPerson(signInModel);
  }
}
