import {MenuItemState} from './menu.item.state';

export class MenuState {

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

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get rank(): number {
    return this._rank;
  }

  set rank(value: number) {
    this._rank = value;
  }

  get menuItemStates(): MenuItemState[] {
    return this._menuItemStates;
  }

  set menuItemStates(value: MenuItemState[]) {
    this._menuItemStates = value;
  }

  private _id: string;
  private _title: string;
  private _name: string;
  private _rank: number;
  private _menuItemStates: MenuItemState[];

}
