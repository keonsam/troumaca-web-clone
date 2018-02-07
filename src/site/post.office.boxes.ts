import {PostOfficeBox} from "./post.office.box";
import {Page} from "../page/page";
import {Sort} from "../sort/sort";

export class PostOfficeBoxes {

  private _postOfficeBoxes:PostOfficeBox[] = [];
  private _page:Page;
  private _sort:Sort;

  get postOfficeBoxes(): PostOfficeBox[] {
    return this._postOfficeBoxes;
  }

  set postOfficeBoxes(value: PostOfficeBox[]) {
    this._postOfficeBoxes = value;
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
