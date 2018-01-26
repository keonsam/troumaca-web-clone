import {SiteState} from "./site.state";

export class VirtualSiteState extends SiteState {

  private _createdOn:Date;
  private _removedOn:Date;

  get createdOn(): Date {
    return this._createdOn;
  }

  set createdOn(value: Date) {
    this._createdOn = value;
  }

  get removedOn(): Date {
    return this._removedOn;
  }

  set removedOn(value: Date) {
    this._removedOn = value;
  }

}