import { UserRepository} from './user.repository';
import {Observable} from 'rxjs';
import {AccessRole} from '../../access-roles/access.role';
import {Users} from '../users';
import {User} from '../user';
import { Credential } from '../../authentication/credential';
import {ValidResponse} from '../../authentication/valid.response';
import {UserMe} from './user-me/user.me';
import gql from 'graphql-tag';
import {map} from 'rxjs/operators';
import {Apollo} from 'apollo-angular';
import {UUIDGenerator} from '../../uuid.generator';

export class UserService {

  uuid = new UUIDGenerator();

  constructor(private apollo: Apollo) {}

  findAccessRole(searchStr: string, pageSize: number): Observable<AccessRole[]> {
    return undefined;
    // return this.userRepository.findAccessRole(searchStr, pageSize);
  }

  getUsers(pageNumber: number, pageSize: number, sortOrder: string): Observable<Users> {
    return this.apollo.query({
      query: gql`
        query getPersons($pageNumber: Int!, $pageSize: Int!, $sortOrder: String!) {
          getPersons(pageNumber: $pageNumber, pageSize: $pageSize, sortOrder: $sortOrder) {
            persons {
              firstName
              middleName
              lastName
            }
            page {
              number
              size
              items
              totalItems
            }
          }
        }
      `,
      variables: {
        pageNumber,
        pageSize,
        sortOrder
      }
    }).pipe(map((res: any) => res.data.getPersons));
  }

  getUser(partyId?: string): Observable<User> {
    return this.apollo.query({
      query: gql`
        query getPerson($partyId: ID!) {
          getPerson(partyId: $partyId) {
            partyId
            firstName
            middleName
            lastName
          }
        }
      `,
      variables: {
        partyId: partyId
      }
    }).pipe(map((res: any) => res.data.getPerson));
  }

  addUser(user: User, credential: Credential, partyAccessRoles: string[]): Observable<User> {
    return this.apollo.mutate({
      mutation: gql`
        mutation addPerson(
          $firstName: String!
          $middleName: String
          $lastName: String!
          $version: String!
          $partyAccessRoles: [String]
          $username: String
        ) {
          addPerson(
            person: {
              firstName: $firstName
              middleName: $middleName
              lastName: $lastName
              version: $version
            }
            credential: {
              username: $username,
              version: $version
            }
            partyAccessRoles: {
              accessRoleId: $partyAccessRoles
              version: $version
            }
          ) {
            partyId
          }
        }
      `,
      variables: {
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        partyAccessRoles: partyAccessRoles,
        username: credential.username,
        version: this.uuid.generateUUID()
      }
    }).pipe(map((res: any) => res.data.addPerson));
  }

  updateUser(user: User, credential: Credential, partyAccessRoles: string[]): Observable<number> {
    return this.apollo.mutate({
      mutation: gql`
        mutation updatePerson(
        $partyId: ID!
        $firstName: String!
        $middleName: String
        $lastName: String!
        $version: String!
        $partyAccessRoles: [String]
        $username: String
        ) {
          updatePerson(
            partyId: $partyId,
            person: {
              firstName: $firstName
              middleName: $middleName
              lastName: $lastName
              version: $version
            }
            credential: {
              username: $username,
              version: $version
            }
            partyAccessRoles: {
              accessRoleId: $partyAccessRoles
              version: $version
            }
          )
        }
      `,
      variables: {
        partyId: user.partyId,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        partyAccessRoles: partyAccessRoles,
        username: credential.username,
        version: user.version
      }
    }).pipe(map((res: any) => res.data.updatePerson));
  }

  deleteUser(partyId: string): Observable<number> {
    return this.apollo.mutate({
      mutation: gql`
        mutation deletePerson($partyId: ID!) {
          deletePerson(partyId: $partyId)
        }
      `,
      variables: {
        partyId: partyId,
      }
    }).pipe(map((res: any) => res.data.deletePerson));
  }
  
  getUserMe(): Observable<UserMe> {
    return undefined;
    // return this.userRepository.getUserMe();
  }

  updateUserMe(user: User, credential: Credential): Observable<number> {
    return undefined;
    // return this.userRepository.updateUserMe(user, credential);
  }

  // Validation

  isValidUsername(username: string, partyId?: string): Observable<ValidResponse> {
    return undefined;
    // return this.userRepository.isValidUsername(username, partyId);
  }

  isValidPassword(password: string): Observable<ValidResponse> {
    return undefined;
    // return this.userRepository.isValidPassword(password);
  }
}
