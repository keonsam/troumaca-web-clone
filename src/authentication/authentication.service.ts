import {Observable} from 'rxjs';
import { Credential } from './credential';
import { ValidResponse} from './valid.response';
import { Confirmation } from './confirmation';
import {AuthenticatedCredential} from './authenticated.credential';
import {ChangePassword} from './change.password';
import {ChangeResponse} from './change.response';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {map} from 'rxjs/operators';

export class AuthenticationService {

  constructor(private apollo: Apollo) {
  }

  isValidUsername(username: string): Observable<ValidResponse> {
    return this.apollo.mutate( {
      mutation: gql`
        mutation validateUsername($username: String!) {
          validateUsername(username: $username) {
            valid
          }
        }
      `,
      variables: {
        username
      }
    }).pipe(map( res => {
      return res.data.validateUsername;
      }));
  }

  isValidPassword(password: string): Observable<ValidResponse> {
    return this.apollo.mutate( {
      mutation: gql`
        mutation validatePassword($password: String!) {
          validatePassword(password: $password) {
            valid
          }
        }
      `,
      variables: {
        password
      }
    }).pipe(map( res => {
      return res.data.validatePassword;
    }));
  }

  addCredential(credential: Credential): Observable<Confirmation> {
    return this.apollo.mutate( {
      mutation: gql`
        mutation register(
          $username: String!,
          $companyName: String, $accountType: String!, $usernameType: String!, $password: String!, $confirmedPassword: String!) {
          register(
            username: $username,
            companyName: $companyName,
            accountType: $accountType, usernameType: $usernameType, password: $password, confirmedPassword:$confirmedPassword) {
            confirmationId
            credentialId
          }
        }
      `,
      variables: {
        username: credential.username,
        companyName: credential.companyName,
        accountType: credential.accountType,
        usernameType: credential.usernameType,
        password: credential.password,
        confirmedPassword: credential.confirmedPassword
      }
    }).pipe(map( res => {
      return res.data.register;
    }));
  }

  verifyConfirmation(confirmation: Confirmation): Observable<Confirmation> {
    return this.apollo.mutate( {
      mutation: gql`
        mutation confirmation($confirmationId: ID!, $credentialId: ID!, $code: String!) {
          confirmation(confirmationId: $confirmationId, credentialId: $credentialId, code: $code) {
            status
            code
          }
        }
      `,
      variables: {
        confirmationId: confirmation.confirmationId,
        credentialId: confirmation.credentialId,
        code: confirmation.code,
      }
    }).pipe(map( res => {
      return res.data.confirmation;
    }));
  }

  resendConfirmationCode(confirmationId: string, credentialId: string): Observable<Confirmation> {
    return undefined;
    // return this.authenticationRepository.resendConfirmationCode(confirmationId, credentialId);
  }

  authenticate(credential: Credential): Observable<AuthenticatedCredential> {
    return this.apollo.mutate( {
      mutation: gql`
        mutation login($username: String!, $password: String!) {
          login(username: $username, password: $password) {
            authenticateStatus
          }
        }
      `,
      variables: {
        username: credential.username,
        password: credential.password,
      }
    }).pipe(map( res => {
      return res.data.login;
    }));
  }

  forgotPassword(username: string): Observable<Confirmation> {
    return this.apollo.mutate( {
      mutation: gql`
        mutation forgetPassword($username: String!) {
          forgetPassword(username: $username,) {
            credentialId
            confirmationId
          }
        }
      `,
      variables: {
        username
      }
    }).pipe(map( res => {
      return res.data.forgetPassword;
    }));
  }

  changePassword(changePassword: ChangePassword): Observable<boolean> {
    return this.apollo.mutate( {
      mutation: gql`
        mutation changePassword($credentialId: ID!, $username: String!, $password: String!, $code: String!) {
          changePassword(
            changePassword : {
            credentialId: $credentialId,
            username: $username,
            password: $password,
            code: $code
          }
          )
        }
      `,
      variables: {
        credentialId: changePassword.credentialId,
        username: changePassword.username,
        password: changePassword.password,
        code: changePassword.code
      }
    }).pipe(map( res => {
      return res.data.changePassword;
    }));
  }

}
