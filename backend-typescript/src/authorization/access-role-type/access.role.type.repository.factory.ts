import Rx from "rxjs";
import {accessRoleTypes} from "../../db";
import {AccessRoleTypeRepository} from "./access.role.type.repository";
import {AccessRoleType} from "./access.role.type";
import {Observable} from "rxjs/Observable";
import {RepositoryKind} from "../../repository.kind";
import {Observer} from "rxjs/Observer";
import {generateUUID} from "../../uuid.generator";
import {calcSkip} from "../../db.util";

class AccessRoleTypeDBRepository implements AccessRoleTypeRepository {

  private defaultPageSize:number = 10;

  findAccessRoleTypes(searchStr: string, pageSize: number): Observable<AccessRoleType[]> {
    let searchStrLocal = new RegExp(searchStr);
    return Rx.Observable.create(function (observer: Observer<AccessRoleType[]>) {
      if (!searchStr) {
        accessRoleTypes.find({}).limit(100).exec(function (err: any, doc: any) {
          if (!err) {
            observer.next(doc);
          } else {
            observer.error(err);
          }
          observer.complete();
        });
      } else {
        accessRoleTypes.find({name: {$regex: searchStrLocal}}).limit(pageSize).exec(function (err: any, doc: any) {
          if (!err) {
            observer.next(doc);
          } else {
            observer.error(err);
          }
          observer.complete();
        });
      };
    });
  }

  getAccessRoleTypes(pageNumber:number, pageSize:number, order:string):Observable<AccessRoleType[]> {
    let localDefaultPageSize = this.defaultPageSize;
    return Rx.Observable.create(function (observer:Observer<AccessRoleType[]>) {
      let skip = calcSkip(pageNumber, pageSize, localDefaultPageSize);
      accessRoleTypes.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  getAccessRoleTypeCount():Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      accessRoleTypes.count({}, function (err:any, count:number) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  addAccessRoleType(accessRoleType: AccessRoleType): Observable<AccessRoleType> {
    accessRoleType.accessRoleTypeId = generateUUID();
    return Rx.Observable.create(function(observer:Observer<AccessRoleType>) {
      accessRoleTypes.insert(accessRoleType, function(err:any, doc:any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(accessRoleType);
        }
        observer.complete();
      });
    });
  }

  deleteAccessRoleType(accessRoleTypeId: string): Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "accessRoleTypeId":accessRoleTypeId
      };
      accessRoleTypes.remove(query, {}, function (err:any, numRemoved:number) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  }

  getAccessRoleTypeById(accessRoleTypeId: string): Observable<AccessRoleType> {
    return Rx.Observable.create(function (observer:Observer<AccessRoleType>) {
      let query = {
        "accessRoleTypeId":accessRoleTypeId
      };
      accessRoleTypes.findOne(query, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  updateAccessRoleType(accessRoleTypeId: string, accessRoleType: AccessRoleType): Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "accessRoleTypeId":accessRoleTypeId
      };
      accessRoleTypes.update(query, accessRoleType, {}, function (err:any, numReplaced:number) {
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


class AccessRoleTypeRestRepository implements AccessRoleTypeRepository {

  findAccessRoleTypes(searchStr: string, pageSize: number): Observable<AccessRoleType[]> {
    return undefined;
  };

  getAccessRoleTypes(pageNumber:number, pageSize:number, order:string):Observable<AccessRoleType[]> {
    return undefined;
  }

  getAccessRoleTypeCount():Observable<number> {
    return undefined;
  }

  addAccessRoleType(accessRoleType: AccessRoleType): Observable<AccessRoleType> {
    return undefined;
  }

  deleteAccessRoleType(accessRoleTypeId: string): Observable<number> {
    return undefined;
  }

  getAccessRoleTypeById(accessRoleTypeId: string): Observable<AccessRoleType> {
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
