import {OrganizationState} from "./organization.state";

export class OrganizationStates {

  private _organizationStates:OrganizationState[];

  get organizationStates(): OrganizationState[] {
    return this._organizationStates;
  }

  set organizationStates(value: OrganizationState[]) {
    this._organizationStates = value;
  }
}