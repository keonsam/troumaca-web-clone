import {LeftMenuItemModel} from './left.menu.item.model';
import {MenuModel} from '../menu/menu.model';

export class LeftMenuModel {

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

  get leftMenuItemModels(): LeftMenuItemModel[] {
    return this._leftMenuItemModel;
  }

  set leftMenuItemModels(value: LeftMenuItemModel[]) {
    this._leftMenuItemModel = value;
  }

  private _id: string;
  private _title: string;
  private _leftMenuItemModel: LeftMenuItemModel[];

}
