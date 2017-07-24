import {Component, OnInit} from '@angular/core';
import {MenuService} from "./menu.service";
import {MenuModel} from "./menu.model";
import {MenuItemModel} from "./menu.item.model";

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private _title:string;
  private _menuModel:MenuModel;

  constructor(private menuService:MenuService) {
    this._title = "Troumaca";
  }

  get title(): string {
    return this._title;
  }

  get menuModel(): MenuModel {
    return this._menuModel;
  }

  set menuModel(value: MenuModel) {
    this._menuModel = value;
  }

  getClasses(menuItemMode:MenuItemModel) {
    if (menuItemMode.active) {
      return 'nav-item active';
    } else {
        return 'nav-item';
    }
  }

  ngOnInit(): void {
    let that = this;
    this.menuService.getMenu().subscribe(function (menu) {
      that.menuModel = menu;
    });
  }

  onSelected(menuModel:MenuModel) {
    this._menuModel.menuItemModels.forEach(mi => {
      if (mi.active) {
        mi.active = false
      }

      if (mi.id == menuModel.id) {
        mi.active = true;
      }
    });
  }

}