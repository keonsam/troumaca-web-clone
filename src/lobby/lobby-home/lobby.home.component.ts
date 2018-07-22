import {Component, Input} from '@angular/core';

@Component({
  selector: 'lobby-home',
  templateUrl: './lobby.home.component.html',
  styleUrls: ['./lobby.home.component.css']
})
export class LobbyHomeComponent {

  private _title = 'app';
  private _isLoggedIn: boolean;
  private _dynamicMenuName: string;
  private _routerLinkAssetList = '/assets/listing';

  constructor() {
    this.dynamicMenuName = 'home-menu';
  }

  get routerLinkAssetList(): string {
    return this._routerLinkAssetList;
  }

  set routerLinkAssetList(value: string) {
    this._routerLinkAssetList = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  @Input()
  set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
  }


  get dynamicMenuName(): string {
    return this._dynamicMenuName;
  }

  set dynamicMenuName(value: string) {
    this._dynamicMenuName = value;
  }
}
