import {SiteClient} from "./site.client";
import {Observable} from "rxjs/Observable";
import {UnionOfPhysicalSiteStates} from "./union.of.physical.site.states";

export class SiteClientMock extends SiteClient {
  public findUnionOfPhysicalSiteStates(searchStr: string, pageSize: number): Observable<UnionOfPhysicalSiteStates> {
    return Observable.of(new UnionOfPhysicalSiteStates());
  }
}