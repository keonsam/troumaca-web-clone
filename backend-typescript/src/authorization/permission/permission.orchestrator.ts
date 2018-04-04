import {PermissionRepository} from "./permission.repository";
import {createPermissionRepositoryFactory} from "./permission.repository.factory";
import {Observable} from "rxjs/Observable";
import {Permission} from "./permission";

export class PermissionOrchestrator {

  private permissionRepository:PermissionRepository;

  constructor() {
    this.permissionRepository = createPermissionRepositoryFactory();
  }

  addPermission(permission:Permission):Observable<Permission> {
    return this.permissionRepository.addPermission(permission);
  };

  getPermissionById(permissionId:string, ownerPartyId:string):Observable<Permission> {
    return this.permissionRepository.getPermissionById(permissionId, ownerPartyId);
  };

  updatePermission(permissionId:string, permission:Permission):Observable<number> {
    return this.permissionRepository.updatePermission(permissionId, permission);
  };

  deletePermission(permissionId:string):Observable<number>{
    return this.permissionRepository.deletePermission(permissionId);
  };

}





