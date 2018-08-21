import {LeftMenuRepository} from './left.menu.repository';
import {Observable} from 'rxjs';
import {LeftMenuModel} from './left.menu.model';

export class LeftMenuService {

  constructor(private leftMenuRepository: LeftMenuRepository) {
  }

  public getLeftMenuByName(menuName: string): Observable<LeftMenuModel> {
    return this.leftMenuRepository.getLeftMenuModelByName(menuName);
  }

  public getLeftMenuById(menuId: string): Observable<LeftMenuModel> {
    return this.leftMenuRepository.getLeftMenuModelById(menuId);
  }

}
