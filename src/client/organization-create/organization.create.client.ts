import {Organization} from "../../parties/organization";
import {Observable} from "rxjs";

export abstract class OrganizationCreateClient {
  abstract createOrganization(organization: Organization): Observable<Organization>
}
