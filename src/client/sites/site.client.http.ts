import {SiteClient} from "./site.client";
import {UUIDGenerator} from "../../uuid.generator";
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UnionOfPhysicalSiteStates} from "./union.of.physical.site.states";
import {EmailStates} from "./email.states";

export class SiteClientHttp extends SiteClient {

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort:string) {
    super();
  }

  public getEmails(pageNumber:number):Observable<EmailStates> {
    let array = [];
    array.push(this.hostPort);
    array.push("/sites/virtual-sites/e-mail-sites");
    return this.httpClient.get<EmailStates>(array.join(""), {
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).map(data => {
      return data;
    });
  }

  public findUnionOfPhysicalSiteStates(searchStr:string, pageSize:number):Observable<UnionOfPhysicalSiteStates> {
    let array = [];
    array.push(this.hostPort);
    array.push("/sites/physical-sites/union-of-physical-sites");

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

    return this.httpClient.get<UnionOfPhysicalSiteStates>(array.join(""), {
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).map(data => {
      return data;
    });
  }

}
