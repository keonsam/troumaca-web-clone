import {Observable} from "rxjs/Observable";

import {AccessRoleRepository} from "./access.role.repository";
import {Permission} from './permission';
import {Permissions} from './permissions';
import {Resource} from "./resource";
import {Resources} from "./resources";
import {ResourceType} from "./resource.type";
import {ResourceTypes} from "./resource.types";
import {ResourcePermission} from "./resource.permission";
import {AccessRole} from "./access.role";
import {AccessRoles} from "./access.roles";
import {AccessRoleType} from "./access.role.type";
import {AccessRoleTypes} from "./access.role.types";
import {Grant} from "./grant";

export class AccessRoleService {

  constructor(private accessRoleRepository: AccessRoleRepository) {
  }

  // permissions
  public getPermissions(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<Permissions> {
    return this.accessRoleRepository.getPermissions(defaultPage, defaultPageSize, defaultSortOrder);
  }

  public getPermissionById(permissionId: string): Observable<Permission> {
    return this.accessRoleRepository.getPermissionById(permissionId);
  }

  public addPermission(permission: Permission): Observable<Permission> {
    return this.accessRoleRepository.addPermission(permission);
  }

  public updatePermission(permission: Permission): Observable<number> {
    return this.accessRoleRepository.updatePermission(permission);
  }

  public deletePermission(permissionId: string): Observable<number> {
    return this.accessRoleRepository.deletePermission(permissionId);
  }

  // resources
  public getPermissionsByArray(defaultPage: number, defaultPageSize: number, defaultSortOrder: string, assignedArray:string[], type:string): Observable<Permissions> {
   return this.accessRoleRepository.getPermissionsByArray(defaultPage, defaultPageSize, defaultSortOrder, assignedArray, type);
  }

  public getResourcePermissionsByResourceId(resourceId: string): Observable<ResourcePermission[]> {
    return this.accessRoleRepository.getResourcePermissionsByResourceId(resourceId);
  }

  public findResourceTypeId(searchStr: string, pageSize: number): Observable<ResourceType[]> {
    return this.accessRoleRepository.findResourceTypeId(searchStr, pageSize);
  }

  public getResources(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<Resources> {
    return this.accessRoleRepository.getResources(defaultPage, defaultPageSize, defaultSortOrder);
  }

  public getResourceById(resourceId: string): Observable<Resource> {
    return this.accessRoleRepository.getResourceById(resourceId);
  }

  public addResource(resource: Resource, resourcePermissions: ResourcePermission[]): Observable<Resource> {
    return this.accessRoleRepository.addResource(resource, resourcePermissions);
  }

  public updateResource(resource: Resource, resourcePermissions: ResourcePermission[]): Observable<number> {
    return this.accessRoleRepository.updateResource(resource, resourcePermissions);
  }

  public deleteResource(resourceId: string): Observable<number> {
    return this.accessRoleRepository.deleteResource(resourceId);
  }

  // resourceTypes
  public getResourceTypes(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<ResourceTypes> {
    return this.accessRoleRepository.getResourceTypes(defaultPage, defaultPageSize, defaultSortOrder);
  }

  public getResourceTypeById(resourceTypeId: string): Observable<ResourceType> {
    return this.accessRoleRepository.getResourceTypeById(resourceTypeId);
  }

  public addResourceType(resourceType: ResourceType): Observable<ResourceType> {
    return this.accessRoleRepository.addResourceType(resourceType);
  }

  public updateResourceType(resourceType: ResourceType): Observable<number> {
    return this.accessRoleRepository.updateResourceType(resourceType);
  }

  public deleteResourceType(resourceTypeId: string): Observable<number> {
    return this.accessRoleRepository.deleteResourceType(resourceTypeId);
  }

  //access-roles
  public getResourcesByArray(defaultPage: number, defaultPageSize: number, defaultSortOrder: string, assignedArray:string[], type:string): Observable<Resources> {
    return this.accessRoleRepository.getResourcesByArray(defaultPage, defaultPageSize, defaultSortOrder, assignedArray, type);
  }

  public getAllResourcePermissions(): Observable<ResourcePermission[]> {
    return this.accessRoleRepository.getAllResourcePermissions();
  }

  public findAccessRoleTypeId(searchStr: string, pageSize: number): Observable<AccessRoleType[]> {
    return this.accessRoleRepository.findAccessRoleTypeId(searchStr, pageSize);
  }

  public getAccessRoles(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<AccessRoles> {
    return this.accessRoleRepository.getAccessRoles(defaultPage, defaultPageSize, defaultSortOrder);
  }

  public getAccessRoleById(accessRoleId: string): Observable<AccessRole> {
    return this.accessRoleRepository.getAccessRoleById(accessRoleId);
  }

  public addAccessRole(accessRole: AccessRole, grants: Grant[]): Observable<AccessRole> {
    return this.accessRoleRepository.addAccessRole(accessRole, grants);
  }

  public updateAccessRole(accessRole: AccessRole, grants: Grant[]): Observable<number> {
    return this.accessRoleRepository.updateAccessRole(accessRole, grants);
  }

  public deleteAccessRole(accessRoleId: string): Observable<number> {
    return this.accessRoleRepository.deleteAccessRole(accessRoleId);
  }

  //grants
  public getGrantsByAccessRoleId(accessRoleId:string): Observable<Grant[]> {
    return this.accessRoleRepository.getGrantsByAccessRoleId(accessRoleId);
  }

  //access-role-types
  public getAccessRoleTypes(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<AccessRoleTypes> {
    return this.accessRoleRepository.getAccessRoleTypes(defaultPage, defaultPageSize, defaultSortOrder);
  }

  public getAccessRoleTypeById(accessRoleTypeId: string): Observable<AccessRoleType> {
    return this.accessRoleRepository.getAccessRoleTypeById(accessRoleTypeId);
  }

  public addAccessRoleType(accessRoleType: AccessRoleType): Observable<AccessRoleType> {
    return this.accessRoleRepository.addAccessRoleType(accessRoleType);
  }

  public updateAccessRoleType(accessRoleType: AccessRoleType): Observable<number> {
    return this.accessRoleRepository.updateAccessRoleType(accessRoleType);
  }

  public deleteAccessRoleType(accessRoleTypeId: string): Observable<number> {
    return this.accessRoleRepository.deleteAccessRoleType(accessRoleTypeId);
  }

}
