import {SiteRepository} from "./site.repository";
import {Observable} from "rxjs/Observable";
import {Emails} from "./emails";

export class SiteService {

  constructor(private siteRepository: SiteRepository) {
  }

  public getEmails(pageNumber:number):Observable<Emails> {
  return  this.siteRepository.getEmails(pageNumber);

  }
}
