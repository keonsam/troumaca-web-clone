import {AssetTypeClassState} from './asset.type.class.state';
import {PageState} from '../page/page.state';
import {SortState} from '../sort/sort.state';

export class AssetTypeClassStates {

  private _assetTypeClasses: AssetTypeClassState[];
  private _page: PageState;
  private _sort: SortState;


  get assetTypeClasses(): AssetTypeClassState[] {
    return this._assetTypeClasses;
  }

  set assetTypeClasses(value: AssetTypeClassState[]) {
    this._assetTypeClasses = value;
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
