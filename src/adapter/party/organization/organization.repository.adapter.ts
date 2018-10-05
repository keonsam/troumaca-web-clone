import {OrganizationRepository} from '../../../parties/organizations/organization.repository';
import {OrganizationClient} from '../../../client/party/organization/organization.client';
import {Observable} from 'rxjs';
import {Organizations} from '../../../parties/organizations';
import {map} from 'rxjs/operators';
import {mapObjectProps} from '../../../mapper/object.property.mapper';
import {Organization} from '../../../parties/organization';
import {Page} from '../../../page/page';
import {Sort} from '../../../sort/sort';
import {OrganizationState} from '../../../client/party/organization.state';
import {JoinOrganization} from "../../../parties/join.organization";
import {JoinOrganizationState} from "../../../client/party/join.organization.state";

export class OrganizationRepositoryAdapter extends OrganizationRepository {
  constructor(private organizationClient: OrganizationClient) {
    super();
  }

  public findOrganizations(searchStr: string, pageSize: number): Observable<Organization[]> {
    return this.organizationClient.findOrganizations(searchStr, pageSize)
      .pipe( map( value => {
        return value.map( x => mapObjectProps(x, new Organization()));
      }))
  }

  public addOrganizationRequest(request: JoinOrganization): Observable<JoinOrganization> {
    return this.organizationClient.addOrganizationRequest(mapObjectProps(request, new JoinOrganizationState()))
      .pipe( map(value => mapObjectProps(value, new JoinOrganization())));
  }

  public getOrganizations(pageNumber: number, pageSize: number, sortOrder: string): Observable<Organizations> {
    return this.organizationClient
      .getOrganizations(pageNumber, pageSize, sortOrder)
      .pipe(map(values => {
        const organizationModels: Organizations = new Organizations();
        organizationModels.organizations = values.organizations.map( value => {
          return mapObjectProps(value, new Organization());
        });
        organizationModels.page = mapObjectProps(values.page, new Page());
        organizationModels.sort = mapObjectProps(values.sort, new Sort());
        return organizationModels;
      }));
  }

  public getOrganization(partyId?: string): Observable<Organization> {
    return this.organizationClient
      .getOrganizationState(partyId)
      .pipe(map(value => {
        return mapObjectProps(value, new Organization());
      }));
  }

  public addOrganization(organization: Organization, profile?: boolean): Observable<Organization> {
    return this.organizationClient
      .addOrganizationState(mapObjectProps(organization, new OrganizationState()), profile)
      .pipe(map(value => {
        return mapObjectProps(value, new Organization());
      }));
  }

  public deleteOrganization(partyId: string): Observable<number> {
    return this.organizationClient.deleteOrganization(partyId);
  }

  public updateOrganization(organization: Organization): Observable<number> {
    return this.organizationClient.updateOrganization(mapObjectProps(organization, new OrganizationState()));
  }
}
