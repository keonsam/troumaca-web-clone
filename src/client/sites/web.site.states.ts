import {WebSiteState} from "./web.site.state";

export class WebSiteStates {

  private _webSites:WebSiteState[] = [];

  get webSites(): WebSiteState[] {
    return this._webSites;
  }

  set webSites(value: WebSiteState[]) {
    this._webSites = value;
  }

}