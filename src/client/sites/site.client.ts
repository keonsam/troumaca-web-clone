import {Observable} from "rxjs/Observable";
import {UnionOfPhysicalSiteStates} from "./union.of.physical.site.states";
import {EmailStates} from "./email.states";
import {StreetAddressStates} from "./street.address.states";
import {PostOfficeBoxStates} from "./post.office.box.states";
import {PhoneStates} from "./phone.states";
import {WebSiteStates} from "./web.site.states";

export abstract class SiteClient {

  public abstract findUnionOfPhysicalSiteStates(searchStr:string, pageSize:number):Observable<UnionOfPhysicalSiteStates>;

  public abstract getStreetAddressStates(pageNumber: number):Observable<StreetAddressStates>;
  public abstract getPostOfficeBoxStates(pageNumber: number):Observable<PostOfficeBoxStates>;

  public abstract getEmailStates(pageNumber:number):Observable<EmailStates>;
  public abstract getPhoneStates(pageNumber:number):Observable<PhoneStates>;
  public abstract getWebSiteStates(pageNumber:number):Observable<WebSiteStates>;

}
