import {createOrganizationRepository} from './organization.repository.factory';
import {OrganizationRepository} from "./organization.repository";
import {Observable} from "rxjs/Observable";
import {Organization} from "./organization";
import {shapeOrganizationsResponse} from "./organization.response.shaper";
import {Result} from "../../result.success";

export class OrganizationOrchestrator {

  private organizationRepository: OrganizationRepository;

  constructor() {

    this.organizationRepository = createOrganizationRepository();
  }

    getOrganizations (number, size, field, direction):Observable<any> {
      let sort = getSortOrderOrDefault(field, direction);
      return this.organizationRepository
        .getOrganizations(number, size, sort)
        .flatMap(value => {
          return this.organizationRepository
            .getOrganizationCount()
            .map(count => {
              let shapeOrganizationsResp:any = shapeOrganizationsResponse(value, number, size, value.length, count, sort);
              return new Result<any>(false, "organizations", shapeOrganizationsResp);
            });
        });
    };

    getOrganization (partyId):Observable<Organization> {
      return this.organizationRepository.getOrganization(partyId);
    };



    saveOrganization (organization):Observable<Organization>{
      return this.organizationRepository.saveOrganization(organization);
    };

    deleteOrganization (partyId):Observable<number> {
      return this.organizationRepository.deleteOrganization(partyId)
    };

    updateOrganization (partyId, organization):Observable<number> {
      return this.organizationRepository.updateOrganization(partyId, organization);
    };

}
