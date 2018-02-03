import {SiteRepository} from "./site.repository";
import {Observable} from "rxjs/Observable";
import {Emails} from "./emails";
import {StreetAddresses} from "./street.addresses";
import {PostOfficeBoxes} from "./post.office.boxes";
import {Phones} from "./phones";
import {WebSites} from "./web.sites";
import {Phone} from "./phone";
import {StreetAddress} from "./street.address";
import {PostOfficeBox} from "./post.office.box";

export class SiteService {

  constructor(private siteRepository: SiteRepository) {
  }

  public getStreetAddresses(pageNumber:number, pageSize:number, sortOrder:string):Observable<StreetAddresses> {
    return this.siteRepository.getStreetAddresses(pageNumber, pageSize, sortOrder);
  }

  public getPostOfficeBoxes(pageNumber:number, pageSize:number, sortOrder:string):Observable<PostOfficeBoxes> {
    return this.siteRepository.getPostOfficeBoxes(pageNumber, pageSize, sortOrder);
  }

  public getEmails(pageNumber:number):Observable<Emails> {
    return this.siteRepository.getEmails(pageNumber);
  }

  public getStreetAddress(siteId: string): Observable<StreetAddress> {
    return this.siteRepository.getStreetAddress(siteId);
  }

  public getPostOfficeBox(siteId:string): Observable<PostOfficeBox> {
    return this.siteRepository.getPostOfficeBox(siteId);
  }

  public getPhoneById(siteId:string):Observable<Phone> {
    return this.siteRepository.getPhone(siteId);
  }

  public getPhones(pageNumber:number, pageSize:number, sortOrder:string):Observable<Phones> {
    return this.siteRepository.getPhones(pageNumber, pageSize, sortOrder);
  }

  public getWebSites(pageNumber:number):Observable<WebSites> {
    return this.siteRepository.getWebSites(pageNumber);
  }

  public addPhone(phone: Phone):Observable<Phone> {
    return this.siteRepository.addPhone(phone);
  }

  public addStreetAddress(streetAddress: StreetAddress) : Observable<StreetAddress> {
    return this.siteRepository.addStreetAddress(streetAddress);
  }

  public addPostOfficeBox(postOfficeBox: PostOfficeBox): Observable<PostOfficeBox> {
    return this.siteRepository.addPostOfficeBox(postOfficeBox);
  }

  public updateStreetAddress(siteId:string, streetAddress: StreetAddress): Observable<number> {
    return this.siteRepository.updateStreetAddress(siteId, streetAddress);
  }

  public updatePostOfficeBox(siteId:string, postOfficeBox: PostOfficeBox): Observable<number> {
    return this.siteRepository.updatePostOfficeBox(siteId, postOfficeBox);
  }
  public updatePhone(siteId:string, phone: Phone):Observable<number> {
    return this.siteRepository.updatePhone(siteId, phone);
  }

  public deleteStreetAddress(siteId:string): Observable<number> {
    return this.siteRepository.deleteStreetAddress(siteId);
  }

  public deletePostOfficeBox(siteId:string): Observable<number> {
    return this.siteRepository.deletePostOfficeBox(siteId);
  }

  public deletePhone(siteId:string):Observable<number> {
    return this.siteRepository.deletePhone(siteId);
  }

}
