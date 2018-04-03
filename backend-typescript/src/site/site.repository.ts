import {Observable} from "rxjs/Observable";
import {UnionOfPhysicalSite} from "./union.of.physical.site";

export interface SiteRepository {

  findSite(searchStr:string, pageSize:number): Observable<UnionOfPhysicalSite[]>;

}
