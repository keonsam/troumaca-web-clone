import {MenuItemModel} from "./menu.item.model";

export class MenuModel {

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get menuItemModel(): MenuItemModel[] {
    return this._menuItemModel;
  }

  set menuItemModel(value: MenuItemModel[]) {
    this._menuItemModel = value;
  }

  private _title:string;
  private _menuItemModel:MenuItemModel[];

}