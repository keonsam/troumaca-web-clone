export class Page {

  private _number:number;
  private _size:number;
  private _items:number;
  private _totalItems:number;


  constructor(number?: number, size?: number, items?: number, totalItems?:number) {
    this.number = number;
    this.size = size;
    this.items = items;
    this.totalItems = totalItems;
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

  get totalItems(): number {
    return this._totalItems;
  }

  set totalItems(value: number) {
    this._totalItems = value;
  }

}