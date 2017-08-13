import {Observable} from "rxjs/Rx";
import {MenuModel} from "./menu.model";

export abstract class MenuRepository {
  abstract getMenuModel(isLoggedIn:boolean): Observable<MenuModel>;
}