import {UUIDGenerator} from "../../uuid.generator";
import {PersonClient} from "./person.client";
import {Observable} from "rxjs/Observable";
import {UserState} from "./user.state";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { map, reduce, somethingElse } from "underscore";
import {UserStates} from "./user.states";
import {CredentialState} from "./credential.state";
import {OrganizationState} from "./organization.state";
import {OrganizationStates} from "./organization.states";
import {AccountResponse} from "../../parties/account.response";
import {AccessRoleState} from "../access-roles/access.role.state";
import {PartyAccessRoleState} from "./party.access.role.state";

export class PersonClientHttp implements PersonClient {

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort:string) {
  }

  public findAccessRole(searchStr: string, pageSize: number): Observable<AccessRoleState[]> {
    let url = `${this.hostPort}/access-roles/find?q=${searchStr}&pageSize=${pageSize}`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<AccessRoleState[]>(url, httpOptions).map(data => {
      return data;
    });
  }

  public logOutUser(): Observable<boolean> {
    let url = `${this.hostPort}/sessions/log-out-user`;

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
    let url = `${this.hostPort}/party-access-roles/${partyId}`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient
      .get<PartyAccessRoleState[]>(url, httpOptions)
      .map(data => {
        return data;
      });
  }

  public getPartyAccessRoles() :Observable<PartyAccessRoleState[]> {
    let url = `${this.hostPort}/party-access-roles`;

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
    let url = `${this.hostPort}/partyId`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient
      .get<string>(url, httpOptions)
      .map(data => {
        return data;
      });
  }

  public getUsers(pageNumber:number, pageSize:number, sortOrder:string): Observable<UserStates> {
    let url = `${this.hostPort}/users?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<UserStates>(url, httpOptions).map(data => {
      return data;
    });
  }

  public getOrganizations(pageNumber:number, pageSize:number, sortOrder:string): Observable<OrganizationStates> {
    let url = `${this.hostPort}/organizations?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<OrganizationStates>(url, httpOptions).map(data => {
      return data;
    });
  }

  public getUserState(partyId: string): Observable<UserState>{
    let url = `${this.hostPort}/users/${partyId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .get<UserState>(url, httpOptions)
    .map(data => {
      return data;
    });
  }

  public getOrganizationState(partyId: string): Observable<OrganizationState>{
    let url = `${this.hostPort}/organizations/${partyId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .get<OrganizationState>(url, httpOptions)
    .map(data => {
      return data;
    });
  }


  public getPhoto(partyId: string, type: string): Observable<string>{
    let url = `${this.hostPort}/photos/${type}/${partyId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .get<string>(url, httpOptions)
    .map(data => {
      return data;
    });
  }

  public addUserState(userState: UserState, partyAccessRoleStates: PartyAccessRoleState[]): Observable<UserState> {
    let url = `${this.hostPort}/users`;
    let user = userState.toJson();
    let partyAccessRoles = map(partyAccessRoleStates, value => {
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
    let url = `${this.hostPort}/organizations`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .post<OrganizationState>(url, organizationState.toJson(), httpOptions)
    .map(data => {
      return data;
    });
  }

  public addPhoto(partyId: string, croppedImage: string, type: string): Observable<boolean> {
    let url = `${this.hostPort}/photos/${type}/${partyId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .post<boolean>(url, {imageStr:croppedImage}, httpOptions)
    .map(data => {
      return data;
    });
  }

  public addAccountState(accountType: string, userState: UserState, organizationState: OrganizationState): Observable<AccountResponse> {
    let url = `${this.hostPort}/accounts`;
    let user = userState.toJson();
    let organization = organizationState.toJson();
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
    let url = `${this.hostPort}/users/${partyId}`;
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
    let url = `${this.hostPort}/organizations/${partyId}`;
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
    let url = `${this.hostPort}/users/${userState.partyId}`;
    let user = userState.toJson();
    let partyAccessRoles = map(partyAccessRoleStates, value => {
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
    let url = `${this.hostPort}/users-me/${userState.partyId}`;
    let user = userState.toJson();
    let credential = credentialState.toJson();
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
    let url = `${this.hostPort}/organizations/${organizationState.partyId}`;
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
    let url = `${this.hostPort}/credentials/${credentialState.partyId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .put<number>(url, credentialState.toJson(), httpOptions)
    .map(data => {
      return data;
    });
  }



  public updatePhoto(partyId: string, croppedImage: string, type: string): Observable<number> {
    let url = `${this.hostPort}/photos/${type}/${partyId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .put<number>(url, {imageStr:croppedImage}, httpOptions)
    .map(data => {
      return data;
    });
  }

  // authentication part

  isValidPassword(password: string): Observable<boolean> {
    let url = `${this.hostPort}/validate-password`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    let query = {password:password};

    return this.httpClient
      .post<boolean>(url, query, httpOptions)
      .map(data => {
        return data;
      });
  }

  isValidUsername(username: string): Observable<boolean> {
    let url = `${this.hostPort}/validate-username`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    let query = {username:username};

    return this.httpClient
    .post<boolean>(url, query, httpOptions)
    .map(data => {
      return data;
    });
  }

  isValidEditUsername(partyId: string, username: string): Observable<boolean> {
    let url = `${this.hostPort}/validate-edit-username`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    let query = {
      partyId,
      username:username};

    return this.httpClient
    .post<boolean>(url, query, httpOptions)
    .map(data => {
      return data;
    });
  }

  public jsonHttpHeaders(): HttpHeaders {
  let httpHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type':  'application/json',
    'correlationId': this.uuidGenerator.generateUUID()
  });
  return httpHeaders;
  }

}
