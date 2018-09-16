import { Component, OnInit} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {PhotoService} from '../../photo/photo.service';
import {UserService} from '../../parties/users/user.service';
import {UserResponse} from '../../parties/user.response';

@Component({
  selector: 'app-mobile-menu',
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

  public imageStr: string;
  public name = '';
  public state: string;
  public popUpState: string;
  private userResponse: UserResponse;

  constructor(private photoService: PhotoService,
              private userService: UserService) {
    this.state = 'inactive';
    this.popUpState = 'hide';
    this.imageStr = 'https://designdroide.com/images/abstract-user-icon-4.svg';
    this.photoService.photoData.subscribe( data => {
      if (data.type === 'user') {
        this.imageStr = data.imgStr;
      }
    });
  }

  ngOnInit(): void {
    this.getPhoto('user');
    this.getUserInformation();
  }

  mobileMenuTrigger() {
    this.popUpState = 'hide';
    this.state = this.state === 'inactive' ? 'active' : 'inactive';
  }

  popUpTrigger() {
    this.popUpState = this.popUpState === 'hide' ? 'show' : 'hide';
  }

  getPhoto(type: string) {
    this.photoService.getPhotos(type)
      .subscribe( photo => {
        if (photo.partyId) {
          this.imageStr = photo.userImage
        }
      })
  }

  getUserInformation() {
    this.userService.getUser('me')
      .subscribe( userRes => {
        if (userRes.user.partyId) {
          this.userResponse = userRes;
          this.name = `${userRes.user.firstName} , ${userRes.user.lastName}`
        }
      })
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
