import {Observable} from "rxjs";
import { Organizations} from "../../../parties/organizations";
import { Organization } from "../../../parties/organization";
import { JoinOrganization } from "../../../parties/join.organization";

export abstract class OrganizationClient {
  public abstract findOrganizations(searchStr: string, pageSize: number): Observable<Organization[]>;

  public abstract addOrganizationRequest(request: JoinOrganization): Observable<JoinOrganization>;

  public abstract getOrganizations(pageNumber: number, pageSize: number, sortOrder: string): Observable<Organizations>;

  public abstract getOrganizationState(partyId?: string): Observable<Organization>;

  public abstract addOrganizationState(organizationState: Organization, profile?: boolean): Observable<Organization>;

  public abstract deleteOrganization(partyId: string): Observable<number>;

  public abstract updateOrganization(organizationState: Organization): Observable<number>;
}
