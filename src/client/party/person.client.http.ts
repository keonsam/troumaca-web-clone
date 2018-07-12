import {UUIDGenerator} from '../../uuid.generator';
import {PersonClient} from './person.client';
import {Observable} from 'rxjs/Observable';
import {UserState} from './user.state';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'underscore';
import {UserStates} from './user.states';
import {CredentialState} from './credential.state';
import {OrganizationState} from './organization.state';
import {OrganizationStates} from './organization.states';
import {AccountResponse} from '../../parties/account.response';
import {AccessRoleState} from '../access-roles/access.role.state';
import {PartyAccessRoleState} from './party.access.role.state';
import {PhotoState} from './photo.state';
import {UserResponse} from '../../parties/user.response';

export class PersonClientHttp implements PersonClient {

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort: string) {
  }

  public findAccessRole(searchStr: string, pageSize: number): Observable<AccessRoleState[]> {
    const url = `${this.hostPort}/access-roles/find?q=${searchStr}&pageSize=${pageSize}`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<AccessRoleState[]>(url, httpOptions).map(data => {
      return data;
    });
  }

  public logOutUser(): Observable<boolean> {
    const url = `${this.hostPort}/sessions/log-out-user`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient
      .get<boolean>(url, httpOptions)
      .map(data => {
        return data;
      });
  }

  public getPartyAccessRoleById(partyId: string): Observable<PartyAccessRoleState[]> {
    const url = `${this.hostPort}/party-access-roles/${partyId}`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient
      .get<PartyAccessRoleState[]>(url, httpOptions)
      .map(data => {
        return data;
      });
  }

  public getPartyAccessRoles(): Observable<PartyAccessRoleState[]> {
    const url = `${this.hostPort}/party-access-roles`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient
      .get<PartyAccessRoleState[]>(url, httpOptions)
      .map(data => {
        return data;
      });
  }

  public getPartyId(): Observable<string> {
    const url = `${this.hostPort}/partyId`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient
      .get<string>(url, httpOptions)
      .map(data => {
        return data;
      });
  }

  public getUsers(pageNumber: number, pageSize: number, sortOrder: string): Observable<UserStates> {
    const url = `${this.hostPort}/users?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<UserStates>(url, httpOptions).map(data => {
      return data;
    });
  }

  public getOrganizations(pageNumber: number, pageSize: number, sortOrder: string): Observable<OrganizationStates> {
    const url = `${this.hostPort}/organizations?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<OrganizationStates>(url, httpOptions).map(data => {
      return data;
    });
  }

  public getUserState(partyId: string): Observable<UserResponse>{
    const url = `${this.hostPort}/users/${partyId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .get<UserResponse>(url, httpOptions)
    .map(data => {
      return data;
    });
  }

  public getOrganizationState(partyId: string): Observable<OrganizationState>{
    const url = `${this.hostPort}/organizations/${partyId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .get<OrganizationState>(url, httpOptions)
    .map(data => {
      return data;
    });
  }


  public getPhoto(partyId: string, type: string): Observable<PhotoState>{
    const url = `${this.hostPort}/photos/${type}/${partyId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .get<any>(url, httpOptions)
    .map(data => {
      return data;
    });
  }

  public addUserState(userState: UserState, partyAccessRoleStates: PartyAccessRoleState[]): Observable<UserState> {
    const url = `${this.hostPort}/users`;
    const user = userState.toJson();
    const partyAccessRoles = map(partyAccessRoleStates, value => {
      return value.toJson();
    });
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .post<UserState>(url, {user, partyAccessRoles}, httpOptions)
    .map(data => {
      return data;
    });
  }

  public addOrganizationState(organizationState: OrganizationState): Observable<OrganizationState> {
    const url = `${this.hostPort}/organizations`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .post<OrganizationState>(url, organizationState.toJson(), httpOptions)
    .map(data => {
      return data;
    });
  }

  public addPhoto(partyId: string, photoState: PhotoState, type: string): Observable<PhotoState> {
    const url = `${this.hostPort}/photos/${type}/${partyId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .post<PhotoState>(url, photoState.toJson(), httpOptions)
    .map(data => {
      return data;
    });
  }

  public addAccountState(accountType: string, userState: UserState, organizationState: OrganizationState): Observable<AccountResponse> {
    const url = `${this.hostPort}/accounts`;
    const user = userState.toJson();
    const organization = organizationState.toJson();
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .post<AccountResponse>(url, {accountType, user, organization}, httpOptions)
    .map(data => {
      return data;
    });
  }

  public deleteUser(partyId: string): Observable<number> {
    const url = `${this.hostPort}/users/${partyId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .delete<number>(url, httpOptions)
    .map(data => {
      return data;
    });
  }

  public deleteOrganization(partyId: string): Observable<number> {
    const url = `${this.hostPort}/organizations/${partyId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .delete<number>(url, httpOptions)
    .map(data => {
      return data;
    });
  }

  public updateUser(userState: UserState, partyAccessRoleStates: PartyAccessRoleState[]): Observable<number> {
    const url = `${this.hostPort}/users/${userState.partyId}`;
    const user = userState.toJson();
    const partyAccessRoles = map(partyAccessRoleStates, value => {
      return value.toJson();
    });
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .put<number>(url, {user, partyAccessRoles}, httpOptions)
    .map(data => {
      return data;
    });
  }

  public updateUserMe(userState: UserState, credentialState: CredentialState): Observable<number> {
    const url = `${this.hostPort}/users-me/${userState.partyId}`;
    const user = userState.toJson();
    const credential = credentialState.toJson();
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .put<number>(url, {user, credential}, httpOptions)
      .map(data => {
        return data;
      });
  }

  public updateOrganization(organizationState: OrganizationState): Observable<number> {
    const url = `${this.hostPort}/organizations/${organizationState.partyId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .put<number>(url, organizationState.toJson(), httpOptions)
    .map(data => {
      return data;
    });
  }

  public updateCredential(credentialState: CredentialState): Observable<number> {
    const url = `${this.hostPort}/credentials/${credentialState.partyId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .put<number>(url, credentialState.toJson(), httpOptions)
    .map(data => {
      return data;
    });
  }



  public updatePhoto(partyId: string, photoState: PhotoState, type: string): Observable<number> {
    const url = `${this.hostPort}/photos/${type}/${partyId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .post<number>(url, photoState.toJson(), httpOptions)
    .map(data => {
      return data;
    });
  }

  // authentication part

  isValidPassword(password: string): Observable<boolean> {
    const url = `${this.hostPort}/validate-password`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    const query = {password: password};

    return this.httpClient
      .post<boolean>(url, query, httpOptions)
      .map(data => {
        return data;
      });
  }

  isValidUsername(username: string): Observable<boolean> {
    const url = `${this.hostPort}/validate-username`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    const query = {username: username};

    return this.httpClient
    .post<boolean>(url, query, httpOptions)
    .map(data => {
      return data;
    });
  }

  isValidEditUsername(partyId: string, username: string): Observable<boolean> {
    const url = `${this.hostPort}/validate-edit-username`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    const query = {
      partyId,
      username: username};

    return this.httpClient
    .post<boolean>(url, query, httpOptions)
    .map(data => {
      return data;
    });
  }

  public jsonHttpHeaders(): HttpHeaders {
  const httpHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type':  'application/json',
    'correlationId': this.uuidGenerator.generateUUID()
  });
  return httpHeaders;
  }

}
