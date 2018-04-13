import Rx from "rxjs";
import {permissions} from "../../db";
import {PermissionRepository} from "./permission.repository";
import {Permission} from "./permission";
import {Observable} from "rxjs/Observable";
import {RepositoryKind} from "../../repository.kind";
import {Observer} from "rxjs/Observer";

class PermissionDBRepository implements PermissionRepository {

  addPermission(permission: Permission): Observable<Permission> {
    return undefined;
  }

  deletePermission(permissionId: string): Observable<number> {
    return undefined;
  }

  getPermissionById(permissionId: string, ownerPartyId: string): Observable<Permission> {
    return undefined;
  }

  updatePermission(permissionId: string, permission: Permission): Observable<number> {
    return undefined;
  }

}


class PermissionRestRepository implements PermissionRepository {

  addPermission(permission: Permission): Observable<Permission> {
    return undefined;
  }

  deletePermission(permissionId: string): Observable<number> {
    return undefined;
  }

  getPermissionById(permissionId: string, ownerPartyId: string): Observable<Permission> {
    return undefined;
  }

  updatePermission(permissionId: string, permission: Permission): Observable<number> {
    return undefined;
  }

}

export function createPermissionRepositoryFactory(kind?:RepositoryKind):PermissionRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new PermissionDBRepository();
    case RepositoryKind.Rest:
      return new PermissionRestRepository();
    default:
      return new PermissionDBRepository();
  }
}



