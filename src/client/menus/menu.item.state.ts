import {MenuState} from "./menu.state";
export class MenuItemState {


  get iconClasses(): string {
    return this._iconClasses;
  }

  set iconClasses(value: string) {
    this._iconClasses = value;
  }

  get menuStates(): MenuState[] {
    return this._menuStates;
  }

  set menuStates(value: MenuState[]) {
    this._menuStates = value;
  }

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

  get rank(): number {
    return this._rank;
  }

  set rank(value: number) {
    this._rank = value;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  private _id:string;
  private _rank:number;
  private _name: string;
  private _routeName: string;
  private _color: string;
  private _backgroundColor: string;
  private _active:boolean;
  private _selected: boolean;
  private _secured:boolean;
  private _menuStates:MenuState[];
  private _iconClasses: string;
}