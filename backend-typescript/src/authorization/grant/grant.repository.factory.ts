import Rx from "rxjs";
import {grants} from "../../db";
import {GrantRepository} from "./grant.repository";
import {Grant} from "./grant";
import {Observable} from "rxjs/Observable";
import {RepositoryKind} from "../../repository.kind";
import {Observer} from "rxjs/Observer";

class GrantDBRepository implements GrantRepository {

  addGrant(grant: Grant): Observable<Grant> {
    return undefined;
  }

  deleteGrant(grantId: string): Observable<number> {
    return undefined;
  }

  getGrantById(grantId: string, ownerParyId: string): Observable<Grant> {
    return undefined;
  }

  updateGrant(grantId: string, grant: Grant): Observable<number> {
    return undefined;
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

