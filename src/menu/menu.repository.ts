import {Observable} from 'rxjs';
import {MenuModel} from './menu.model';
import {App} from "../lobby/app";

export abstract class MenuRepository {
  abstract getMenuModel(isLoggedIn: boolean): Observable<MenuModel>;
  abstract getMenuModelByName(menuName: string): Observable<MenuModel>;
  abstract getApps(): Observable<App[]>;
}
