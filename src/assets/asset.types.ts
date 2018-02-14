import {AssetType} from "./asset.type";
import {Page} from "../page/page";
import {Sort} from "../sort/sort";

export class AssetTypes {

  private _assetTypes:AssetType[];
  private _page:Page;
  private _sort:Sort;

  get assetTypes(): AssetType[] {
    return this._assetTypes;
  }

  set assetTypes(value: AssetType[]) {
    this._assetTypes = value;
  }

  get page(): Page {
    return this._page;
  }

  set page(value: Page) {
    this._page = value;
  }

  get sort(): Sort {
    return this._sort;
  }

  set sort(value: Sort) {
    this._sort = value;
  }

}
