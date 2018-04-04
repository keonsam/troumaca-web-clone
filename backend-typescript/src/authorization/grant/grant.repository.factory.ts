import Rx from "rxjs";
import {grants} from "../../db";
import {GrantRepository} from "./grant.repository";
import {Grant} from "./grant";
import {Observable} from "rxjs/Observable";
import {RepositoryKind} from "../../repository.kind";
import {Observer} from "rxjs/Observer";
import {generateUUID} from "../../uuid.generator";

class GrantDBRepository implements GrantRepository {

  addGrant(grant: Grant): Observable<Grant> {
    grant.grantId = generateUUID();
    return Rx.Observable.create(function(observer:Observer<Grant>) {
      grants.insert(grant, function(err:any, doc:any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(grant);
        }
        observer.complete();
      });
    });
  }

  deleteGrant(grantId: string): Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "grantId":grantId
      };
      grants.remove(query, {}, function (err:any, numRemoved:number) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  }

  getGrantById(grantId: string, ownerParyId: string): Observable<Grant> {
    return Rx.Observable.create(function (observer:Observer<Grant>) {
      let query = {
        "grantId":grantId
      };
      grants.findOne(query, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  updateGrant(grantId: string, grant: Grant): Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "grantId":grantId
      };
      grants.update(query, grant, {}, function (err:any, numReplaced:number) {
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


class GrantRestRepository implements GrantRepository {

  addGrant(grant: Grant): Observable<Grant> {
    return undefined;
  }

  deleteGrant(grantId: string): Observable<number> {
    return undefined;
  }

  getGrantById(grantId: string, ownerPartyId: string): Observable<Grant> {
    return undefined;
  }

  updateGrant(grantId: string, grant: Grant): Observable<number> {
    return undefined;
  }

}

export function createGrantRepositoryFactory(kind?:RepositoryKind):GrantRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new GrantDBRepository();
    case RepositoryKind.Rest:
      return new GrantRestRepository();
    default:
      return new GrantDBRepository();
  }
}

