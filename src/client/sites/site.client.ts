import {Observable} from "rxjs/Observable";
import {UnionOfPhysicalSiteStates} from "./union.of.physical.site.states";
import {EmailStates} from "./email.states";

export abstract class SiteClient {
  public abstract findUnionOfPhysicalSiteStates(searchStr:string, pageSize:number):Observable<UnionOfPhysicalSiteStates>;
  public abstract getEmails(pageNumber:number):Observable<EmailStates>;
}
