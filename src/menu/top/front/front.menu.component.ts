import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'front-menu',
  templateUrl: './front.menu.component.html',
  styleUrls: ['./front.menu.component.css']
})
export class FrontMenuComponent implements OnInit {

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