import {UUIDGenerator} from "../../uuid.generator";
import {PersonClient} from "./person.client";
import {Observable} from "rxjs/Observable";
import {PersonState} from "./person.state";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PersonStates} from "./person.states";

export class PersonClientHttp implements PersonClient {

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort:string) {
  }

  public getPersons(): Observable<PersonState[]> {
    return null;
  }

  public getCurrentPerson(): Observable<PersonState> {
    return null;
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

}