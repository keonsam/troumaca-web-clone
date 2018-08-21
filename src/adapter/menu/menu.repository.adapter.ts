import {MenuRepository} from '../../menu/menu.repository';
import {Observable} from 'rxjs';
import { map } from "rxjs/operators";
import {MenuModel} from '../../menu/menu.model';
import {MenuClient} from '../../client/menus/menu.client';
import {mapObjectProps} from '../../mapper/object.property.mapper';
import {MenuItemModel} from '../../menu/menu.item.model';
import {LeftMenuRepository} from '../../left-menu/left.menu.repository';
import {LeftMenuModel} from '../../left-menu/left.menu.model';

import {MenuState} from '../../client/menus/menu.state';
import {LeftMenuItemModel} from '../../left-menu/left.menu.item.model';
import {MenuItemState} from '../../client/menus/menu.item.state';

export class MenuRepositoryAdapter implements MenuRepository, LeftMenuRepository {

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


  getMenuModelByName(menuName: string): Observable<MenuModel> {
    return this.menuClient
      .getMenuByName(menuName)
      .pipe(map(menuState => {
        if (menuState == null) {
          return new MenuModel();
        }
        return this.toMenuModel(menuState);
      }));
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

  getLeftMenuModelByName(menuName: string): Observable<LeftMenuModel> {
    return this.menuClient
      .getLeftMenuStateByName(menuName)
      .pipe(map(menuState => {
        if (menuState == null) {
          return new LeftMenuModel();
        }
        return this.toLeftMenuModel(menuState);
      }));
  }

  getLeftMenuModelById(menuName: string): Observable<LeftMenuModel> {
    return this.menuClient
      .getLeftMenuStateById(menuName)
      .pipe(map(menuStates => {
        if (menuStates == null) {
          return new LeftMenuModel();
        }
        return this.toLeftMenuModel(menuStates);
      }));
  }

  private toLeftMenuModel(menuState: MenuState): LeftMenuModel {
    const leftMenuModel: LeftMenuModel = mapObjectProps(menuState, new LeftMenuModel());
    if (menuState.menuItemStates && menuState.menuItemStates != null && menuState.menuItemStates.length > 0) {
      leftMenuModel.leftMenuItemModels = this.toLeftMenuItemModel(menuState.menuItemStates);
    }
    return leftMenuModel;
  }

  private toLeftMenuItemModel(menuItemStates: MenuItemState[]): LeftMenuItemModel[] {
    return menuItemStates.map(menuItemState => {
      const leftMenuItemModel: LeftMenuItemModel = mapObjectProps(menuItemState, new LeftMenuItemModel());
      const menuStates = menuItemState.menuStates;
      if (menuStates != null && menuStates.length > 0) {
        leftMenuItemModel.leftMenuModels = menuStates.map(menuState => {
          return this.toLeftMenuModel(menuState);
        });
      }
      return leftMenuItemModel;
    });
  }

}
