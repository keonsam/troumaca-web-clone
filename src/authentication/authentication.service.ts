import {Observable} from 'rxjs';
import {AuthenticationRepository} from './authentication.repository';
import { Credential } from './credential';
import { ValidResponse} from './valid.response';
import { Confirmation } from './confirmation';
import {AuthenticatedCredential} from './authenticated.credential';
import {User} from '../parties/user';
import {ChangePassword} from "./change.password";
import {ChangeResponse} from "./change.response";
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {map} from 'rxjs/operators';

export class AuthenticationService {

  validateUsername = gql`
    mutation validateUsername($username: String!) {
      validateUsername(username: $username) {
        valid
      }
    }
  `;

  validatePassword = gql`
    mutation validatePassword($password: String!) {
      validatePassword(password: $password) {
        valid
      }
    }
  `;

  register = gql`
    mutation register($username: String!, $password: String!, $firstName: String!, $lastName: String!) {
      register(username: $username, password: $password, firstName: $firstName, lastName: $lastName) {
        confirmationId
        credentialId
      }
    }
  `;

  confirmation = gql`
    mutation confirmation($confirmationId: ID!, $credentialId: ID!, $code: String!) {
      confirmation(confirmationId: $confirmationId, credentialId: $credentialId, code: $code) {
        status
      }
    }
  `;

  login = gql`
    mutation login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        authenticateStatus
      }
    }
  `;

  constructor(private apollo: Apollo) {
  }

  isValidUsername(username: string): Observable<ValidResponse> {
    return this.apollo.mutate( {
      mutation: this.validateUsername,
      variables: {
        username
      }
    }).pipe(map( res => {
      return res.data.validateUsername;
      }));
  }

  isValidPassword(password: string): Observable<ValidResponse> {
    return this.apollo.mutate( {
      mutation: this.validatePassword,
      variables: {
        password
      }
    }).pipe(map( res => {
      return res.data.validatePassword;
    }));
  }

  addCredential(credential: Credential, user: User): Observable<Confirmation> {
    return this.apollo.mutate( {
      mutation: this.register,
      variables: {
        username: credential.username,
        password: credential.password,
        firstName: user.firstName,
        lastName: user.lastName
      }
    }).pipe(map( res => {
      return res.data.register;
    }));
  }

  verifyConfirmation(confirmation: Confirmation): Observable<Confirmation> {
    return this.apollo.mutate( {
      mutation: this.confirmation,
      variables: {
        confirmationId: confirmation.confirmationId,
        credentialId: confirmation.credentialId,
        code: confirmation.code,
      }
    }).pipe(map( res => {
      return res.data.confirmation;
    }));
  }

  authenticate(credential: Credential): Observable<AuthenticatedCredential> {
    return this.apollo.mutate( {
      mutation: this.login,
      variables: {
        username: credential.username,
        password: credential.password,
      }
    }).pipe(map( res => {
      return res.data.login;
    }));
  }

  forgotPassword(credential: Credential): Observable<Confirmation> {
    return undefined;
    // return this.authenticationRepository.forgotPassword(credential);
  }

  resendConfirmationCode(confirmationId: string, credentialId: string): Observable<Confirmation> {
    return undefined;
    // return this.authenticationRepository.resendConfirmationCode(confirmationId, credentialId);
  }

  changePassword(changePassword: ChangePassword): Observable<ChangeResponse> {
    return undefined;
    // return this.authenticationRepository.changePassword(changePassword);
  }

}
