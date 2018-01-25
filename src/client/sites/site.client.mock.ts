import {SiteClient} from "./site.client";
import {Observable} from "rxjs/Observable";
import {UnionOfPhysicalSiteStates} from "./union.of.physical.site.states";
import {EmailStates} from "./email.states";

export class SiteClientMock extends SiteClient {
  public getEmails(pageNumber: number): Observable<EmailStates> {
    return Observable.of(new EmailStates());
  }

  public findUnionOfPhysicalSiteStates(searchStr: string, pageSize: number): Observable<UnionOfPhysicalSiteStates> {
    return Observable.of(new UnionOfPhysicalSiteStates());
  }
}
