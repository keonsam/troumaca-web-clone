import {Observable} from 'rxjs';
import {StreetAddress} from "../../site/street.address";
import {PostOfficeBoxes} from "../../site/post.office.boxes";
import {Emails} from "../../site/emails";
import {WebSites} from "../../site/web.sites";
import {Phones} from "../../site/phones";
import {PostOfficeBox} from "../../site/post.office.box";
import {Email} from "../../site/email";
import {WebSite} from "../../site/web.site";
import {Phone} from "../../site/phone";
import {StreetAddresses} from "../../site/street.addresses";

export abstract class SiteClient {

  public abstract getStreetAddressStates(pageNumber: number, pageSize: number, sortOrder: string): Observable<StreetAddresses>;
  public abstract getPostOfficeBoxStates(pageNumber: number, pageSize: number, sortOrder: string): Observable<PostOfficeBoxes>;
  public abstract getEmailStates(pageNumber: number, pageSize: number, sortOrder: string): Observable<Emails>;
  public abstract getWebSiteStates(pageNumber: number, pageSize: number, sortOrder: string): Observable<WebSites>;
  public abstract getPhoneStates(pageNumber: number, pageSize: number, sortOrder: string): Observable<Phones>;

  public abstract getStreetAddressState(siteId: string): Observable<StreetAddress>;
  public abstract getPostOfficeBoxState(siteId: string): Observable<PostOfficeBox>;
  public abstract getEmailState(siteId: string): Observable<Email>;
  public abstract getWebSiteState(siteId: string): Observable<WebSite>;
  public abstract getPhoneState(siteId: string): Observable<Phone>;


  public abstract addPhone(phoneState: Phone): Observable<Phone>;
  public abstract addStreetAddress(streetAddressState: StreetAddress): Observable<StreetAddress>;
  public abstract addPostOfficeBox(postOfficeBoxState: PostOfficeBox): Observable<PostOfficeBox>;
  public abstract addEmail(emailState: Email): Observable<Email>;
  public abstract addWebSite(webSiteState: WebSite): Observable<WebSite>;

  public abstract updateStreetAddress(siteId: string, streetAddressState: StreetAddress): Observable<number>;
  public abstract updatePostOfficeBox(siteId: string, postOfficeBoxState: PostOfficeBox): Observable<number>;
  public abstract updateEmail(siteId: string, emailState: Email): Observable<number>;
  public abstract updateWebSite(siteId: string, webSiteState: WebSite): Observable<number>;
  public abstract updatePhone(siteId: string, phoneState: Phone): Observable<number>;

  public abstract deleteStreetAddress(siteId: string): Observable<number>;
  public abstract deletePostOfficeBox(siteId: string): Observable<number>;
  public abstract deleteEmail(siteId: string): Observable<number>;
  public abstract deleteWebSite(siteId: string): Observable<number>;
  public abstract deletePhone(siteId: string): Observable<number>;

}
