import {Observable} from 'rxjs';
import {Organizations} from '../organizations';
import {OrganizationRepository} from './organization.repository';
import {Organization} from '../organization';
import {CompanyInfo} from './organization-company/company.info';
import gql from 'graphql-tag';
import {map} from 'rxjs/operators';
import {UUIDGenerator} from '../../uuid.generator';
import {Apollo} from 'apollo-angular';

export class OrganizationService {
  uuid = new UUIDGenerator();

  constructor(private apollo: Apollo) {
  }

  getOrganizations(pageNumber: number, pageSize: number, sortOrder: string): Observable<Organizations> {
    return undefined;
    // return this.organizationRepository.getOrganizations(pageNumber, pageSize, sortOrder);
  }

  getOrganization(partyId: string): Observable<Organization> {
    return undefined;
    // return this.organizationRepository.getOrganization(partyId);
  }

  addOrganization(organization: Organization): Observable<Organization> {
    return undefined;
    // return this.organizationRepository.addOrganization(organization);
  }

  deleteOrganization(partyId: string): Observable<number> {
    return undefined;
    // return this.organizationRepository.deleteOrganization(partyId);
  }

  updateOrganization(organization: Organization): Observable<number> {
    return this.apollo.mutate({
      mutation: gql`
        mutation updateCompany(
        $name: String!
        $purpose: String!
        $version: String!
        ) {
          updateCompany(
            company: {
              name: $name,
              purpose: $purpose,
              version: $version
            }
          )
        }
      `,
      variables: {
        name: organization.name,
        purpose: organization.purpose,
        version: organization.version
      }
    }).pipe(map((res: any) => res.data.updateCompany));
  }

  getCompany(): Observable<CompanyInfo> {
    return this.apollo.query({
      query: gql`
        query getCompany {
          getCompany {
            partyId
            name
            purpose
            version
          }
        }
      `,
    }).pipe(map((res: any) => res.data.getCompany));
  }

  createOrganization(organization: Organization): Observable<Organization> {
    return this.apollo.mutate({
      mutation: gql`
        mutation addCompany(
        $name: String!
        $purpose: String!
        $version: String!
        ) {
          addCompany(
            company: {
              name: $name,
              purpose: $purpose,
              version: $version
            }
          ) {
            partyId
          }
        }
      `,
      variables: {
        name: organization.name,
        purpose: organization.purpose,
        version: this.uuid.generateUUID()
      }
    }).pipe(map((res: any) => res.data.addCompany));
  }

}
