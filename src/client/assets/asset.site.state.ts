export class SiteState {
  private _siteId:string;
  private _siteName: string;

  get siteId(): string {
    return this._siteId;
  }

  set siteId(value: string) {
    this._siteId = value;
  }

  get siteName(): string {
    return this._siteName;
  }

  set siteName(value: string) {
    this._siteName = value;
  }

}
