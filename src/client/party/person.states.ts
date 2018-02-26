import {PersonState} from "./person.state";
import {PageState} from "../page/page.state";
import {SortState} from "../sort/sort.state";

export class PersonStates {

  private _persons:PersonState[];
  private _page: PageState;
  private _sort: SortState;

  get persons(): PersonState[] {
    return this._persons;
  }

  set persons(value: PersonState[]) {
    this._persons = value;
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
