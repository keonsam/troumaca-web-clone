import {Observable} from "rxjs";
import {OrganizationStates} from "../organization.states";
import {OrganizationState} from "../organization.state";
import {JoinOrganizationState} from "../join.organization.state";

export abstract class OrganizationClient {
  public abstract findOrganizations(searchStr: string, pageSize: number): Observable<OrganizationState[]>;

  public abstract addOrganizationRequest(request: JoinOrganizationState): Observable<JoinOrganizationState>;

  public abstract getOrganizations(pageNumber: number, pageSize: number, sortOrder: string): Observable<OrganizationStates>;

  public abstract getOrganizationState(partyId?: string): Observable<OrganizationState>;

  public abstract addOrganizationState(organizationState: OrganizationState, profile?: boolean): Observable<OrganizationState>;

  public abstract deleteOrganization(partyId: string): Observable<number>;

  public abstract updateOrganization(organizationState: OrganizationState): Observable<number>;
}
