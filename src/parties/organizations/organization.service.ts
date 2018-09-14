import {Observable} from "rxjs";
import {Organizations} from "../organizations";
import {OrganizationRepository} from "./organization.repository";
import {Organization} from "../organization";

export class OrganizationService {
  constructor(private organizationRepository: OrganizationRepository) {}

  findOrganizations(searchStr: string, pageSize: number): Observable<Organization[]> {
    return this.organizationRepository.findOrganizations(searchStr, pageSize)
  }

  sendOrganizationRequest(request: string): Observable<boolean> {
    return this.organizationRepository.sendOrganizationRequest(request);
  }

  public getOrganizations(pageNumber: number, pageSize: number, sortOrder: string): Observable<Organizations> {
    return this.organizationRepository.getOrganizations(pageNumber, pageSize, sortOrder);
  }

  public getOrganization(partyId?: string): Observable<Organization> {
    return this.organizationRepository.getOrganization(partyId);
  }
  
  public addOrganization(organization: Organization, type?: string): Observable<Organization> {
    return this.organizationRepository.addOrganization(organization, type);
  }

  public deleteOrganization(partyId: string): Observable<number> {
    return this.organizationRepository.deleteOrganization(partyId);
  }

  public updateOrganization(organization: Organization): Observable<number> {
    return this.organizationRepository.updateOrganization(organization);
  }


}
