import Rx from "rxjs";
import {accessRoleTypes} from "../../db";
import {AccessRoleTypeRepository} from "./access.role.type.repository";
import {AccessRoleType} from "./access.role.type";
import {Observable} from "rxjs/Observable";
import {RepositoryKind} from "../../repository.kind";
import {Observer} from "rxjs/Observer";

class AccessRoleTypeDBRepository implements AccessRoleTypeRepository {

  addAccessRoleType(accessRoleType: AccessRoleType): Observable<AccessRoleType> {
    return undefined;
  }

  deleteAccessRoleType(accessRoleTypeId: string): Observable<number> {
    return undefined;
  }

  getAccessRoleTypeById(accessRoleTypeId: string, ownerParyId: string): Observable<AccessRoleType> {
    return undefined;
  }

  updateAccessRoleType(accessRoleTypeId: string, accessRoleType: AccessRoleType): Observable<number> {
    return undefined;
  }

}


class AccessRoleTypeRestRepository implements AccessRoleTypeRepository {

  addAccessRoleType(accessRoleType: AccessRoleType): Observable<AccessRoleType> {
    return undefined;
  }

  deleteAccessRoleType(accessRoleTypeId: string): Observable<number> {
    return undefined;
  }

  getAccessRoleTypeById(accessRoleTypeId: string, ownerPartyId: string): Observable<AccessRoleType> {
    return undefined;
  }

  updateAccessRoleType(accessRoleTypeId: string, accessRoleType: AccessRoleType): Observable<number> {
    return undefined;
  }

}

export function createAccessRoleTypeRepositoryFactory(kind?:RepositoryKind):AccessRoleTypeRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new AccessRoleTypeDBRepository();
    case RepositoryKind.Rest:
      return new AccessRoleTypeRestRepository();
    default:
      return new AccessRoleTypeDBRepository();
  }
}