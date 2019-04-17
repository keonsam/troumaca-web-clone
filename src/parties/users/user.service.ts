import {Observable} from 'rxjs';
import {User} from '../user';
import { Credential } from '../../authentication/credential';
import {ValidResponse} from '../../authentication/valid.response';
import {UserMe} from './user-me/user.me';
import {Apollo} from 'apollo-angular';
import {UUIDGenerator} from '../../uuid.generator';
import gql from 'graphql-tag';
import {map} from 'rxjs/operators';

export class UserService {

  uuid = new UUIDGenerator();

  constructor(private apollo: Apollo) {
  }

  getUserMe(): Observable<UserMe> {
    return this.apollo.query({
      query: gql`
        query getUser {
          getUser {
            partyId
            firstName
            middleName
            lastName
            username
            version
          }
        }
      `,
    }).pipe(map((res: any) => res.data.getUser));
  }

  updateUserMe(user: User, credential: Credential): Observable<number> {
    return this.apollo.mutate({
      mutation: gql`
        mutation updateUser(
        $firstName: String!
        $middleName: String
        $lastName: String!
        $version: String!
        $username: String!
        $password: String
        ) {
          updateUser(
            user: {
              firstName: $firstName,
              middleName: $middleName,
              lastName: $lastName,
              version: $version,
            },
            credential: {
              username: $username,
              password: $password,
              version: $version,
            }
          )
        }
      `,
      variables: {
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        version: user.version,
        username: credential.username,
        password: credential.password
      }
    }).pipe(map((res: any) => res.data.updateUser));
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
