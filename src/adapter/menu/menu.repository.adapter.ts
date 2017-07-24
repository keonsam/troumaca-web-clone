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

  getMenuModel(): Observable<MenuModel> {
    return this.menuClient
      .getTopMenuState()
      .map(menuData => {
        let menuItemModels:MenuItemModel[] = menuData.menuItemStates.map(menuItemData => {
          return mapObjectProps(menuItemData, new MenuItemModel());
        });

        let menuModel:MenuModel = mapObjectProps(menuData, new MenuModel());

        menuModel.menuItemModels = menuItemModels;

        return menuModel;
      });
  }

  getLeftMenuModel(): Observable<LeftMenuModel[]> {
    return this.menuClient
      .getLeftMenuState()
      .map(menuStates => {
        return this.toLeftMenuModels(menuStates);
      });
  }

  private toLeftMenuModels(menuStates: MenuState[]):LeftMenuModel[] {
    return menuStates.map(menuState => {
      return this.toLeftMenuModel(menuState);
    });
  }

  private toLeftMenuModel(menuState: MenuState):LeftMenuModel {
    let leftMenuModel:LeftMenuModel = mapObjectProps(menuState, new LeftMenuModel());

    let menuItemStates = menuState.menuItemStates;
    if (menuItemStates) {
      leftMenuModel.leftMenuItemModels = this.toLeftMenuItemModels(menuItemStates);
    }

    return leftMenuModel;
  }

  private toLeftMenuItemModels(menuItemStates:MenuItemState[]):LeftMenuItemModel[] {
    return menuItemStates.map(menuItemState => {
      let leftMenuItemModel = new LeftMenuItemModel();

      let childMenuStates:MenuState[] = menuItemState.menuState;

      if (childMenuStates) {
        leftMenuItemModel.leftMenuModels = childMenuStates.map(childMenuState => {
          return this.toLeftMenuModel(childMenuState);
        });
      }

      return mapObjectProps(menuItemState, leftMenuItemModel)
    });
  }

}