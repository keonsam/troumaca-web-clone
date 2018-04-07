import {PermissionRepository} from "./permission.repository";
import {createPermissionRepositoryFactory} from "./permission.repository.factory";
import {Observable} from "rxjs/Observable";
import {Permission} from "./permission";
import {getSortOrderOrDefault} from "../../sort.order.util";
import {Result} from "../../result.success";
import {shapePermissionsResponse} from "./permission.response.shaper";

export class PermissionOrchestrator {

  private permissionRepository:PermissionRepository;

  constructor() {
    this.permissionRepository = createPermissionRepositoryFactory();
  }

  getPermissions(number:number, size:number, field:string, direction:string):Observable<Result<any>> {
    let sort:string = getSortOrderOrDefault(field, direction);
    return this.permissionRepository
      .getPermissions(number, size, sort)
      .flatMap(value => {
        return this.permissionRepository
          .getPermissionCount()
          .map(count => {
            let shapePermissionsResp:any = shapePermissionsResponse(value, number, size, value.length, count, sort);
            return new Result<any>(false, "permissions", shapePermissionsResp);
          });
      });
  };

  addPermission(permission:Permission):Observable<Permission> {
    return this.permissionRepository.addPermission(permission);
  };

  getPermissionById(permissionId:string):Observable<Permission> {
    return this.permissionRepository.getPermissionById(permissionId);
  };

  updatePermission(permissionId:string, permission:Permission):Observable<number> {
    return this.permissionRepository.updatePermission(permissionId, permission);
  };

  deletePermission(permissionId:string):Observable<number>{
    return this.permissionRepository.deletePermission(permissionId);
  };

}





