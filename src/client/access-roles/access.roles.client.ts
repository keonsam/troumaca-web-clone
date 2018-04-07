import {Observable} from "rxjs/Observable";
import {PermissionState} from "./permission.state";
import {PermissionStates} from "./permission.states";

export abstract class AccessRolesClient {

  //permission
  abstract getPermissions(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<PermissionStates>;

  abstract getPermissionById(permissionId: string): Observable<PermissionState>;

  abstract addPermission(permissionState: PermissionState): Observable<PermissionState>;

  abstract updatePermission(permissionState: PermissionState): Observable<number>;

  abstract deletePermission(permissionId: string): Observable<number>;

}
