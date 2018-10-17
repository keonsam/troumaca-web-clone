import {OrganizationRepository} from '../../../parties/organizations/organization.repository';
import {OrganizationClient} from '../../../client/party/organization/organization.client';
import {Observable} from 'rxjs';
import {Organizations} from '../../../parties/organizations';
import {Organization} from '../../../parties/organization';
import {JoinOrganization} from '../../../parties/join.organization';

export class OrganizationRepositoryAdapter extends OrganizationRepository {
  constructor(private organizationClient: OrganizationClient) {
    super();
  }

  public findOrganizations(searchStr: string, pageSize: number): Observable<Organization[]> {
    return this.organizationClient.findOrganizations(searchStr, pageSize);
  }

  public addOrganizationRequest(request: JoinOrganization): Observable<JoinOrganization> {
    return this.organizationClient.addOrganizationRequest(request);
  }

  public getOrganizations(pageNumber: number, pageSize: number, sortOrder: string): Observable<Organizations> {
    return this.organizationClient.getOrganizations(pageNumber, pageSize, sortOrder);
  }

  public getOrganization(partyId?: string): Observable<Organization> {
    return this.organizationClient.getOrganizationState(partyId);
  }

  public addOrganization(organization: Organization, profile?: boolean): Observable<Organization> {
    return this.organizationClient.addOrganizationState(organization, profile);
  }

  public deleteOrganization(partyId: string): Observable<number> {
    return this.organizationClient.deleteOrganization(partyId);
  }

  public updateOrganization(organization: Organization): Observable<number> {
    return this.organizationClient.updateOrganization(organization);
  }
}
