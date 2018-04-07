import {Observable} from "rxjs/Observable";

import {AccessRoleRepository} from "./access.role.repository";
import {Permission} from './permission';
import {Permissions} from './permissions';
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

}
