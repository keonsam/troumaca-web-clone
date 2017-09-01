import {MenuRepository} from "../../menu/menu.repository";
import {Observable} from "rxjs/Observable";
import {MenuModel} from "../../menu/menu.model";
import {MenuClient} from "../../client/menu/menu.client";
import {mapObjectProps} from "../object.property.mapper";
import {MenuItemModel} from "../../menu/menu.item.model";
import {LeftMenuRepository} from "../../left-menu/left.menu.repository";
import {LeftMenuModel} from "../../left-menu/left.menu.model";

import "rxjs/add/operator/map";
import {MenuState} from "../../client/menu/menu.state";
import {LeftMenuItemModel} from "../../left-menu/left.menu.item.model";
import {MenuItemState} from "../../client/menu/menu.item.state";



export class MenuRepositoryAdapter implements MenuRepository, LeftMenuRepository {

  constructor(private menuClient: MenuClient) {
  }

  getMenuModel(isLoggedIn:boolean): Observable<MenuModel> {
    return this.menuClient
      .getTopMenuState(isLoggedIn)
      .map(menuData => {
        let menuItemModels:MenuItemModel[] = menuData.menuItemStates.map(menuItemData => {
          return mapObjectProps(menuItemData, new MenuItemModel());
        });
        let menuModel:MenuModel = mapObjectProps(menuData, new MenuModel());
        menuModel.menuItemModels = menuItemModels;
        return menuModel;
      });
  }

  getLeftMenuModelByName(menuName:string): Observable<LeftMenuModel> {
    return this.menuClient
      .getLeftMenuStateByName(menuName)
      .map(menuState => {
        if (menuState == null) {
          return new LeftMenuModel();
        }
        return this.toLeftMenuModel(menuState);
      });
  }

  getLeftMenuModelById(menuName:string): Observable<LeftMenuModel> {
    return this.menuClient
      .getLeftMenuStateById(menuName)
      .map(menuStates => {
        if (menuStates == null) {
          return new LeftMenuModel();
        }
        return this.toLeftMenuModel(menuStates);
      });
  }

  private toLeftMenuModel(menuState: MenuState):LeftMenuModel {
    let leftMenuModel:LeftMenuModel = mapObjectProps(menuState, new LeftMenuModel());
    //let menuItemStates = menuState.menuItemStates;
    if (menuState.menuItemStates && menuState.menuItemStates != null && menuState.menuItemStates.length > 0) {
      leftMenuModel.leftMenuItemModels = this.toLeftMenuItemModel(menuState.menuItemStates);
    }
    return leftMenuModel;
  }

  private toLeftMenuItemModel(menuItemStates:MenuItemState[]):LeftMenuItemModel[] {
    return menuItemStates.map(menuItemState => {
      let leftMenuItemModel:LeftMenuItemModel = mapObjectProps(menuItemState, new LeftMenuItemModel());
      let menuStates = menuItemState.menuStates;
      if (menuStates != null && menuStates.length > 0) {
        leftMenuItemModel.leftMenuModels = menuStates.map(menuState => {
          return this.toLeftMenuModel(menuState);
        });
      }
      return leftMenuItemModel;
    });
  }

}