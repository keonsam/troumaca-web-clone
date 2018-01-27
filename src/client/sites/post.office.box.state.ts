import {PhysicalSiteState} from "./physical.site.state";

export class PostOfficeBoxState extends PhysicalSiteState {

  private _postOfficeBoxNumber:string;

  get postOfficeBoxNumber(): string {
    return this._postOfficeBoxNumber;
  }

  set postOfficeBoxNumber(value: string) {
    this._postOfficeBoxNumber = value;
  }

}