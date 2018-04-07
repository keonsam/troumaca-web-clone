import {Observable} from "rxjs/Observable";
import {Permission} from "./permission";
import {Permissions} from "./permissions";


export abstract class AccessRoleRepository {

  // permissions
  abstract getPermissions(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<Permissions>;

  abstract getPermissionById(permissionId: string): Observable<Permission>;

  abstract addPermission(permission: Permission): Observable<Permission>;

  abstract updatePermission(permission: Permission): Observable<number>;

  abstract deletePermission(permissionId: string): Observable<number>;
}
