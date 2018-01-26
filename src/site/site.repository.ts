import {Observable} from "rxjs/Observable";
import {Emails} from "./emails";
import {StreetAddresses} from "./street.addresses";
import {PostOfficeBoxes} from "./post.office.boxes";
import {Phones} from "./phones";
import {WebSites} from "./web.sites";

export abstract class SiteRepository {
  abstract getPostOfficeBoxes(pageNumber: number):Observable<PostOfficeBoxes>;
  abstract getStreetAddresses(pageNumber: number):Observable<StreetAddresses>;

  abstract getEmails(pageNumber:number):Observable<Emails>;
  abstract getPhones(pageNumber:number):Observable<Phones>;
  abstract getWebSites(pageNumber:number):Observable<WebSites>;

}