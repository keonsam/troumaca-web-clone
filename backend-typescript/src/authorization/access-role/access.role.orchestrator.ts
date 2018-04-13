import {AccessRoleRepository} from "./access.role.repository";
import {createAccessRoleRepositoryFactory} from "./access.role.repository.factory";
import {Observable} from "rxjs/Observable";
import {AccessRole} from "./access.role";
import {shapeAccessRolesResponse} from "./access.role.response.shaper";
import {Result} from "../../result.success";
import {getSortOrderOrDefault} from "../../sort.order.util";
import {Grant} from "../grant/grant";
import {GrantRepository} from "../grant/grant.repository";
import {createGrantRepositoryFactory} from "../grant/grant.repository.factory";

export class AccessRoleOrchestrator {

  private accessRoleRepository:AccessRoleRepository;
  private grantRepository: GrantRepository;
  
  constructor() {
    this.accessRoleRepository = createAccessRoleRepositoryFactory();
    this.grantRepository = createGrantRepositoryFactory();
  }

  findAccessRoles(searchStr: string, pageSize: number): Observable<AccessRole[]> {
    return this.accessRoleRepository.findAccessRoles(searchStr, pageSize);
  };

  getAccessRoles(number:number, size:number, field:string, direction:string):Observable<Result<any>> {
    let sort:string = getSortOrderOrDefault(field, direction);
    return this.accessRoleRepository
      .getAccessRoles(number, size, sort)
      .flatMap(value => {
        return this.accessRoleRepository
          .getAccessRoleCount()
          .map(count => {
            let shapeAccessRolesResp:any = shapeAccessRolesResponse(value, number, size, value.length, count, sort);
            return new Result<any>(false, "accessRoles", shapeAccessRolesResp);
          });
      });
  };

  addAccessRole(accessRole:AccessRole, grants: Grant[]):Observable<AccessRole> {
    return this.accessRoleRepository.addAccessRole(accessRole)
      .switchMap(doc => {
        if(doc) {
          let accessRoleId = doc.accessRoleId;
          grants.forEach(value => {
            value.accessRoleId = accessRoleId;
          });
          return this.grantRepository.addGrant(grants)
            .map(docs => {
              if(docs) {
                return doc;
              }
            });
        }
      });
  };

  getAccessRoleById(accessRoleId:string):Observable<AccessRole> {
    return this.accessRoleRepository.getAccessRoleById(accessRoleId);
  };

  updateAccessRole(accessRoleId:string, accessRole:AccessRole, grants: Grant[]):Observable<number> {
    return this.accessRoleRepository.updateAccessRole(accessRoleId, accessRole)
      .switchMap(numUpdated => {
        if(numUpdated) {
          return this.grantRepository.deleteGrant(accessRoleId)
            .switchMap(numReplaced => {
              if(numReplaced) {
                return this.grantRepository.addGrant(grants)
                  .map(docs => {
                    if(docs) {
                     return numUpdated; 
                    }
                  });
              }
            });
        }
      });
  };

  deleteAccessRole(accessRoleId:string):Observable<number>{
    return this.accessRoleRepository.deleteAccessRole(accessRoleId)
      .switchMap(numReplaced => {
        if(numReplaced){
          return this.grantRepository.deleteGrant(accessRoleId);
        }
        });
  };

}
