import {SiteClient} from "./site.client";
import {UUIDGenerator} from "../../uuid.generator";
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UnionOfPhysicalSiteStates} from "./union.of.physical.site.states";
import {EmailStates} from "./email.states";
import {StreetAddressStates} from "./street.address.states";
import {PostOfficeBoxStates} from "./post.office.box.states";
import {PhoneStates} from "./phone.states";
import {WebSiteStates} from "./web.site.states";
import {PhoneState} from "./phone.state";

export class SiteClientHttp extends SiteClient {

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort:string) {
    super();
  }

  public getStreetAddressStates(pageNumber: number): Observable<StreetAddressStates> {
    let array = [];
    array.push(this.hostPort);
    array.push("/sites/physical-sites/street-addresses");

    let queryStr = [];

    if (pageNumber) {
      queryStr.push("pageNumber=" + pageNumber);
    }

    if (queryStr.length > 0) {
      array.push("?");
      array.push(queryStr.join("&"));
    }

    return this.httpClient.get<StreetAddressStates>(array.join(""), {
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).map(data => {
      return data;
    });
  }

  public getPostOfficeBoxStates(pageNumber: number): Observable<PostOfficeBoxStates> {
    let array = [];
    array.push(this.hostPort);
    array.push("/sites/physical-sites/post-office-boxes");

    let queryStr = [];

    if (pageNumber) {
      queryStr.push("pageNumber=" + pageNumber);
    }

    if (queryStr.length > 0) {
      array.push("?");
      array.push(queryStr.join("&"));
    }

    return this.httpClient.get<PostOfficeBoxStates>(array.join(""), {
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).map(data => {
      return data;
    });
  }

  public getEmailStates(pageNumber:number):Observable<EmailStates> {
    let array = [];
    array.push(this.hostPort);
    array.push("/sites/virtual-sites/emails");

    let queryStr = [];

    if (pageNumber) {
      queryStr.push("pageNumber=" + pageNumber);
    }

    if (queryStr.length > 0) {
      array.push("?");
      array.push(queryStr.join("&"));
    }

    return this.httpClient.get<EmailStates>(array.join(""), {
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).map(data => {
      return data;
    });
  }

  public getPhoneStates(pageNumber:number, pageSize:number, sortOrder:string): Observable<PhoneStates> {
    let array = [];
    array.push(this.hostPort);
    array.push("/sites/virtual-sites/phones");

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

    return this.httpClient.get<PhoneStates>(array.join(""), {
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).map(data => {
      return data;
    });
  }

  public getWebSiteStates(pageNumber: number): Observable<WebSiteStates> {
    let array = [];
    array.push(this.hostPort);
    array.push("/sites/virtual-sites/web-sites");

    let queryStr = [];

    if (pageNumber) {
      queryStr.push("pageNumber=" + pageNumber);
    }

    if (queryStr.length > 0) {
      array.push("?");
      array.push(queryStr.join("&"));
    }

    return this.httpClient.get<WebSiteStates>(array.join(""), {
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

  public addPhone(phoneState: PhoneState): Observable<PhoneState> {
    let array = [];
    array.push(this.hostPort);
    array.push("/sites/virtual-sites/phones");

    return this.httpClient.post(array.join(""), phoneState.toJson(), {
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).map(data => {
      return data;
    });
  }

}
