import {MenuState} from './menu.state';
import {Observable} from 'rxjs';
import {App} from "../../lobby/app";

export abstract class MenuClient {
  abstract getTopMenuState(isLoggedIn: boolean): Observable<MenuState>;
  abstract getLeftMenuStateByName(menuName: string): Observable<MenuState>;
  abstract getLeftMenuStateById(menuId: string): Observable<MenuState>;
  abstract getMenuByName(menuName: string): Observable<MenuState>;
  abstract getApps(): Observable<App[]>
}
