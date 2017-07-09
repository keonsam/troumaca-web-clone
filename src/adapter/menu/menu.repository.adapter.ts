import {MenuRepository} from "../../menu/menu.repository";
import {Observable} from "rxjs/Observable";
import {MenuModel} from "../../menu/menu.model";
import {MenuClient} from "../../client/menu/menu.client";
import {mapObjectProps} from "../object.property.mapper";
import {MenuItemModel} from "../../menu/menu.item.model";
import "rxjs/add/operator/map";

export class MenuRepositoryAdapter extends MenuRepository {

  private menuClient:MenuClient;

  constructor(menuClient: MenuClient) {
    super();
    this.menuClient = menuClient;
  }

  getMenuModel(): Observable<MenuModel> {
    return this.menuClient
      .getMenuData()
      .map(menuData => {
        let menuItemModel:MenuItemModel[] = menuData.menuItemData.map(menuItemData => {
          return mapObjectProps(menuItemData, new MenuItemModel());
        });

        let menuModel:MenuModel = mapObjectProps(menuData, new MenuModel());

        menuModel.menuItemModel = menuItemModel;

        return menuModel;
      });
  }

}