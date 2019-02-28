import {MenuRepository} from './menu.repository';
import {Observable, of} from 'rxjs';
import {MenuModel} from './menu.model';
import {ASSET, ASSET_CHARACTERISTICS, ASSET_SETTING, ASSET_TYPE} from '../app/routes';
import {TopMenuNav} from './top.menu.nav';
import {UserMenu} from './user.menu';

export class MenuService {

  assetMenu: TopMenuNav[] = [
    {name: 'Assets', route: `/${ASSET}`},
    {name: 'Types', route: `/${ASSET_TYPE}`},
    {name: 'Characteristics', route: `/${ASSET_CHARACTERISTICS}`},
    {name: 'Settings', route: `/${ASSET_SETTING}`},
  ];

  apps = [
    {
      name: 'Company',
      route: '/parties/organization/profile',
      iconClass: 'build'
    },
    {
      name: 'People',
      route: '/parties/users/listing',
      iconClass: 'supervised_user_circle'
    },
    {
      name: 'Me',
      route: '/parties/organizations/listing',
      iconClass: 'business'
    },
    {
      name: 'Assets',
      route: ASSET,
      iconClass: 'store'
    },
  ];

  constructor(private menuRepository: MenuRepository) {
  }


  public getTopMenu(url: string): Observable<TopMenuNav[]> {
    if (url.indexOf('asset') > -1 || url.indexOf('brand') > -1) {
      return of(this.assetMenu);
    } else {
      return of([]);
    }
  }

  public getMenu(isLoggedIn: boolean): Observable<MenuModel> {
    return this.menuRepository.getMenuModel(isLoggedIn);
  }

  getApps(): Observable<any[]> {
    return of(this.apps);
    // return this.menuRepository.getApps();
  }

  getUserMenu(): Observable<UserMenu> {
    return this.menuRepository.getUserMenu();
  }

}
