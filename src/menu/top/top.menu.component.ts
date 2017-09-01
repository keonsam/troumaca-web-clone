import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'top-menu',
  templateUrl: './top.menu.component.html',
  styleUrls: ['./top.menu.component.css']
})
export class TopMenuComponent implements OnInit {

  private _isLoggedIn:boolean;

  ngOnInit(): void {
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  @Input()
  set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
  }

}