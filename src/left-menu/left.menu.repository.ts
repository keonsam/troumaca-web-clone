import {Observable} from "rxjs/Rx";
import {LeftMenuModel} from "./left.menu.model";

export abstract class LeftMenuRepository {
  abstract getLeftMenuModelByName(menuName:string): Observable<LeftMenuModel>;
  abstract getLeftMenuModelById(menuName:string): Observable<LeftMenuModel[]>;
}