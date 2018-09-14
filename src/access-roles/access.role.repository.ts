import {Observable} from 'rxjs';
import {Permission} from './permission';
import {Permissions} from './permissions';
import {Resource} from './resource';
import {Resources} from './resources';
import {ResourceType} from './resource.type';
import {ResourceTypes} from './resource.types';
import {ResourcePermission} from './resource.permission';
import {AccessRole} from './access.role';
import {AccessRoles} from './access.roles';
import {AccessRoleType} from './access.role.type';
import {AccessRoleTypes} from './access.role.types';
import {Grant} from './grant';
import {AccessRoleResponse} from './access.role.response';

export abstract class AccessRoleRepository {

  // permissions
  abstract getPermissions(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<Permissions>;

  abstract getPermissionById(permissionId: string): Observable<Permission>;

  abstract addPermission(permission: Permission): Observable<Permission>;

  abstract updatePermission(permission: Permission): Observable<number>;

  abstract deletePermission(permissionId: string): Observable<number>;

  // resources
  abstract getPermissionsByArray(defaultPage: number, defaultPageSize: number, defaultSortOrder: string, assignedArray: string[]): Observable<Permissions>;


  abstract getResourcePermissionsByResourceId(resourceId: string): Observable<ResourcePermission[]>;

  abstract findResourceTypeId(searchStr: string, pageSize: number): Observable<ResourceType[]>;

  abstract getResources(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<Resources>;

  abstract getResourceById(resourceId: string): Observable<Resource>;

  abstract addResource(resource: Resource, resourcePermissions: ResourcePermission[]): Observable<Resource>;

  abstract updateResource(resource: Resource, resourcePermissions: ResourcePermission[]): Observable<number>;

  abstract deleteResource(resourceId: string): Observable<number>;

  //resourceTypes
  abstract getResourceTypes(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<ResourceTypes>;

  abstract getResourceTypeById(resourceTypeId: string): Observable<ResourceType>;

  abstract addResourceType(resourceType: ResourceType): Observable<ResourceType>;

  abstract updateResourceType(resourceType: ResourceType): Observable<number>;

  abstract deleteResourceType(resourceTypeId: string): Observable<number>;

  //access-roles
  abstract getResourcesByArray(defaultPage: number, defaultPageSize: number, defaultSortOrder: string, assignedArray: string[], type: string): Observable<Resources>;

  abstract getAllResourcePermissions(): Observable<ResourcePermission[]>;

  abstract findAccessRoleTypeId(searchStr: string, pageSize: number): Observable<AccessRoleType[]>;

  abstract getAccessRoles(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<AccessRoles>;

  abstract getAccessRoleById(accessRoleId: string): Observable<AccessRoleResponse>;

  abstract addAccessRole(accessRole: AccessRole, grants: Grant[]): Observable<AccessRole>;

  abstract updateAccessRole(accessRole: AccessRole, grants: Grant[]): Observable<number>;

  abstract deleteAccessRole(accessRoleId: string): Observable<number>;

  //grants
  abstract getGrantsByAccessRoleId(accessRoleId: string): Observable<Grant[]>;

    //access-role-types
  abstract getAccessRoleTypes(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<AccessRoleTypes>;

  abstract getAccessRoleTypeById(accessRoleTypeId: string): Observable<AccessRoleType>;

  abstract addAccessRoleType(accessRoleType: AccessRoleType): Observable<AccessRoleType>;

  abstract updateAccessRoleType(accessRoleType: AccessRoleType): Observable<number>;

  abstract deleteAccessRoleType(accessRoleTypeId: string): Observable<number>;

}
