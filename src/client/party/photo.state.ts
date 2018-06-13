import {PartyState} from "./party.state";

export class PhotoState extends PartyState {
  private _imageStr: string;

  constructor(partyId?: string, imageStr?: string) {
    super();
    this.partyId = partyId;
    this._imageStr = imageStr;
  }

  get imageStr():string {
    return this._imageStr;
  }

  set imageStr(value: string) {
    this._imageStr = value;
  }

  toJson(){
    return {
      partyId: this.partyId,
      imageStr: this.imageStr,
      createdOn: this.createdOn,
      modifiedOn: this.modifiedOn
    }
  }


}