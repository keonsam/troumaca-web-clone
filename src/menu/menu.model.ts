import {MenuItemModel} from './menu.item.model';

export class MenuModel {

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get menuItemModels(): MenuItemModel[] {
    return this._menuItemModels;
  }

  set menuItemModels(value: MenuItemModel[]) {
    this._menuItemModels = value;
  }

  private _id: string;
  private _title: string;
  private _menuItemModels: MenuItemModel[];

}
