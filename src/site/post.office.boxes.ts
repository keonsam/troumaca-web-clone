import {PostOfficeBox} from "./post.office.box";

export class PostOfficeBoxes {

  private _postOfficeBoxes:PostOfficeBox[] = [];

  get postOfficeBoxes(): PostOfficeBox[] {
    return this._postOfficeBoxes;
  }

  set postOfficeBoxes(value: PostOfficeBox[]) {
    this._postOfficeBoxes = value;
  }

}