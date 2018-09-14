import {Observable} from "rxjs";
import {Organizations} from "../organizations";
import {Organization} from "../organization";

export abstract class OrganizationRepository {

  abstract findOrganizations(searchStr: string, pageSize: number): Observable<Organization[]>;

  abstract sendOrganizationRequest(request: string): Observable<boolean>;

  abstract getOrganizations(pageNumber: number, pageSize: number, sortOrder: string): Observable<Organizations>;

  abstract getOrganization(partyId?: string): Observable<Organization>;

  abstract addOrganization(organization: Organization, type?: string): Observable<Organization>;

  abstract deleteOrganization(partyId: string): Observable<number>;

  abstract updateOrganization(organization: Organization): Observable<number>;
}
