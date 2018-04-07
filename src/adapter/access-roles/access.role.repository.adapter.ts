import {AccessRoleRepository} from "../../access-roles/access.role.repository";
import {Permission} from "../../access-roles/permission";
import {Permissions} from "../../access-roles/permissions";
import {PermissionState} from "../../client/access-roles/permission.state";
import {Resource} from "../../access-roles/resource";
import {Resources} from "../../access-roles/resources";
import {ResourceState} from "../../client/access-roles/resource.state";
import {Observable} from "rxjs/Observable";
import {AccessRolesClient} from "../../client/access-roles/access.roles.client";
import {mapObjectProps} from "../../mapper/object.property.mapper";
import { _ } from "underscore";
import { map, reduce, somethingElse } from "underscore";
import {Page} from "../../page/page";
import {Sort} from "../../sort/sort";

export class  AccessRoleRepositoryAdapter extends AccessRoleRepository {

  constructor(private accessRolesClient: AccessRolesClient) {
    super();
  }

  public getPermissions(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<Permissions> {
    return this.accessRolesClient.getPermissions(defaultPage, defaultPageSize, defaultSortOrder)
      .map( permissionStates => {
        let permissionModels: Permissions = new Permissions();
        permissionModels.permissions = map(permissionStates.permissions, value => {
          return mapObjectProps(value, new Permission());
        });
        permissionModels.page = mapObjectProps(permissionStates.pageState, new Page());
        permissionModels.sort = mapObjectProps(permissionStates.sortState, new Sort());
        return permissionModels;
      });
  }

  public getPermissionById(permissionId: string): Observable<Permission> {
    return this.accessRolesClient.getPermissionById(permissionId)
      .map(value => {
        return mapObjectProps(value, new Permission());
      });
  }

  public addPermission(permission: Permission): Observable<Permission> {
    return this.accessRolesClient.addPermission(mapObjectProps(permission, new PermissionState()))
      .map(value => {
        return mapObjectProps(value, new Permission());
      });
  }

  public updatePermission(permission: Permission): Observable<number> {
    return this.accessRolesClient.updatePermission(mapObjectProps(permission, new PermissionState()));
  }

  public deletePermission(permissionId: string): Observable<number> {
    return this.accessRolesClient.deletePermission(permissionId);
  }

  //resources
  public getResources(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<Resources> {
    return this.accessRolesClient.getResources(defaultPage, defaultPageSize, defaultSortOrder)
      .map( resourceStates => {
        let resourceModels: Resources = new Resources();
        resourceModels.resources = map(resourceStates.resources, value => {
          return mapObjectProps(value, new Resource());
        });
        resourceModels.page = mapObjectProps(resourceStates.pageState, new Page());
        resourceModels.sort = mapObjectProps(resourceStates.sortState, new Sort());
        return resourceModels;
      });
  }

  public getResourceById(resourceId: string): Observable<Resource> {
    return this.accessRolesClient.getResourceById(resourceId)
      .map(value => {
        return mapObjectProps(value, new Resource());
      });
  }

  public addResource(resource: Resource): Observable<Resource> {
    return this.accessRolesClient.addResource(mapObjectProps(resource, new ResourceState()))
      .map(value => {
        return mapObjectProps(value, new Resource());
      });
  }

  public updateResource(resource: Resource): Observable<number> {
    return this.accessRolesClient.updateResource(mapObjectProps(resource, new ResourceState()));
  }

  public deleteResource(resourceId: string): Observable<number> {
    return this.accessRolesClient.deleteResource(resourceId);
  }


}
