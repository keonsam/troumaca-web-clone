import {AccessRoleRepository} from "./access.role.repository";
import {createAccessRoleRepositoryFactory} from "./access.role.repository.factory";
import {Observable} from "rxjs/Observable";
import {AccessRole} from "./access.role";
import {shapeAccessRolesResponse} from "./access.role.response.shaper";
import {Result} from "../../result.success";
import {getSortOrderOrDefault} from "../../sort.order.util";

export class AccessRoleOrchestrator {

  private accessRoleRepository:AccessRoleRepository;

  constructor() {
    this.accessRoleRepository = createAccessRoleRepositoryFactory();
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

  addAccessRole(accessRole:AccessRole):Observable<AccessRole> {
    return this.accessRoleRepository.addAccessRole(accessRole);
  };

  getAccessRoleById(accessRoleId:string):Observable<AccessRole> {
    return this.accessRoleRepository.getAccessRoleById(accessRoleId);
  };

  updateAccessRole(accessRoleId:string, accessRole:AccessRole):Observable<number> {
    return this.accessRoleRepository.updateAccessRole(accessRoleId, accessRole);
  };

  deleteAccessRole(accessRoleId:string):Observable<number>{
    return this.accessRoleRepository.deleteAccessRole(accessRoleId);
  };

}
