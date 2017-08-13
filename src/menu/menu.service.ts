import {MenuRepository} from "./menu.repository";
import {Observable} from "rxjs/Observable";
import {MenuModel} from "./menu.model";

export class MenuService {

  constructor(private menuRepository: MenuRepository) {
  }

  public getMenu(isLoggedIn:boolean):Observable<MenuModel> {
    return this.menuRepository.getMenuModel(isLoggedIn);
  }

}