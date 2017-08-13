import {OrganizationRepository} from "../../organizations/organization.repository";
import {OrganizationClient} from "../../client/party/organization.client";
import {Observable} from "rxjs/Observable";
import {OrganizationModel} from "../../organizations/organization.model";
import "rxjs/add/operator/map";
import {mapObjectProps} from "../object.property.mapper";

export class OrganizationRepositoryAdapter extends OrganizationRepository {

  constructor(private organizationClient: OrganizationClient) {
    super();
  }


  public getOrganizations(): Observable<OrganizationModel[]> {
    return this
      .organizationClient
      .getOrganizations()
      .map(organizations => {
        return organizations.map(organization => {
          return mapObjectProps(organization, new OrganizationModel())
        });
      });
  }
}