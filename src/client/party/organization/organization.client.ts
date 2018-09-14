import {Observable} from "rxjs";
import {OrganizationStates} from "../organization.states";
import {OrganizationState} from "../organization.state";

export abstract class OrganizationClient {
  public abstract findOrganizations(searchStr: string, pageSize: number): Observable<OrganizationState[]>;

  public abstract sendOrganizationRequest(request: string): Observable<boolean>;

  public abstract getOrganizations(pageNumber: number, pageSize: number, sortOrder: string): Observable<OrganizationStates>;

  public abstract getOrganizationState(partyId?: string): Observable<OrganizationState>;

  public abstract addOrganizationState(organizationState: OrganizationState, type?: string): Observable<OrganizationState>;

  public abstract deleteOrganization(partyId: string): Observable<number>;

  public abstract updateOrganization(organizationState: OrganizationState): Observable<number>;
}
