import * as Rx from 'rxjs';
import {UserRepository} from "./user.repository";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {RepositoryKind} from "../../repository.kind";
import {User} from "./user";
import {users} from "../../db";
import {calcSkip} from "../../db.util";
import {generateUUID} from "../../uuid.generator";

class UserDBRepository implements UserRepository {

  private defaultPageSize:number = 10;

  getUsers(pageNumber:number, pageSize:number, order:string):Observable<User[]> {
    let defaultPageSize = this.defaultPageSize;
    return Rx.Observable.create(function (observer:Observer<User[]>) {
      let skip = calcSkip(pageNumber, pageSize, defaultPageSize);
      users.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getUserCount():Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      users.count({}, function (err:any, count:number) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getUser(userId:string):Observable<User> {
    return Rx.Observable.create(function (observer:Observer<User>) {
      let query = {
        "userId":userId
      };

      users.findOne(query, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  saveUser(user:User):Observable<User> {
    user.partyId = generateUUID();
    return Rx.Observable.create(function (observer:Observer<User>) {
      users.insert(user, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  deleteUser(userId:string):Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "userId":userId
      };

      users.remove(query, {}, function (err:any, numRemoved:number) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  }

  updateUser(userId:string, user:User):Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "userId":userId
      };
      users.update(query, user, {}, function (err:any, numReplaced:number) {
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

class UserRestRepository implements UserRepository {
  deleteUser(userId: string): Observable<number> {
    return undefined;
  }

  getUser(userId: string): Observable<User> {
    return undefined;
  }

  getUserCount(): Observable<number> {
    return undefined;
  }

  getUsers(pageNumber: number, pageSize: number, order: string): Observable<User[]> {
    return undefined;
  }

  saveUser(user: User): Observable<User> {
    return undefined;
  }

  updateUser(userId: string, user: User): Observable<number> {
    return undefined;
  }
}

export function createUserRepository(kind?:RepositoryKind):UserRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new UserDBRepository();
    case RepositoryKind.Rest:
      return new UserRestRepository();
    default:
      return new UserDBRepository();
  }
}
