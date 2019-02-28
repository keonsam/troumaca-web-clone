import {Observable} from "rxjs";
import { Organizations} from "../../../parties/organizations";
import { Organization } from "../../../parties/organization";
import {CompanyInfo} from '../../../parties/organizations/organization-company/company.info';

export abstract class OrganizationClient {

  abstract getOrganizations(pageNumber: number, pageSize: number, sortOrder: string): Observable<Organizations>;

  abstract getOrganizationState(partyId?: string): Observable<Organization>;

  abstract addOrganizationState(organizationState: Organization, profile?: boolean): Observable<Organization>;

  abstract deleteOrganization(partyId: string): Observable<number>;

  abstract updateOrganization(organizationState: Organization): Observable<number>;

  abstract getCompany(): Observable<CompanyInfo>;

  abstract createOrganization(organization: Organization): Observable<Organization>;
}
