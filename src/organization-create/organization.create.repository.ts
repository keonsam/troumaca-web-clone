import {Organization} from "../parties/organization";
import {Observable} from "rxjs";

export abstract class OrganizationCreateRepository {
  abstract createOrganization(organization: Organization): Observable<Organization>;
}
