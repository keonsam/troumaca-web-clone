import {Observable} from "rxjs/Rx";
import {LeftMenuModel} from "./left.menu.model";

export abstract class LeftMenuRepository {
  abstract getLeftMenuModel(): Observable<LeftMenuModel[]>;
}