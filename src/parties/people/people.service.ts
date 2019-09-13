// import {Observable} from 'rxjs';
// import {AccessRole} from '../../access-roles/access.role';
// import { Credential } from '../../authentication/credential';
// import {ValidResponse} from '../../authentication/valid.response';
// import gql from 'graphql-tag';
// import {map} from 'rxjs/operators';
// import {Apollo} from 'apollo-angular';
// import {UUIDGenerator} from '../../uuid.generator';
// import { Person } from './people-form/person';
// import { Persons } from './people-list/persons';
//
// export class PeopleService {
//
//   uuid = new UUIDGenerator();
//
//   constructor(private apollo: Apollo) { }
//
//   findAccessRole(searchStr: string, pageSize: number): Observable<AccessRole[]> {
//     return this.apollo.query( {
//       query: gql`
//         query findAccessRoles($searchStr: String!, $pageSize: Int!) {
//           findAccessRoles(searchStr: $searchStr, pageSize: $pageSize) {
//             accessRoleId
//             name
//           }
//         }
//       `,
//       variables: {
//         searchStr,
//         pageSize
//       }
//     }).pipe(map( (res: any) => res.data.findAccessRoles));
//   }
//
//   getPersons(pageNumber: number, pageSize: number, sortOrder: string): Observable<Persons> {
//     return this.apollo.query({
//       query: gql`
//         query getPersons($pageNumber: Int!, $pageSize: Int!, $sortOrder: String!) {
//           getPersons(pageNumber: $pageNumber, pageSize: $pageSize, sortOrder: $sortOrder) {
//             persons {
//               firstName
//               middleName
//               lastName
//             }
//             page {
//               number
//               size
//               items
//               totalItems
//             }
//           }
//         }
//       `,
//       variables: {
//         pageNumber,
//         pageSize,
//         sortOrder
//       }
//     }).pipe(map((res: any) => res.data.getPersons));
//   }
//
//   getPerson(partyId?: string): Observable<Person> {
//     return this.apollo.query({
//       query: gql`
//         query getPerson($partyId: ID!) {
//           getPerson(partyId: $partyId) {
//             partyId
//             firstName
//             middleName
//             lastName
//           }
//         }
//       `,
//       variables: {
//         partyId: partyId
//       }
//     }).pipe(map((res: any) => res.data.getPerson));
//   }
//
//   addPerson(person: Person, credential: Credential, partyAccessRoles: string[]): Observable<Person> {
//     return this.apollo.mutate({
//       mutation: gql`
//         mutation addPerson(
//         $firstName: String!
//         $middleName: String
//         $lastName: String!
//         $version: String!
//         $partyAccessRoles: [String]
//         $username: String
//         ) {
//           addPerson(
//             person: {
//               firstName: $firstName
//               middleName: $middleName
//               lastName: $lastName
//               version: $version
//             }
//             credential: {
//               username: $username,
//               version: $version
//             }
//             partyAccessRoles: {
//               accessRoleId: $partyAccessRoles
//               version: $version
//             }
//           ) {
//             partyId
//           }
//         }
//       `,
//       variables: {
//         firstName: person.firstName,
//         middleName: person.middleName,
//         lastName: person.lastName,
//         partyAccessRoles: partyAccessRoles,
//         username: credential.username,
//         version: this.uuid.generateUUID()
//       }
//     }).pipe(map((res: any) => res.data.addPerson));
//   }
//
//   updatePerson(person: Person, credential: Credential, partyAccessRoles: string[]): Observable<number> {
//     return this.apollo.mutate({
//       mutation: gql`
//         mutation updatePerson(
//         $partyId: ID!
//         $firstName: String!
//         $middleName: String
//         $lastName: String!
//         $version: String!
//         $partyAccessRoles: [String]
//         $username: String
//         ) {
//           updatePerson(
//             partyId: $partyId,
//             person: {
//               firstName: $firstName
//               middleName: $middleName
//               lastName: $lastName
//               version: $version
//             }
//             credential: {
//               username: $username,
//               version: $version
//             }
//             partyAccessRoles: {
//               accessRoleId: $partyAccessRoles
//               version: $version
//             }
//           )
//         }
//       `,
//       variables: {
//         partyId: person.partyId,
//         firstName: person.firstName,
//         middleName: person.middleName,
//         lastName: person.lastName,
//         partyAccessRoles: partyAccessRoles,
//         username: credential.username,
//         version: person.version
//       }
//     }).pipe(map((res: any) => res.data.updatePerson));
//   }
//
//   deletePerson(partyId: string): Observable<number> {
//     return this.apollo.mutate({
//       mutation: gql`
//         mutation deletePerson($partyId: ID!) {
//           deletePerson(partyId: $partyId)
//         }
//       `,
//       variables: {
//         partyId: partyId,
//       }
//     }).pipe(map((res: any) => res.data.deletePerson));
//   }
//
//   // Validation
//
//   isValidUsername(username: string, partyId?: string): Observable<ValidResponse> {
//     return undefined;
//     // return this.personRepository.isValidUsername(username, partyId);
//   }
// }
