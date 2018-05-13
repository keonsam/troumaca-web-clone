import {PartyAccessRoleRepository} from "./party.access.role.repository";
import {createPartyAccessRoleRepositoryFactory} from "./party.access.role.repository.factory";
import {Observable} from "rxjs/Observable";
import {PartyAccessRole} from "./party.access.role";
//import {shapePartyAccessRolesResponse} from "./party.access.role.response.shaper";
//import {Result} from "../../result.success";
//import {getSortOrderOrDefault} from "../../sort.order.util";

export class PartyAccessRoleOrchestrator {

  private partyPartyAccessRoleRepository:PartyAccessRoleRepository;

  constructor() {
    this.partyPartyAccessRoleRepository = createPartyAccessRoleRepositoryFactory();
  }

  // findPartyAccessRoles(searchStr: string, pageSize: number): Observable<PartyAccessRole[]> {
  //   return this.partyPartyAccessRoleRepository.findPartyAccessRoles(searchStr, pageSize);
  // };

  getPartyAccessRoles():Observable<PartyAccessRole[]> {
    return this.partyPartyAccessRoleRepository.getPartyAccessRoles();
  };

  //
  // addPartyAccessRole(partyPartyAccessRole:PartyAccessRole, grants: Grant[]):Observable<PartyAccessRole> {
  //   return this.partyPartyAccessRoleRepository.addPartyAccessRole(partyPartyAccessRole)
  //     .switchMap(doc => {
  //       if(doc) {
  //         let partyPartyAccessRoleId = doc.partyPartyAccessRoleId;
  //         grants.forEach(value => {
  //           value.partyPartyAccessRoleId = partyPartyAccessRoleId;
  //         });
  //         return this.grantRepository.addGrant(grants)
  //           .map(docs => {
  //             if(docs) {
  //               return doc;
  //             }
  //           });
  //       }
  //     });
  // };

  getPartyAccessRoleById(partyPartyAccessRoleId:string):Observable<PartyAccessRole[]> {
    return this.partyPartyAccessRoleRepository.getPartyAccessRoleById(partyPartyAccessRoleId);
  };

  // updatePartyAccessRole(partyPartyAccessRoleId:string, partyPartyAccessRole:PartyAccessRole, grants: Grant[]):Observable<number> {
  //   return this.partyPartyAccessRoleRepository.updatePartyAccessRole(partyPartyAccessRoleId, partyPartyAccessRole)
  //     .switchMap(numUpdated => {
  //       if(numUpdated) {
  //         return this.grantRepository.deleteGrant(partyPartyAccessRoleId)
  //           .switchMap(numReplaced => {
  //             if(numReplaced) {
  //               return this.grantRepository.addGrant(grants)
  //                 .map(docs => {
  //                   if(docs) {
  //                    return numUpdated;
  //                   }
  //                 });
  //             }
  //           });
  //       }
  //     });
  // };

  // deletePartyAccessRole(partyPartyAccessRoleId:string):Observable<number>{
  //   return this.partyPartyAccessRoleRepository.deletePartyAccessRole(partyPartyAccessRoleId)
  //     .switchMap(numReplaced => {
  //       if(numReplaced){
  //         return this.grantRepository.deleteGrant(partyPartyAccessRoleId);
  //       }
  //       });
  // };

}
