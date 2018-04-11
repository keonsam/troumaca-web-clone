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
  public getAccessRoles(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<AccessRoles> {
    return this.accessRoleRepository.getAccessRoles(defaultPage, defaultPageSize, defaultSortOrder);
  }

  public getAccessRoleById(accessRoleId: string): Observable<AccessRole> {
    return this.accessRoleRepository.getAccessRoleById(accessRoleId);
  }

  public addAccessRole(accessRole: AccessRole): Observable<AccessRole> {
    return this.accessRoleRepository.addAccessRole(accessRole);
  }

  public updateAccessRole(accessRole: AccessRole): Observable<number> {
    return this.accessRoleRepository.updateAccessRole(accessRole);
  }

  public deleteAccessRole(accessRoleId: string): Observable<number> {
    return this.accessRoleRepository.deleteAccessRole(accessRoleId);
  }

}
