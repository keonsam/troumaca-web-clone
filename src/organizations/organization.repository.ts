import {OrganizationModel} from "./organization.model";
import {Observable} from "rxjs/Observable";

export abstract class OrganizationRepository {
  abstract getOrganizations():Observable<OrganizationModel[]>;
}