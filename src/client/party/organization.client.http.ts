import {UUIDGenerator} from "../../uuid.generator";
import {OrganizationClient} from "./organization.client";
import {Observable} from "rxjs/Observable";
import {OrganizationState} from "./organization.state";
import "rxjs/add/observable/of";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {OrganizationStates} from "./organization.states";

export class OrganizationClientHttp implements OrganizationClient {

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort:string) {
  }


  public getOrganizations(): Observable<OrganizationState[]> {
    return null;
  }

  public findOrganizationStates(searchStr: string, pageSize: number): Observable<OrganizationStates> {
    let array = [];
    array.push(this.hostPort);
    array.push("/parties/organizations");

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

    return this.httpClient.get<OrganizationStates>(array.join(""), {
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).map(data => {
      return data;
    });

  }

}