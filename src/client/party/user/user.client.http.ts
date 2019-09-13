// import {UserClient} from './user.client';
// import {UUIDGenerator} from '../../../uuid.generator';
// import {HttpClient, HttpHeaders} from '@angular/common/http';
// import {Observable} from 'rxjs';
// import { AccessRole } from '../../../access-roles/access.role';
// import {map} from 'rxjs/operators';
// import { Users } from '../../../parties/users';
// import { User } from '../../../parties/user';
// import { Credential } from '../../../authentication/credential';
// import {ValidResponse} from '../../../authentication/valid.response';
// import {environment} from '../../../environments/environment';
// import {UserMe} from '../../../parties/users/user-me/user.me';
//
// export class UserClientHttp implements UserClient {
//
//   hostPort = environment.hostPort;
//
//   constructor(private uuidGenerator: UUIDGenerator,
//               private httpClient: HttpClient) {
//   }
//
//   findAccessRole(searchStr: string, pageSize: number): Observable<AccessRole[]> {
//     const url = `${this.hostPort}/access-roles/find?q=${searchStr}&pageSize=${pageSize}`;
//
//     const httpOptions = {
//       headers: this.jsonHttpHeaders()
//     };
//     return this.httpClient.get<AccessRole[]>(url, httpOptions).pipe(map(data => {
//       return data;
//     }));
//   }
//
//   getUsers(pageNumber: number, pageSize: number, sortOrder: string): Observable<Users> {
//     const url = `${this.hostPort}/users?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
//     const httpOptions = {
//       headers: this.jsonHttpHeaders()
//     };
//     return this.httpClient.get<Users>(url, httpOptions).pipe(map(data => {
//       return data;
//     }));
//   }
//
//   getUserState(partyId?: string): Observable<User> {
//     const url = `${this.hostPort}/users/${partyId}`;
//     const httpOptions = {
//       headers: this.jsonHttpHeaders()
//     };
//     return this.httpClient
//       .get<User>(url, httpOptions)
//       .pipe(map(data => {
//         return data;
//       }));
//   }
//
//   addUserState(userState: User, credentialState: Credential, partyAccessRoleStates: string[]): Observable<User> {
//     const url = `${this.hostPort}/users`;
//     const body = {
//       user: userState,
//       credential: credentialState,
//       partyAccessRoles: partyAccessRoleStates
//     };
//     const httpOptions = {
//       headers: this.jsonHttpHeaders()
//     };
//     return this.httpClient
//       .post<User>(url, body, httpOptions)
//       .pipe(map(data => {
//         return data;
//       }));
//   }
//
//   deleteUser(partyId: string): Observable<number> {
//     const url = `${this.hostPort}/users/${partyId}`;
//     const httpOptions = {
//       headers: this.jsonHttpHeaders()
//     };
//     return this.httpClient
//       .delete<number>(url, httpOptions)
//       .pipe(map(data => {
//         return data;
//       }));
//   }
//
//   updateUser(userState: User, credentialState: Credential, partyAccessRoleStates: string[]): Observable<number> {
//     const url = `${this.hostPort}/users/${userState.partyId}`;
//     userState.partyAccessRoles = undefined;
//     userState.username = undefined;
//     const body = {
//       user: userState,
//       credential: credentialState,
//       partyAccessRoles: partyAccessRoleStates
//     };
//     const httpOptions = {
//       headers: this.jsonHttpHeaders()
//     };
//     return this.httpClient
//       .put<number>(url, body, httpOptions)
//       .pipe(map(data => {
//         return data;
//       }));
//   }
//
//   getUserMe(): Observable<UserMe> {
//     const url = `${this.hostPort}/users-me`;
//
//     const httpOptions = {
//       headers: this.jsonHttpHeaders()
//     };
//     return this.httpClient
//       .get<UserMe>(url, httpOptions)
//       .pipe(map(data => {
//         return data;
//       }));
//   }
//
//   updateUserMe(userState: User, credentialState: Credential): Observable<number> {
//     const url = `${this.hostPort}/users-me`;
//     userState.username = undefined;
//     const body = {
//       user: userState,
//       credential: credentialState,
//     };
//     const httpOptions = {
//       headers: this.jsonHttpHeaders()
//     };
//     return this.httpClient
//       .put<number>(url, body, httpOptions)
//       .pipe(map(data => {
//         return data;
//       }));
//   }
//
//
//   // VALIDATION
//
//   isValidUsername(username: string, partyId?: string): Observable<ValidResponse> {
//     const url = `${this.hostPort}/authentication/validate-username`;
//
//     const httpOptions = {
//       headers: this.jsonHttpHeaders()
//     };
//     const query = {
//       username: username,
//       partyId: partyId
//     };
//     return this.httpClient
//       .post<ValidResponse>(url, query, httpOptions)
//       .pipe(map(data => {
//         return data;
//       }));
//   }
//
//   isValidPassword(password: string): Observable<ValidResponse> {
//     const url = `${this.hostPort}/authentication/validate-password`;
//
//     const httpOptions = {
//       headers: this.jsonHttpHeaders()
//     };
//
//     const query = {password: password};
//
//     return this.httpClient
//       .post<ValidResponse>(url, query, httpOptions)
//       .pipe(map(data => {
//         return data;
//       }));
//   }
//
//   private jsonHttpHeaders(): HttpHeaders {
//     return new HttpHeaders({
//       'Content-Type': 'application/json',
//       'correlationId': this.uuidGenerator.generateUUID()
//     });
//   }
// }
