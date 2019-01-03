import { OrganizationCreateRepository } from "./organization.create.repository";
import {Observable} from "rxjs";
import {Organization} from "../parties/organization";

export class OrganizationCreateService {

  constructor(private organizationCreateRepository: OrganizationCreateRepository) {
  }

  createOrganization(organization: Organization): Observable<Organization> {
    return this.organizationCreateRepository.createOrganization(organization);
  }
}
