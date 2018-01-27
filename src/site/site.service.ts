import {SiteRepository} from "./site.repository";
import {Observable} from "rxjs/Observable";
import {Emails} from "./emails";
import {StreetAddresses} from "./street.addresses";
import {PostOfficeBoxes} from "./post.office.boxes";
import {Phones} from "./phones";
import {WebSites} from "./web.sites";

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

  public getPhones(pageNumber:number):Observable<Phones> {
    return this.siteRepository.getPhones(pageNumber);
  }

  public getWebSites(pageNumber:number):Observable<WebSites> {
    return this.siteRepository.getWebSites(pageNumber);
  }

}
