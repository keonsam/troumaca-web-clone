import Rx from "rxjs";
import {resourcePermissions} from "../../db";
import {ResourcePermissionRepository} from "./resource.permission.repository";
import {ResourcePermission} from "./resource.permission";
import {Observable} from "rxjs/Observable";
import {RepositoryKind} from "../../repository.kind";
import {Observer} from "rxjs/Observer";

class ResourcePermissionDBRepository implements ResourcePermissionRepository {

  addResourcePermission(resourcePermission: ResourcePermission): Observable<ResourcePermission> {
    return undefined;
  }

  deleteResourcePermission(resourcePermissionId: string): Observable<number> {
    return undefined;
  }

  getResourcePermissionById(resourcePermissionId: string, ownerPartyId: string): Observable<ResourcePermission> {
    return undefined;
  }

  updateResourcePermission(resourcePermissionId: string, resourcePermission: ResourcePermission): Observable<number> {
    return undefined;
  }

}


class ResourcePermissionRestRepository implements ResourcePermissionRepository {

  addResourcePermission(resourcePermission: ResourcePermission): Observable<ResourcePermission> {
    return undefined;
  }

  deleteResourcePermission(resourcePermissionId: string): Observable<number> {
    return undefined;
  }

  getResourcePermissionById(resourcePermissionId: string, ownerPartyId: string): Observable<ResourcePermission> {
    return undefined;
  }

  updateResourcePermission(resourcePermissionId: string, resourcePermission: ResourcePermission): Observable<number> {
    return undefined;
  }

}

export function createResourcePermissionRepositoryFactory(kind?:RepositoryKind):ResourcePermissionRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new ResourcePermissionDBRepository();
    case RepositoryKind.Rest:
      return new ResourcePermissionRestRepository();
    default:
      return new ResourcePermissionDBRepository();
  }
}



