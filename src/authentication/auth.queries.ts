import gql from 'graphql-tag';

export const USERNAME_GQL = gql`
  query validateUsername($username: String!) {
    validateUsername(username: $username) {
      valid
    }
  }
`;

export const PASSWORD_GQL = gql`
  query validatePassword($password: String!) {
    validatePassword(password: $password) {
      valid
    }
  }
`;

export const CREDENTIAL_GQL = gql`
  mutation register($firstName: String!, $lastName: String!, $organizationName: String, $username: String!, $password: String!) {
    register( data: { firstName: $firstName, lastName: $lastName, organizationName: $organizationName, username: $username, password: $password }) {
      confirmationId
      credentialId
    }
  }
`;

export const CONFIRMATION_GQL = gql`
  mutation confirmation($confirmationId: ID!, $credentialId: ID!, $code: String!) {
    confirmation( data: { confirmationId: $confirmationId, credentialId: $credentialId, code: $code }) {
      valid
    }
  }
`;

export const RESEND_CODE_GQL = gql`
  mutation resendCode($confirmationId: ID!, $credentialId: ID!) {
    resendCode(confirmationId: $confirmationId, credentialId: $credentialId) {
      valid
    }
  }
`;

export const LOGIN_GQL = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      valid
    }
  }
`;

export const FORGET_GQL = gql`
  mutation forgetPassword($username: String!) {
    forgetPassword(username: $username) {
      credentialId
      confirmationId
    }
  }
`;

export const CHANGE_PASS_GQL = gql`
  mutation changePassword($confirmationId: ID!, $credentialId: ID!, $oldPassword: String! $newPassword: String!, $code: String!) {
    changePassword( data : { confirmationId: $confirmationId, credentialId: $credentialId, oldPassword: $oldPassword,  newPassword: $newPassword, code: $code } ) {
      valid
    }
  }
`;
