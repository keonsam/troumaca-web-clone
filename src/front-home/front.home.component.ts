import {Component, Input} from '@angular/core';
import {AUTHENTICATION, LOGIN, REGISTER} from '../app/routes';

@Component({
  selector: 'app-front-home',
  templateUrl: './front.home.component.html',
  styleUrls: ['./front.home.component.css']
})
export class FrontHomeComponent {
  private _title = 'app';
  private _isLoggedIn: boolean;
  loginRoute = `${AUTHENTICATION}${LOGIN}`;
  registerRoute = `${AUTHENTICATION}${REGISTER}`;

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
