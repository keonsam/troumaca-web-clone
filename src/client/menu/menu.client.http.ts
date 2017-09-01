import {MenuClient} from "./menu.client";
import {Observable} from "rxjs/Observable";
import {MenuState} from "./menu.state";
import {UUIDGenerator} from "../../uuid.generator";

export class MenuClientHttp extends MenuClient {

  constructor(private uuidGenerator: UUIDGenerator) {
    super();
  }

  getTopMenuState(isLoggedIn:boolean): Observable<MenuState> {
    throw new Error("Method not implemented.");
  }

  getLeftMenuStateByName(menuName: string): Observable<MenuState> {
    return undefined;
  }

  getLeftMenuStateById(menuId: string): Observable<MenuState> {
    return undefined;
  }
}