import {GrantRepository} from "./grant.repository";
import {createGrantRepositoryFactory} from "./grant.repository.factory";
import {Observable} from "rxjs/Observable";
import {Grant} from "./grant";

export class GrantOrchestrator {

  private grantRepository:GrantRepository;

  constructor() {
    this.grantRepository = createGrantRepositoryFactory();
  }

  addGrant(grant:Grant):Observable<Grant> {
    return this.grantRepository.addGrant(grant);
  };

  getGrantById(grantId:string, ownerPartyId:string):Observable<Grant> {
    return this.grantRepository.getGrantById(grantId, ownerPartyId);
  };

  updateGrant(grantId:string, grant:Grant):Observable<number> {
    return this.grantRepository.updateGrant(grantId, grant);
  };

  deleteGrant(grantId:string):Observable<number>{
    return this.grantRepository.deleteGrant(grantId);
  };

}







