import {UUIDGenerator} from "../../uuid.generator";
import {PersonClient} from "./person.client";
import {Observable} from "rxjs/Observable";
import {UserState} from "./user.state";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserStates} from "./user.states";
import {CredentialState} from "./credential.state";
import {OrganizationState} from "./organization.state";
import {OrganizationStates} from "./organization.states";

export class PersonClientHttp implements PersonClient {

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort:string) {
  }

  public getUsers(pageNumber:number, pageSize:number, sortOrder:string): Observable<UserStates> {
    let array = [];
    array.push(this.hostPort);
    array.push("/users");

    let queryStr = [];

    if (pageNumber) {
      queryStr.push("pageNumber=" + pageNumber);
    }

    if (pageSize) {
      queryStr.push("pageSize=" + pageSize);
    }

    if (sortOrder) {
      queryStr.push("sortOrder=" + sortOrder);
    }

    if (queryStr.length > 0) {
      array.push("?");
      array.push(queryStr.join("&"));
    }

    return this.httpClient.get<UserStates>(array.join(""), {
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).map(data => {
      return data;
    });
  }

  public getOrganizations(pageNumber:number, pageSize:number, sortOrder:string): Observable<OrganizationStates> {
    let array = [];
    array.push(this.hostPort);
    array.push("organizations");

    let queryStr = [];

    if (pageNumber) {
      queryStr.push("pageNumber=" + pageNumber);
    }

    if (pageSize) {
      queryStr.push("pageSize=" + pageSize);
    }

    if (sortOrder) {
      queryStr.push("sortOrder=" + sortOrder);
    }

    if (queryStr.length > 0) {
      array.push("?");
      array.push(queryStr.join("&"));
    }

    return this.httpClient.get<OrganizationStates>(array.join(""), {
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).map(data => {
      return data;
    });
  }

  public getUserState(partyId: string): Observable<UserState>{
    let url = `${this.hostPort}/users/${partyId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .get<UserState>(url, {headers:headers})
    .map(data => {
      return data;
    });
  }

  public getOrganizationState(partyId: string): Observable<OrganizationState>{
    let url = `${this.hostPort}/organizations/${partyId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .get<OrganizationState>(url, {headers:headers})
    .map(data => {
      return data;
    });
  }


  public getPhoto(partyId: string): Observable<string>{
    let url = `${this.hostPort}/photos/${partyId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .get<string>(url, {headers:headers})
    .map(data => {
      return data;
    });
  }

  public addUserState(userState: UserState): Observable<UserState> {
    let url = `${this.hostPort}/users`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .post<UserState>(url, userState.toJson(), {headers: headers})
    .map(data => {
      return data;
    });
  }

  public addOrganizationState(organizationState: OrganizationState): Observable<OrganizationState> {
    let url = `${this.hostPort}/organizations`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .post<OrganizationState>(url, organizationState.toJson(), {headers: headers})
    .map(data => {
      return data;
    });
  }

  public addPhoto(partyId: string, croppedImage: string): Observable<any> {
    let url = `${this.hostPort}/photos/${partyId}`;
    const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'correlationId': this.uuidGenerator.generateUUID()
      })
    };

    return this.httpClient
    .post<number>(url, {croppedImage}, httpOptions)
    .map(data => {
      return data;
    });
  }

  public addAccountState(accountType: string, userState: UserState, organizationState: OrganizationState): Observable<UserState> {
    let url = `${this.hostPort}/accounts`;
    let user = userState.toJson();
    let organization = organizationState.toJson();
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .post<UserState>(url, {accountType, user, organization}, {headers: headers})
    .map(data => {
      return data;
    });
  }

  public deleteUser(partyId: string): Observable<number> {
    let url = `${this.hostPort}/users/${partyId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .delete<number>(url, {headers:headers})
    .map(data => {
      return data;
    });
  }

  public deleteOrganization(partyId: string): Observable<number> {
    let url = `${this.hostPort}/organizations/${partyId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .delete<number>(url, {headers:headers})
    .map(data => {
      return data;
    });
  }

  public updateUser(userState: UserState): Observable<number> {
    let url = `${this.hostPort}/users/${userState.partyId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .put<number>(url, userState.toJson(), {headers:headers})
    .map(data => {
      return data;
    });
  }

  public updateOrganization(organizationState: OrganizationState): Observable<number> {
    let url = `${this.hostPort}/organizations/${organizationState.partyId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .put<number>(url, organizationState.toJson(), {headers:headers})
    .map(data => {
      return data;
    });
  }

  public updateCredential(credentialState: CredentialState): Observable<number> {
    let url = `${this.hostPort}/credentials/${credentialState.partyId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .put<number>(url, credentialState.toJson(), {headers:headers})
    .map(data => {
      return data;
    });
  }



  public updatePhoto(partyId: string, croppedImage: string): Observable<number> {
    let url = `${this.hostPort}photos/${partyId}`;
    const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'correlationId': this.uuidGenerator.generateUUID()
      })
    };
    return this.httpClient
    .put<number>(url, {croppedImage}, httpOptions)
    .map(data => {
      return data;
    });
  }

  // authentication part

  isValidPassword(password: string): Observable<boolean> {
    let url = `${this.hostPort}/validate-password`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'correlationId': this.uuidGenerator.generateUUID()
      })
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
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'correlationId': this.uuidGenerator.generateUUID()
      })
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
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'correlationId': this.uuidGenerator.generateUUID()
      })
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
}
