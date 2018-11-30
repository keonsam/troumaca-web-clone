import {Component, OnInit} from '@angular/core';
import {PhotoService} from '../../photo/photo.service';
import {UserService} from '../../parties/users/user.service';
import {Photo} from "../../photo/photo";
import {SessionService} from "../../session/session.service";
import {User} from "../../parties/user";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side.menu.component.html',
  styleUrls: ['./side.menu.component.css']
})
export class SideMenuComponent implements OnInit {

  public imageStr: string;
  private user: User;
  public name = '';
  photo: Photo;
  defaultUserImage = 'https://designdroide.com/images/abstract-user-icon-4.svg';

  constructor(private photoService: PhotoService,
              private userService: UserService,
              private sessionService: SessionService) {
    this.photo = new Photo();
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
      .subscribe( user => {
        if (user && user.partyId) {
          this.user = user;
          this.name = `${user.firstName} , ${user.lastName}`
        }
      })
  }

  logOutEvent() {
    this.sessionService.logout()
      .subscribe( value => {
        if (value) {
          this.sessionService.logoutEvent.next(true);
        }
      });
  }

}
