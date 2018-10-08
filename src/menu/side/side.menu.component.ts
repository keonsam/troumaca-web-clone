import {Component, OnInit} from '@angular/core';
import {PhotoService} from '../../photo/photo.service';
import {UserService} from '../../parties/users/user.service';
import {UserResponse} from '../../parties/user.response';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side.menu.component.html',
  styleUrls: ['./side.menu.component.css']
})
export class SideMenuComponent implements OnInit {

  public imageStr: string;
  private userResponse: UserResponse;
  public name = '';

  constructor(private photoService: PhotoService,
              private userService: UserService) {
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
