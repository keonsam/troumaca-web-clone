import {StreetAddressState} from './street.address.state';
import {PageState} from '../page/page.state';
import {SortState} from '../sort/sort.state';

export class StreetAddressStates {

  private _streetAddresses: StreetAddressState[] = [];
  private _page: PageState;
  private _sort: SortState;

  constructor() {
    this.page = new PageState();
    this.sort = new SortState();
  }

  get streetAddresses(): StreetAddressState[] {
    return this._streetAddresses;
  }

  set streetAddresses(value: StreetAddressState[]) {
    this._streetAddresses = value;
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
