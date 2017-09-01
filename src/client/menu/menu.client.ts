import {MenuState} from "./menu.state";
import {Observable} from "rxjs/Observable";

export abstract class MenuClient {
  abstract getTopMenuState(isLoggedIn:boolean): Observable<MenuState>;
  abstract getLeftMenuStateByName(menuName:string): Observable<MenuState>;
  abstract getLeftMenuStateById(menuId:string): Observable<MenuState>;
}