
export class PageState {

  private _number:number;
  private _size:number;
  private _items:number;

  get number(): number {
    return this._number;
  }

  set number(value: number) {
    this._number = value;
  }

  get size(): number {
    return this._size;
  }

  set size(value: number) {
    this._size = value;
  }

  get items(): number {
    return this._items;
  }

  set items(value: number) {
    this._items = value;
  }

}