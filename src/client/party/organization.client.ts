import {Observable} from "rxjs/Observable";
import {OrganizationState} from "./organization.state";

export abstract class OrganizationClient {
  public abstract getOrganizations():Observable<OrganizationState[]>
}