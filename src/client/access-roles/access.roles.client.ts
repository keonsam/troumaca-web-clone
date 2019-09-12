// import {Observable} from 'rxjs';
// import {Permissions} from '../../access-roles/permissions';
// import {Permission} from '../../access-roles/permission';
// import {Resources} from '../../access-roles/resources';
// import {ResourceType} from '../../access-roles/resource.type';
// import {Resource} from '../../access-roles/resource';
// import {ResourcePermission} from '../../access-roles/resource.permission';
// import {ResourceTypes} from '../../access-roles/resource.types';
// import {AccessRoleTypes} from '../../access-roles/access.role.types';
// import {AccessRoleType} from '../../access-roles/access.role.type';
// import {AccessRoles} from '../../access-roles/access.roles';
// import {AccessRole} from '../../access-roles/access.role';
// import {Grant} from '../../access-roles/grant';
//
// export abstract class AccessRolesClient {
//
//   // permission
//   abstract getPermissions(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<Permissions>;
//
//   abstract getPermissionById(permissionId: string): Observable<Permission>;
//
//   abstract addPermission(permissionState: Permission): Observable<Permission>;
//
//   abstract updatePermission(permissionState: Permission): Observable<number>;
//
//   abstract deletePermission(permissionId: string): Observable<number>;
//
//   // resources
//   abstract getPermissionsByArray(defaultPage: number, defaultPageSize: number, defaultSortOrder: string, assignedArray: string[]): Observable<Permissions>;
//
//   abstract getAssignablePermissions(defaultPage: number, defaultPageSize: number, defaultSortOrder: string, assignedArray: string[]): Observable<Permissions>;
//
//
//   abstract findResourceTypeId(searchStr: string, pageSize: number): Observable<ResourceType[]>;
//
//   abstract getResources(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<Resources>;
//
//   abstract getResourceById(resourceId: string): Observable<Resource>;
//
//   abstract addResource(resourceState: Resource, resourcePermission: ResourcePermission[]): Observable<Resource>;
//
//   abstract updateResource(resourceState: Resource, resourcePermission: ResourcePermission[]): Observable<number>;
//
//   abstract deleteResource(resourceId: string): Observable<number>;
//
//   // resourceTypes
//   abstract getResourceTypes(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<ResourceTypes>;
//
//   abstract getResourceTypeById(resourceTypeId: string): Observable<ResourceType>;
//
//   abstract addResourceType(resourceTypeState: ResourceType): Observable<ResourceType>;
//
//   abstract updateResourceType(resourceTypeState: ResourceType): Observable<number>;
//
//   abstract deleteResourceType(resourceTypeId: string): Observable<number>;
//
//   // access-roles
//
//   abstract findAccessRoleTypeId(searchStr: string, pageSize: number): Observable<AccessRoleType[]>;
//
//   abstract getAccessRoles(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<AccessRoles>;
//
//   abstract getAccessRoleById(accessRoleId: string): Observable<AccessRole>;
//
//   abstract addAccessRole(accessRoleState: AccessRole, grants: Grant[]): Observable<AccessRole>;
//
//   abstract updateAccessRole(accessRoleState: AccessRole, grants: Grant[]): Observable<number>;
//
//   abstract deleteAccessRole(accessRoleId: string): Observable<number>;
//
//   // access-role-types
//   abstract getAccessRoleTypes(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<AccessRoleTypes>;
//
//   abstract getAccessRoleTypeById(accessRoleTypeId: string): Observable<AccessRoleType>;
//
//   abstract addAccessRoleType(accessRoleTypeState: AccessRoleType): Observable<AccessRoleType>;
//
//   abstract updateAccessRoleType(accessRoleTypeState: AccessRoleType): Observable<number>;
//
//   abstract deleteAccessRoleType(accessRoleTypeId: string): Observable<number>;
// }
//
