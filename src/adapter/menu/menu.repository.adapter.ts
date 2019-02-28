import {MenuRepository} from '../../menu/menu.repository';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {MenuModel} from '../../menu/menu.model';
import {MenuClient} from '../../client/menus/menu.client';
import {mapObjectProps} from '../../mapper/object.property.mapper';
import {MenuItemModel} from '../../menu/menu.item.model';

import {MenuState} from '../../client/menus/menu.state';
import {MenuItemState} from '../../client/menus/menu.item.state';
import {App} from "../../lobby/app";
import {UserMenu} from '../../menu/user.menu';

export class MenuRepositoryAdapter implements MenuRepository {

  constructor(private menuClient: MenuClient) {
  }

  getMenuModel(isLoggedIn: boolean): Observable<MenuModel> {
    return this.menuClient
      .getTopMenuState(isLoggedIn)
      .pipe(map(menuData => {
        const menuItemModels: MenuItemModel[] = menuData.menuItemStates.map(menuItemData => {
          return mapObjectProps(menuItemData, new MenuItemModel());
        });
        const menuModel: MenuModel = mapObjectProps(menuData, new MenuModel());
        menuModel.menuItemModels = menuItemModels;
        return menuModel;
      }));
  }

  getApps(): Observable<App[]> {
    return this.menuClient.getApps();
  }

  getUserMenu(): Observable<UserMenu> {
    return this.menuClient.getUserMenu();
  }

  private toMenuModel(menuState: MenuState): MenuModel {
    const menuModel: MenuModel = mapObjectProps(menuState, new MenuModel());
    if (menuState.menuItemStates && menuState.menuItemStates != null && menuState.menuItemStates.length > 0) {
      menuModel.menuItemModels = this.toMenuItemModel(menuState.menuItemStates);
    }
    return menuModel;
  }

  private toMenuItemModel(menuItemStates: MenuItemState[]): MenuItemModel[] {
    return menuItemStates.map(menuItemState => {
      const menuItemModel: MenuItemModel = mapObjectProps(menuItemState, new MenuItemModel());
      const menuStates = menuItemState.menuStates;
      if (menuStates != null && menuStates.length > 0) {
        menuItemModel.menuModels = menuStates.map(menuState => {
          return this.toMenuModel(menuState);
        });
      }
      return menuItemModel;
    });
  }

}
