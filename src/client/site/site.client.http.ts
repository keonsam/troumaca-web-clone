import {SiteClient} from './site.client';
import {UUIDGenerator} from '../../uuid.generator';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {StreetAddresses} from '../../site/street.addresses';
import {PostOfficeBoxes} from '../../site/post.office.boxes';
import {Emails} from '../../site/emails';
import {WebSites} from '../../site/web.sites';
import {Phones} from '../../site/phones';
import {StreetAddress} from '../../site/street.address';
import {PostOfficeBox} from '../../site/post.office.box';
import {Email} from '../../site/email';
import {WebSite} from '../../site/web.site';
import {Phone} from '../../site/phone';
import {environment} from '../../environments/environment';

export class SiteClientHttp extends SiteClient {

  hostPort = environment.hostPort;
  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient) {
    super();
  }

  public getStreetAddressStates(pageNumber: number, pageSize: number, sortOrder: string): Observable<StreetAddresses> {
    const url = `${this.hostPort}/street-addresses?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<StreetAddresses>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public getPostOfficeBoxStates(pageNumber: number, pageSize: number, sortOrder: string): Observable<PostOfficeBoxes> {
    const url = `${this.hostPort}/post-office-boxes?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<PostOfficeBoxes>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public getEmailStates(pageNumber: number, pageSize: number, sortOrder: string): Observable<Emails> {
    const url = `${this.hostPort}/emails?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<Emails>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public getWebSiteStates(pageNumber: number, pageSize: number, sortOrder: string): Observable<WebSites> {
    const url = `${this.hostPort}/web-sites?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<WebSites>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public getPhoneStates(pageNumber: number, pageSize: number, sortOrder: string): Observable<Phones> {
    const url = `${this.hostPort}/phones?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<Phones>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public getStreetAddressState(siteId: string): Observable<StreetAddress> {
    const url = `${this.hostPort}/street-addresses/${siteId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .get<StreetAddress>(url, httpOptions)
    .pipe(map(data => {
      return data;
    }));
  }

  public getPostOfficeBoxState(siteId: string): Observable<PostOfficeBox> {
    const url = `${this.hostPort}/post-office-boxes/${siteId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .get<PostOfficeBox>(url, httpOptions)
    .pipe(map(data => {
      return data;
    }));
  }

  public getEmailState(siteId: string): Observable<Email> {
    const url = `${this.hostPort}/emails/${siteId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .get<Email>(url, httpOptions)
    .pipe(map(data => {
      return data;
    }));
  }

  public getWebSiteState(siteId: string): Observable<WebSite> {
    const url = `${this.hostPort}/web-sites/${siteId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .get<WebSite>(url, httpOptions)
    .pipe(map(data => {
      return data;
    }));
  }

  public getPhoneState(siteId: string): Observable<Phone> {
    const url = `${this.hostPort}/phones/${siteId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .get<Phone>(url, httpOptions)
    .pipe(map(data => {
      return data;
    }));
  }

  public addPhone(phoneState: Phone): Observable<Phone> {
    const url = `${this.hostPort}/phones`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .post<Phone>(url, phoneState, httpOptions)
    .pipe(map(data => {
      return data;
    }));
  }

  public addStreetAddress(streetAddressState: StreetAddress): Observable<StreetAddress> {
    const url = `${this.hostPort}/street-addresses`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .post<StreetAddress>(url, streetAddressState, httpOptions)
    .pipe(map(data => {
      return data;
    }));
  }

  public addPostOfficeBox(postOfficeBoxState: PostOfficeBox): Observable<PostOfficeBox> {
    const url = `${this.hostPort}/post-office-boxes`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .post<PostOfficeBox>(url, postOfficeBoxState, httpOptions)
    .pipe(map(data => {
      return data;
    }));
  }

  public addEmail(emailState: Email): Observable<Email> {
    const url = `${this.hostPort}/emails`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .post<Email>(url, emailState, httpOptions)
    .pipe(map(data => {
      return data;
    }));
  }

  public addWebSite(webSiteState: WebSite): Observable<WebSite> {
    const url = `${this.hostPort}/web-sites`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .post<WebSite>(url, webSiteState, httpOptions)
    .pipe(map(data => {
      return data;
    }));
  }

  public updateStreetAddress(siteId: string, streetAddressState: StreetAddress): Observable<number> {
    const url = `${this.hostPort}/street-addresses/${siteId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .put<number>(url, streetAddressState, httpOptions)
    .pipe(map(data => {
      return data;
    }));
  }

  public updatePostOfficeBox(siteId: string, postOfficeBoxState: PostOfficeBox): Observable<number> {
    const url = `${this.hostPort}/post-office-boxes/${siteId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .put<number>(url, postOfficeBoxState, httpOptions)
    .pipe(map(data => {
      return data;
    }));
  }

  public updateEmail(siteId: string, emailState: Email): Observable<number> {
    const url = `${this.hostPort}/emails/${siteId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .put<number>(url, emailState, httpOptions)
    .pipe(map(data => {
      return data;
    }));
  }

  public updateWebSite(siteId: string, webSiteState: WebSite): Observable<number> {
    const url = `${this.hostPort}/web-sites/${siteId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .put<number>(url, webSiteState, httpOptions)
    .pipe(map(data => {
      return data;
    }));
  }

  public updatePhone(siteId: string, phoneState: Phone): Observable<number> {
    const url = `${this.hostPort}/phones/${siteId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .put<number>(url, phoneState, httpOptions)
    .pipe(map(data => {
      return data;
    }));
  }

  public deleteStreetAddress(siteId: string): Observable<number> {
    const url = `${this.hostPort}/street-addresses/${siteId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .delete<number>(url, httpOptions)
    .pipe(map(data => {
      return data;
    }));
  }

  public deletePostOfficeBox(siteId: string): Observable<number> {
    const url = `${this.hostPort}/post-office-boxes/${siteId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .delete<number>(url, httpOptions)
    .pipe(map(data => {
      return data;
    }));
}

public deleteEmail(siteId: string): Observable<number> {
  const url = `${this.hostPort}/emails/${siteId}`;
  const httpOptions = {
    headers: this.jsonHttpHeaders()
  };
  return this.httpClient
  .delete<number>(url, httpOptions)
  .pipe(map(data => {
    return data;
  }));
}

public deleteWebSite(siteId: string): Observable<number> {
  const url = `${this.hostPort}/web-sites/${siteId}`;
  const httpOptions = {
    headers: this.jsonHttpHeaders()
  };
  return this.httpClient
  .delete<number>(url, httpOptions)
  .pipe(map(data => {
    return data;
  }));
}

  public deletePhone(siteId: string): Observable<number> {
    const url = `${this.hostPort}/phones/${siteId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .delete<number>(url, httpOptions)
    .pipe(map(data => {
      return data;
    }));
  }

  public jsonHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type':  'application/json',
      'correlationId': this.uuidGenerator.generateUUID()
    });
  }

}
