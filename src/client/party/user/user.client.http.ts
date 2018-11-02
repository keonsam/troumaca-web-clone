import {UserClient} from './user.client';
import {UUIDGenerator} from '../../../uuid.generator';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { AccessRole } from '../../../access-roles/access.role';
import {map} from 'rxjs/operators';
import { Users } from '../../../parties/users';
import {UserResponse} from '../../../parties/user.response';
import { User } from '../../../parties/user';
import { PartyAccessRole } from '../../../parties/party.access.role';
import { Credential } from '../../../authentication/credential';

export class UserClientHttp implements UserClient {

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort: string) {
  }

  public findAccessRole(searchStr: string, pageSize: number): Observable<AccessRole[]> {
    const url = `${this.hostPort}/access-roles/find?q=${searchStr}&pageSize=${pageSize}`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<AccessRole[]>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public getUsers(pageNumber: number, pageSize: number, sortOrder: string): Observable<Users> {
    const url = `${this.hostPort}/users?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<Users>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public getUserState(partyId?: string): Observable<UserResponse> {
    let url: string;
    if (partyId ===  'profile') {
      url = `${this.hostPort}/users/profile`;
    } else {
      url = `${this.hostPort}/users/${partyId}`;
    }
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .get<UserResponse>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public addUserState(userState: User, credentialState: Credential, partyAccessRoleStates: PartyAccessRole[]): Observable<User> {
    const url = `${this.hostPort}/users`;
    const body = {
      user: userState,
      credential: credentialState,
      partyAccessRoles: partyAccessRoleStates
    };
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .post<User>(url, body, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public deleteUser(partyId: string): Observable<number> {
    const url = `${this.hostPort}/users/${partyId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .delete<number>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public updateUser(userState: User, credentialState: Credential, partyAccessRoleStates: PartyAccessRole[]): Observable<number> {
    const url = `${this.hostPort}/users/${userState.partyId}`;
    const body = {
      user: userState,
      credential: credentialState,
      partyAccessRoles: partyAccessRoleStates
    };
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .put<number>(url, body, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public updateUserMe(userState: User, credentialState: Credential): Observable<number> {
    const url = `${this.hostPort}/users/profile`;
    const body = {
      user: userState,
      credential: credentialState,
    };
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .put<number>(url, body, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  private jsonHttpHeaders(): HttpHeaders {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
      'correlationId': this.uuidGenerator.generateUUID()
    });
    return httpHeaders;
  }
}
