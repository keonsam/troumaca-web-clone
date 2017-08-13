import {MenuClient} from "./menu.client";
import {Observable} from "rxjs/Observable";
import {MenuState} from "./menu.state";
import {MenuItemState} from "./menu.item.state";
import "rxjs/add/observable/of";

export class MenuClientMock extends MenuClient {

  private leftMenuMap:Map<string, MenuState>;

  constructor() {
    super();
    this.leftMenuMap = new Map<string, MenuState>();
  }

  private toMenuItem(value:any):MenuItemState {
    let menuItemState = new MenuItemState();

    menuItemState.backgroundColor = value.backgroundColor;
    menuItemState.id = value.id;
    menuItemState.rank = value.rank;
    menuItemState.color = value.color;
    menuItemState.name = value.name;
    menuItemState.routeName = value.routeName;
    menuItemState.active = value.active;
    menuItemState.secured = value.secured;
    menuItemState.selected = value.selected;
    menuItemState.backgroundColor = value.backgroundColor;

    return menuItemState;
  }

  getTopMenuState(isLoggedIn:boolean): Observable<MenuState> {
    let menuState:MenuState = new MenuState();
    menuState.title = "Troumaca";

    menuState.menuItemStates = this.topMenuItems()
      .filter(menuItemState => {
        return menuItemState.secured == isLoggedIn;
      }).sort(this.compare);

    return Observable.of(menuState);
  }

  compare(a, b):number {
    if (a.rank < b.rank) {
      return -1;
    } else if (a.rank > b.rank) {
      return 1;
    } else {
      return 0;
    }
  };

  private topMenuItems():MenuItemState[] {
    return [
      this.toMenuItem({"id":"101", "rank":"20", "name": 'Account', "routeName": '/account', "color": 'black', "backgroundColor": 'white', "selected": true, "active": true, "secured": false}),
      this.toMenuItem({"id":"102", "rank":"21", "name": 'Asset', "routeName": '/asset-type', "color": 'black', "backgroundColor": 'white', "selected": true, "active": true, "secured": false}),
      this.toMenuItem({"id":"103", "rank":"22", "name": 'Work Order', "routeName": '/work-order', "color": 'black', "backgroundColor": 'white', "selected": true, "active": true, "secured": false}),
      this.toMenuItem({"id":"104", "rank":"23", "name": 'Request', "routeName": '/request', "color": 'black', "backgroundColor": 'white', "selected": true, "active": true, "secured": false}),
      this.toMenuItem({"id":"110", "rank":"30", "name": 'Login', "routeName": '/login', "color": 'black', "backgroundColor": 'white', "selected": true, "active": true, "secured": false}),
      this.toMenuItem({"id":"120", "rank":"10", "name": 'Home', "routeName": '/home', "color": 'black', "backgroundColor": 'white', "selected": true, "active": true, "secured": false}),
      this.toMenuItem({"id":"130", "rank":"10", "name": 'Home', "routeName": '/home', "color": 'black', "backgroundColor": 'white', "selected": true, "active": true, "secured": false}),
      this.toMenuItem({"id":"150", "rank":"40", "name": 'Report', "routeName": '/report', "color": 'black', "backgroundColor": 'white', "selected": true, "active": false, "secured": false}),
      this.toMenuItem({"id":"200", "rank":"50", "name": 'Sign Up', "routeName": '/sign-up', "color": 'black', "backgroundColor": 'white', "selected": true, "active": false, "secured": false}),
      this.toMenuItem({"id":"210", "rank":"60", "name": 'Logout', "routeName": '/logout', "color": 'black', "backgroundColor": 'white', "selected": true, "active": false, "secured": false})
    ];
  }

  getLeftMenuState(menuName:string): Observable<MenuState[]> {

    let orgMenuState:MenuState = new MenuState();
    orgMenuState.rank = 10;
    orgMenuState.title = "Organization";
    orgMenuState.id = "100";
    orgMenuState.menuItemStates = this.organizationsMenuItems(this.organizationsSubMenu(this.createNewOrganizationSubMenuItems()));

    let myInfoMenuState:MenuState = new MenuState();
    myInfoMenuState.rank = 20;
    myInfoMenuState.title = "My Info";
    myInfoMenuState.id = "200";
    myInfoMenuState.menuItemStates = this.personLeftMenuItems(this.personSubLeftMenu(this.personSubLeftMenuItems()));

    let securityMenuState:MenuState = new MenuState();
    securityMenuState.rank = 30;
    securityMenuState.title = "Security";
    securityMenuState.id = "300";
    securityMenuState.menuItemStates = this.securityLeftMenuItems(this.securitySubLeftMenu(this.securitySubLeftMenuItems()));

    let menuState:MenuState[] = [];
    menuState.push(orgMenuState);
    menuState.push(myInfoMenuState);
    menuState.push(securityMenuState);

    return Observable.of(menuState);
  }


  getLeftMenuStateByName(menuName: string): Observable<MenuState> {

    this.leftMenuMap.set("account", this.accountLeftMenu);
    this.leftMenuMap.set("asset-type", this.assetTypeLeftMenu);
    this.leftMenuMap.set("work-order", this.workOrderLeftMenu);
    this.leftMenuMap.set("request", this.requestLeftMenu);
    this.leftMenuMap.set("report", this.reportLeftMenu);


    // let orgMenuState:MenuState = new MenuState();
    // orgMenuState.rank = 10;
    // orgMenuState.title = "Organization";
    // orgMenuState.id = "1000";
    // orgMenuState.menuItemStates = this.organizationsMenuItems(this.organizationsSubMenu(this.createNewOrganizationSubMenuItems()));

    // let myInfoMenuState:MenuState = new MenuState();
    // myInfoMenuState.rank = 20;
    // myInfoMenuState.title = "My Info";
    // myInfoMenuState.id = "2000";
    // myInfoMenuState.menuItemStates = this.personLeftMenuItems(this.personSubLeftMenu(this.personSubLeftMenuItems()));

    // let securityMenuState:MenuState = new MenuState();
    // securityMenuState.rank = 30;
    // securityMenuState.title = "Security";
    // securityMenuState.id = "3000";
    // securityMenuState.menuItemStates = this.securityLeftMenuItems(this.securitySubLeftMenu(this.securitySubLeftMenuItems()));

    // let menuState:MenuState[] = [];
    // menuState.push(orgMenuState);
    // menuState.push(myInfoMenuState);
    // menuState.push(securityMenuState);

    let leftMenu = this.leftMenuMap.get(menuName);
    return Observable.of(leftMenu);
  }

  get accountLeftMenu():MenuState {
    // persons
    // Level 4: Menu Item
    let createNewOrganizationSubMenuItems:MenuItemState[] = this.createNewOrganizationSubMenuItems();

    // Level 3: Menu
    let organizationsSubMenu:MenuState[] = this.organizationsSubMenu(createNewOrganizationSubMenuItems);

    // Level 2: Account child item
    let organizationsMenuItems:MenuItemState[] = this.organizationsMenuItems(organizationsSubMenu);

    //--------------------
    // persons
    //--------------------

    // Level 4: Person Menu Item
    let personSubLeftMenuItems:MenuItemState[] = this.personSubLeftMenuItems();

    // Level 3: Person Menu Item
    let personSubLeftMenu:MenuState[] = this.personSubLeftMenu(personSubLeftMenuItems);

    // Level 2: Person Menu Item
    let personLeftMenuItems:MenuItemState[] = this.personLeftMenuItems(personSubLeftMenu);

    //--------------------
    // security
    //--------------------

    // Level 4: Security child item
    let securitySubLeftMenuItems:MenuItemState[] = this.securitySubLeftMenuItems();

    // Level 3: Security child item
    let securitySubLeftMenu:MenuState[] = this.securitySubLeftMenu(securitySubLeftMenuItems);

    // Level 2: Security child item
    let securityLeftMenuItems:MenuItemState[] = this.securityLeftMenuItems(securitySubLeftMenu);


    let accountSubLeftMenu = organizationsMenuItems.concat(personLeftMenuItems).concat(securityLeftMenuItems);

    // level 1: Account menu
    return this.createAccountMenu(accountSubLeftMenu);
  }

  get assetTypeLeftMenu():MenuState {
    return new MenuState();
  }

  get workOrderLeftMenu():MenuState {
    return new MenuState();
  }

  get requestLeftMenu():MenuState {
    return new MenuState();
  }

  get reportLeftMenu():MenuState {
    return new MenuState();
  }

  private createAccountMenu(organizationsMenuItems:MenuItemState[]):MenuState {
    let accountLeftMenu:MenuState = new MenuState();
    accountLeftMenu.id = "100";
    accountLeftMenu.rank = 10;
    accountLeftMenu.name = "account";
    accountLeftMenu.title = "Account Menu";
    accountLeftMenu.menuItemStates = organizationsMenuItems;
    return accountLeftMenu;
  }

  getLeftMenuStateById(menuId: string): Observable<MenuState[]> {

    this.leftMenuMap.set("account", null);
    this.leftMenuMap.set("asset-type", null);
    this.leftMenuMap.set("work-order", null);
    this.leftMenuMap.set("request", null);
    this.leftMenuMap.set("report", null);

    let orgMenuState:MenuState = new MenuState();
    orgMenuState.rank = 10;
    orgMenuState.title = "Organization";
    orgMenuState.id = "100";
    orgMenuState.menuItemStates = this.organizationsMenuItems(this.organizationsSubMenu(this.createNewOrganizationSubMenuItems()));

    let myInfoMenuState:MenuState = new MenuState();
    myInfoMenuState.rank = 20;
    myInfoMenuState.title = "My Info";
    myInfoMenuState.id = "200";
    myInfoMenuState.menuItemStates = this.personLeftMenuItems(this.personSubLeftMenu(this.personSubLeftMenuItems()));

    let securityMenuState:MenuState = new MenuState();
    securityMenuState.rank = 30;
    securityMenuState.title = "Security";
    securityMenuState.id = "300";
    securityMenuState.menuItemStates = this.securityLeftMenuItems(this.securitySubLeftMenu(this.securitySubLeftMenuItems()));

    let menuState:MenuState[] = [];
    menuState.push(orgMenuState);
    menuState.push(myInfoMenuState);
    menuState.push(securityMenuState);

    return Observable.of(menuState);
  }

  private organizationsMenuItems(menuState:MenuState[]):MenuItemState[] {
    let menuItemState = this.toMenuItem({"id":"3", "rank":"2", "name": 'Organizations', "routeName": '/account/organizations', "color": 'black', "backgroundColor": 'white', "selected": true, "active": false, "secured": false});
    menuItemState.menuStates = menuState;
    return [
      menuItemState
    ];
  }

  private organizationsSubMenu(menuItemState:MenuItemState[]):MenuState[] {
    let orgMenuState:MenuState = new MenuState();
    orgMenuState.rank = 10;
    orgMenuState.title = "Organization Sub Menu";
    orgMenuState.id = "100100";
    orgMenuState.menuItemStates = menuItemState;
    return [
      orgMenuState
    ];
  }

  private createNewOrganizationSubMenuItems():MenuItemState[] {
    return [
      this.toMenuItem({"id":"1100", "rank":"2", "name": 'Create New', "routeName": 'organizations/create-new', "color": 'black', "backgroundColor": 'white', "selected": true, "active": false, "secured": false}),
      // this.toMenuItem({"id":"3", "rank":"2", "name": 'Invite Person', "routeName": 'organizations/invite', "color": 'black', "backgroundColor": 'white', "selected": true, "active": false, "secured": false})
    ];
  }

  private personLeftMenuItems(personSubLeftMenu:MenuState[]) {
    let menuItemState = this.toMenuItem({"id":"3", "rank":"2", "name": 'Persons', "routeName": '/account/persons', "color": 'black', "backgroundColor": 'white', "selected": true, "active": false, "secured": false});
    // menuItemState.menuStates = this.personSubLeftMenu(this.personSubLeftMenuItems());
    menuItemState.menuStates = personSubLeftMenu;
    return [
      menuItemState
    ];
  }

  private personSubLeftMenu(personSubLeftMenuItems:MenuItemState[]):MenuState[] {
    let orgMenuState:MenuState = new MenuState();
    orgMenuState.rank = 10;
    orgMenuState.title = "Person Sub Menu";
    orgMenuState.id = "100100";
    orgMenuState.menuItemStates = personSubLeftMenuItems;
    return [
      orgMenuState
    ];
  }


  private personSubLeftMenuItems():MenuItemState[] {
    return [
      this.toMenuItem({"id":"3", "rank":"2", "name": 'Me', "routeName": '/account/persons/me', "color": 'black', "backgroundColor": 'white', "selected": true, "active": false, "secured": false}),
      this.toMenuItem({"id":"3", "rank":"1", "name": 'Create New', "routeName": '/account/persons/create-new', "color": 'black', "backgroundColor": 'white', "selected": true, "active": false, "secured": false})
    ];
  }

  private securityLeftMenuItems(securitySubLeftMenu:MenuState[]) {
    let menuItemState = this.toMenuItem({"id":"3", "rank":"2", "name": 'Security', "routeName": '/account/security', "color": 'black', "backgroundColor": 'white', "selected": true, "active": false, "secured": false});
    // menuItemState.menuStates = this.securitySubLeftMenu(this.securitySubLeftMenuItems());
    menuItemState.menuStates = securitySubLeftMenu;
    return [
      menuItemState
    ];
  }

  private securitySubLeftMenu(securitySubLeftMenuItems:MenuItemState[]):MenuState[] {
    let orgMenuState:MenuState = new MenuState();
    orgMenuState.rank = 10;
    orgMenuState.title = "Security Sub Menu";
    orgMenuState.id = "100100";
    orgMenuState.menuItemStates = securitySubLeftMenuItems;
    return [
      orgMenuState
    ];
  }

  private securitySubLeftMenuItems():MenuItemState[] {
    return [
      this.toMenuItem({"id":"3", "rank":"2", "name": 'Change Password', "routeName": '/account/security/change-password', "color": 'black', "backgroundColor": 'white', "selected": true, "active": false, "secured": false}),
      this.toMenuItem({"id":"3", "rank":"2", "name": 'My Sessions', "routeName": '/account/security/sessions', "color": 'black', "backgroundColor": 'white', "selected": true, "active": false, "secured": false})
    ];
  }

}