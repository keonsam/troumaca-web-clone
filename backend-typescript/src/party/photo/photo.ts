import {Party} from "../party";

export class Photo extends Party {
  private _imageStr: string;
  
  get imageStr():string {
    return this._imageStr;
  }
  
  set imageStr(value: string) {
    this._imageStr = value;
  }
  
}
