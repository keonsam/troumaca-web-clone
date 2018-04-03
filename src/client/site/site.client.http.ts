import {SiteClient} from "./site.client";
import {UUIDGenerator} from "../../uuid.generator";
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UnionOfPhysicalSiteStates} from "./union.of.physical.site.states";
import {EmailState} from "./email.state";
import {EmailStates} from "./email.states";
import {StreetAddressStates} from "./street.address.states";
import {PostOfficeBoxState} from "./post.office.box.state";
import {PostOfficeBoxStates} from "./post.office.box.states";
import {PhoneStates} from "./phone.states";
import {WebSiteState} from "./web.site.state";
import {WebSiteStates} from "./web.site.states";
import {PhoneState} from "./phone.state";
import {StreetAddressState} from "./street.address.state";

export class SiteClientHttp extends SiteClient {

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort:string) {
    super();
  }

  public getStreetAddressStates(pageNumber: number, pageSize:number, sortOrder:string): Observable<StreetAddressStates> {
    let array = [];
    array.push(this.hostPort);
    array.push("/street-addresses");

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

    return this.httpClient.get<StreetAddressStates>(array.join(""), {
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).map(data => {
      return data;
    });
  }

  public getPostOfficeBoxStates(pageNumber: number, pageSize:number, sortOrder:string): Observable<PostOfficeBoxStates> {
    let array = [];
    array.push(this.hostPort);
    array.push("/post-office-boxes");

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

    return this.httpClient.get<PostOfficeBoxStates>(array.join(""), {
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).map(data => {
      return data;
    });
  }

  public getEmailStates(pageNumber:number, pageSize:number, sortOrder:string):Observable<EmailStates> {
    let array = [];
    array.push(this.hostPort);
    array.push("/emails");

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

    return this.httpClient.get<EmailStates>(array.join(""), {
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).map(data => {
      return data;
    });
  }

  public getWebSiteStates(pageNumber:number, pageSize:number, sortOrder:string):Observable<WebSiteStates> {
    let array = [];
    array.push(this.hostPort);
    array.push("/web-sites");

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

    return this.httpClient.get<WebSiteStates>(array.join(""), {
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).map(data => {
      return data;
    });
  }

  public getPhoneStates(pageNumber:number, pageSize:number, sortOrder:string): Observable<PhoneStates> {
    let array = [];
    array.push(this.hostPort);
    array.push("/phones");

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

  public getStreetAddressState(siteId:string): Observable<StreetAddressState> {
    let url = `${this.hostPort}/street-addresses/${siteId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .get<StreetAddressState>(url, {headers:headers})
    .map(data => {
      return data;
    });
  }

  public getPostOfficeBoxState(siteId:string): Observable<PostOfficeBoxState> {
    let url = `${this.hostPort}/post-office-boxes/${siteId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .get<PostOfficeBoxState>(url, {headers:headers})
    .map(data => {
      return data;
    });
  }

  public getEmailState(siteId:string): Observable<EmailState> {
    let url = `${this.hostPort}/emails/${siteId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .get<EmailState>(url, {headers:headers})
    .map(data => {
      return data;
    });
  }

  public getWebSiteState(siteId:string): Observable<WebSiteState> {
    let url = `${this.hostPort}/web-sites/${siteId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .get<WebSiteState>(url, {headers:headers})
    .map(data => {
      return data;
    });
  }

  public getPhoneState(siteId:string): Observable<PhoneState> {
    let url = `${this.hostPort}/phones/${siteId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .get<PhoneState>(url, {headers:headers})
    .map(data => {
      return data;
    });
  }

  public findUnionOfPhysicalSiteStates(searchStr:string, pageSize:number):Observable<UnionOfPhysicalSiteStates> {
    let array = [];
    array.push(this.hostPort);
    array.push("/find-union-of-physical-sites");

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
    let url = `${this.hostPort}/phones`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .post<PhoneState>(url, phoneState.toJson(), {headers: headers})
    .map(data => {
      return data;
    });
  }

  public addStreetAddress(streetAddressState: StreetAddressState): Observable<StreetAddressState> {
    let url = `${this.hostPort}/street-addresses`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .post<StreetAddressState>(url, streetAddressState.toJson(), {headers: headers})
    .map(data => {
      return data;
    });
  }

  public addPostOfficeBox(postOfficeBoxState: PostOfficeBoxState): Observable<PostOfficeBoxState> {
    let url = `${this.hostPort}/post-office-boxes`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .post<PostOfficeBoxState>(url, postOfficeBoxState.toJson(), {headers: headers})
    .map(data => {
      return data;
    });
  }

  public addEmail(emailState: EmailState): Observable<EmailState> {
    let url = `${this.hostPort}/emails`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .post<EmailState>(url, emailState.toJson(), {headers: headers})
    .map(data => {
      return data;
    });
  }

  public addWebSite(webSiteState: WebSiteState): Observable<WebSiteState> {
    let url = `${this.hostPort}/web-sites`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .post<WebSiteState>(url, webSiteState.toJson(), {headers: headers})
    .map(data => {
      return data;
    });
  }

  public updateStreetAddress(siteId:string, streetAddressState: StreetAddressState): Observable<number> {
    let url = `${this.hostPort}/street-addresses/${siteId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .put<number>(url, streetAddressState.toJson(), {headers:headers})
    .map(data => {
      return data;
    });
  }

  public updatePostOfficeBox(siteId:string, postOfficeBoxState: PostOfficeBoxState): Observable<number> {
    let url = `${this.hostPort}/post-office-boxes/${siteId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .put<number>(url, postOfficeBoxState.toJson(), {headers:headers})
    .map(data => {
      return data;
    });
  }

  public updateEmail(siteId:string, emailState: EmailState): Observable<number> {
    let url = `${this.hostPort}/emails/${siteId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .put<number>(url, emailState.toJson(), {headers:headers})
    .map(data => {
      return data;
    });
  }

  public updateWebSite(siteId:string, webSiteState: WebSiteState): Observable<number> {
    let url = `${this.hostPort}/web-sites/${siteId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .put<number>(url, webSiteState.toJson(), {headers:headers})
    .map(data => {
      return data;
    });
  }

  public updatePhone(siteId:string, phoneState: PhoneState): Observable<number> {
    let url = `${this.hostPort}/phones/${siteId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .put<number>(url, phoneState.toJson(), {headers:headers})
    .map(data => {
      return data;
    });
  }

  public deleteStreetAddress(siteId:string): Observable<number> {
    let url = `${this.hostPort}/street-addresses/${siteId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .delete<number>(url, {headers:headers})
    .map(data => {
      return data;
    });
  }

  public deletePostOfficeBox(siteId:string): Observable<number> {
    let url = `${this.hostPort}/post-office-boxes/${siteId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .delete<number>(url, {headers:headers})
    .map(data => {
      return data;
    });
}

public deleteEmail(siteId:string): Observable<number> {
  let url = `${this.hostPort}/emails/${siteId}`;
  let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
  return this.httpClient
  .delete<number>(url, {headers:headers})
  .map(data => {
    return data;
  });
}

public deleteWebSite(siteId:string): Observable<number> {
  let url = `${this.hostPort}/web-sites/${siteId}`;
  let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
  return this.httpClient
  .delete<number>(url, {headers:headers})
  .map(data => {
    return data;
  });
}

  public deletePhone(siteId:string): Observable<number> {
    let url = `${this.hostPort}/phones/${siteId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .delete<number>(url, {headers:headers})
    .map(data => {
      return data;
    });
  }

}
