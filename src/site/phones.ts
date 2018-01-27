import {VirtualSite} from "./virtual.site";
import {Phone} from "./phone";

export class Phones extends VirtualSite {

  private _phones:Phone[] = [];

  get phones(): Phone[] {
    return this._phones;
  }

  set phones(value: Phone[]) {
    this._phones = value;
  }
}