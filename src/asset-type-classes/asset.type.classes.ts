import {AssetTypeClass} from "./asset.type.class";
import {Page} from "../page/page";
import {Sort} from "../sort/sort";

export class AssetTypeClasses {

  private _assetTypeClasses:AssetTypeClass[];
  private _page:Page;
  private _sort:Sort;

  get assetTypeClasses(): AssetTypeClass[] {
    return this._assetTypeClasses;
  }

  set assetTypeClasses(value: AssetTypeClass[]) {
    this._assetTypeClasses = value;
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
