import {SiteClient} from "./site.client";
import {Observable} from "rxjs/Observable";
import {UnionOfPhysicalSiteStates} from "./union.of.physical.site.states";
import {EmailStates} from "./email.states";
import {StreetAddressStates} from "./street.address.states";
import {PostOfficeBoxStates} from "./post.office.box.states";
import {PhoneStates} from "./phone.states";
import {WebSiteStates} from "./web.site.states";
export class SiteClientMock extends SiteClient {
  public getEmails(pageNumber: number): Observable<EmailStates> {
    return Observable.of(new EmailStates());
  }

  public findUnionOfPhysicalSiteStates(searchStr: string, pageSize: number): Observable<UnionOfPhysicalSiteStates> {
    return Observable.of(new UnionOfPhysicalSiteStates());
  }

  public  getStreetAddressStates(pageNumber: number):Observable<StreetAddressStates>{
    return Observable.of(new StreetAddressStates());
  }

  public  getPostOfficeBoxStates(pageNumber: number):Observable<PostOfficeBoxStates>{
   return  Observable.of(new PostOfficeBoxStates());
  }

  public  getEmailStates(pageNumber:number):Observable<EmailStates> {
    return Observable.of(new EmailStates());
  }
  public  getPhoneStates(pageNumber:number):Observable<PhoneStates> {
    return Observable.of(new PhoneStates());
  }
  public  getWebSiteStates(pageNumber:number):Observable<WebSiteStates> {
    return Observable.of(new WebSiteStates());
  }
}
