import {Observable} from 'rxjs/Observable';
import {OrganizationState} from './organization.state';
import {OrganizationStates} from './organization.states';

export abstract class OrganizationClient {
  public abstract getOrganizations(): Observable<OrganizationState[]>
  public abstract findOrganizationStates(searchStr: string, pageSize: number): Observable<OrganizationStates>;
}
