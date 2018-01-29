import {SiteRepository} from "./site.repository";
import {Observable} from "rxjs/Observable";
import {Emails} from "./emails";
import {StreetAddresses} from "./street.addresses";
import {PostOfficeBoxes} from "./post.office.boxes";
import {Phones} from "./phones";
import {WebSites} from "./web.sites";
import {Phone} from "./phone";

export class SiteService {

  constructor(private siteRepository: SiteRepository) {
  }

  public getStreetAddresses(pageNumber:number):Observable<StreetAddresses> {
    return this.siteRepository.getStreetAddresses(pageNumber);
  }

  public getPostOfficeBoxes(pageNumber:number):Observable<PostOfficeBoxes> {
    return this.siteRepository.getPostOfficeBoxes(pageNumber);
  }

  public getEmails(pageNumber:number):Observable<Emails> {
    return this.siteRepository.getEmails(pageNumber);
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

  public updatePhone(siteId:string, phone: Phone):Observable<number> {
    return this.siteRepository.updatePhone(siteId, phone);
  }

  public deletePhone(siteId:string):Observable<number> {
    return this.siteRepository.deletePhone(siteId);
  }

}
