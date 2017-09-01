import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'inside-menu',
  templateUrl: './inside.menu.component.html',
  styleUrls: ['./inside.menu.component.css']
})
export class InsideMenuComponent implements OnInit {

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