import {MenuClient} from "./menu.client";
import {Observable} from "rxjs/Observable";
import {MenuData} from "./menu.data";
import {MenuItemData} from "./menu.item.data";
import "rxjs/add/observable/of";

export class MenuClientMock extends MenuClient {

  constructor() {
    super();
  }

  getMenuData(): Observable<MenuData> {
    let menuData:MenuData = new MenuData();
    menuData.title = "Troumaca";

    menuData.menuItemData = this.menuItems();

    return Observable.of(menuData);
  }

  private menuItems():MenuItemData[] {
    return [
      //this.toMenuItem({"name": 'Session', "routeName": '/session', "color": 'white', "backgroundColor": 'black', "selected": true, "active": false, "secured": true}),
      this.toMenuItem({"name": 'Account', "routeName": '/account', "color": 'black', "backgroundColor": 'white', "selected": true, "active": false, "secured": true}),
      this.toMenuItem({"name": 'Login', "routeName": '/login', "color": 'black', "backgroundColor": 'white', "selected": true, "active": true, "secured": false}),
      this.toMenuItem({"name": 'Sign Up', "routeName": '/sign-up', "color": 'black', "backgroundColor": 'white', "selected": true, "active": true, "secured": false})
    ];
  }

  //noinspection JSMethodCanBeStatic
  private toMenuItem(value:any):MenuItemData {
    let menuItemData = new MenuItemData();

    menuItemData.backgroundColor = value.backgroundColor;
    menuItemData.color = value.color;
    menuItemData.name = value.name;
    menuItemData.routeName = value.routeName;
    menuItemData.active = value.active;
    menuItemData.secured = value.secured;
    menuItemData.selected = value.selected;

    return menuItemData;
  }

}