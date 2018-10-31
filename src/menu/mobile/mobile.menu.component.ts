import { Component, OnInit} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {PhotoService} from '../../photo/photo.service';
import {UserService} from '../../parties/users/user.service';
import {UserResponse} from '../../parties/user.response';
import {Photo} from "../../photo/photo";

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
  photo: Photo;

  constructor(private photoService: PhotoService,
              private userService: UserService) {
    this.photo = new Photo();
    this.photo.userImage = 'https://designdroide.com/images/abstract-user-icon-4.svg';
    this.state = 'inactive';
    this.popUpState = 'hide';
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
    this.photoService.photoData
      .subscribe( photo => {
        if (photo && photo.partyId) {
          this.photo = photo;
        } else {
          this.photoService.getPhotos(type)
            .subscribe( photo2 => {
              if (photo2 && photo2.partyId) {
                this.photo = photo2;
                this.photoService.photoData.next(photo2);
              }
            });
        }
      });
  }

  getUserInformation() {
    this.userService.getUser('profile')
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
