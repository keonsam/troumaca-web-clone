import {PartyState} from "./party.state";

export class JoinOrganizationState extends PartyState {
  private _accessRequestId: string;
  private _organizationId: string;

  get accessRequestId(): string {
    return this._accessRequestId;
  }

  set accessRequestId(value: string) {
    this._accessRequestId = value;
  }

  get organizationId(): string {
    return this._organizationId;
  }

  set organizationId(value: string) {
    this._organizationId = value;
  }

  toJson() {
    return {
      'partyId': this.partyId,
      'accessRequestId': this.accessRequestId,
      'organizationId': this.organizationId,
    }
  }
}
