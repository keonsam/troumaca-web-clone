import {PartyClient} from "./party.client";
import {Observable} from "rxjs/Observable";
import {PersonState} from "./person.state";
import {PersonStates} from "./person.states";
import {OrganizationState} from "./organization.state";
import {OrganizationStates} from "./organization.states";

export class PartyClientHttp implements PartyClient {

  getPersons(): Observable<PersonState[]> {
    return undefined;
  }

  getCurrentPerson(): Observable<PersonState> {
    return undefined;
  }

  findPersonStates(searchStr: string, pageSize: number): Observable<PersonStates> {
    return undefined;
  }

  getOrganizations(): Observable<OrganizationState[]> {
    return undefined;
  }

  findOrganizationStates(searchStr: string, pageSize: number): Observable<OrganizationStates> {
    return undefined;
  }

}