import {Observable} from "rxjs/Observable";
import {PermissionState} from "./permission.state";
import {PermissionStates} from "./permission.states";
import {ResourceState} from "./resource.state";
import {ResourceStates} from "./resource.states";

export abstract class AccessRolesClient {

  //permission
  abstract getPermissions(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<PermissionStates>;

  abstract getPermissionById(permissionId: string): Observable<PermissionState>;

  abstract addPermission(permissionState: PermissionState): Observable<PermissionState>;

  abstract updatePermission(permissionState: PermissionState): Observable<number>;

  abstract deletePermission(permissionId: string): Observable<number>;

  // resources
  abstract getResources(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<ResourceStates>;

  abstract getResourceById(resourceId: string): Observable<ResourceState>;

  abstract addResource(resourceState: ResourceState): Observable<ResourceState>;

  abstract updateResource(resourceState: ResourceState): Observable<number>;

  abstract deleteResource(resourceId: string): Observable<number>;

}
