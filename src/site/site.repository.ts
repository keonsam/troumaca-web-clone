import {Observable} from "rxjs/Observable";
import {Emails} from "./emails";

export abstract class SiteRepository {
  abstract getEmails(pageNumber:number):Observable<Emails>;
}