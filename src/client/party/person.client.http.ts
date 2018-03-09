import {UUIDGenerator} from "../../uuid.generator";
import {PersonClient} from "./person.client";
import {Observable} from "rxjs/Observable";
import {PersonState} from "./person.state";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PersonStates} from "./person.states";
import {CredentialState} from "./credential.state";
import {OrganizationState} from "./organization.state";
import {OrganizationStates} from "./organization.states";
import {AccountState} from "./account.state";

export class PersonClientHttp implements PersonClient {

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort:string) {
  }

  public getPersons(pageNumber:number, pageSize:number, sortOrder:string): Observable<PersonStates> {
    let array = [];
    array.push(this.hostPort);
    array.push("/parties/persons");

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

    return this.httpClient.get<PersonStates>(array.join(""), {
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).map(data => {
      return data;
    });
  }

  public getOrganizations(pageNumber:number, pageSize:number, sortOrder:string): Observable<OrganizationStates> {
    let array = [];
    array.push(this.hostPort);
    array.push("/parties/organizations");

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


  //// delete this
  public getCurrentPerson(): Observable<PersonState> {
    return null;
  }
  //


  public getPersonState(partyId: string): Observable<PersonState>{
    let url = `${this.hostPort}/parties/persons/${partyId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .get<PersonState>(url, {headers:headers})
    .map(data => {
      return data;
    });
  }

  public getOrganizationState(partyId: string): Observable<OrganizationState>{
    let url = `${this.hostPort}/parties/organizations/${partyId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .get<OrganizationState>(url, {headers:headers})
    .map(data => {
      return data;
    });
  }


  public getUserPhoto(partyId: string): Observable<string>{
    let url = `${this.hostPort}/parties/users-photos/${partyId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .get<string>(url, {headers:headers})
    .map(data => {
      return data;
    });
  }

  public getCompanyPhoto(partyId: string): Observable<string>{
    let url = `${this.hostPort}/parties/company-photos/${partyId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .get<string>(url, {headers:headers})
    .map(data => {
      return data;
    });
  }

  //// delete this
  public findPersonStates(searchStr: string, pageSize: number): Observable<PersonStates> {
    let array = [];
    array.push(this.hostPort);
    array.push("/parties/persons");

    let queryStr = [];
    if (searchStr) {
      queryStr.push("q=" + searchStr);
    }

    if (pageSize) {
      queryStr.push("pageSize=" + searchStr);
    }

    if (queryStr.length > 0) {
      array.push("?");
      array.push(queryStr.join("&"));
    }

    return this.httpClient.get<PersonStates>(array.join(""), {
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).map(data => {
      return data;
    });
  }
  ////


  public addPersonState(personState: PersonState): Observable<PersonState> {
    let url = `${this.hostPort}/parties/persons`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .post<PersonState>(url, personState.toJson(), {headers: headers})
    .map(data => {
      return data;
    });
  }

  public addOrganizationState(organizationState: OrganizationState): Observable<OrganizationState> {
    let url = `${this.hostPort}/parties/organizations`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .post<OrganizationState>(url, organizationState.toJson(), {headers: headers})
    .map(data => {
      return data;
    });
  }

  public addCredentialState(credentialState: CredentialState): Observable<CredentialState> {
    let url = `${this.hostPort}/parties/credentials`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .post<CredentialState>(url, credentialState.toJson(), {headers: headers})
    .map(data => {
      return data;
    });
  }

  public addAccountPhoto(partyId: string, croppedImage: string): Observable<any> {
    let url = `${this.hostPort}/parties/account-photos/${partyId}`;
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

  public createAccountState(accountState: AccountState): Observable<AccountState> {
    let url = `${this.hostPort}/parties/create-accounts`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .post<AccountState>(url, accountState.toJson(), {headers: headers})
    .map(data => {
      return data;
    });
  }

  public deletePerson(partyId: string): Observable<number> {
    let url = `${this.hostPort}/parties/persons/${partyId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .delete<number>(url, {headers:headers})
    .map(data => {
      return data;
    });
  }

  public deleteOrganization(partyId: string): Observable<number> {
    let url = `${this.hostPort}/parties/organizations/${partyId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .delete<number>(url, {headers:headers})
    .map(data => {
      return data;
    });
  }

  public deleteCredential(partyId: string): Observable<number> {
    let url = `${this.hostPort}/parties/credentials/${partyId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .delete<number>(url, {headers:headers})
    .map(data => {
      return data;
    });
  }

  public updatePerson(personState: PersonState): Observable<number> {
    let url = `${this.hostPort}/parties/persons/${personState.partyId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .put<number>(url, personState.toJson(), {headers:headers})
    .map(data => {
      return data;
    });
  }

  public updateOrganization(organizationState: OrganizationState): Observable<number> {
    let url = `${this.hostPort}/parties/organizations/${organizationState.partyId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .put<number>(url, organizationState.toJson(), {headers:headers})
    .map(data => {
      return data;
    });
  }

  public updateCredential(credentialState: CredentialState): Observable<number> {
    let url = `${this.hostPort}/parties/credentials/${credentialState.partyId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .put<number>(url, credentialState.toJson(), {headers:headers})
    .map(data => {
      return data;
    });
  }



  public updateUserPhoto(partyId: string, croppedImage: string): Observable<number> {
    let url = `${this.hostPort}/parties/users-photos/${partyId}`;
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

  public updateCompanyPhoto(partyId: string, croppedImage: string): Observable<number> {
    let url = `${this.hostPort}/parties/company-photos/${partyId}`;
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

}
