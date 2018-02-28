import {UUIDGenerator} from "../../uuid.generator";
import {PersonClient} from "./person.client";
import {Observable} from "rxjs/Observable";
import {PersonState} from "./person.state";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PersonStates} from "./person.states";
import {CredentialState} from "./credential.state";

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

  public getCurrentPerson(): Observable<PersonState> {
    return null;
  }

  public getPersonState(partyId: string): Observable<PersonState>{
    let url = `${this.hostPort}/parties/persons/${partyId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .get<PersonState>(url, {headers:headers})
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

  public addPersonState(personState: PersonState): Observable<PersonState> {
    let url = `${this.hostPort}/parties/persons`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .post<PersonState>(url, personState.toJson(), {headers: headers})
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

  public deletePerson(partyId: string): Observable<number> {
    let url = `${this.hostPort}/parties/persons/${partyId}`;
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
    let image = {string: croppedImage};
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .post<number>(url, image, {headers:headers})
    .map(data => {
      return data;
    });
  }

}
