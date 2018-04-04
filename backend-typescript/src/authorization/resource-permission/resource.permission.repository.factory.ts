import Rx from "rxjs";
import {resourcePermissions} from "../../db";
import {ResourcePermissionRepository} from "./resource.permission.repository";
import {ResourcePermission} from "./resource.permission";
import {Observable} from "rxjs/Observable";
import {RepositoryKind} from "../../repository.kind";
import {Observer} from "rxjs/Observer";
import {generateUUID} from "../../uuid.generator";

class ResourcePermissionDBRepository implements ResourcePermissionRepository {

  addResourcePermission(resourcePermission: ResourcePermission): Observable<ResourcePermission> {
    resourcePermission.resourcePermissionId = generateUUID();
    return Rx.Observable.create(function(observer:Observer<ResourcePermission>) {
      resourcePermissions.insert(resourcePermission, function(err:any, doc:any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(resourcePermission);
        }
        observer.complete();
      });
    });
  }

  deleteResourcePermission(resourcePermissionId: string): Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "resourcePermissionId":resourcePermissionId
      };
      resourcePermissions.remove(query, {}, function (err:any, numRemoved:number) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  }

  getResourcePermissionById(resourcePermissionId: string, ownerPartyId: string): Observable<ResourcePermission> {
    return Rx.Observable.create(function (observer:Observer<ResourcePermission>) {
      let query = {
        "resourcePermissionId":resourcePermissionId
      };
      resourcePermissions.findOne(query, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  updateResourcePermission(resourcePermissionId: string, resourcePermission: ResourcePermission): Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "resourcePermissionId":resourcePermissionId
      };
      resourcePermissions.update(query, resourcePermission, {}, function (err:any, numReplaced:number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
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



