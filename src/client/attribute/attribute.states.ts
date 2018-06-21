import {AttributeState} from './attribute.state';
import {PageState} from '../page/page.state';
import {SortState} from '../sort/sort.state';

export class AttributeStates {

  private _attributes: AttributeState[] = [];
  private _page: PageState;
  private _sort: SortState;

  constructor() {
    this.page = new PageState();
    this.sort = new SortState();
  }

  get attributes(): AttributeState[] {
    return this._attributes;
  }

  set attributes(value: AttributeState[]) {
    this._attributes = value;
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
