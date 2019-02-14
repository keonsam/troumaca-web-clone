import {Observable} from "rxjs";
import {Organizations} from "../organizations";
import {OrganizationRepository} from "./organization.repository";
import {Organization} from "../organization";

export class OrganizationService {
  constructor(private organizationRepository: OrganizationRepository) {
  }

  getOrganizations(pageNumber: number, pageSize: number, sortOrder: string): Observable<Organizations> {
    return this.organizationRepository.getOrganizations(pageNumber, pageSize, sortOrder);
  }

  getOrganization(partyId?: string): Observable<Organization> {
    return this.organizationRepository.getOrganization(partyId);
  }

  addOrganization(organization: Organization): Observable<Organization> {
    return this.organizationRepository.addOrganization(organization);
  }

  deleteOrganization(partyId: string): Observable<number> {
    return this.organizationRepository.deleteOrganization(partyId);
  }

  updateOrganization(organization: Organization): Observable<number> {
    return this.organizationRepository.updateOrganization(organization);
  }


}
