export class MenuItemModel {

  get secured(): boolean {
    return this._secured;
  }

  set secured(value: boolean) {
    this._secured = value;
  }
  get selected(): boolean {
    return this._selected;
  }

  set selected(value: boolean) {
    this._selected = value;
  }
  get active(): boolean {
    return this._active;
  }

  set active(value: boolean) {
    this._active = value;
  }
  get backgroundColor(): string {
    return this._backgroundColor;
  }

  set backgroundColor(value: string) {
    this._backgroundColor = value;
  }
  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }
  get routeName(): string {
    return this._routeName;
  }

  set routeName(value: string) {
    this._routeName = value;
  }
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  private _name: string;
  private _routeName: string;
  private _color: string;
  private _backgroundColor: string;
  private _active:boolean;
  private _selected: boolean;
  private _secured:boolean;

}