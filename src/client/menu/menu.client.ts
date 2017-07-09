import {MenuData} from "./menu.data";
import {Observable} from "rxjs/Observable";

export abstract class MenuClient {
  abstract getMenuData(): Observable<MenuData>;
}