import {Observable} from 'rxjs/Observable';
import {PersonState} from './person.state';
import {PersonStates} from './person.states';
import {OrganizationState} from './organization.state';
import {OrganizationStates} from './organization.states';

export abstract class PartyClient {
  public abstract getPersons(): Observable<PersonState[]>
  public abstract getCurrentPerson(): Observable<PersonState>;
  public abstract findPersonStates(searchStr: string, pageSize: number): Observable<PersonStates>;
  public abstract getOrganizations(): Observable<OrganizationState[]>
  public abstract findOrganizationStates(searchStr: string, pageSize: number): Observable<OrganizationStates>;

}
