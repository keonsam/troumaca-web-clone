import {Observable} from "rxjs/Observable";
import {PermissionState} from "./permission.state";
import {PermissionStates} from "./permission.states";
import {ResourceState} from "./resource.state";
import {ResourceStates} from "./resource.states";
import {ResourceTypeState} from "./resource.type.state";
import {ResourceTypeStates} from "./resource.type.states";
import {ResourcePermissionState} from "./resource.permission.state";
import {AccessRoleState} from "./access.role.state";
import {AccessRoleStates} from "./access.role.states";
import {AccessRoleTypeState} from "./access.role.type.state";
import {AccessRoleTypeStates} from "./access.role.type.states";

export abstract class AccessRolesClient {

  //permission
  abstract getPermissions(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<PermissionStates>;

  abstract getPermissionById(permissionId: string): Observable<PermissionState>;

  abstract addPermission(permissionState: PermissionState): Observable<PermissionState>;

  abstract updatePermission(permissionState: PermissionState): Observable<number>;

  abstract deletePermission(permissionId: string): Observable<number>;

  // resources
  abstract getPermissionsByArray(defaultPage: number, defaultPageSize: number, defaultSortOrder: string, assignedArray:string[], type:string): Observable<PermissionStates>;

  abstract getResourcePermissionsByResourceId(permissionId: string): Observable<ResourcePermissionState[]>;

  abstract findResourceTypeId(searchStr: string, pageSize: number): Observable<ResourceTypeState[]>;

  abstract getResources(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<ResourceStates>;

  abstract getResourceById(resourceId: string): Observable<ResourceState>;

  abstract addResource(resourceState: ResourceState, resourcePermissionState:ResourcePermissionState[]): Observable<ResourceState>;

  abstract updateResource(resourceState: ResourceState, resourcePermissionState:ResourcePermissionState[]): Observable<number>;

  abstract deleteResource(resourceId: string): Observable<number>;

  //resourceTypes
  abstract getResourceTypes(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<ResourceTypeStates>;

  abstract getResourceTypeById(resourceTypeId: string): Observable<ResourceTypeState>;

  abstract addResourceType(resourceTypeState: ResourceTypeState): Observable<ResourceTypeState>;

  abstract updateResourceType(resourceTypeState: ResourceTypeState): Observable<number>;

  abstract deleteResourceType(resourceTypeId: string): Observable<number>;

  //access-roles
  abstract findAccessRoleTypeId(searchStr: string, pageSize: number): Observable<AccessRoleTypeState[]>;

  abstract getAccessRoles(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<AccessRoleStates>;

  abstract getAccessRoleById(accessRoleId: string): Observable<AccessRoleState>;

  abstract addAccessRole(accessRoleState: AccessRoleState): Observable<AccessRoleState>;

  abstract updateAccessRole(accessRoleState: AccessRoleState): Observable<number>;

  abstract deleteAccessRole(accessRoleId: string): Observable<number>;

  //access-role-types
  abstract getAccessRoleTypes(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<AccessRoleTypeStates>;

  abstract getAccessRoleTypeById(accessRoleTypeId: string): Observable<AccessRoleTypeState>;

  abstract addAccessRoleType(accessRoleTypeState: AccessRoleTypeState): Observable<AccessRoleTypeState>;

  abstract updateAccessRoleType(accessRoleTypeState: AccessRoleTypeState): Observable<number>;

  abstract deleteAccessRoleType(accessRoleTypeId: string): Observable<number>;
}
