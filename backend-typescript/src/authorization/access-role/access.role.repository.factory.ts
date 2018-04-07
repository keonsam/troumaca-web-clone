import Rx from "rxjs";
import {accessRoles} from "../../db";
import {AccessRoleRepository} from "./access.role.repository";
import {AccessRole} from "./access.role";
import {Observable} from "rxjs/Observable";
import {RepositoryKind} from "../../repository.kind";
import {Observer} from "rxjs/Observer";
import {generateUUID} from "../../uuid.generator";

class AccessRoleDBRepository implements AccessRoleRepository {

  findAccessRoles(searchStr: string, pageSize: number): Observable<AccessRole[]> {
    let searchStrLocal = new RegExp(searchStr);
    return Rx.Observable.create(function(observer:Observer<AccessRole[]>) {
      accessRoles.find({name: {$regex: searchStrLocal}}).limit(pageSize).exec(function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  addAccessRole(accessRole: AccessRole): Observable<AccessRole> {
    accessRole.accessRoleId = generateUUID();
    return Rx.Observable.create(function(observer:Observer<AccessRole>) {
      accessRoles.insert(accessRole, function(err:any, doc:any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(accessRole);
        }
        observer.complete();
      });
    });
  }

  deleteAccessRole(accessRoleId: string): Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "accessRoleId":accessRoleId
      };
      accessRoles.remove(query, {}, function (err:any, numRemoved:number) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  }

  getAccessRoleById(accessRoleId: string, ownerParyId: string): Observable<AccessRole> {
    return Rx.Observable.create(function (observer:Observer<AccessRole>) {
      let query = {
        "accessRoleId":accessRoleId
      };
      accessRoles.findOne(query, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  updateAccessRole(accessRoleId: string, accessRole: AccessRole): Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "accessRoleId":accessRoleId
      };
      accessRoles.update(query, accessRole, {}, function (err:any, numReplaced:number) {
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


class AccessRoleRestRepository implements AccessRoleRepository {

  findAccessRoles(searchStr: string, pageSize: number): Observable<AccessRole[]> {
    return undefined;
  };

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
