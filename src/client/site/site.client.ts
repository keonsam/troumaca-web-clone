import {Observable} from 'rxjs/Observable';
import {UnionOfPhysicalSiteStates} from './union.of.physical.site.states';
import {EmailState} from './email.state';
import {EmailStates} from './email.states';
import {StreetAddressStates} from './street.address.states';
import {PostOfficeBoxState} from './post.office.box.state';
import {PostOfficeBoxStates} from './post.office.box.states';
import {PhoneStates} from './phone.states';
import {WebSiteStates} from './web.site.states';
import {PhoneState} from './phone.state';
import {StreetAddressState} from './street.address.state';
import {WebSiteState} from './web.site.state';

export abstract class SiteClient {

  public abstract findUnionOfPhysicalSiteStates(searchStr: string, pageSize: number): Observable<UnionOfPhysicalSiteStates>;

  public abstract getStreetAddressStates(pageNumber: number, pageSize: number, sortOrder: string): Observable<StreetAddressStates>;
  public abstract getPostOfficeBoxStates(pageNumber: number, pageSize: number, sortOrder: string): Observable<PostOfficeBoxStates>;
  public abstract getEmailStates(pageNumber: number, pageSize: number, sortOrder: string): Observable<EmailStates>;
  public abstract getWebSiteStates(pageNumber: number, pageSize: number, sortOrder: string): Observable<WebSiteStates>;
  public abstract getPhoneStates(pageNumber: number, pageSize: number, sortOrder: string): Observable<PhoneStates>;

  public abstract getStreetAddressState(siteId: string): Observable<StreetAddressState>;
  public abstract getPostOfficeBoxState(siteId: string): Observable<PostOfficeBoxState>;
  public abstract getEmailState(siteId: string): Observable<EmailState>;
  public abstract getWebSiteState(siteId: string): Observable<WebSiteState>;
  public abstract getPhoneState(siteId: string): Observable<PhoneState>;


  public abstract addPhone(phoneState: PhoneState): Observable<PhoneState>;
  public abstract addStreetAddress(streetAddressState: StreetAddressState): Observable<StreetAddressState>;
  public abstract addPostOfficeBox(postOfficeBoxState: PostOfficeBoxState): Observable<PostOfficeBoxState>;
  public abstract addEmail(emailstate: EmailState): Observable<EmailState>;
  public abstract addWebSite(webSiteState: WebSiteState): Observable<WebSiteState>;

  public abstract updateStreetAddress(siteId: string, streetAddressState: StreetAddressState): Observable<number>;
  public abstract updatePostOfficeBox(siteId: string, postOfficeBoxState: PostOfficeBoxState): Observable<number>;
  public abstract updateEmail(siteId: string, emailState: EmailState): Observable<number>;
  public abstract updateWebSite(siteId: string, webSiteState: WebSiteState): Observable<number>;
  public abstract updatePhone(siteId: string, phoneState: PhoneState): Observable<number>;

  public abstract deleteStreetAddress(siteId: string): Observable<number>;
  public abstract deletePostOfficeBox(siteId: string): Observable<number>;
  public abstract deleteEmail(siteId: string): Observable<number>;
  public abstract deleteWebSite(siteId: string): Observable<number>;
  public abstract deletePhone(siteId: string): Observable<number>;

}
