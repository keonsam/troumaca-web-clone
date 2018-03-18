import {Observable} from "rxjs/Observable";
import {Grant} from "./grant";

export interface GrantRepository {

  addGrant(grant:Grant):Observable<Grant>;

  getGrantById(grantId:string, ownerPartyId:string):Observable<Grant>;

  updateGrant(grantId:string, grant:Grant):Observable<number>;

  deleteGrant(grantId:string):Observable<number>;

}

