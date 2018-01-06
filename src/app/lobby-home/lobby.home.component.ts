import {Component, Input} from '@angular/core';

@Component({
  selector: 'lobby-home',
  templateUrl: './lobby.home.component.html',
  styleUrls: ['./lobby.home.component.css']
})
export class LobbyHomeComponent {

  private _title:string = 'app';
  private _isLoggedIn:boolean;

  constructor() {
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
}
