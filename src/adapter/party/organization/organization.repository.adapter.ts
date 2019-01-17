import {OrganizationRepository} from '../../../parties/organizations/organization.repository';
import {OrganizationClient} from '../../../client/party/organization/organization.client';
import {Observable} from 'rxjs';
import {Organizations} from '../../../parties/organizations';
import {Organization} from '../../../parties/organization';
import {OrganizationCompany} from '../../../parties/organizations/organization-company/organization.company';

export class OrganizationRepositoryAdapter extends OrganizationRepository {
  constructor(private organizationClient: OrganizationClient) {
    super();
  }

  getOrganizations(pageNumber: number, pageSize: number, sortOrder: string): Observable<Organizations> {
    return this.organizationClient.getOrganizations(pageNumber, pageSize, sortOrder);
  }

  getOrganization(partyId?: string): Observable<Organization> {
    return this.organizationClient.getOrganizationState(partyId);
  }

  getOrganizationCompany(): Observable<OrganizationCompany> {
    return this.organizationClient.getOrganizationCompany();
  }

  addOrganization(organization: Organization): Observable<Organization> {
    return this.organizationClient.addOrganizationState(organization);
  }

  deleteOrganization(partyId: string): Observable<number> {
    return this.organizationClient.deleteOrganization(partyId);
  }

  updateOrganization(organization: Organization): Observable<number> {
    return this.organizationClient.updateOrganization(organization);
  }

}
