import {Observable} from "rxjs";
import {Organizations} from "../organizations";
import {Organization} from "../organization";
import {JoinOrganization} from "../join.organization";
import {ValidResponse} from "../../authentication/valid.response";

export abstract class OrganizationRepository {

  abstract findOrganizations(searchStr: string, pageSize: number): Observable<Organization[]>;

  abstract addOrganizationRequest(request: JoinOrganization): Observable<JoinOrganization>;

  abstract getOrganizations(pageNumber: number, pageSize: number, sortOrder: string): Observable<Organizations>;

  abstract getOrganization(partyId?: string): Observable<Organization>;

  abstract addOrganization(organization: Organization, profile?: boolean): Observable<Organization>;

  abstract deleteOrganization(partyId: string): Observable<number>;

  abstract updateOrganization(organization: Organization): Observable<number>;

  // VALIDATION

  abstract isValidUsername(username: string, partyId?: string): Observable<ValidResponse>;
}
