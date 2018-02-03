import {Observable} from "rxjs/Observable";
import {Emails} from "./emails";
import {StreetAddresses} from "./street.addresses";
import {PostOfficeBoxes} from "./post.office.boxes";
import {Phones} from "./phones";
import {WebSites} from "./web.sites";
import {Phone} from "./phone";
import {StreetAddress} from "./street.address";
import {PostOfficeBox} from "./post.office.box";

export abstract class SiteRepository {
  abstract getPostOfficeBoxes(pageNumber: number, pageSize:number, sortOrder:string):Observable<PostOfficeBoxes>;
  abstract getStreetAddresses(pageNumber: number, pageSize:number, sortOrder:string):Observable<StreetAddresses>;
  abstract getEmails(pageNumber:number):Observable<Emails>;
  abstract getPhones(pageNumber:number, pageSize:number, sortOrder:string):Observable<Phones>;

  abstract getStreetAddress(siteId:string): Observable<StreetAddress>;
  abstract getPostOfficeBox(siteId:string): Observable<PostOfficeBox>;
  abstract getPhone(siteId:string):Observable<Phone>;
  abstract getWebSites(pageNumber:number):Observable<WebSites>;

  abstract addPhone(phone:Phone):Observable<Phone>;
  abstract addStreetAddress(streetAddress: StreetAddress): Observable<StreetAddress>;
  abstract addPostOfficeBox(postOfficeBox: PostOfficeBox): Observable<PostOfficeBox>;

  abstract updateStreetAddress(siteId:string, streetAddress:StreetAddress): Observable<number>;
  abstract updatePostOfficeBox(siteId:string, postOfficeBox:PostOfficeBox): Observable<number>;
  abstract updatePhone(siteId:string, phone:Phone):Observable<number>;

  abstract deleteStreetAddress(siteId:string): Observable<number>;
  abstract deletePostOfficeBox(siteId:string): Observable<number>;
  abstract deletePhone(siteId:string):Observable<number>;

}
