import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {MenuModel} from '../menu.model';
import {MenuService} from '../menu.service';
import {EventService} from '../../event/event.service';
import {MenuItemModel} from '../menu.item.model';

@Component({
  selector: 'side-menu',
  templateUrl: './side.menu.component.html',
  styleUrls: ['./side.menu.component.css']
})
export class SideMenuComponent implements OnInit {

  private partyId: string;
  private _imageStr: string;
  private _userName: string;
  private _title: string;
  private _name: string;
  private _menuModel: MenuModel;
  private _isLoggedIn: boolean;

  constructor(private eventService: EventService,
              private _menuService: MenuService,
              // private partyService: PartyService,
              private cd: ChangeDetectorRef) {
    this.title = 'side-menu';
    this.name = 'side-menu';
    this.isLoggedIn = true;
    this.menuModel = new MenuModel();
    this.menuModel.menuItemModels = [];

    this.imageStr = 'https://designdroide.com/images/abstract-user-icon-4.svg';

    this.eventService.subscribeToPhotoChangeEvent((data) => {
      this.getPhoto();
    });

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
    this.getMenu(this.isLoggedIn);
    this.handleMenuRefreshEvent();
    // this.partyService.getPartyId()
    //   .subscribe( partyId => {
    //     if (partyId) {
    //       this.partyId = partyId;
    //       this.getPhoto();
    //       this.getUserInformation();
    //     }
    //   });
  }

  get imageStr(): string {
    return this._imageStr;
  }

  set imageStr(value: string) {
    this._imageStr = value;
  }

  get userName(): string {
    return this._userName;
  }

  set userName(value: string) {
    this._userName = value;
  }

  getPhoto() {
    return undefined;
    // this.partyService.getPhoto(this.partyId, 'user')
    //   .subscribe(photo => {
    //     if (photo) {
    //       this.imageStr = photo.imageStr;
    //     }else {
    //       this.imageStr = 'https://designdroide.com/images/abstract-user-icon-4.svg';
    //     }
    //   }, error => {
    //     this.imageStr = 'https://designdroide.com/images/abstract-user-icon-4.svg';
    //   });
  }

  getUserInformation() {
    // this.partyService.getUser(this.partyId)
    //   .subscribe( userResponse => {
    //     if (userResponse.user.partyId) {
    //       this.userName = userResponse.user.firstName + ' ' + userResponse.user.lastName;
    //     }
    //   });
  }


  handleMenuRefreshEvent() {
    const that = this;
    this.eventService.subscribeToLoginEvent((data) => {
      that.isLoggedIn = true;
      that.getMenu(this.isLoggedIn);
    });
  }

  getMenu(isLoggedIn: boolean) {
    if (!isLoggedIn) { return; }

    const that = this;
    this._menuService.getMenuByName(this.name).subscribe(function (menu) {
      that.menuModel.menuItemModels = [];
      menu.menuItemModels.forEach(value => {
        that.menuModel.menuItemModels.push(value);
      });

      that.cd.markForCheck();
    });
  }

  onSelected(menuItemModel: MenuItemModel) {
    this._menuModel.menuItemModels.forEach(mi => {
      if (mi.active) {
        mi.active = false
      }
    });
    menuItemModel.active = true;
  }

  logOutEvent() {
    // this.partyService.logOutUser()
    //   .subscribe(next => {
    //     if (next) {
    //       this.eventService.sendSessionLogoutEvent({'logOutEvent': true});
    //     }
    //   });
  }

}
