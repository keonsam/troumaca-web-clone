import {Observable} from 'rxjs';
import {MenuModel} from './menu.model';

export abstract class MenuRepository {
  abstract getMenuModel(isLoggedIn: boolean): Observable<MenuModel>;
  abstract getMenuModelByName(menuName: string): Observable<MenuModel>;
}
