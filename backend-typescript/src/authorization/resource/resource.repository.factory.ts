import Rx from "rxjs";
import {resources} from "../../db";
import {ResourceRepository} from "./resource.repository";
import {Resource} from "./resource";
import {Observable} from "rxjs/Observable";
import {RepositoryKind} from "../../repository.kind";
import {Observer} from "rxjs/Observer";
import {generateUUID} from "../../uuid.generator";

class ResourceDBRepository implements ResourceRepository {

  addResource(resource: Resource): Observable<Resource> {
    resource.resourceId = generateUUID();
    return Rx.Observable.create(function(observer:Observer<Resource>) {
      resources.insert(resource, function(err:any, doc:any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(resource);
        }
        observer.complete();
      });
    });
  }

  deleteResource(resourceId: string): Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "resourceId":resourceId
      };
      resources.remove(query, {}, function (err:any, numRemoved:number) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  }

  getResourceById(resourceId: string, ownerPartyId: string): Observable<Resource> {
    return Rx.Observable.create(function (observer:Observer<Resource>) {
      let query = {
        "resourceId":resourceId
      };
      resources.findOne(query, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  updateResource(resourceId: string, resource: Resource): Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "resourceId":resourceId
      };
      resources.update(query, resource, {}, function (err:any, numReplaced:number) {
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


class ResourceRestRepository implements ResourceRepository {

  addResource(resource: Resource): Observable<Resource> {
    return undefined;
  }

  deleteResource(resourceId: string): Observable<number> {
    return undefined;
  }

  getResourceById(resourceId: string, ownerPartyId: string): Observable<Resource> {
    return undefined;
  }

  updateResource(resourceId: string, resource: Resource): Observable<number> {
    return undefined;
  }

}

export function createResourceRepositoryFactory(kind?:RepositoryKind):ResourceRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new ResourceDBRepository();
    case RepositoryKind.Rest:
      return new ResourceRestRepository();
    default:
      return new ResourceDBRepository();
  }
}

