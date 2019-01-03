import {MenuRepository} from './menu.repository';
import {Observable} from 'rxjs';
import {MenuModel} from './menu.model';
import {App} from "../lobby/app";

export class MenuService {

  constructor(private menuRepository: MenuRepository) {
  }

  public getMenuByName(menuName: string): Observable<MenuModel> {
    return this.menuRepository.getMenuModelByName(menuName);
  }

  public getMenu(isLoggedIn: boolean): Observable<MenuModel> {
    return this.menuRepository.getMenuModel(isLoggedIn);
  }

  getApps(): Observable<App[]> {
    return this.menuRepository.getApps();
  }

}
