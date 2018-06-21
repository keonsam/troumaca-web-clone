import {Employment} from './employment';

export class PartyRelationship extends Employment {

  private _partyRelationshipId: string;

  get partyRelationshipId(): string {
    return this._partyRelationshipId;
  }

  set partyRelationshipId(value: string) {
    this._partyRelationshipId = value;
  }

}
