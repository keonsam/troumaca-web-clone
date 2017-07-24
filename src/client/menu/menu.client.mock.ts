import {MenuClient} from "./menu.client";
import {Observable} from "rxjs/Observable";
import {MenuState} from "./menu.state";
import {MenuItemState} from "./menu.item.state";
import "rxjs/add/observable/of";
import {Subject} from "rxjs/Subject";
import {OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Subscription";

export class MenuClientMock extends MenuClient implements OnInit, OnDestroy {

  private isLoggedIn:boolean = false;
  private subscription:Subscription;

  constructor(private loginSubject:Subject<boolean>) {
    super();
  }


  ngOnInit(): void {
    if (this.loginSubject) {
      this.subscription = this.loginSubject.subscribe(loggedIn => this.isLoggedIn = loggedIn);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private toMenuItem(value:any):MenuItemState {
    let menuItemState = new MenuItemState();

    menuItemState.backgroundColor = value.backgroundColor;
    menuItemState.color = value.color;
    menuItemState.name = value.name;
    menuItemState.routeName = value.routeName;
    menuItemState.active = value.active;
    menuItemState.secured = value.secured;
    menuItemState.selected = value.selected;

    return menuItemState;
  }

  getTopMenuState(): Observable<MenuState> {
    let menuState:MenuState = new MenuState();
    menuState.title = "Troumaca";

    menuState.menuItemStates = this.topMenuItems()
      .filter(menuItemState => !menuItemState.secured);

    return Observable.of(menuState);
  }

  private topMenuItems():MenuItemState[] {
    return [
      this.toMenuItem({"id":"1", "rank":"1", "name": 'Account', "routeName": '/account', "color": 'black', "backgroundColor": 'white', "selected": true, "active": true, "secured": true}),
      this.toMenuItem({"id":"2", "rank":"3", "name": 'Login', "routeName": '/login', "color": 'black', "backgroundColor": 'white', "selected": true, "active": false, "secured": false}),
      this.toMenuItem({"id":"2", "rank":"3", "name": 'Report', "routeName": '/report', "color": 'black', "backgroundColor": 'white', "selected": true, "active": false, "secured": true}),
      this.toMenuItem({"id":"3", "rank":"2", "name": 'Sign Up', "routeName": '/sign-up', "color": 'black', "backgroundColor": 'white', "selected": true, "active": false, "secured": false}),
      this.toMenuItem({"id":"3", "rank":"2", "name": 'Logout', "routeName": '/logout', "color": 'black', "backgroundColor": 'white', "selected": true, "active": false, "secured": true})
    ];
  }

  getLeftMenuState(): Observable<MenuState[]> {

    let orgMenuState:MenuState = new MenuState();
    orgMenuState.rank = 10;
    orgMenuState.title = "Organization";
    orgMenuState.id = "100";
    orgMenuState.menuItemStates = this.orgLeftMenuItems();


    // let myInfoMenuState:MenuState = new MenuState();
    // myInfoMenuState.rank = 20;
    // myInfoMenuState.title = "My Info";
    // myInfoMenuState.id = "200";
    // myInfoMenuState.menuItemStates = this.personLeftMenuItems();


    // let securityMenuState:MenuState = new MenuState();
    // securityMenuState.rank = 30;
    // securityMenuState.title = "Security";
    // securityMenuState.id = "300";
    // securityMenuState.menuItemStates = this.securityLeftMenuItems();


    let menuState:MenuState[] = [];
    menuState.push(orgMenuState);
    // menuState.push(myInfoMenuState);
    // menuState.push(securityMenuState);

    return Observable.of(menuState);
  }

  private orgLeftMenuItems():MenuItemState[] {
    let menuItemState = this.toMenuItem({"id":"3", "rank":"2", "name": 'Organizations', "routeName": '/account/organizations', "color": 'black', "backgroundColor": 'white', "selected": true, "active": false, "secured": false});
    menuItemState.menuState = this.orgLeftMenuChild();
    return [
      menuItemState
    ];
  }

  private orgLeftMenuChild():MenuState[] {
    let orgMenuState:MenuState = new MenuState();
    orgMenuState.rank = 10;
    orgMenuState.title = "Organization Sub Menu";
    orgMenuState.id = "100100";
    orgMenuState.menuItemStates = this.orgSubLeftMenuItems();
    return [
      orgMenuState
    ];
  }

  private orgSubLeftMenuItems():MenuItemState[] {
    return [
      this.toMenuItem({"id":"3", "rank":"2", "name": 'Create New', "routeName": 'organizations/create-new', "color": 'black', "backgroundColor": 'white', "selected": true, "active": false, "secured": false}),
      this.toMenuItem({"id":"3", "rank":"2", "name": 'Invite Person', "routeName": 'organizations/invite', "color": 'black', "backgroundColor": 'white', "selected": true, "active": false, "secured": false})
    ];
  }

  private personLeftMenuItems() {
    let menuItemState = this.toMenuItem({"id":"3", "rank":"2", "name": 'Persons', "routeName": '/persons', "color": 'black', "backgroundColor": 'white', "selected": true, "active": false, "secured": false});
    menuItemState.menuState = this.personLeftMenuChild();
    return [
      menuItemState
    ];
  }

  private personLeftMenuChild():MenuState[] {
    let orgMenuState:MenuState = new MenuState();
    orgMenuState.rank = 10;
    orgMenuState.title = "Person Sub Menu";
    orgMenuState.id = "100100";
    orgMenuState.menuItemStates = this.personSubLeftMenuItems();
    return [
      orgMenuState
    ];
  }


  private personSubLeftMenuItems():MenuItemState[] {
    return [
      this.toMenuItem({"id":"3", "rank":"2", "name": 'My Info', "routeName": '/my-info', "color": 'black', "backgroundColor": 'white', "selected": true, "active": false, "secured": false}),
      this.toMenuItem({"id":"3", "rank":"1", "name": 'Create New', "routeName": '/add', "color": 'black', "backgroundColor": 'white', "selected": true, "active": false, "secured": false})
    ];
  }

  private securityLeftMenuItems() {
    let menuItemState = this.toMenuItem({"id":"3", "rank":"2", "name": 'Security', "routeName": '/security', "color": 'black', "backgroundColor": 'white', "selected": true, "active": false, "secured": false});
    menuItemState.menuState = this.securityLeftMenuChild();
    return [
      menuItemState
    ];
  }

  private securityLeftMenuChild():MenuState[] {
    let orgMenuState:MenuState = new MenuState();
    orgMenuState.rank = 10;
    orgMenuState.title = "Security Sub Menu";
    orgMenuState.id = "100100";
    orgMenuState.menuItemStates = this.securitySubLeftMenuItems();
    return [
      orgMenuState
    ];
  }

  private securitySubLeftMenuItems():MenuItemState[] {
    return [
      this.toMenuItem({"id":"3", "rank":"2", "name": 'Change Password', "routeName": '/change-password', "color": 'black', "backgroundColor": 'white', "selected": true, "active": false, "secured": false}),
      this.toMenuItem({"id":"3", "rank":"2", "name": 'My Sessions', "routeName": '/my-sessions', "color": 'black', "backgroundColor": 'white', "selected": true, "active": false, "secured": false})
    ];
  }

}