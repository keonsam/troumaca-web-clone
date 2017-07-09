import {MenuClient} from "./menu.client";
import {Observable} from "rxjs/Observable";
import {MenuData} from "./menu.data";
import {UUIDGenerator} from "../../uuid.generator";

export class MenuClientHttp extends MenuClient {

  constructor(private uuidGenerator: UUIDGenerator) {
    super();
  }

  getMenuData(): Observable<MenuData> {
    throw new Error("Method not implemented.");
  }

}