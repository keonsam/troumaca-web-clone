import {Observable} from 'rxjs';
import { Credential } from './credential';
import { Confirmation } from './confirmation';
import {ChangePassword} from './change.password';
import {Apollo} from 'apollo-angular';
import {map} from 'rxjs/operators';
import {
  CHANGE_PASS_GQL,
  CONFIRMATION_GQL,
  CREDENTIAL_GQL,
  FORGET_GQL,
  LOGIN_GQL,
  PASSWORD_GQL,
  RESEND_CODE_GQL,
  USERNAME_GQL
} from './auth.queries';
import { User} from './user';
import {IsValid} from './isValid';
import {AuthenticatedCredential} from './authenticated.credential';

export class AuthenticationService {

  constructor(private apollo: Apollo) {
  }

  isValidUsername(username: string): Observable<IsValid> {
    return this.apollo.query( {
      query: USERNAME_GQL,
      variables: {
        username
      }
    }).pipe(map( (res: any) => {
      return res ? res.data.validateUsername : res;
      }));
  }

  isValidPassword(password: string): Observable<IsValid> {
    return this.apollo.query( {
      query: PASSWORD_GQL,
      variables: {
        password
      }
    }).pipe(map( (res: any) => {
      return res ? res.data.validatePassword : res;
    }));
  }

  addCredential(user: User, credential: Credential): Observable<Confirmation> {
    return this.apollo.mutate( {
      mutation: CREDENTIAL_GQL,
      variables: {
        firstName: user.firstName,
        lastName: user.lastName,
        organizationName: credential.companyName || '',
        username: credential.username,
        password: credential.password,
      }
    }).pipe(map( (res: any) => {
      return res ?  res.data.register : res;
    }));
  }

  verifyConfirmation(confirmation: Confirmation): Observable<IsValid> {
    return this.apollo.mutate( {
      mutation: CONFIRMATION_GQL,
      variables: {
        confirmationId: confirmation.confirmationId,
        credentialId: confirmation.credentialId,
        code: confirmation.code,
      }
    }).pipe(map( (res: any) => {
      return res ? res.data.confirmation : res;
    }));
  }

  resendConfirmationCode(confirmationId: string, credentialId: string): Observable<IsValid> {
    return this.apollo.mutate( {
      mutation: RESEND_CODE_GQL,
      variables: {
        confirmationId: confirmationId,
        credentialId: credentialId,
      }
    }).pipe(map( (res: any) => {
      return res ? res.data.resendCode : res;
    }));
  }

  authenticate(credential: Credential): Observable<AuthenticatedCredential> {
    return this.apollo.mutate( {
      mutation: LOGIN_GQL,
      variables: {
        username: credential.username,
        password: credential.password,
      }
    }).pipe(map( (res: any) => {
      return res ? res.data.login : res;
    }));
  }

  forgotPassword(username: string): Observable<Confirmation> {
    return this.apollo.mutate( {
      mutation: FORGET_GQL,
      variables: {
        username
      }
    }).pipe(map( (res: any) => {
      return res ? res.data.forgetPassword : res;
    }));
  }

  changePassword(changePassword: ChangePassword): Observable<IsValid> {
    return this.apollo.mutate( {
      mutation: CHANGE_PASS_GQL,
      variables: {
        confirmationId: changePassword.confirmationId,
        credentialId: changePassword.credentialId,
        oldPassword: changePassword.oldPassword || '',
        newPassword: changePassword.newPassword,
        code: changePassword.code
      }
    }).pipe(map((res: any) => {
      return res ? res.data.changePassword : res;
    }));
  }

}
