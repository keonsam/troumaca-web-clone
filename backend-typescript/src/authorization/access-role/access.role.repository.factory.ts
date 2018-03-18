import Rx from "rxjs";
import {accessRoles} from "../../db";
import {AccessRoleRepository} from "./access.role.repository";
import {AccessRole} from "./access.role";
import {Observable} from "rxjs/Observable";
import {RepositoryKind} from "../../repository.kind";
import {Observer} from "rxjs/Observer";

class AccessRoleDBRepository implements AccessRoleRepository {

  addAccessRole(accessRole: AccessRole): Observable<AccessRole> {
    return undefined;
  }

  deleteAccessRole(accessRoleId: string): Observable<number> {
    return undefined;
  }

  getAccessRoleById(accessRoleId: string, ownerParyId: string): Observable<AccessRole> {
    return undefined;
  }

  updateAccessRole(accessRoleId: string, accessRole: AccessRole): Observable<number> {
    return undefined;
  }

}


class AccessRoleRestRepository implements AccessRoleRepository {

  addAccessRole(accessRole: AccessRole): Observable<AccessRole> {
    return undefined;
  }

  deleteAccessRole(accessRoleId: string): Observable<number> {
    return undefined;
  }

  getAccessRoleById(accessRoleId: string, ownerParyId: string): Observable<AccessRole> {
    return undefined;
  }

  updateAccessRole(accessRoleId: string, accessRole: AccessRole): Observable<number> {
    return undefined;
  }

}

export function createAccessRoleRepositoryFactory(kind?:RepositoryKind):AccessRoleRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new AccessRoleDBRepository();
    case RepositoryKind.Rest:
      return new AccessRoleRestRepository();
    default:
      return new AccessRoleDBRepository();
  }
}