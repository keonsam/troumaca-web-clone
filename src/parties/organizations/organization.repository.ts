import {Observable} from "rxjs";
import {Organizations} from "../organizations";
import {Organization} from "../organization";
import {CompanyInfo} from './organization-company/company.info';

export abstract class OrganizationRepository {

  abstract getOrganizations(pageNumber: number, pageSize: number, sortOrder: string): Observable<Organizations>;

  abstract getOrganization(partyId?: string): Observable<Organization>;

  abstract addOrganization(organization: Organization): Observable<Organization>;

  abstract deleteOrganization(partyId: string): Observable<number>;

  abstract updateOrganization(organization: Organization): Observable<number>;

  abstract getCompany(): Observable<CompanyInfo>;

  abstract createOrganization(organization: Organization): Observable<Organization>;
}
