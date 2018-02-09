import {AssetTypeState} from "./asset.type.state";
import {PageState} from "../page/page.state";
import {SortState} from "../sort/sort.state";

export class AssetTypeStates {

  private _assetTypes:AssetTypeState[];
  private _page:PageState;
  private _sort:SortState;
  
  get assetTypes(): AssetTypeState[] {
    return this._assetTypes;
  }

  set assetTypes(assetTypes: AssetTypeState[]) {
    this._assetTypes = assetTypes;
  }

  get page(): PageState {
    return this._page;
  }

  set page(value: PageState) {
    this._page = value;
  }

  get sort(): SortState {
    return this._sort;
  }

  set sort(value: SortState) {
    this._sort = value;
  }

}
