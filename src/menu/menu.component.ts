import { Component } from '@angular/core';
import {MenuService} from "./menu.service";

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  private _title:string;

  get title(): string {
    return this._title;
  }

  constructor(private menuService:MenuService) {
    menuService.getMenu().subscribe(function (menu) {
      console.log(menu);
    });
    console.log();
    this._title = "Troumaca";
  }

}