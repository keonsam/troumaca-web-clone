import {MenuClient} from './menu.client';
import {Observable} from 'rxjs';
import {MenuState} from './menu.state';
import {UUIDGenerator} from '../../uuid.generator';

export class MenuClientHttp extends MenuClient {

  constructor(private uuidGenerator: UUIDGenerator) {
    super();
  }

  getMenuByName(menuName: string): Observable<MenuState> {
    return undefined;
  }

  getTopMenuState(isLoggedIn: boolean): Observable<MenuState> {
    throw undefined;
  }

  getLeftMenuStateByName(menuName: string): Observable<MenuState> {
    return undefined;
  }

  getLeftMenuStateById(menuId: string): Observable<MenuState> {
    return undefined;
  }
}
