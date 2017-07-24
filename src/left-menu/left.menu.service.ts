import {LeftMenuRepository} from "./left.menu.repository";
import {Observable} from "rxjs/Observable";
import {LeftMenuModel} from "./left.menu.model";

export class LeftMenuService {

  constructor(private leftMenuRepository: LeftMenuRepository) {
  }

  public getLeftMenu():Observable<LeftMenuModel[]> {
    return this.leftMenuRepository.getLeftMenuModel();
  }

}