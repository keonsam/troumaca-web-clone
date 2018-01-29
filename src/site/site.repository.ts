import {Observable} from "rxjs/Observable";
import {Emails} from "./emails";
import {StreetAddresses} from "./street.addresses";
import {PostOfficeBoxes} from "./post.office.boxes";
import {Phones} from "./phones";
import {WebSites} from "./web.sites";
import {Phone} from "./phone";

export abstract class SiteRepository {
  abstract getPostOfficeBoxes(pageNumber: number):Observable<PostOfficeBoxes>;
  abstract getStreetAddresses(pageNumber: number):Observable<StreetAddresses>;

  abstract getEmails(pageNumber:number):Observable<Emails>;
  abstract getPhones(pageNumber:number, pageSize:number, sortOrder:string):Observable<Phones>;
  abstract getPhone(siteId:string):Observable<Phone>;
  abstract getWebSites(pageNumber:number):Observable<WebSites>;
  abstract addPhone(phone:Phone):Observable<Phone>;
  abstract updatePhone(siteId:string, phone:Phone):Observable<number>;
  abstract deletePhone(siteId:string):Observable<number>;

}