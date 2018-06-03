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
    let url = `${this.hostPort}/street-addresses?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<StreetAddressStates>(url, httpOptions).map(data => {
      return data;
    });
  }

  public getPostOfficeBoxStates(pageNumber: number, pageSize:number, sortOrder:string): Observable<PostOfficeBoxStates> {
    let url = `${this.hostPort}/post-office-boxes?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<PostOfficeBoxStates>(url, httpOptions).map(data => {
      return data;
    });
  }

  public getEmailStates(pageNumber:number, pageSize:number, sortOrder:string):Observable<EmailStates> {
    let url = `${this.hostPort}/emails?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<EmailStates>(url, httpOptions).map(data => {
      return data;
    });
  }

  public getWebSiteStates(pageNumber:number, pageSize:number, sortOrder:string):Observable<WebSiteStates> {
    let url = `${this.hostPort}/web-sites?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<WebSiteStates>(url, httpOptions).map(data => {
      return data;
    });
  }

  public getPhoneStates(pageNumber:number, pageSize:number, sortOrder:string): Observable<PhoneStates> {
    let url = `${this.hostPort}/phones?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<PhoneStates>(url, httpOptions).map(data => {
      return data;
    });
  }

  public getStreetAddressState(siteId:string): Observable<StreetAddressState> {
    let url = `${this.hostPort}/street-addresses/${siteId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .get<StreetAddressState>(url, httpOptions)
    .map(data => {
      return data;
    });
  }

  public getPostOfficeBoxState(siteId:string): Observable<PostOfficeBoxState> {
    let url = `${this.hostPort}/post-office-boxes/${siteId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .get<PostOfficeBoxState>(url, httpOptions)
    .map(data => {
      return data;
    });
  }

  public getEmailState(siteId:string): Observable<EmailState> {
    let url = `${this.hostPort}/emails/${siteId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .get<EmailState>(url, httpOptions)
    .map(data => {
      return data;
    });
  }

  public getWebSiteState(siteId:string): Observable<WebSiteState> {
    let url = `${this.hostPort}/web-sites/${siteId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .get<WebSiteState>(url, httpOptions)
    .map(data => {
      return data;
    });
  }

  public getPhoneState(siteId:string): Observable<PhoneState> {
    let url = `${this.hostPort}/phones/${siteId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .get<PhoneState>(url, httpOptions)
    .map(data => {
      return data;
    });
  }

  public findUnionOfPhysicalSiteStates(searchStr:string, pageSize:number):Observable<UnionOfPhysicalSiteStates> {
    let url = `${this.hostPort}/find-union-of-physical-sites?q=${searchStr}&pageSize=${pageSize}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<UnionOfPhysicalSiteStates>(url, httpOptions).map(data => {
      return data;
    });
  }

  public addPhone(phoneState: PhoneState): Observable<PhoneState> {
    let url = `${this.hostPort}/phones`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .post<PhoneState>(url, phoneState.toJson(), httpOptions)
    .map(data => {
      return data;
    });
  }

  public addStreetAddress(streetAddressState: StreetAddressState): Observable<StreetAddressState> {
    let url = `${this.hostPort}/street-addresses`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .post<StreetAddressState>(url, streetAddressState.toJson(), httpOptions)
    .map(data => {
      return data;
    });
  }

  public addPostOfficeBox(postOfficeBoxState: PostOfficeBoxState): Observable<PostOfficeBoxState> {
    let url = `${this.hostPort}/post-office-boxes`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .post<PostOfficeBoxState>(url, postOfficeBoxState.toJson(), httpOptions)
    .map(data => {
      return data;
    });
  }

  public addEmail(emailState: EmailState): Observable<EmailState> {
    let url = `${this.hostPort}/emails`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .post<EmailState>(url, emailState.toJson(), httpOptions)
    .map(data => {
      return data;
    });
  }

  public addWebSite(webSiteState: WebSiteState): Observable<WebSiteState> {
    let url = `${this.hostPort}/web-sites`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .post<WebSiteState>(url, webSiteState.toJson(), httpOptions)
    .map(data => {
      return data;
    });
  }

  public updateStreetAddress(siteId:string, streetAddressState: StreetAddressState): Observable<number> {
    let url = `${this.hostPort}/street-addresses/${siteId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .put<number>(url, streetAddressState.toJson(), httpOptions)
    .map(data => {
      return data;
    });
  }

  public updatePostOfficeBox(siteId:string, postOfficeBoxState: PostOfficeBoxState): Observable<number> {
    let url = `${this.hostPort}/post-office-boxes/${siteId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .put<number>(url, postOfficeBoxState.toJson(), httpOptions)
    .map(data => {
      return data;
    });
  }

  public updateEmail(siteId:string, emailState: EmailState): Observable<number> {
    let url = `${this.hostPort}/emails/${siteId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .put<number>(url, emailState.toJson(), httpOptions)
    .map(data => {
      return data;
    });
  }

  public updateWebSite(siteId:string, webSiteState: WebSiteState): Observable<number> {
    let url = `${this.hostPort}/web-sites/${siteId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .put<number>(url, webSiteState.toJson(), httpOptions)
    .map(data => {
      return data;
    });
  }

  public updatePhone(siteId:string, phoneState: PhoneState): Observable<number> {
    let url = `${this.hostPort}/phones/${siteId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .put<number>(url, phoneState.toJson(), httpOptions)
    .map(data => {
      return data;
    });
  }

  public deleteStreetAddress(siteId:string): Observable<number> {
    let url = `${this.hostPort}/street-addresses/${siteId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .delete<number>(url, httpOptions)
    .map(data => {
      return data;
    });
  }

  public deletePostOfficeBox(siteId:string): Observable<number> {
    let url = `${this.hostPort}/post-office-boxes/${siteId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .delete<number>(url, httpOptions)
    .map(data => {
      return data;
    });
}

public deleteEmail(siteId:string): Observable<number> {
  let url = `${this.hostPort}/emails/${siteId}`;
  const httpOptions = {
    headers: this.jsonHttpHeaders()
  };
  return this.httpClient
  .delete<number>(url, httpOptions)
  .map(data => {
    return data;
  });
}

public deleteWebSite(siteId:string): Observable<number> {
  let url = `${this.hostPort}/web-sites/${siteId}`;
  const httpOptions = {
    headers: this.jsonHttpHeaders()
  };
  return this.httpClient
  .delete<number>(url, httpOptions)
  .map(data => {
    return data;
  });
}

  public deletePhone(siteId:string): Observable<number> {
    let url = `${this.hostPort}/phones/${siteId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .delete<number>(url, httpOptions)
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
