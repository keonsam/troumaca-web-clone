import {Component, OnInit} from '@angular/core';
import {PhotoService} from '../../photo/photo.service';
import {UserService} from '../../parties/users/user.service';
import {UserResponse} from '../../parties/user.response';
import {Photo} from "../../photo/photo";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side.menu.component.html',
  styleUrls: ['./side.menu.component.css']
})
export class SideMenuComponent implements OnInit {

  public imageStr: string;
  private userResponse: UserResponse;
  public name = '';
  photo: Photo;

  constructor(private photoService: PhotoService,
              private userService: UserService) {
    this.photo = new Photo();
    this.photo.userImage = 'https://designdroide.com/images/abstract-user-icon-4.svg';

  }

  ngOnInit(): void {
    this.getPhoto('user');
    this.getUserInformation();
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
