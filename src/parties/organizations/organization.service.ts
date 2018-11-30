import {Observable} from "rxjs";
import {Organizations} from "../organizations";
import {OrganizationRepository} from "./organization.repository";
import {Organization} from "../organization";
import {JoinOrganization} from "../join.organization";
import {ValidResponse} from "../../authentication/valid.response";

export class OrganizationService {
  constructor(private organizationRepository: OrganizationRepository) {}

  findOrganizations(searchStr: string, pageSize: number): Observable<Organization[]> {
    return this.organizationRepository.findOrganizations(searchStr, pageSize)
  }

  addOrganizationRequest(request: JoinOrganization): Observable<JoinOrganization> {
    return this.organizationRepository.addOrganizationRequest(request);
  }

  public getOrganizations(pageNumber: number, pageSize: number, sortOrder: string): Observable<Organizations> {
    return this.organizationRepository.getOrganizations(pageNumber, pageSize, sortOrder);
  }

  public getOrganization(partyId?: string): Observable<Organization> {
    return this.organizationRepository.getOrganization(partyId);
  }
  
  public addOrganization(organization: Organization, profile?: boolean): Observable<Organization> {
    return this.organizationRepository.addOrganization(organization, profile);
  }

  public deleteOrganization(partyId: string): Observable<number> {
    return this.organizationRepository.deleteOrganization(partyId);
  }

  public updateOrganization(organization: Organization): Observable<number> {
    return this.organizationRepository.updateOrganization(organization);
  }

  // Validation


  isValidUsername(username: string, partyId?: string): Observable<ValidResponse> {
    return this.organizationRepository.isValidUsername(username, partyId);
  }


}
