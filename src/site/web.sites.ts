import {WebSite} from "./web.site";

export class WebSites {

  private _webSites:WebSite[] = [];

  get webSites(): WebSite[] {
    return this._webSites;
  }

  set webSites(value: WebSite[]) {
    this._webSites = value;
  }
}