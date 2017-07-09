import {MenuItemData} from "./menu.item.data";

export class MenuData {

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get menuItemData(): MenuItemData[] {
    return this._menuItemData;
  }

  set menuItemData(value: MenuItemData[]) {
    this._menuItemData = value;
  }

  private _title:string;
  private _menuItemData:MenuItemData[];

}