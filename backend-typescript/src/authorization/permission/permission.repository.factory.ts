import Rx from "rxjs";
import {permissions} from "../../db";
import {PermissionRepository} from "./permission.repository";
import {Permission} from "./permission";
import {Observable} from "rxjs/Observable";
import {RepositoryKind} from "../../repository.kind";
import {Observer} from "rxjs/Observer";
import {generateUUID} from "../../uuid.generator";

class PermissionDBRepository implements PermissionRepository {

  addPermission(permission: Permission): Observable<Permission> {
    permission.permissionId = generateUUID();
    return Rx.Observable.create(function(observer:Observer<Permission>) {
      permissions.insert(permission, function(err:any, doc:any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(permission);
        }
        observer.complete();
      });
    });
  }

  deletePermission(permissionId: string): Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "permissionId":permissionId
      };
      permissions.remove(query, {}, function (err:any, numRemoved:number) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  }

  getPermissionById(permissionId: string, ownerPartyId: string): Observable<Permission> {
    return Rx.Observable.create(function (observer:Observer<Permission>) {
      let query = {
        "permissionId":permissionId
      };
      permissions.findOne(query, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  updatePermission(permissionId: string, permission: Permission): Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "permissionId":permissionId
      };
      permissions.update(query, permission, {}, function (err:any, numReplaced:number) {
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



