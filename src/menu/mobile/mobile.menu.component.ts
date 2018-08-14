import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {MenuService} from '../menu.service';
import {PartyService} from '../../parties/party.service';
import {EventService} from '../../event/event.service';
import {MenuModel} from '../menu.model';
import {trigger, state, style, transition, animate} from '@angular/animations';

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
  private _imageStr: string;
  private _userName: string;
  private _title: string;
  private _name: string;
  private _menuModel: MenuModel;
  private _isLoggedIn: boolean;
  private _state: string;
  private _popUpState: string;

  constructor(private eventService: EventService, private menuService: MenuService, private partyService: PartyService, private cd: ChangeDetectorRef) {
    this._state = 'inactive';
    this._popUpState = 'hide';
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
    this.handleMenuRefreshEvent();
    this.partyService.getPartyId()
      .subscribe( partyId => {
        if (partyId) {
          this.partyId = partyId;
          this.getPhoto();
          this.getUserInformation();
        }
      });
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

  get state(): string {
    return this._state;
  }

  set state(value: string) {
    this._state = value;
  }

  get popUpState(): string {
    return this._popUpState;
  }

  set popUpState(value: string) {
    this._popUpState = value;
  }

  mobileMenuTrigger() {
    this.popUpState = 'hide';
    this.state = this.state === 'inactive' ? 'active' : 'inactive';
  }

  popUpTrigger() {
    this.popUpState = this.popUpState === 'hide' ? 'show' : 'hide';
  }

  getPhoto() {
    this.partyService.getPhoto(this.partyId, 'user')
      .subscribe(photo => {
        if (photo) {
          this.imageStr = photo.imageStr;
        } else {
          this.imageStr = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwqeFAYIE3hTj9Gs1j3v7o-oBadM5uDkuPBuXMPtXS85LufL7UVA';
        }
      });
  }

  getUserInformation() {
    this.partyService.getUser(this.partyId)
      .subscribe( userResponse => {
        if (userResponse.user.partyId) {
          this.userName = userResponse.user.firstName + ' ' + userResponse.user.lastName;
        }
      });
  }


  handleMenuRefreshEvent() {
    const that = this;
    this.eventService.subscribeToLoginEvent((data) => {
      that.isLoggedIn = true;
      //that.getMenu(this.isLoggedIn);
    });
  }

  logOutEvent() {
    this.partyService.logOutUser()
      .subscribe(next => {
        if (next) {
          this.eventService.sendSessionLogoutEvent({'logOutEvent': true});
        }
      });
  }

}
