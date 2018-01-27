import {VirtualSiteState} from "./virtual.site.state";

export class WebSiteState extends VirtualSiteState {

  private _uniformResourceIdentifer:string;

  get uniformResourceIdentifer(): string {
    return this._uniformResourceIdentifer;
  }

  set uniformResourceIdentifer(value: string) {
    this._uniformResourceIdentifer = value;
  }

}