import {Observable} from "rxjs/Observable";
import {PermissionState} from "./permission.state";
import {PermissionStates} from "./permission.states";
import {ResourceState} from "./resource.state";
import {ResourceStates} from "./resource.states";
import {ResourceTypeState} from "./resource.type.state";
import {ResourceTypeStates} from "./resource.type.states";
import {ResourceType} from "../../access-roles/resource.type";

export abstract class AccessRolesClient {

  //permission
  abstract getPermissions(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<PermissionStates>;

  abstract getPermissionById(permissionId: string): Observable<PermissionState>;

  abstract addPermission(permissionState: PermissionState): Observable<PermissionState>;

  abstract updatePermission(permissionState: PermissionState): Observable<number>;

  abstract deletePermission(permissionId: string): Observable<number>;

  // resources
  abstract findResourceTypeId(searchStr: string, pageSize: number): Observable<ResourceTypeState[]>;

  abstract getResources(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<ResourceStates>;

  abstract getResourceById(resourceId: string): Observable<ResourceState>;

  abstract addResource(resourceState: ResourceState): Observable<ResourceState>;

  abstract updateResource(resourceState: ResourceState): Observable<number>;

  abstract deleteResource(resourceId: string): Observable<number>;

  //resourceTypes
  abstract getResourceTypes(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<ResourceTypeStates>;

  abstract getResourceTypeById(resourceTypeId: string): Observable<ResourceTypeState>;

  abstract addResourceType(resourceTypeState: ResourceTypeState): Observable<ResourceTypeState>;

  abstract updateResourceType(resourceTypeState: ResourceTypeState): Observable<number>;

  abstract deleteResourceType(resourceTypeId: string): Observable<number>;
}
