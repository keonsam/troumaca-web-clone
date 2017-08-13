import {OrganizationRepository} from "./organization.repository";
import {Observable} from "rxjs/Observable";
import {OrganizationModel} from "./organization.model";

export class OrganizationService {

  constructor(private organizationRepository: OrganizationRepository) {
  }

  public getOrganizations():Observable<OrganizationModel[]> {
    return this.organizationRepository.getOrganizations();
  }

}