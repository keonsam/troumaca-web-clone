// import {AccessRoleRepository} from '../../access-roles/access.role.repository';
// import {Permission} from '../../access-roles/permission';
// import {Permissions} from '../../access-roles/permissions';
// import {Resource} from '../../access-roles/resource';
// import {Resources} from '../../access-roles/resources';
// import {ResourceType} from '../../access-roles/resource.type';
// import {ResourceTypes} from '../../access-roles/resource.types';
// import {AccessRole} from '../../access-roles/access.role';
// import {AccessRoles} from '../../access-roles/access.roles';
// import {AccessRoleType} from '../../access-roles/access.role.type';
// import {AccessRoleTypes} from '../../access-roles/access.role.types';
// import {Observable} from 'rxjs';
// import {AccessRolesClient} from '../../client/access-roles/access.roles.client';
// import {ResourcePermission} from '../../access-roles/resource.permission';
// import {Grant} from '../../access-roles/grant';
//
// export class  AccessRoleRepositoryAdapter extends AccessRoleRepository {
//
//   constructor(private accessRolesClient: AccessRolesClient) {
//     super();
//   }
//
//   public getPermissions(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<Permissions> {
//     return this.accessRolesClient.getPermissions(defaultPage, defaultPageSize, defaultSortOrder);
//   }
//
//   public getPermissionById(permissionId: string): Observable<Permission> {
//     return this.accessRolesClient.getPermissionById(permissionId);
//   }
//
//   public addPermission(permission: Permission): Observable<Permission> {
//     return this.accessRolesClient.addPermission(permission);
//   }
//
//   public updatePermission(permission: Permission): Observable<number> {
//     return this.accessRolesClient.updatePermission(permission);
//   }
//
//   public deletePermission(permissionId: string): Observable<number> {
//     return this.accessRolesClient.deletePermission(permissionId);
//   }
//
//   // resources
//
//   public getPermissionsByArray(defaultPage: number, defaultPageSize: number, defaultSortOrder: string, assignedArray: string[]): Observable<Permissions> {
//     return this.accessRolesClient.getPermissionsByArray(defaultPage, defaultPageSize, defaultSortOrder, assignedArray);
//   }
//
//   public getAssignablePermissions(defaultPage: number, defaultPageSize: number, defaultSortOrder: string, assignedArray: string[]): Observable<Permissions> {
//     return this.accessRolesClient.getAssignablePermissions(defaultPage, defaultPageSize, defaultSortOrder, assignedArray);
//   }
//
//   public findResourceTypeId(searchStr: string, pageSize: number): Observable<ResourceType[]> {
//     return this.accessRolesClient.findResourceTypeId(searchStr, pageSize);
//   }
//
//   public getResources(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<Resources> {
//     return this.accessRolesClient.getResources(defaultPage, defaultPageSize, defaultSortOrder);
//   }
//
//   public getResourceById(resourceId: string): Observable<Resource> {
//     return this.accessRolesClient.getResourceById(resourceId);
//   }
//
//   public addResource(resource: Resource, resourcePermissions: ResourcePermission[]): Observable<Resource> {
//     return this.accessRolesClient.addResource(resource, resourcePermissions);
//   }
//
//   public updateResource(resource: Resource, resourcePermissions: ResourcePermission[]): Observable<number> {
//     return this.accessRolesClient.updateResource(resource, resourcePermissions);
//   }
//
//   public deleteResource(resourceId: string): Observable<number> {
//     return this.accessRolesClient.deleteResource(resourceId);
//   }
//
//   // resourceTypes
//   public getResourceTypes(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<ResourceTypes> {
//     return this.accessRolesClient.getResourceTypes(defaultPage, defaultPageSize, defaultSortOrder);
//   }
//
//   public getResourceTypeById(resourceTypeId: string): Observable<ResourceType> {
//     return this.accessRolesClient.getResourceTypeById(resourceTypeId);
//   }
//
//   public addResourceType(resourceType: ResourceType): Observable<ResourceType> {
//     return this.accessRolesClient.addResourceType(resourceType);
//   }
//
//   public updateResourceType(resourceType: ResourceType): Observable<number> {
//     return this.accessRolesClient.updateResourceType(resourceType);
//   }
//
//   public deleteResourceType(resourceTypeId: string): Observable<number> {
//     return this.accessRolesClient.deleteResourceType(resourceTypeId);
//   }
//
//   // access-roles
//
//   public findAccessRoleTypeId(searchStr: string, pageSize: number): Observable<AccessRoleType[]> {
//     return this.accessRolesClient.findAccessRoleTypeId(searchStr, pageSize);
//   }
//
//   public getAccessRoles(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<AccessRoles> {
//     return this.accessRolesClient.getAccessRoles(defaultPage, defaultPageSize, defaultSortOrder);
//   }
//
//   public getAccessRoleById(accessRoleId: string): Observable<AccessRole> {
//     return this.accessRolesClient.getAccessRoleById(accessRoleId);
//   }
//
//   public addAccessRole(accessRole: AccessRole, grants: Grant[]): Observable<AccessRole> {
//     return this.accessRolesClient.addAccessRole(accessRole, grants)
//   }
//
//   public updateAccessRole(accessRole: AccessRole, grants: Grant[]): Observable<number> {
//     return this.accessRolesClient.updateAccessRole(accessRole,  grants);
//   }
//
//   public deleteAccessRole(accessRoleId: string): Observable<number> {
//     return this.accessRolesClient.deleteAccessRole(accessRoleId);
//   }
//
//   // access-role-types
//   public getAccessRoleTypes(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<AccessRoleTypes> {
//     return this.accessRolesClient.getAccessRoleTypes(defaultPage, defaultPageSize, defaultSortOrder);
//   }
//
//   public getAccessRoleTypeById(accessRoleTypeId: string): Observable<AccessRoleType> {
//     return this.accessRolesClient.getAccessRoleTypeById(accessRoleTypeId);
//   }
//
//   public addAccessRoleType(accessRoleType: AccessRoleType): Observable<AccessRoleType> {
//     return this.accessRolesClient.addAccessRoleType(accessRoleType);
//   }
//
//   public updateAccessRoleType(accessRoleType: AccessRoleType): Observable<number> {
//     return this.accessRolesClient.updateAccessRoleType(accessRoleType);
//   }
//
//   public deleteAccessRoleType(accessRoleTypeId: string): Observable<number> {
//     return this.accessRolesClient.deleteAccessRoleType(accessRoleTypeId);
//   }
// }
