import {UserClient} from './user.client';
import {UUIDGenerator} from '../../../uuid.generator';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AccessRoleState} from '../../access-roles/access.role.state';
import {map} from 'rxjs/operators';
import {UserStates} from '../user.states';
import {UserResponse} from '../../../parties/user.response';
import {UserState} from '../user.state';
import {PartyAccessRoleState} from '../party.access.role.state';
import {CredentialState} from '../../credential/credential.state';

export class UserClientHttp implements UserClient {

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort: string) {
  }

  public findAccessRole(searchStr: string, pageSize: number): Observable<AccessRoleState[]> {
    const url = `${this.hostPort}/access-roles/find?q=${searchStr}&pageSize=${pageSize}`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<AccessRoleState[]>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public getUsers(pageNumber: number, pageSize: number, sortOrder: string): Observable<UserStates> {
    const url = `${this.hostPort}/users?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<UserStates>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public getUserState(partyId?: string): Observable<UserResponse> {
    const url = `${this.hostPort}/users/${partyId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .get<UserResponse>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public addUserState(userState: UserState, credentialState?: CredentialState, partyAccessRoleStates?: PartyAccessRoleState[]): Observable<UserState> {
    const url = `${this.hostPort}/users`;
    let newPartyAccessRoleStates: any[];
    let newCredentialState: any;
    if (partyAccessRoleStates && partyAccessRoleStates.length > 0) {
      newPartyAccessRoleStates = partyAccessRoleStates.map( value => {
        return value.toJson();
      });
    }
    if (credentialState) {
      newCredentialState = credentialState.toJson();
    }
    const body = {
      user: userState.toJson(),
      credential: newCredentialState,
      partyAccessRoles: newPartyAccessRoleStates
    };
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .post<UserState>(url, body, httpOptions)
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

  public updateUser(userState: UserState, credentialState: CredentialState, partyAccessRoleStates: PartyAccessRoleState[]): Observable<number> {
    const url = `${this.hostPort}/users/${userState.partyId}`;
    let newPartyAccessRoleStates: any[];
    if (partyAccessRoleStates && partyAccessRoleStates.length > 0) {
      newPartyAccessRoleStates = partyAccessRoleStates.map( value => {
        return value.toJson();
      });
    }
    const body = {
      user: userState.toJson(),
      credential: credentialState.toJson(),
      partyAccessRoles: newPartyAccessRoleStates
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
