import {Observable} from "rxjs/Observable";
import {Permission} from "./permission";

export interface PermissionRepository {

  addPermission(permission:Permission):Observable<Permission>;

  getPermissionById(permissionId:string, ownerPartyId:string):Observable<Permission>;

  updatePermission(permissionId:string, permission:Permission):Observable<number>;

  deletePermission(permissionId:string):Observable<number>;

}

