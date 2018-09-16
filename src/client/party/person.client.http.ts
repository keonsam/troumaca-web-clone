import {UUIDGenerator} from '../../uuid.generator';
import {PersonClient} from './person.client';
import {Observable} from 'rxjs';
import { map } from "rxjs/operators";
import {UserState} from './user.state';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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



  public logOutUser(): Observable<boolean> {
    const url = `${this.hostPort}/sessions/log-out-user`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient
      .get<boolean>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public getPartyAccessRoleById(partyId: string): Observable<PartyAccessRoleState[]> {
    const url = `${this.hostPort}/party-access-roles/${partyId}`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient
      .get<PartyAccessRoleState[]>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public getPartyAccessRoles(): Observable<PartyAccessRoleState[]> {
    const url = `${this.hostPort}/party-access-roles`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient
      .get<PartyAccessRoleState[]>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public getPartyId(): Observable<string> {
    const url = `${this.hostPort}/partyId`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient
      .get<string>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }


  public getPhoto(partyId: string, type: string): Observable<PhotoState>{
    const url = `${this.hostPort}/photos/${type}/${partyId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .get<any>(url, httpOptions)
    .pipe(map(data => {
      return data;
    }));
  }

  public addPhoto(photoState: PhotoState, type: string): Observable<PhotoState> {
    const url = `${this.hostPort}/photos/${type}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .post<PhotoState>(url, photoState.toJson(), httpOptions)
    .pipe(map(data => {
      return data;
    }));
  }

  public addAccountState(userState: UserState, organizationState: OrganizationState): Observable<AccountResponse> {
    const url = `${this.hostPort}/accounts`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    const body = {
      'user': userState.toJson(),
      'organization': organizationState.toJson()
    };
    return this.httpClient
    .post<AccountResponse>(url, body, httpOptions)
    .pipe(map(data => {
      return data;
    }));
  }

  public updateCredential(credentialState: CredentialState): Observable<number> {
    const url = `${this.hostPort}/credentials/${credentialState.partyId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .put<number>(url, credentialState.toJson(), httpOptions)
    .pipe(map(data => {
      return data;
    }));
  }



  public updatePhoto(partyId: string, photoState: PhotoState, type: string): Observable<number> {
    const url = `${this.hostPort}/photos/${type}/${partyId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .post<number>(url, photoState.toJson(), httpOptions)
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
