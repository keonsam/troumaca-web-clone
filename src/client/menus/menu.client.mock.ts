import {MenuClient} from "./menu.client";
import {Observable} from "rxjs/Observable";
import {MenuState} from "./menu.state";
import {MenuItemState} from "./menu.item.state";
import "rxjs/add/observable/of";

export class MenuClientMock extends MenuClient {

  // TODO: Remove or rather convert
  private leftMenuMap:Map<string, MenuState> = new Map<string, MenuState>();

  private menuMap:Map<string, MenuState> = new Map<string, MenuState>();

  constructor() {
    super();
    this.leftMenuMap = new Map<string, MenuState>();
    this.cacheMenus()
  }

  getMenuByName(menuName: string): Observable<MenuState> {
    return Observable.of(this.menuMap.get(menuName));
  }

  cacheMenus() {
    let sideMenuState = new MenuState();
    sideMenuState.name = 'side-menu';
    sideMenuState.title = 'side-menu';
    sideMenuState.menuItemStates = this.sideMenuItems();
    this.menuMap.set(sideMenuState.name, sideMenuState);

    let assetsMenuState = new MenuState();
    assetsMenuState.name = 'assets-menu';
    assetsMenuState.title = 'assets-menu';
    assetsMenuState.menuItemStates = this.assetsMenuItems();
    this.menuMap.set(assetsMenuState.name, assetsMenuState);

    let assetTypesMenuState = new MenuState();
    assetTypesMenuState.name = 'asset-types-menu';
    assetTypesMenuState.title = 'asset-types-menu';
    assetTypesMenuState.menuItemStates = this.assetsMenuItems();
    this.menuMap.set(assetTypesMenuState.name, assetsMenuState);

    let usersMenuState = new MenuState();
    usersMenuState.name = 'users-menu';
    usersMenuState.title = 'users-menu';
    usersMenuState.menuItemStates = this.usersMenuItems();
    this.menuMap.set(usersMenuState.name, usersMenuState);

    let organizationsMenuState = new MenuState();
    organizationsMenuState.name = 'organizations-menu';
    organizationsMenuState.title = 'organizations-menu';
    organizationsMenuState.menuItemStates = this.organizationsMenuItems2();
    this.menuMap.set(organizationsMenuState.name, organizationsMenuState);
  }

  // noinspection JSMethodCanBeStatic
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
    menuItemState.iconClasses = value.iconClasses;

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
      this.toMenuItem({id:'101', rank:'20', name: 'HOME', routeName: '/home', iconClasses:'', color: 'black', backgroundColor: 'white', selected: true, active: true, secured: false}),
      this.toMenuItem({id:'102', rank:'21', name: 'ASSETS', routeName: '/assets', iconClasses:'', color: 'black', backgroundColor: 'white', selected: true, active: true, secured: false}),
      this.toMenuItem({id:'102', rank:'21', name: 'TYPES', routeName: '/asset-types', iconClasses:'', color: 'black', backgroundColor: 'white', selected: true, active: true, secured: false}),
      this.toMenuItem({id:'102', rank:'21', name: 'ATTRIBUTES', routeName: '/attributes', iconClasses:'', color: 'black', backgroundColor: 'white', selected: true, active: true, secured: false}),
      this.toMenuItem({id:'102', rank:'21', name: 'CLASSES', routeName: '/asset-type-classes', iconClasses:'', color: 'black', backgroundColor: 'white', selected: true, active: true, secured: false}),
      this.toMenuItem({id:'102', rank:'21', name: 'SITES', routeName: '/sites', iconClasses:'', color: 'black', backgroundColor: 'white', selected: true, active: true, secured: false}),
      // this.toMenuItem({"id":"103", "rank":"22", "name": 'Work Order', "routeName": '/work-order', iconClasses:'', "color": 'black', "backgroundColor": 'white', "selected": true, "active": true, "secured": false}),
      // this.toMenuItem({"id":"104", "rank":"23", "name": 'Request', "routeName": '/request', iconClasses:'', "color": 'black', "backgroundColor": 'white', "selected": true, "active": true, "secured": false}),
      // this.toMenuItem({"id":"110", "rank":"30", "name": 'Login', "routeName": '/login', iconClasses:'', "color": 'black', "backgroundColor": 'white', "selected": true, "active": true, "secured": false}),
      // this.toMenuItem({"id":"120", "rank":"10", "name": 'Home', "routeName": '/home', iconClasses:'', "color": 'black', "backgroundColor": 'white', "selected": true, "active": true, "secured": false}),
      // this.toMenuItem({"id":"130", "rank":"10", "name": 'Home', "routeName": '/home', iconClasses:'', "color": 'black', "backgroundColor": 'white', "selected": true, "active": true, "secured": false}),
      // this.toMenuItem({"id":"150", "rank":"40", "name": 'Report', "routeName": '/report', iconClasses:'', "color": 'black', "backgroundColor": 'white', "selected": true, "active": false, "secured": false}),
      // this.toMenuItem({"id":"200", "rank":"50", "name": 'Sign Up', "routeName": '/sign-up', iconClasses:'', "color": 'black', "backgroundColor": 'white', "selected": true, "active": false, "secured": false}),
      // this.toMenuItem({"id":"210", "rank":"60", "name": 'Logout', "routeName": '/logout', iconClasses:'', "color": 'black', "backgroundColor": 'white', "selected": true, "active": false, "secured": false})
    ];
  }

  private sideMenuItems() {
    return [
      this.toMenuItem({id:'101', rank:'20', name: 'ASSETS', routeName: '/assets', iconClasses:'os-icon os-icon-delivery-box-2', color: '', backgroundColor: '', selected: true, active: true, secured: false}),
      this.toMenuItem({id:'101', rank:'20', name: 'REQUESTS', routeName: '/requests', iconClasses:'os-icon os-icon-delivery-box-2', color: '', backgroundColor: '', selected: true, active: true, secured: false}),
      // this.toMenuItem({id:'101', rank:'20', name: 'USERS', routeName: '/users', iconClasses:'os-icon os-icon-user-male-circle', color: '', backgroundColor: '', selected: true, active: true, secured: false}),
      // this.toMenuItem({id:'101', rank:'20', name: 'RECEIPTS', routeName: '/users', iconClasses:'os-icon os-icon-user-male-circle', color: '', backgroundColor: '', selected: true, active: true, secured: false}),
      // this.toMenuItem({id:'101', rank:'20', name: 'WORK ORDERS', routeName: '/work-orders', iconClasses:'os-icon os-icon-delivery-box-2', color: '', backgroundColor: '', selected: true, active: true, secured: false}),
      // this.toMenuItem({id:'101', rank:'20', name: 'INVOICE TEMPLATES', routeName: '/invoice-templates', iconClasses:'os-icon os-icon-delivery-box-2', color: '', backgroundColor: '', selected: true, active: true, secured: false})
    ];
  }

  private assetsMenuItems() {
    return [
      // this.toMenuItem({id:'101', rank:'20', name: 'HOME', routeName: '/home', iconClasses:'', color: 'black', backgroundColor: 'white', selected: true, active: true, secured: false}),
      this.toMenuItem({id:'1021', rank:'21', name: 'ASSETS', routeName: '/assets', iconClasses:'', color: 'black', backgroundColor: 'white', selected: true, active: true, secured: false}),
      this.toMenuItem({id:'1022', rank:'22', name: 'TYPES', routeName: '/asset-types', iconClasses:'', color: 'black', backgroundColor: 'white', selected: true, active: true, secured: false}),
      this.toMenuItem({id:'1023', rank:'23', name: 'ATTRIBUTES', routeName: '/attributes', iconClasses:'', color: 'black', backgroundColor: 'white', selected: true, active: true, secured: false}),
      this.toMenuItem({id:'1024', rank:'24', name: 'CLASSES', routeName: '/asset-type-classes', iconClasses:'', color: 'black', backgroundColor: 'white', selected: true, active: true, secured: false}),
      this.toMenuItem({id:'1025', rank:'25', name: 'SITES', routeName: '/sites', iconClasses:'', color: 'black', backgroundColor: 'white', selected: true, active: true, secured: false}),
    ];
  }

  private requestsMenuItems() {
  }

  private usersMenuItems() {
    return [
      this.toMenuItem({id:'1031', rank:'31', name: 'Users', routeName: '/parties/users', iconClasses:'', color: 'black', backgroundColor: 'white', selected: true, active: true, secured: false})
    , this.toMenuItem({id:'1032', rank:'32', name: 'Me', routeName: '/parties/users/me', iconClasses:'', color: 'black', backgroundColor: 'white', selected: true, active: true, secured: false})
    ];
  }

  private organizationsMenuItems2() {
    return [
      this.toMenuItem({id:'1041', rank:'31', name: 'Company', routeName: 'organizations/company', iconClasses:'', color: 'black', backgroundColor: 'white', selected: true, active: true, secured: false})
    // , this.toMenuItem({id:'1042', rank:'32', name: 'Customers', routeName: 'customers', iconClasses:'', color: 'black', backgroundColor: 'white', selected: true, active: false, secured: false})
    // , this.toMenuItem({id:'1042', rank:'32', name: 'Vendors', routeName: 'vendors', iconClasses:'', color: 'black', backgroundColor: 'white', selected: true, active: false, secured: false})
    ];
  }

  private workOrdersMenuItems() {
  }

  private invoiceTemplatesMenuItems() {
  }

  private getLeftMenuState(menuName:string): Observable<MenuState[]> {

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
    this.leftMenuMap.set("goods", this.goodsLeftMenu);
    this.leftMenuMap.set("assets", this.goodsLeftMenu);
    this.leftMenuMap.set("work-order", this.workOrderLeftMenu);
    this.leftMenuMap.set("request", this.requestLeftMenu);
    this.leftMenuMap.set("report", this.reportLeftMenu);


    // let orgMenuState:MenuState = new MenuState();
    // orgMenuState.rank = 10;
    // orgMenuState.title = "Organization";
    // orgMenuState.id = "1000";
    // orgMenuState.menuItemStates = this.
    // (this.organizationsSubMenu(this.createNewOrganizationSubMenuItems()));

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

  get goodsLeftMenu():MenuState {
    return this.createAssetMenu(this.assetsMenuItems());
  }

  private createAssetMenu(assetTypeMenuItems:MenuItemState[]):MenuState {
    let assetTypeLeftMenu:MenuState = new MenuState();
    assetTypeLeftMenu.id = "1000";
    assetTypeLeftMenu.rank = 100;
    assetTypeLeftMenu.name = "asset-type";
    assetTypeLeftMenu.title = "Asset Type Menu";
    assetTypeLeftMenu.menuItemStates = assetTypeMenuItems;
    return assetTypeLeftMenu;

  }

  // private assetMenuItems():MenuItemState[] {
  //   return [
  //     this.toMenuItem({"id":"3000", "rank":"1", "name": 'Assets', "routeName": '/goods/assets', "color": 'black', "backgroundColor": 'white', "selected": true, "active": false, "secured": false}),
  //     this.toMenuItem({"id":"3000", "rank":"1", "name": 'Asset Types', "routeName": '/goods/asset-types', "color": 'black', "backgroundColor": 'white', "selected": true, "active": false, "secured": false}),
  //   ];
  // }

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

  getLeftMenuStateById(menuId: string): Observable<MenuState> {

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

    // return Observable.of(menuState);
    return null;
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