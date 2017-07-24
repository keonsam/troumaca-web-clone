import {MenuState} from "./menu.state";
import {Observable} from "rxjs/Observable";

export abstract class MenuClient {
  abstract getTopMenuState(): Observable<MenuState>;
  abstract getLeftMenuState(): Observable<MenuState[]>;
}