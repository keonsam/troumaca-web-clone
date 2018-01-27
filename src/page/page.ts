export class Page {

  private _number:number;
  private _size:number;
  private _items:number;


  constructor(number?: number, size?: number, items?: number) {
    this._number = number;
    this._size = size;
    this._items = items;
  }

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