// import { Component, OnInit} from '@angular/core';
// import {trigger, state, style, transition, animate} from '@angular/animations';
// import {PhotoService} from '../../parties/photo/photo.service';
// import {Photo} from "../../parties/photo/photo";
// import {User} from "../../parties/user";
// import {SessionService} from "../../session/session.service";
// import {UserService} from "../../parties/users/user.service";
//
// @Component({
//   selector: 'app-mobile-menu',
//   templateUrl: './mobile.menu.component.html',
//   styleUrls: ['./mobile.menu.component.css'],
//   animations: [
//     trigger('mobileMenuAnimation', [
//       state('inactive', style({
//         'display': 'none', 'height': '0', opacity: 0
//       })),
//       state('active', style({
//         'display': 'block', 'height': '*', opacity: 1
//       })),
//       transition('inactive => active', animate('200ms ease-in-out')),
//       transition('active => inactive', animate('200ms ease-in-out')),
//     ]),
//   ]
// })
//
// export class MobileMenuComponent implements OnInit {
//
//   public name = '';
//   public state: string;
//   public popUpState: string;
//   private user: User;
//   photo: Photo;
//   defaultUserImage = 'https://designdroide.com/images/abstract-user-icon-4.svg';
//
//   constructor(private photoService: PhotoService,
//               private userService: UserService,
//               private sessionService: SessionService) {
//     this.photo = new Photo();
//     this.state = 'inactive';
//     this.popUpState = 'hide';
//   }
//
//   ngOnInit(): void {
//     this.getPhoto('user');
//     this.getUserInformation();
//   }
//
//   mobileMenuTrigger() {
//     this.popUpState = 'hide';
//     this.state = this.state === 'inactive' ? 'active' : 'inactive';
//   }
//
//   popUpTrigger() {
//     this.popUpState = this.popUpState === 'hide' ? 'show' : 'hide';
//   }
//
//   getPhoto(type: string) {
//     this.photoService.photoData
//       .subscribe( photo => {
//         if (photo && photo.partyId) {
//           this.photo = photo;
//         } else {
//           this.photoService.getPhotos(type)
//             .subscribe( photo2 => {
//               if (photo2 && photo2.partyId) {
//                 this.photo = photo2;
//                 this.photoService.photoData.next(photo2);
//               }
//             });
//         }
//       });
//   }
//
//   getUserInformation() {
//     this.userService.getUser('profile')
//       .subscribe( user => {
//         if (user && user.partyId) {
//           this.user = user;
//           this.name = `${user.firstName} , ${user.lastName}`
//         }
//       })
//   }
//
//   logOutEvent() {
//     this.sessionService.logout()
//       .subscribe(next => {
//         if (next) {
//           this.sessionService.logoutEvent.next(true);
//         }
//       });
//   }
//
// }
