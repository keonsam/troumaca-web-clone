import {Observable} from "rxjs";
import {Organizations} from "../organizations";
import {Organization} from "../organization";

export abstract class OrganizationRepository {

  abstract getOrganizations(pageNumber: number, pageSize: number, sortOrder: string): Observable<Organizations>;

  abstract getOrganization(partyId?: string): Observable<Organization>;

  abstract addOrganization(organization: Organization): Observable<Organization>;

  abstract deleteOrganization(partyId: string): Observable<number>;

  abstract updateOrganization(organization: Organization): Observable<number>;

}
