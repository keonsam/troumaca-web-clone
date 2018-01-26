import {PostOfficeBoxState} from "./post.office.box.state";

export class PostOfficeBoxStates {

  private _postOfficeBoxes:PostOfficeBoxState[] = [];

  get postOfficeBoxes(): PostOfficeBoxState[] {
    return this._postOfficeBoxes;
  }

  set postOfficeBoxes(value: PostOfficeBoxState[]) {
    this._postOfficeBoxes = value;
  }

}