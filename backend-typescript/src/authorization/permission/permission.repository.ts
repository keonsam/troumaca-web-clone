import {Observable} from "rxjs/Observable";
import {Permission} from "./permission";

export interface PermissionRepository {

  getPermissions(number: number, size: number, sort:string):Observable<Permission[]>;

  getPermissionCount():Observable<number>;

  addPermission(permission:Permission):Observable<Permission>;

  getPermissionById(permissionId:string):Observable<Permission>;

  updatePermission(permissionId:string, permission:Permission):Observable<number>;

  deletePermission(permissionId:string):Observable<number>;

}

