import {OrganizationClient} from "./organization.client";
import {UUIDGenerator} from "../../uuid.generator";
import {Observable} from "rxjs/Observable";
import {OrganizationState} from "./organization.state";
import "rxjs/add/observable/of";

export class OrganizationClientMock implements OrganizationClient {

  constructor(private uuidGenerator: UUIDGenerator) {
  }

  public getOrganizations(): Observable<OrganizationState[]> {
    let states:OrganizationState[] = [];

    let stateOrg1:OrganizationState = new OrganizationState();
    stateOrg1.partyId = this.uuidGenerator.generateUUID();
    stateOrg1.name = "ChromeRiver";
    stateOrg1.purpose = "Letting business flow.";

    states.push(stateOrg1);

    let stateOrg2:OrganizationState = new OrganizationState();
    stateOrg2.partyId = this.uuidGenerator.generateUUID();
    stateOrg2.name = "Riot Games";
    stateOrg2.purpose = "The most player focus game company.";

    states.push(stateOrg2);

    let stateOrg3:OrganizationState = new OrganizationState();
    stateOrg3.partyId = this.uuidGenerator.generateUUID();
    stateOrg3.name = "Swirl";
    stateOrg3.purpose = "Flash sales";

    states.push(stateOrg3);

    let stateOrg4:OrganizationState = new OrganizationState();
    stateOrg4.partyId = this.uuidGenerator.generateUUID();
    stateOrg4.name = "Fox Broadcasting Company";
    stateOrg4.purpose = "American commercial broadcast television network";

    states.push(stateOrg4);

    let stateOrg5:OrganizationState = new OrganizationState();
    stateOrg5.partyId = this.uuidGenerator.generateUUID();
    stateOrg5.name = "Oakwood Worldwide";
    stateOrg5.purpose = "The Premier Global Provider of Corporate Housing and Serviced Apartment Solutions";

    states.push(stateOrg5);

    let stateOrg6:OrganizationState = new OrganizationState();
    stateOrg6.partyId = this.uuidGenerator.generateUUID();
    stateOrg6.name = "Disney";
    stateOrg6.purpose = "American diversified multinational mass media and entertainment conglomerate";

    states.push(stateOrg6);

    return Observable.of(states);
  }

}