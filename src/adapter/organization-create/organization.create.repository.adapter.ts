import {OrganizationCreateRepository} from "../../organization-create/organization.create.repository";
import {Organization} from "../../parties/organization";
import {Observable} from "rxjs";
import {OrganizationCreateClient} from "../../client/organization-create/organization.create.client";

export class OrganizationCreateRepositoryAdapter extends OrganizationCreateRepository {
  constructor(private organizationCreateClient: OrganizationCreateClient) {
    super();
  }

  createOrganization(organization: Organization): Observable<Organization> {
    return this.organizationCreateClient.createOrganization(organization);
  }
}
