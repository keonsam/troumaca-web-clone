import {PartyState} from "./party.state";

export class OrganizationState extends PartyState {

  private _purpose:string;
  private _description: string;

  get purpose(): string {
    return this._purpose;
  }

  set purpose(value: string) {
    this._purpose = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  toJson() {
    return {
      partyId: this.partyId,
      purpose: this.purpose,
      name: this.name,
      description: this.description,
      createdOn: this.createdOn,
      modifiedOn: this.modifiedOn
      }
    }
}
