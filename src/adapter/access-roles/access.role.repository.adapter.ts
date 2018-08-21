import {AccessRoleRepository} from '../../access-roles/access.role.repository';
import {Permission} from '../../access-roles/permission';
import {Permissions} from '../../access-roles/permissions';
import {PermissionState} from '../../client/access-roles/permission.state';
import {Resource} from '../../access-roles/resource';
import {Resources} from '../../access-roles/resources';
import {ResourceState} from '../../client/access-roles/resource.state';
import {ResourceType} from '../../access-roles/resource.type';
import {ResourceTypes} from '../../access-roles/resource.types';
import {ResourceTypeState} from '../../client/access-roles/resource.type.state';
import {AccessRole} from '../../access-roles/access.role';
import {AccessRoles} from '../../access-roles/access.roles';
import {AccessRoleState} from '../../client/access-roles/access.role.state';
import {AccessRoleType} from '../../access-roles/access.role.type';
import {AccessRoleTypes} from '../../access-roles/access.role.types';
import {AccessRoleTypeState} from '../../client/access-roles/access.role.type.state';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators'
import {AccessRolesClient} from '../../client/access-roles/access.roles.client';
import {mapObjectProps} from '../../mapper/object.property.mapper';
// import { map } from 'underscore';
import {Page} from '../../page/page';
import {Sort} from '../../sort/sort';
import {ResourcePermission} from '../../access-roles/resource.permission';
import {ResourcePermissionState} from '../../client/access-roles/resource.permission.state';
import {Grant} from '../../access-roles/grant';
import {GrantState} from '../../client/access-roles/grant.state';
import {AccessRoleResponse} from '../../access-roles/access.role.response';

export class  AccessRoleRepositoryAdapter extends AccessRoleRepository {

  constructor(private accessRolesClient: AccessRolesClient) {
    super();
  }

  public getPermissions(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<Permissions> {
    return this.accessRolesClient.getPermissions(defaultPage, defaultPageSize, defaultSortOrder)
      .pipe(map( permissionStates => {
        const permissionModels: Permissions = new Permissions();
        permissionModels.permissions = permissionStates.permissions.map( value => mapObjectProps(value, new Permission()));
        permissionModels.page = mapObjectProps(permissionStates.page, new Page());
        permissionModels.sort = mapObjectProps(permissionStates.sort, new Sort());
        return permissionModels;
      }));
  }

  public getPermissionById(permissionId: string): Observable<Permission> {
    return this.accessRolesClient.getPermissionById(permissionId)
      .pipe(map(value => {
        return mapObjectProps(value, new Permission());
      }));
  }

  public addPermission(permission: Permission): Observable<Permission> {
    return this.accessRolesClient.addPermission(mapObjectProps(permission, new PermissionState()))
      .pipe(map(value => mapObjectProps(value, new Permission())));
  }

  public updatePermission(permission: Permission): Observable<number> {
    return this.accessRolesClient.updatePermission(mapObjectProps(permission, new PermissionState()));
  }

  public deletePermission(permissionId: string): Observable<number> {
    return this.accessRolesClient.deletePermission(permissionId);
  }

  // resources

  public getPermissionsByArray(defaultPage: number, defaultPageSize: number, defaultSortOrder: string, assignedArray: string[], type: string): Observable<Permissions> {
    return this.accessRolesClient.getPermissionsByArray(defaultPage, defaultPageSize, defaultSortOrder, assignedArray, type)
      .pipe(map( permissionStates => {
        const permissionModels: Permissions = new Permissions();
        permissionModels.permissions = permissionStates.permissions.map( value => mapObjectProps(value, new Permission()));
        permissionModels.page = mapObjectProps(permissionStates.page, new Page());
        permissionModels.sort = mapObjectProps(permissionStates.sort, new Sort());
        return permissionModels;
      }));
  }

  public getResourcePermissionsByResourceId(resourceId: string): Observable<ResourcePermission[]> {
    return this.accessRolesClient.getResourcePermissionsByResourceId(resourceId)
      .pipe(map(data => data.map(value => mapObjectProps(value, new ResourcePermission()))));
  }

  public findResourceTypeId(searchStr: string, pageSize: number): Observable<ResourceType[]> {
    return this.accessRolesClient.findResourceTypeId(searchStr, pageSize)
      .pipe(map(data => data.map(value => mapObjectProps(value, new ResourceType()))));
  }

  public getResources(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<Resources> {
    return this.accessRolesClient.getResources(defaultPage, defaultPageSize, defaultSortOrder)
      .pipe(map( resourceStates => {
        const resourceModels: Resources = new Resources();
        resourceModels.resources = resourceStates.resources.map( value => mapObjectProps(value, new Resource()));
        resourceModels.page = mapObjectProps(resourceStates.page, new Page());
        resourceModels.sort = mapObjectProps(resourceStates.sort, new Sort());
        return resourceModels;
      }));
  }

  public getResourceById(resourceId: string): Observable<Resource> {
    return this.accessRolesClient.getResourceById(resourceId)
      .pipe(map(value => mapObjectProps(value, new Resource())));
  }

  public addResource(resource: Resource, resourcePermissions: ResourcePermission[]): Observable<Resource> {
    return this.accessRolesClient.addResource(mapObjectProps(resource, new ResourceState()), resourcePermissions.map( value => {
      return mapObjectProps(value, new ResourcePermissionState());
    }))
      .pipe(map(value => mapObjectProps(value, new Resource())));
  }

  public updateResource(resource: Resource, resourcePermissions: ResourcePermission[]): Observable<number> {
    return this.accessRolesClient.updateResource(mapObjectProps(resource, new ResourceState()), resourcePermissions.map(value => {
      return mapObjectProps(value, new ResourcePermissionState());
    }));
  }

  public deleteResource(resourceId: string): Observable<number> {
    return this.accessRolesClient.deleteResource(resourceId);
  }

  // resourceTypes
  public getResourceTypes(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<ResourceTypes> {
    return this.accessRolesClient.getResourceTypes(defaultPage, defaultPageSize, defaultSortOrder)
      .pipe(map( resourceTypeStates => {
        const resourceTypeModels: ResourceTypes = new ResourceTypes();
        resourceTypeModels.resourceTypes = resourceTypeStates.resourceTypes.map( value => {
          return mapObjectProps(value, new ResourceType());
        });
        resourceTypeModels.page = mapObjectProps(resourceTypeStates.page, new Page());
        resourceTypeModels.sort = mapObjectProps(resourceTypeStates.sort, new Sort());
        return resourceTypeModels;
      }));
  }

  public getResourceTypeById(resourceTypeId: string): Observable<ResourceType> {
    return this.accessRolesClient.getResourceTypeById(resourceTypeId)
      .pipe(map(value => {
        return mapObjectProps(value, new ResourceType());
      }));
  }

  public addResourceType(resourceType: ResourceType): Observable<ResourceType> {
    return this.accessRolesClient.addResourceType(mapObjectProps(resourceType, new ResourceTypeState()))
      .pipe(map(value => {
        return mapObjectProps(value, new ResourceType());
      }));
  }

  public updateResourceType(resourceType: ResourceType): Observable<number> {
    return this.accessRolesClient.updateResourceType(mapObjectProps(resourceType, new ResourceTypeState()));
  }

  public deleteResourceType(resourceTypeId: string): Observable<number> {
    return this.accessRolesClient.deleteResourceType(resourceTypeId);
  }

  // access-roles
  public getResourcesByArray(defaultPage: number, defaultPageSize: number, defaultSortOrder: string, assignedArray: string[], type: string): Observable<Resources> {
    return this.accessRolesClient.getResourcesByArray(defaultPage, defaultPageSize, defaultSortOrder, assignedArray, type)
      .pipe(map(resourceStates => {
        const resourceModels: Resources = new Resources();
        resourceModels.resources = resourceStates.resources.map( value => {
          return mapObjectProps(value, new Resource());
        });
        resourceModels.page = mapObjectProps(resourceStates.page, new Page());
        resourceModels.sort = mapObjectProps(resourceStates.sort, new Sort());
        return resourceModels;
      }));
  }

  public getAllResourcePermissions(): Observable<ResourcePermission[]> {
    return this.accessRolesClient.getAllResourcePermissions()
      .pipe(map(data => {
        return data.map(value => {
          return mapObjectProps(value, new ResourcePermission());
        });
      }));
  }

  public findAccessRoleTypeId(searchStr: string, pageSize: number): Observable<AccessRoleType[]> {
    return this.accessRolesClient.findAccessRoleTypeId(searchStr, pageSize)
      .pipe(map(data => {
        return data.map( value => {
          return mapObjectProps(value, new AccessRoleType());
        });
      }));
  }

  public getAccessRoles(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<AccessRoles> {
    return this.accessRolesClient.getAccessRoles(defaultPage, defaultPageSize, defaultSortOrder)
      .pipe(map( accessRoleStates => {
        const accessRoleModels: AccessRoles = new AccessRoles();
        accessRoleModels.accessRoles = accessRoleStates.accessRoles.map(value => {
          return mapObjectProps(value, new AccessRole());
        });
        accessRoleModels.page = mapObjectProps(accessRoleStates.page, new Page());
        accessRoleModels.sort = mapObjectProps(accessRoleStates.sort, new Sort());
        return accessRoleModels;
      }));
  }

  public getAccessRoleById(accessRoleId: string): Observable<AccessRoleResponse> {
    return this.accessRolesClient.getAccessRoleById(accessRoleId);
  }

  public addAccessRole(accessRole: AccessRole, grants: Grant[]): Observable<AccessRole> {
    return this.accessRolesClient.addAccessRole(mapObjectProps(accessRole, new AccessRoleState()), grants.map( next => {
      return mapObjectProps(next, new GrantState());
    }))
      .pipe(map(value => {
        return mapObjectProps(value, new AccessRole());
      }));
  }

  public updateAccessRole(accessRole: AccessRole, grants: Grant[]): Observable<number> {
    return this.accessRolesClient.updateAccessRole(mapObjectProps(accessRole, new AccessRoleState()),  grants.map( next => {
      return mapObjectProps(next, new GrantState());
    }));
  }

  public deleteAccessRole(accessRoleId: string): Observable<number> {
    return this.accessRolesClient.deleteAccessRole(accessRoleId);
  }

  // grants
  public getGrantsByAccessRoleId(accessRoleId: string): Observable<Grant[]> {
    return this.accessRolesClient.getGrantsByAccessRoleId(accessRoleId)
      .pipe(map(data => {
        return data.map( value => {
          return mapObjectProps(value, new Grant());
        });
      }));
  }

  // access-role-types
  public getAccessRoleTypes(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<AccessRoleTypes> {
    return this.accessRolesClient.getAccessRoleTypes(defaultPage, defaultPageSize, defaultSortOrder)
      .pipe(map( accessRoleTypeStates => {
        const accessRoleTypeModels: AccessRoleTypes = new AccessRoleTypes();
        accessRoleTypeModels.accessRoleTypes = accessRoleTypeStates.accessRoleTypes.map( value => {
          return mapObjectProps(value, new AccessRoleType());
        });
        accessRoleTypeModels.page = mapObjectProps(accessRoleTypeStates.page, new Page());
        accessRoleTypeModels.sort = mapObjectProps(accessRoleTypeStates.sort, new Sort());
        return accessRoleTypeModels;
      }));
  }

  public getAccessRoleTypeById(accessRoleTypeId: string): Observable<AccessRoleType> {
    return this.accessRolesClient.getAccessRoleTypeById(accessRoleTypeId)
      .pipe(map(value => {
        return mapObjectProps(value, new AccessRoleType());
      }));
  }

  public addAccessRoleType(accessRoleType: AccessRoleType): Observable<AccessRoleType> {
    return this.accessRolesClient.addAccessRoleType(mapObjectProps(accessRoleType, new AccessRoleTypeState()))
      .pipe(map(value => {
        return mapObjectProps(value, new AccessRoleType());
      }));
  }

  public updateAccessRoleType(accessRoleType: AccessRoleType): Observable<number> {
    return this.accessRolesClient.updateAccessRoleType(mapObjectProps(accessRoleType, new AccessRoleTypeState()));
  }

  public deleteAccessRoleType(accessRoleTypeId: string): Observable<number> {
    return this.accessRolesClient.deleteAccessRoleType(accessRoleTypeId);
  }
}
