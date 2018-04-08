import {Observable} from "rxjs/Observable";

import {AccessRoleRepository} from "./access.role.repository";
import {Permission} from './permission';
import {Permissions} from './permissions';
import {Resource} from "./resource";
import {Resources} from "./resources";
import {ResourceType} from "./resource.type";
import {ResourceTypes} from "./resource.types";

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
  public findResourceTypeId(searchStr: string, pageSize: number): Observable<ResourceType[]> {
    return this.accessRoleRepository.findResourceTypeId(searchStr, pageSize);
  }
  
  public getResources(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<Resources> {
    return this.accessRoleRepository.getResources(defaultPage, defaultPageSize, defaultSortOrder);
  }

  public getResourceById(resourceId: string): Observable<Resource> {
    return this.accessRoleRepository.getResourceById(resourceId);
  }

  public addResource(resource: Resource): Observable<Resource> {
    return this.accessRoleRepository.addResource(resource);
  }

  public updateResource(resource: Resource): Observable<number> {
    return this.accessRoleRepository.updateResource(resource);
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

}
