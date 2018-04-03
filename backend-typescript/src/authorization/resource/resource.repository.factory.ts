import Rx from "rxjs";
import {resources} from "../../db";
import {ResourceRepository} from "./resource.repository";
import {Resource} from "./resource";
import {Observable} from "rxjs/Observable";
import {RepositoryKind} from "../../repository.kind";
import {Observer} from "rxjs/Observer";

class ResourceDBRepository implements ResourceRepository {

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

