import {UUIDGenerator} from "../../uuid.generator";
import {OrganizationClient} from "./organization.client";
import {Observable} from "rxjs/Observable";
import {OrganizationState} from "./organization.state";
import "rxjs/add/observable/of";

export class OrganizationClientHttp implements OrganizationClient {

  constructor(private uuidGenerator: UUIDGenerator) {
  }


  public getOrganizations(): Observable<OrganizationState[]> {
    return null;
  }
}