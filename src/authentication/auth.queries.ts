import gql from 'graphql-tag';

export const USERNAME_GQL = gql`
  query validateUsername($username: String!) {
    validateUsername(username: $username)
  }
`;

export const PASSWORD_GQL = gql`
  query validatePassword($password: String!) {
    validatePassword(password: $password)
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
      status
      code
    }
  }
`;

export const RESEND_CODE_GQL = gql`
  mutation resendCode($confirmationId: ID!, $credentialId: ID!) {
    resendCode(confirmationId: $confirmationId, credentialId: $credentialId) {
      status
      credentialId
      confirmationId
    }
  }
`;

export const LOGIN_GQL = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      authenticateStatus
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
  mutation changePassword($credentialId: ID!, $username: String!, $password: String!, $code: String!) {
    changePassword( data : { credentialId: $credentialId, username: $username, password: $password, code: $code } )
  }
`;
