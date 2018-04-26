import {ChangeDetectorRef, Component, Input, OnInit} from "@angular/core";
import {MenuService} from "../menu.service";
import {PartyService} from "../../parties/party.service";
//import {MenuItemModel} from "../menu.item.model";
import {EventService} from "../../event/event.service";
import {MenuModel} from "../menu.model";
import {trigger, state, style, transition, animate} from "@angular/animations";

@Component({
  selector: 'mobile-menu',
  templateUrl: './mobile.menu.component.html',
  styleUrls: ['./mobile.menu.component.css'],
  animations: [
    trigger('mobileMenuAnimation', [
      state('inactive', style({
        'display': 'none', 'height': '0', opacity: 0
      })),
      state('active', style({
        'display': 'block', 'height': '*', opacity: 1
      })),
      transition('inactive => active', animate('200ms ease-in-out')),
      transition('active => inactive', animate('200ms ease-in-out')),
    ]),
  ]
})
export class MobileMenuComponent implements OnInit {

  private partyId: string;
  private imageStr: string;
  private userName: string;
  private _title:string;
  private _name:string;
  private _menuModel:MenuModel;
  private _isLoggedIn:boolean;
  private state: string = 'inactive';

  constructor(private eventService:EventService, private menuService:MenuService, private partyService: PartyService, private cd: ChangeDetectorRef) {
    // this.title = "mobile-menu";
    // this.name = "mobile-menu";
    // this.isLoggedIn = true;
    // this.menuModel = new MenuModel();
    // this.menuModel.menuItemModels = [];
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get menuModel(): MenuModel {
    return this._menuModel;
  }

  set menuModel(value: MenuModel) {
    this._menuModel = value;
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  @Input()
  set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
  }

  ngOnInit(): void {
    //this.getMenu(this.isLoggedIn);
    this.handleMenuRefreshEvent();
    this.partyService.getPartyId()
      .subscribe( partyId => {
        if(partyId){
          this.partyId = partyId;
          this.getPhoto();
          this.getUserInformation();
        }
      });
  }

  mobileMenuTrigger() {
    this.state = (this.state === 'inactive' ? 'active': 'inactive');
  }

  getPhoto() {
    this.partyService.getPhoto(this.partyId, "user")
      .subscribe(imgStr => {
        if(imgStr) {
          this.imageStr = imgStr;
        }
      });
  }

  getUserInformation() {
    this.partyService.getUser(this.partyId)
      .subscribe( user => {
        if(user.partyId) {
          this.userName = user.name;
        }
      });
  }


  handleMenuRefreshEvent() {
    let that = this;
    this.eventService.subscribeToLoginEvent((data) => {
      that.isLoggedIn = true;
      //that.getMenu(this.isLoggedIn);
    });
  }

  // getMenu(isLoggedIn:boolean) {
  //   if (!isLoggedIn) { return; }
  //
  //   let that = this;
  //   this.menuService.getMenuByName(this.name).subscribe(function (menu) {
  //     that.menuModel.menuItemModels = [];
  //     menu.menuItemModels.forEach(value => {
  //       that.menuModel.menuItemModels.push(value);
  //     });
  //
  //     that.cd.markForCheck();
  //   });
  // }
  //
  // onSelected(menuItemModel:MenuItemModel) {
  //   this._menuModel.menuItemModels.forEach(mi => {
  //     if (mi.active) {
  //       mi.active = false
  //     }
  //   });
  //   menuItemModel.active = true;
  // }

  logOutEvent() {
    this.partyService.logOutUser()
      .subscribe(next => {
        if(next) {
          this.eventService.sendSessionLogoutEvent({"logOutEvent":true});
        }
      });
  }

}
