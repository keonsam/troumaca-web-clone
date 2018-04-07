import {Observable} from "rxjs/Observable";
import {Permission} from "./permission";
import {Permissions} from "./permissions";
import {Resource} from "./resource";
import {Resources} from "./resources";

export abstract class AccessRoleRepository {

  // permissions
  abstract getPermissions(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<Permissions>;

  abstract getPermissionById(permissionId: string): Observable<Permission>;

  abstract addPermission(permission: Permission): Observable<Permission>;

  abstract updatePermission(permission: Permission): Observable<number>;

  abstract deletePermission(permissionId: string): Observable<number>;

  //resources
  abstract getResources(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<Resources>;

  abstract getResourceById(resourceId: string): Observable<Resource>;

  abstract addResource(resource: Resource): Observable<Resource>;

  abstract updateResource(resource: Resource): Observable<number>;

  abstract deleteResource(resourceId: string): Observable<number>;

}
