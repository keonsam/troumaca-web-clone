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
  mutation register($username: String!, $companyName: String, $password: String!) {
    register( data: { username: $username, companyName: $companyName, password: $password }) {
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
